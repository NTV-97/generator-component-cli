# GorillaDesk

**Design**

- https://zpl.io/2G0OLy4
- https://overflow.io/s/NZZAY2?node=207e76c5
- https://overflow.io/s/NZZAY2?node=9ac91282
- https://overflow.io/s/NZZAY2?node=68c25a21

**Web App**

- https://dev.gdesk.io/auth/login
- Login: nlsoft / gorilla1

**Install app** 1. npm install (install react-native-mapbox maybe take a long time) 2. react-native link 3. cd ios && pod install 4. react-native run-ios 5. If cannot run please delete exist project and clone again \* Note 1. Params.js: include keys, configs, ... of middleware module 2. constants folder: include font, image, colors, value constants, ... in app

**Build App Release** 1. ./gradlew clean 2. ./gradlew assembleRelease 3. react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

**Fetch data**
We use redux saga for fetching data. Step setting fetch API
Should create name folder, action, reducer, store depend on URL API so we can manage all fetch API easier
Ex: v1/auth/login ->

- -----redux
- -------actions
- --------fetchData
- -----------auth (create name depend on URL)
- --------------FetchLoginAction.js (Create name depend on URL)

1.  Create action call fetch data in folder "@redux/actions"

- Action must have 3 param

* params: params send with url to call API
* resolve: pass function here. If API return success this function in screen will call
* reject: If API return failed this function in screen will call

2.  Create reducer. Define init state have 3 field:

- data: data return from API
- fetching: for showing Loading
- error: will return error message if call API failed

3.  Create Sagas. Call fetch API function in here

- About Sketching feature
  React native team is working on this feature. Maybe they will return soon.
  https://github.com/react-native-community/discussions-and-proposals/issues/4

- Code Push already config in project.
  Install Appcenter Microsoft for setting in local computer and set token in project
- Library in app

  1.  react-native-elements : checkbox, icon, badge, ...
  2.  react-native-firebase: push notification intercom
  3.  react-native-view-overflow: use for component TextInputHandleWarning to set warning icon overflow
  4.  react-native-responsive-screen: scale width and height components to fit all screen sizes
  5.  react-native-vector-icon: install for using react-native-elements
  6.  react-native-gesture-handler: install for using react-navigation
  7.  native-switch-toggle: use for toggle button in Calendar screen
  8.  @react-native-community/netinfo: use for define online/offline
  9.  @react-native-mapbox-gl/maps: use for mapbox
  10. react-native-code-push: code push ( Microsoft)
  11. react-native-device-info: get user's OS and device namereact-native-linear-gradient
  12. react-native-elements: display checkBox
  13. react-native-file-viewer & react-native-fs & react-native-image-crop-picker: get image from device, open PDF file
  14. react-native-firebase: use for push notification
  15. react-native-gesture-handler: define when user swipe to open side menu
  16. react-native-i18n: multiple language feature
  17. react-native-intercom: plugin intercom
  18. react-native-linear-gradient: display background color
  19. react-native-modal: show popup job, menu
  20. react-native-orientation-locker: define when user rotate phone
  21. react-native-reanimated: set animation when navigate screen
  22. react-native-signature-pad: display signature
  23. react-native-splash-screen: display splash screen
  24. react-native-svg & react-native-svg-transformer: display icon in app
  25. react-navigation-animated-switch: naviagte screen
  26. redux-mock-store: mock store redux to apply unit test

# Steps to add Square SDK:

```
yarn install or npm install
yarn pod or npm pod
```

## Android configuration

### Open project in Android Studio. Choose Build => Rebuild Project:

- If an error at the Build tab in Android Studio:

  ```
  Execution failed for task ':app:checkDebugDuplicateClasses'.
  1 exception was raised by workers:
  java.lang.RuntimeException: Duplicate class com.nimbusds.jose.JWEObject found in modules jetified-threedssdk-release-1.1.17-runtime.jar (com.nds.threeds:threedssdk-release:1.1.17) and nimbus-jose-jwt-5.1.jar (com.nimbusds:nimbus-jose-jwt:5.1)
  ```

  ### You can fix:

  - In ./node_modules/react-native-square-in-app-payments/android/build.gradle
    Replace line:

    ```
    implementation "com.squareup.sdk.in-app-payments:buyer-verification:\$sqipVersion"
    ```

    With:

    ```
    compile ("com.squareup.sdk.in-app-payments:buyer-verification:\$sqipVersion") {
      exclude group: 'com.nds.threeds', module: 'threedssdk-release'
    }
    ```

## IOS configuration

### Make sure you have **`cocoapods`** version greater than 1.7.0

### if you cant's run ios:

1. Open **Podfile**, find line: **platform :ios**

- If `platform :ios, '9.0'` you change this to: `platform :ios, '11.0'`

2. Open **GorillaDesk.xcworkspace** in folder _ios_. Choose **`Product => Build`**

- Set the **iOS Deployment Target** to _11.0_ or above
- Add an In-App Payments SDK build phase:
  - Open the Xcode project for your application.
  - In the **Build Phases** tab for your application target, click the + button at the top of the pane.
  - Select **New Run Script Phase**.
  - Paste the following into the editor panel of the new run script:
    ```
    FRAMEWORKS="${BUILT_PRODUCTS_DIR}/${FRAMEWORKS_FOLDER_PATH}"
    "\${FRAMEWORKS}/SquareInAppPaymentsSDK.framework/setup"
    ```
