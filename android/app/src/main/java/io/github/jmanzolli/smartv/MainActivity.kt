package io.github.jmanzolli.smartv

import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.drawable.Drawable
import android.net.Uri
import android.os.Bundle
import android.util.Base64
import android.view.KeyEvent
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.webkit.WebViewAssetLoader
import org.json.JSONArray
import org.json.JSONObject
import java.io.ByteArrayOutputStream
import java.net.HttpURLConnection
import java.net.URL
import java.nio.charset.Charset
import java.util.concurrent.Executors

/**
 * Full-screen WebView showing the home screen from web/ (packaged as assets),
 * plus a small bridge so the page can launch apps and fetch feeds without CORS limits.
 */
class MainActivity : Activity() {

    private lateinit var web: WebView
    private val network = Executors.newFixedThreadPool(3)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val assets = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        web = WebView(this)
        web.setBackgroundColor(Color.parseColor("#0E1433"))
        web.settings.javaScriptEnabled = true
        web.settings.domStorageEnabled = true
        // Lay the page out 1920 CSS pixels wide (its viewport tag) and shrink it to the screen,
        // whatever resolution and density the TV reports; ignore the system font size too.
        web.settings.useWideViewPort = true
        web.settings.loadWithOverviewMode = true
        web.settings.setSupportZoom(false)
        web.settings.textZoom = 100
        web.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse? =
                assets.shouldInterceptRequest(request.url)

            // The page never navigates away; links elsewhere are ignored.
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean =
                request.url.host != WebViewAssetLoader.DEFAULT_DOMAIN

