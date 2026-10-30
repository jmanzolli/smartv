package io.github.jmanzolli.smartv

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

/** Opens the home screen after the TV boots, if "Open when the TV turns on" is switched on. */
class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action != Intent.ACTION_BOOT_COMPLETED) return
        if (!MainActivity.autoStartEnabled(context)) return
        try {
            context.startActivity(
                Intent(context, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            )
        } catch (e: Exception) {
            // Newer Fire OS versions may block starting from the background; the app still opens by hand.
        }
    }
}
