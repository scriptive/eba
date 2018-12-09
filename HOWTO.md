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

## Debug

```
tns install
tns doctor
tns platform clean ios
tns platform clean android
```

## Build

```
tns build android [--compileSdk <API Level>] [--key-store-path <File Path> --key-store-password <Password> --key-store-alias <Name> --key-store-alias-password <Password>] [--release] [--static-bindings] [--copy-to <File Path>] [--bundle [<value>] [--env.*]] [--aab]

tns build android --key-store-path assets/lethil.jks --key-store-password search --key-store-alias lethil --key-store-alias-password search --release --copy-to dist/playStore/eba-beta.0.0.4.apk
tns build android --key-store-path assets/lethil.jks --key-store-password search --key-store-alias lethil --key-store-alias-password search --clean --release --copy-to dist/playStore/EBA-beta.0.0.5.apk
```