            @Deprecated("Needed below Android 7")
            override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean =
                Uri.parse(url).host != WebViewAssetLoader.DEFAULT_DOMAIN
        }
        web.addJavascriptInterface(Bridge(), "TVNative")

        // Some TVs report the final size only after the page has loaded; refit whenever it changes.
        web.addOnLayoutChangeListener { _, left, top, right, bottom, oldLeft, oldTop, oldRight, oldBottom ->
            if (right - left != oldRight - oldLeft || bottom - top != oldBottom - oldTop) {
                web.evaluateJavascript("window.tvFit && tvFit()", null)
            }
        }

        setContentView(web)
        web.loadUrl("https://${WebViewAssetLoader.DEFAULT_DOMAIN}/assets/index.html")
        web.requestFocus()
    }

    override fun onResume() {
        super.onResume()
        web.evaluateJavascript("window.tvResume && tvResume()", null)
    }

    override fun onDestroy() {
        network.shutdownNow()
        web.destroy()
        super.onDestroy()
    }

    override fun dispatchKeyEvent(event: KeyEvent): Boolean {
        when (event.keyCode) {
            // Back closes the settings panel; on the home screen it sends the app to the background.
            KeyEvent.KEYCODE_BACK -> {
                if (event.action == KeyEvent.ACTION_UP) {
                    web.evaluateJavascript("window.tvBack ? tvBack() : false") { handled ->
                        if (handled != "true") moveTaskToBack(true)
                    }
                }
                return true
            }
            KeyEvent.KEYCODE_MENU -> {
                if (event.action == KeyEvent.ACTION_UP) web.evaluateJavascript("window.tvMenu && tvMenu()", null)
                return true
            }
        }
        return super.dispatchKeyEvent(event)
    }

    private fun resolve(id: Int, ok: Boolean, body: String) {
        runOnUiThread {
            if (!isDestroyed) web.evaluateJavascript("window.__tvResolve($id, $ok, ${JSONObject.quote(body)})", null)
        }
    }

    /** Methods the page calls as window.TVNative.*. They run on a WebView background thread. */
    inner class Bridge {

        /**
         * The app's own TV banner (the image the Fire TV home shows) and icon, as {banner, icon} data URLs.
         * Either may be missing; the page then falls back to a coloured tile.
         */
        @JavascriptInterface
        fun appArt(pkg: String): String {
            val out = JSONObject()
            try {
                val intent = packageManager.getLeanbackLaunchIntentForPackage(pkg)
                    ?: packageManager.getLaunchIntentForPackage(pkg)
                    ?: return out.toString()
                val info = packageManager.resolveActivity(intent, 0)?.activityInfo ?: return out.toString()
                info.loadBanner(packageManager)?.let { out.put("banner", dataUrl(it, 640)) }
                info.loadIcon(packageManager)?.let { out.put("icon", dataUrl(it, 192)) }
            } catch (e: Exception) {
                // Unreadable artwork; the tile keeps its colour and name.
            }
            return out.toString()
        }

        /** Every app with a TV or phone launcher entry, as [{pkg, label}]. */
        @JavascriptInterface
        fun listApps(): String {
            val out = JSONArray()
            val seen = HashSet<String>()
            for (category in listOf(Intent.CATEGORY_LEANBACK_LAUNCHER, Intent.CATEGORY_LAUNCHER)) {
                val query = Intent(Intent.ACTION_MAIN).addCategory(category)
                for (info in packageManager.queryIntentActivities(query, 0)) {
                    val pkg = info.activityInfo.packageName
                    if (pkg == packageName || !seen.add(pkg)) continue
                    out.put(JSONObject().put("pkg", pkg).put("label", info.loadLabel(packageManager).toString()))
                }
            }
            return out.toString()
        }

        @JavascriptInterface
        fun launch(pkg: String): Boolean {
            val intent = packageManager.getLeanbackLaunchIntentForPackage(pkg)
                ?: packageManager.getLaunchIntentForPackage(pkg)
                ?: return false
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            runOnUiThread {
                try {
                    startActivity(intent)
                } catch (e: ActivityNotFoundException) {
                    // App vanished between listing and launching; nothing to open.
                }
            }
            return true
        }

        /** Opens the Amazon Appstore search for an app that isn't installed. */
        @JavascriptInterface
        fun openStore(name: String) {
            val query = Uri.encode(name)
            runOnUiThread {
                for (uri in listOf("amzn://apps/android?s=$query", "market://search?q=$query")) {
                    try {
                        startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(uri)).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
                        return@runOnUiThread
                    } catch (e: ActivityNotFoundException) {
                        // Try the next store.
                    }
                }
            }
        }

        /** GETs an http(s) URL off the main thread; the answer arrives through window.__tvResolve(id, ok, text). */
        @JavascriptInterface
        fun fetchText(url: String, id: Int) {
            network.execute {
                try {
                    val target = URL(url)
                    require(target.protocol == "https" || target.protocol == "http") { "unsupported URL" }
                    val conn = target.openConnection() as HttpURLConnection
                    conn.connectTimeout = 15000
                    conn.readTimeout = 20000
                    conn.instanceFollowRedirects = true
                    conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Linux; Android; AFT) SmarTV")
                    try {
                        val code = conn.responseCode
                        if (code !in 200..299) {
                            resolve(id, false, "HTTP $code")
                            return@execute
                        }
                        val bytes = conn.inputStream.use { it.readBytes() }
                        val declared = Regex("charset=([\\w-]+)", RegexOption.IGNORE_CASE)
                            .find(conn.contentType ?: "")?.groupValues?.get(1)
                        val encoding = try {
                            Charset.forName(declared ?: "UTF-8")
                        } catch (e: Exception) {
                            Charsets.UTF_8
                        }
                        resolve(id, true, String(bytes, encoding))
                    } finally {
                        conn.disconnect()
                    }
                } catch (e: Exception) {
                    resolve(id, false, e.toString())
                }
            }
        }

        @JavascriptInterface
        fun getAutoStart(): Boolean = autoStartEnabled(this@MainActivity)

        @JavascriptInterface
        fun setAutoStart(on: Boolean) {
            prefs(this@MainActivity).edit().putBoolean(KEY_AUTOSTART, on).apply()
        }
    }

    /** Draws a drawable at its own size, at most [maxWidth] wide, as a PNG data URL. */
    private fun dataUrl(drawable: Drawable, maxWidth: Int): String {
        val w = if (drawable.intrinsicWidth > 0) drawable.intrinsicWidth else maxWidth
        val h = if (drawable.intrinsicHeight > 0) drawable.intrinsicHeight else maxWidth
        val scale = minOf(1f, maxWidth.toFloat() / w)
        val bitmap = Bitmap.createBitmap((w * scale).toInt().coerceAtLeast(1), (h * scale).toInt().coerceAtLeast(1), Bitmap.Config.ARGB_8888)
        drawable.setBounds(0, 0, bitmap.width, bitmap.height)
        drawable.draw(Canvas(bitmap))
        val png = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, png)
        bitmap.recycle()
        return "data:image/png;base64," + Base64.encodeToString(png.toByteArray(), Base64.NO_WRAP)
    }

    companion object {
        private const val KEY_AUTOSTART = "autostart"

        private fun prefs(context: Context) = context.getSharedPreferences("smartv", Context.MODE_PRIVATE)

        fun autoStartEnabled(context: Context) = prefs(context).getBoolean(KEY_AUTOSTART, false)
    }
}
