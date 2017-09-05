This is a collection of useful classes that can be used in RN projects.

**Warning**: v2.0.0 introduces backwards-incompatible changes. Please see the [version history](#versionHistory).

 1. <a name="cInstallation">[Installation.](#installation)</a>
 1. <a name="cPackageContents">[Package contents.](#packageContents)</a>
 1. <a name="cVersionHistory">[Version history.](#versionHistory)</a>

## <a name="installation">[Installation<i class="icon-up"></i>](#cInstallation)</a>
Install with:

    npm i --save react-native-common-utils
    
    react-native link react-native-localization
    
[react-native-localization](https://www.npmjs.com/package/react-native-localization) is a package my code depends on and it needs linking.

My code uses `@autobind` so please don't forget to modify your `.babelrc`:

    "plugins": [
        ...
        "transform-decorators-legacy" // <= This line must be added.
    ] 

If you want to use [native modules](#nativeModules) defined in the package, use the following command:

    react-native link react-native-common-utils

## <a name="packageContents">[Package contents<i class="icon-up"></i>](#cPackageContents)</a>

 1. <a name="cNativeModules">[Native modules](#nativeModules)</a>
 1. <a name="cPreferences">[Preferences](#preferences)</a>
 1. AlterStyles
 1. ContextMenu
 1. DateTimePicker
 1. ListViewHelper
 1. StaticUtils
 1. strings
 1. styles
 
### <a name="nativeModules">[Native modules<i class="icon-up"></i>](#cNativeModules)</a>

**Warning**: Native modules are currently implemented only for Android. I'll implement them for iOS as soon as I learn Swift / Objective-C well enough.

 1. <a name="cShareData">[ShareData](#shareData)</a>
 1. <a name="cGetPath">[GetPath](#getPath)</a>

#### <a name="shareData">[ShareData<i class="icon-up"></i>](#cShareData)</a>

Shares arbitrary data.

    import { ShareData } from "react-native-common-utils";

 - [deleteTempFiles()<i class="icon-up"></i>](#shareData)</a>
    
    Invoke to delete the temp files created internally by the module.
    
        ShareData.deleteTempFiles();
        
 - [send()<i class="icon-up"></i>](#shareData)
    
    Shares data returning a `Promise`.
    
    If you specify an attachment, one of `"base64"`, `"path"`, `"uri"` must be specified, otherwise the promise will be rejected with the code `"ERROR_NO_SRC_TO_COPY"`.
    
    A temp file with the content being sent is created for each attachment. If the directory where a temp file is to be created is unavailable, the promise is rejected with the code `"ERROR_NO_TEMP_FILE_DST"`. If a temp file fails to be created, the promise is rejected with the code `"ERROR_TEMP_FILE_CREATE"`.
    
    Please, bear in mind that these temp files can't be deleted automatically so consider using `ShareData.deleteTempFiles()`. 
    
        const options = {
	        mime: String, // One of the mime types. Default: "*/*".
	        to: String / [String], // "to" address(es). Default: undefined.
	        cc: String / [String], // "cc" address(es). Default: undefined.
	        bcc: String / [String], // "bcc" address(es). Default: undefined.
	        subject: String, // The email subject. Default: null.
	        text: String, // The body of the email. Default: undefined.
	        html: String, // The body of the email. Can contain html. Default: undefined.
	        attachments: [{
		        fileName: String, // The name of an attachment, as seen by a recipient of the email. Default: uuid.
		        fileExtension: String, // The extension of an attachment, as seen by a recipient of the email. Default: "".
		        base64: String, // Base64 encoded string with the content of an attachment. Default: undefined.
		        path: String, // Path to a file to send as an attachment. Default: undefined.
		        uri: String, // Uri pointing to a file to send as an attachment. Default: undefined.
		    }],
		    createChooser: Boolean, // Android only. Whether to use Intent.createChooser(). Default: true.
		    chooserTitle: String // Android only. Title for the chooser. Default: null.
		};
		
        ShareData.send(options);

#### <a name="getPath">[GetPath<i class="icon-up"></i>](#cGetPath)</a>

Gets the path/uri of the specified file.

    import { GetPath } from "react-native-common-utils";

 - [get()<i class="icon-up"></i>](#getPath)

    This function returns a `Promise` resolving to the path/uri of the specified file. `"pathType"` must be one of:
    
    Value|Meaning
    -|-
    "DB"|The file is a db file.
    
    The promise is rejected with the code `"Invalid path type"` if `pathType` is invalid.
    
        const options = {
            pathType: String, // The file path type. This parameter must be specified.
            fileName: String, // The file name. Default: "".
            fileExtension: String // The file extension. Default: "".
        };
        
        GetPath.get(options);




### <a name="preferences">[Preferences<i class="icon-up"></i>](#cPreferences)</a>

#### Preference
#### Preferences
#### ArrayPreference
#### NumberPreference
#### SwitchPreference

### AlterStyles
### ContextMenu
### DateTimePicker
### ListViewHelper
### StaticUtils
### strings
### styles

## <a name="versionHistory">[Version history<i class="icon-up"></i>](#cVersionHistory)</a>

Version number|Changes
-|-
v2.0.1|`client-side-common-utils` deprecated; switched to `simple-common-utils`.
v2.0.0|**Backwards-incompatible changes**:<br>1.&nbsp;UI Components moved to [react-native-common-ui-components](https://www.npmjs.com/package/react-native-common-ui-components).<br>2.&nbsp;Google Drive API wrapper moved to [react-native-google-drive-api-wrapper](https://www.npmjs.com/package/react-native-google-drive-api-wrapper).<br>3.&nbsp;SQL query builder moved to [simple-sql-query-builder](https://www.npmjs.com/package/simple-sql-query-builder).<br> 4.&nbsp;`ArrayStringifier`, `DottedStringObject` and `utf8` moved to [client-side-common-utils](https://www.npmjs.com/package/client-side-common-utils).
v1.0.11|1.&nbsp;Readme updated.<br>2.&nbsp;[react-native-extended-stylesheet](https://www.npmjs.com/package/react-native-extended-stylesheet) and [react-native-localization](https://www.npmjs.com/package/react-native-localization) specified as dependencies.
v1.0.6 - v1.0.10|Readme updated.
v1.0.5|1.&nbsp;Readme updated.<br>2.&nbsp;Components/Button: arbitrary children supported.
v1.0.2 - v1.0.4|Readme updated.
v1.0.1|Readme added.
v1.0.0|Initial release.
<br><br>
> Written with [StackEdit](https://stackedit.io/).
