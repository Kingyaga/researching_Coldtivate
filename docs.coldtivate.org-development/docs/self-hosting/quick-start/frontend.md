# React Native App Build Guide

This guide covers how to build a release version of a React Native application for both Android and iOS.

## Prerequisites

To get started, you'll need the following tools and software:

**Core Requirements:**

* **Node.js:** Version 18 or later. [Download from nodejs.org](https://nodejs.org/){:target="_blank"}
* **Yarn:** Version 1.22.22 (recommended). [Download from yarnpkg.com](https://yarnpkg.com/getting-started/install){:target="_blank"}
* **React Native CLI:** Follow the official setup guide. [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment){:target="_blank"}

**Platform-Specific Requirements:**

* **Android Development:**
    * **Android Studio:** [Download from developer.android.com](https://developer.android.com/studio){:target="_blank"}
    * **OpenJDK:** Java 17 (LTS). [Download Zulu OpenJDK](https://www.azul.com/downloads/?package=jdk#zulu){:target="_blank"} (Recommended)
* **iOS Development (macOS only):**
    * **Xcode:** [Download from the Mac App Store](https://developer.apple.com/xcode/){:target="_blank"}
    * **CocoaPods:** Version 1.16.2. Installation instructions: [CocoaPods Getting Started](https://guides.cocoapods.org/using/getting-started.html){:target="_blank"}

## Android: Building a Release APK

### 1. Generating a Signed APK

#### Step 1: Generate a Keystore File
Run the following command to generate a keystore:
```sh
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
Store this file securely and take note of the password, alias, and keystore location.

#### Step 2: Configure Gradle for Signing
Edit `android/app/build.gradle` and add:
```gradle
android {
    signingConfigs {
        release {
            storeFile file("my-release-key.keystore")
            storePassword "your-store-password"
            keyAlias "your-key-alias"
            keyPassword "your-key-password"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```
**Important:** Never commit your keystore or passwords to version control. Consider using environment variables or `gradle.properties` for sensitive information.

#### Step 3: Build the Release APK
To generate an APK:
```sh
cd android
./gradlew assembleRelease
```
Find the output in `android/app/build/outputs/apk/release/`.

Transfer the APK to your device and install it manually.

## iOS: Building a Release IPA

### 1. Setting Up Xcode Project
Ensure dependencies are installed:
```sh
cd ios
pod install
```
Open `ios/MyApp.xcworkspace` in Xcode.

### 2. Configure Release Scheme

- In Xcode, go to **Product > Scheme > Edit Scheme**.
- Select **Release** under Build Configuration.

### 3. Code Signing and Provisioning

- In **Xcode > Signing & Capabilities**, select your Apple Developer account.
- Create an **App ID** and **Provisioning Profile** in [Apple Developer](https://developer.apple.com/account/){:target="_blank"}.

### 4. Build the iOS App for a Physical Device
To build for a physical device:
```sh
npx react-native run-ios --configuration Release
```

### 5. Export IPA for Manual Installation

1. In Xcode, go to **Product > Archive**.
2. Once built, select **Distribute App** > **Ad Hoc** or **Development**.
3. Export the IPA and install it using Finder or third-party tools like **Apple Configurator 2**.

## Conclusion
This guide provides an overview of building a release version of a React Native app for local installation on Android and iOS devices.