- In the left menu Xcode:
  - Find **Pods** folder and delete it
  - Now in terminal, go into your project dir, cd into ios and do `rm -rf Pods Podfile.lock`
  - Do `pod install`

# BugSnag

**BugSnag: Error monitoring** `https://app.bugsnag.com/accounts/nls/projects/gorilladesk-dev/integrate` `(dev@namlongsoft.net / nlsdev.2020)`

1. Add the Bugsnag package: npm install --save @bugsnag/react-native **#or** yarn add @bugsnag/react-native
2. Link:

- Android: add following line to _android/app/build.gradle_

`apply from: "../../node_modules/@bugsnag/react-native/bugsnag-react-native.gradle"`

- iOS: run `cd ios/ && pod install` **#or** `yarn pod`

**#configuration**:

Android:

- Add API_KEY into `<application>` tag in `src/main/AndroidManifest.xml`

`<meta-data android:name="com.bugsnag.android.API_KEY" android:value="your-api-key-here"/>`

- Add `Bugsnag.start(this)` in `onCreate()` callback in `MainApplication.java` (`import com.bugsnag.android.Bugsnag`)

iOS:

- Add to `Info.plist`:

`<key>bugsnag</key> <dict> <key>apiKey</key> <string>YOUR-API-KEY</string> </dict>`

- Add to `AppDelegate.m`, `application:didFinishLaunchingWithOptions:` method:

`import Bugsnag`

`...`

`Bugsnag.start()`

# Install and configuration lib react-native-background-geolocation

### Using yarn

````

yarn add react-native-background-geolocation react-native-background-fetch

```

### Using npm

```

npm install react-native-background-geolocation react-native-background-fetch --save

````

## Android configuration

### `android/build.gradle`

```diff
buildscript {
    ext {
+       googlePlayServicesLocationVersion = "16.0.0"
        buildToolsVersion = "28.0.3"
        minSdkVersion = 16
        compileSdkVersion = 28
        targetSdkVersion = 28
        supportLibVersion = "28.0.0"
    }
    .
    .
    .
}

allprojects {
    repositories {
        mavenLocal()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url("$rootDir/../node_modules/react-native/android")
        }
        maven {
            // Android JSC is installed from npm
            url("$rootDir/../node_modules/jsc-android/dist")
        }
+       maven {
+           // Required for react-native-background-geolocation
+           url("${project(':react-native-background-geolocation').projectDir}/libs")
+       }
+       maven {
+           // Required for react-native-background-fetch
+           url("${project(':react-native-background-fetch').projectDir}/libs")
+       }
+    }
}
```

### `android/app/build.gradle`

```diff
apply from: "../../node_modules/react-native/react.gradle"
+Project background_geolocation = project(':react-native-background-geolocation')
+apply from: "${background_geolocation.projectDir}/app.gradle"
```

## IOS configuration

### `pod install`

```
cd ios
pod install
```

### XCode Configuration

- Edit Info.plist. The plugin adds default values for the following plist elements. You will need to change these values as desired.
  | Key | Value | Description |
  | :--- | :--- | :--- |
  | Privacy - LocationAlwaysUsageDescription | This app requires background tracking | Deprecated in iOS 11 The value here will be presented to the user when the plugin requests Background Location permission |
  | Privacy - LocationAlwaysAndWhenInUseUsageDescription | This app requires background tracking | New for iOS 11 The value here will be presented to the user when the plugin requests Background Location permission |
  | Privacy - MotionUsageDescription | Accelerometer use increases battery efficiency by intelligently toggling location-tracking | The value here will be presented to the user when the app requests Motion Activity permission. |

Add the key "Permitted background task scheduler identifiers", and add the required identifier com.transistorsoft.fetch
![](https://dl.dropboxusercontent.com/s/t5xfgah2gghqtws/ios-setup-permitted-identifiers.png?dl=1)
![](https://dl.dropboxusercontent.com/s/kwdio2rr256d852/ios-setup-permitted-identifiers-add.png?dl=1)

### Configure Background Capabilities

- Select the root of your project. Select **Capabilities** tab. Enable **Background Modes** and enable the following mode:
- [x] Background fetch
- [x] Background processing (:new: **iOS 13+**; Only if you intend to use `BackgroundFetch.scheduleTask`)
      ![](https://dl.dropboxusercontent.com/s/9vik5kxoklk63ob/ios-setup-background-modes.png?dl=1)

### `AppDelegate.m` (:new: **iOS 13+**)

The [**`BGTaskScheduler`**](https://developer.apple.com/documentation/backgroundtasks/bgtaskscheduler?language=objc) API introduced in iOS 13 requires special setup:

```diff
#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

// IMPORTANT:  Paste import ABOVE the DEBUG macro
+#import <TSBackgroundFetch/TSBackgroundFetch.h>

#if DEBUG
.
. ///////////////////////////////////////////////////////////////////////////////////
. // IMPORTANT:  DO NOT paste import within DEBUG macro or archiving will fail!!!
. ///////////////////////////////////////////////////////////////////////////////////
.
#endif

@implementation AppDelegate

(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  .
  .
  .
+ // [REQUIRED] Register BackgroundFetch
+ [[TSBackgroundFetch sharedInstance] didFinishLaunching];

  return YES;
}
```
