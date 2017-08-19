This is a collection of (hopefully useful) classes that can be used in RN projects.

Contents:

 1. [Installation](#installation).
 2. [Package contents](#packageContents).
 3. [Version history](#versionHistory).

## <a id="installation">Installation</a>
    npm i --save react-native-common-utils
If you want to use [native modules](#NativeModules) defined in the package, use the following command afterwards:

    react-native link react-native-common-utils

## <a id="packageContents">Package contents</a>

### <a id="nativeModules">Native modules</a>
**Warning**: Native modules are currently implemented only for Android. I'll implement them for iOS as soon as I learn Swift / Objective-C well enough &#x263a;.
#### ShareData
#### GetPath

### Components
#### ToggleButtons
#### Button
#### MaterialSwitch
#### ProgressBar
### GDrive
These classes facilitate the use of the google drive api.

No authorization is handled by them, so another package has to be used. I use [react-native-google-signin](https://www.npmjs.com/package/react-native-google-signin) (thanks for the great work guys!).

My code uses [react-native-fs](https://www.npmjs.com/package/react-native-fs) (and another thank you goes to its authors!) so please install it if you use `GDrive`.

#### GDrive
#### Files
#### Permissions
### Preferences
#### ArrayPreference
#### NumberPreference
#### Preference
#### Preferences
#### SwitchPreference
### SQLBuilder
An SQL query builder. I was unable to use [knex](http://knexjs.org/) (as far as I understood it `required` packages not available in RN) so I wrote this one.
### AlterStyles
### ArrayStringifier
### ContextMenu
### DateTimePicker
### DottedStringObject
### ListViewHelper
### StaticUtils
### strings
### styles
### utf8

## <a id="versionHistory">Version history</a>
Version number|Changes
-|-
v1.0.1|Readme added.
v1.0.0|Initial release

> Written with [StackEdit](https://stackedit.io/).