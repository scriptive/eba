# Version

```
tns build android --key-store-path assets/lethil.jks --key-store-password search --key-store-alias lethil --key-store-alias-password search --clean --release --copy-to dist/playStore/EBA-beta.0.0.9.apk
```


# 0.0.9
- seperated SQLite into each Books
  - improve
    - performance
    - UI
- add
  - icon
  - each section count
  - swipe Option
  - TextView at category
- ability to remove/add each books
- ability to copy topics

# 0.0.8
- integrating SQLite,
  - seem much faster in performance
  - more flexible
  - offline available
- fix
  - back button that occur when there is no history
- add
  - section available topics count
  - numeric convert to each language
- note
  - as of testing propose, up to 5 topics are removed randomly

# 0.0.7
- section
  - Alphabetical order & grouping
- `setTimeout` to 50
  - section
  - category
- improve
  - layout
  - UI
    - rendering
    - fontSize: 18
- add
  - FormattedString in category

# 0.0.6
- improve
  - UI
    - layout and rendering
    - fontSize: 19
    - fontWeight: 300
- add
  - ActivityIndicator
    - section & category

# 0.0.4
- add
  - pull to refresh to book
  - load on demand to section and category


# 0.0.3
- improve
  - UI
    - fontColor
    - fontSize
- remove
  - mock
  - assets

# 0.0.1/2
- initial release
