plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "io.github.jmanzolli.smartv"
    compileSdk = 35

    defaultConfig {
        applicationId = "io.github.jmanzolli.smartv"
        minSdk = 22 // Fire OS 5
        targetSdk = 35
        // CI passes the run number so every build installs over the previous one.
        versionCode = (System.getenv("VERSION_CODE") ?: "1").toInt()
        versionName = "1.0.$versionCode"
    }

    // The UI is the web/ folder at the repo root, served from the APK's assets.
    sourceSets["main"].assets.srcDirs("../../web")

    signingConfigs {
        // A fixed key, committed on purpose, so a new APK can install over the old one
        // without wiping the saved settings. See README for the trade-off.
        create("sideload") {
            storeFile = file("smartv.keystore")
            storePassword = "smartv-sideload"
            keyAlias = "smartv"
            keyPassword = "smartv-sideload"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("sideload")
        }
        debug {
            signingConfig = signingConfigs.getByName("sideload")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("androidx.webkit:webkit:1.12.1")
}
