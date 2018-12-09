# EBA

- https://play.google.com/apps/testing/io.scriptive.eba/join
- https://scriptive.github.io/eba
https://play.google.com/store/apps/details?id=io.scriptive.eba

# Image `#efefef`
- iOS
  - icon
  - Default 1242x2208
  - Default-1125h 1125x2436
  - Default-Landscape
  - Default-Portrait 1536x2048
  - LaunchScreen-AspectFill
  - LaunchScreen-Center
- Android
  - icon
  - icon
  - icon


# Lai Siangtho
```js
// A thu zui-in khenna
// Sawltak 17:11
// 12th April 2017
// Effortless bible analysis
// Tg. Lian Than Tuang
```


```
tns install
tns doctor
tns platform clean ios
tns platform clean android
```

```
tns build android [--compileSdk <API Level>] [--key-store-path <File Path> --key-store-password <Password> --key-store-alias <Name> --key-store-alias-password <Password>] [--release] [--static-bindings] [--copy-to <File Path>] [--bundle [<value>] [--env.*]] [--aab]

tns build android --key-store-path C:\test\keyStore.jks --key-store-password search --key-store-alias lethil --key-store-alias-password search --release --copy-to C:\serve\eba.release\eba-beta.0.0.3.apk

tns build android --key-store-path assets\keyStore.jks --key-store-password search --key-store-alias lethil --key-store-alias-password search --release --copy-to dist\playStore\eba-beta.0.0.3.apk

tns build android --key-store-path assets/lethil.jks --key-store-password search --key-store-alias lethil --key-store-alias-password search --release --copy-to dist/playStore/eba-beta.0.0.3.apk

tns build android --key-store-path assets/lethil.jks --key-store-password pwd --key-store-alias lethil --key-store-alias-password pwd --release --copy-to dist/playStore/eba-beta.0.0.3.apk

tns build android --release --key-store-path C:/remove/android-key.jks --key-store-password ourpwd --key-store-alias key0 --key-store-alias-password ourpwd
```