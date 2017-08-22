This is a collection of (hopefully useful) classes that can be used in RN projects.

Contents:

 1. [Installation](#installation).
 2. [Package contents](#packageContents).
 3. [Version history](#versionHistory).

## <a id="installation">Installation</a>
Install with:

    npm i --save react-native-common-utils
If you want to use [native modules](#nativeModules) defined in the package, use the following command afterwards:

    react-native link react-native-common-utils

## <a id="packageContents">Package contents</a>

### <a id="nativeModules">Native modules</a>
**Warning**: Native modules are currently implemented only for Android. I'll implement them for iOS as soon as I learn Swift / Objective-C well enough &#x263a;.
#### ShareData
Shares arbitrary data.

    import { ShareData } from "react-native-common-utils";

 - deleteTempFiles()
    Invoke to delete the temp files created internally by the module.
    
        ShareData.deleteTempFiles();
        
 - send(options)
    Share data. This function returns a `Promise`.
    <br>If you specify an attachment, one of `"base64"`, `"path"`, `"uri"` must be specified, otherwise the promise will be rejected with the code `"ERROR_NO_SRC_TO_COPY"`.
    <br>A temp file with the content being sent needs to be created for each attachment. If the directory where a temp file is to be created is unavailable, the promise is rejected with the code `"ERROR_NO_TEMP_FILE_DST"`. If a temp file fails to be created, the promise is rejected with the code `"ERROR_TEMP_FILE_CREATE"`.
    <br>Please, bear in mind that these temp files can't be deleted automatically so consider using `ShareData.deleteTempFiles()`. 
    
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
		        uri: String, // Uri pointing to a file to send as an attachment.
		    }],
		    createChooser: Boolean, // Android only. Whether to use Intent.createChooser(). Default: true.
		    chooserTitle: String // Android only. Title for the chooser. Default: null.
		};
		
        ShareData
	        .send(options)
	        .then(<some code>)
	        .catch(<some code>);

#### GetPath
Gets the path/uri of the specified file.

    import { GetPath } from "react-native-common-utils";

 - get(options)
    This function returns a `Promise`. `"pathType"` must be one of:
    
    Value|Meaning
    -|-
    "DB"|The file is a db file.
    
    The promise is rejected with the code `"Invalid path type"` otherwise.
    
        const options = {
            pathType: String, // The file path type. This parameter must be specified.
            fileName: String, // The file name. Default: "".
            fileExtension: String // The file extension. Default: "".
        };
        
        GetPath
	        .get(options)
	        .then(<some code>)
	        .catch(<some code>);

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
v1.0.5|1.&nbsp;Readme updated.<br>2.&nbsp;Components/Button: arbitrary children supported.
v1.0.2 - v1.0.4|Readme updated.
v1.0.1|Readme added.
v1.0.0|Initial release.
<br><br>
> Written with [StackEdit](https://stackedit.io/).
