﻿This is a collection of useful classes for RN projects.

 1. <a name="cinstallation"></a>[Installation.](#installation)
 1. <a name="cpackagecontents"></a>[Package contents.](#packagecontents)
 1. <a name="cversionhistory"></a>[Version history.](#versionhistory)

## <a name="installation"></a>[Installation<i class="icon-up"></i>](#cinstallation)
Install with:

    npm i react-native-common-utils

**For RN < 0.60**:

    react-native link react-native-common-utils
needs to be executed, if you want to use the [native modules](#nativemodules) defined in my package.

## <a name="packagecontents"></a>[Package contents<i class="icon-up"></i>](#cpackagecontents)

 1. ApplicationSession (**deprecated**)
 2. ApplicationSession2
 3. EventHandlingHelper
 4. NativeEventEmitterWrapper
 5. <a name="cnativemodules"></a>[Native modules](#nativemodules)
 6. <a name="cstaticutils"></a>[StaticUtils](#staticutils)

### <a name="nativemodules"></a>[Native modules<i class="icon-up"></i>](#cnativemodules)

**Warning**: These native modules are currently implemented only for Android. I'll implement them for iOS once&mldr; I hope&mldr;

 1. <a name="csharedata"></a>[ShareData](#sharedata)
 1. <a name="cgetpath"></a>[GetPath](#getpath)

#### <a name="sharedata"></a>[ShareData<i class="icon-up"></i>](#csharedata)

Shares arbitrary data.

    import { ShareData } from "react-native-common-utils";

 - [deleteTempFiles()<i class="icon-up"></i>](#sharedata)
    
    Invoke to delete the temp files created internally by the module.
    
        ShareData.deleteTempFiles();
        
 - [send()<i class="icon-up"></i>](#sharedata)
    
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

#### <a name="getpath"></a>[GetPath<i class="icon-up"></i>](#cgetpath)

Gets the path/uri of the specified file.

    import { GetPath } from "react-native-common-utils";

 - [get()<i class="icon-up"></i>](#getpath)

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

### <a name="staticutils"></a>[StaticUtils<i class="icon-up"></i>](#cstaticutils)

A collection of different `static` utility methods extending [StaticUtils](https://www.npmjs.com/package/simple-common-utils#staticutils) from [simple-common-utils](https://www.npmjs.com/package/simple-common-utils).

    import { StaticUtils } from "react-native-common-utils";

 - getLocaleId()

    Gets the current locale id.

        StaticUtils.getLocaleId(); // GB

 - isAndroid()

	Returns `true` if the app is running on Android, `false` otherwise.

 - isIOS()

	Return `true` if the app is running on iOS, `false` otherwise.

 - spinkitColor()

    Taking an RGBA value, returns a string of the form `#rrggbb` (as [react-native-spinkit](https://www.npmjs.com/package/react-native-spinkit) recognizes).

        StaticUtils.spinkitColor(10); // #000000
        StaticUtils.spinkitColor(0xFF487210); // #ff4872

## <a name="versionhistory"></a>[Version history<i class="icon-up"></i>](#cversionhistory)

Version number|Changes
-|-
v8.3.0|`ApplicationSession2` added.
v8.2.0|`StaticUtils.isIOS()` added.
v8.1.0|`StaticUtils.isAndroid()` added.
v8.0.0|1. Many modules [removed](#packagecontents).<br>2. The package depends only on [simple-common-utils@^2.2.0](https://www.npmjs.com/package/simple-common-utils).
v7.2.1|`@react-native-community` -> `@react-native-async-storage` for `async-storage`
v7.2.0|`EventHandlingHelper.invokeListeners()`: all the arguments are passed to inner listeners, not only `data`.
v7.1.1|1. `AsyncStorage` wasn't imported as a default object.<br>2. `@react-native-community/async-storage` is made a peer dependency.
v7.1.0|`AsyncStorage` imported from `@react-native-community/async-storage`.
v7.0.1|`react-native-localization` moved to `peerDependencies`.
v7.0.0|**Backwards-incompatible changes**:<br>1. `ListViewHelper` / `styles.listView` removed.<br>2. `AlterStyles` removed.<br>3. `core-decorators` and `@autobind` are no longer used.
v6.0.1|1.&nbsp;`AlterStyles` deprecated in favour of `combineStyles()` from `react-native-common-ui-components/js/styles.js`.<br>2.&nbsp;`@babel/plugin-proposal-decorators` is specified as a dev dependency and the postinstall script is deleted.
v6.0.0|1.&nbsp;The latest version of [react-native-localization](https://www.npmjs.com/package/react-native-localization) is specified in `package.json`.<br>2.&nbsp;**Backwards-incompatible change** in `strings.js`: `strings.formatString()` is no longer available if a sub-object name was specified. `strings.all.formatString()` has to be used instead.
v5.1.0|1.&nbsp;An iOS-only bug fixed in `ApplicationSession.manage()`.<br>2.&nbsp;State changes can be optionally logged to the console. An argument`ApplicationSession._setSessionType()`
v5.0.0|**Backwards-incompatible change**: `styles.screen` is superseded by `styles.screen.container`.
v4.1.0|1.&nbsp;`ApplicationSession` added.<br>2.&nbsp;`styles.screen` added.
v4.0.0|**Backwards-incompatible change**: `babel-plugin-transform-decorators-legacy` is removed from dependencies to allow for Babel 7 usage. End user instructions are given through the postinstall event.
v3.3.1|`Preferences.Data`.
v3.2.1|&nbsp;
v3.2.0|Added the `JSONPreference` class to store JSON objects as strings.
v3.1.0|&nbsp;
v3.0.0|1.&nbsp;**Backwards-incompatible change**: when using [react-native-common-ui-components](https://npmjs.com/package/react-native-common-ui-components), [styles](#styles) must be imported from `react-native-common-ui-components/js/styles`.<br>2.&nbsp;`AlterStyles.combineEx()` added.<br>3.&nbsp;Readme updated.
v2.1.1|Readme updated.
v2.1.0|1.&nbsp;Readme updated.<br>2.&nbsp;`ListViewHelper.setEmptyItemsRenderer()` is added.
v2.0.2|Invalid imports fixed.
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
