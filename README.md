This is a collection of (hopefully useful) classes that can be used in RN projects.

 1. <a id="cInstallation">[Installation.](#installation)</a>
 1. <a id="cPackageContents">[Package contents.](#packageContents)</a>
 1. <a id="cVersionHistory">[Version history.](#versionHistory)</a>

## <a id="installation">[Installation<i class="icon-up"></i>](#cInstallation)</a>
Install with:

    npm i --save react-native-common-utils
If you want to use [native modules](#nativeModules) defined in the package, use the following command afterwards:

    react-native link react-native-common-utils

## <a id="packageContents">[Package contents<i class="icon-up"></i>](#cPackageContents)</a>

 1. <a id="cNativeModules">[Native modules](#nativeModules)</a>
 1. <a id="cUIComponents">[UI components](#uiComponents)</a>
 1. <a id="cgdrive">[Google Drive API wrapper](#gdrive)</a>
 1. <a id="cPreferences">[Preferences](#preferences)</a>
 1. <a id="csqlbuilder">[SQLBuilder](#sqlbuilder)
 1. AlterStyles
 1. ArrayStringifier
 1. ContextMenu
 1. DateTimePicker
 1. DottedStringObject
 1. ListViewHelper
 1. StaticUtils
 1. strings
 1. styles
 1. utf8
 
### <a id="nativeModules">[Native modules<i class="icon-up"></i>](#cNativeModules)</a>

**Warning**: Native modules are currently implemented only for Android. I'll implement them for iOS as soon as I learn Swift / Objective-C well enough &#x263a;.

 1. <a id="cShareData">[ShareData](#shareData)</a>
 1. <a id="cGetPath">[GetPath](#getPath)</a>

#### <a id="shareData">[ShareData<i class="icon-up"></i>](#cShareData)</a>

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

#### <a id="getPath">[GetPath<i class="icon-up"></i>](#cGetPath)</a>

Gets the path/uri of the specified file.

    import { GetPath } from "react-native-common-utils";

 - [get()<i class="icon-up"></i>](#getPath)</a>
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

### <a id="uiComponents">[UI components<i class="icon-up"></i>](#cUIComponents)</a>
#### ToggleButtons
#### Button
#### MaterialSwitch
#### ProgressBar

### <a id="gdrive">[Google Drive API Wrapper<i class="icon-up"></i>](#cgdrive)</a>

These wrapper facilitates the use of the [google drive api](https://developers.google.com/drive/v3/reference/). 

It doesn't provide any authorization mechanism, so another package has to be used. I use [react-native-google-signin](https://www.npmjs.com/package/react-native-google-signin) (thanks for the great work guys!).

My code uses [react-native-fs](https://www.npmjs.com/package/react-native-fs) (and another thank you goes to its authors!) so please don't forget to install it: it won't be installed automatically.

 1. <a id="cgdrive2">[GDrive](#gdrive2)</a>
 1. <a id="cgdriveFiles">[Files](#gdriveFiles)</a>
 1. <a id="cgdrivePermissions">[Permissions](#gdrivePermissions)</a>

#### <a id="gdrive2">[GDrive<i class="icon-up"></i>](#cgdrive2)</a>
This is the "entry point" of the wrapper. It contains only `static` methods.

    import GDrive from "react-native-common-utils/js/gdrive/GDrive";

 - [setAccessToken()<i class="icon-up"></i>](#gdrive2)
    
    Sets the access token for use in subsequent calls to the api. Get the token from a package you choose to use.
    
        GDrive.setAccessToken(accessToken);
    
 - [init()<i class="icon-up"></i>](#gdrive2)
    
    Initializes the wrapper.
    
        GDrive.init();
    
    or
    
	    const params = {
	        files: {
		        boundary: String // The boundary string for multipart file uploads. Default: "foo_bar_baz".
	        }
	    };
        
        GDrive.init(params);
    
 - [isInitialized()<i class="icon-up"></i>](#cgdrive2)
    
    Returns `true` if an access token has been supplied, `false` otherwise.
    
        GDrive.isInitialized() ? <some code> : <some other code>;

#### <a id="gdriveFiles">[Files<i class="icon-up"></i>](#cgdriveFiles)</a>

 - [createFileMultipart()<i class="icon-up"></i>](#gdriveFiles)
    
    Creates a file using [multipart upload](https://developers.google.com/drive/v3/web/manage-uploads). Returns the result of `fetch()`.
    
        const contents = "My text file contents";
        // or
        const contents = [10, 20, 30];
        
        GDrive.files.createFileMultipart(
            contents ,
            "corresponding mime type", {
	            parents: ["root"],
	            name: "My file"
            });
            
 - [delete()<i class="icon-up"></i>](#gdriveFiles)
    
    [Deletes](https://developers.google.com/drive/v3/reference/files/delete) the specified file returning the result of `fetch()`.
    
	    GDrive.files.delete(fileId);

 - [get()<i class="icon-up"></i>](#gdriveFiles)
	
    Gets the content of the specified **text** file returning the result of `fetch()` (use `download()` for binary files). For `queryParams` see "Optional query parameters" [here](https://developers.google.com/drive/v3/reference/files/get).
	
		GDrive.files.get(fileId, { ... });
		
 - [download()<i class="icon-up"></i>](#gdriveFiles)
	
	Downloads the specified text or binary file.
	
	For `downloadFileOptions` see the description of`downloadFile()` [here](https://www.npmjs.com/package/react-native-fs). Please, bear in mind that `fromUrl` is set automatically and any user supplied value will be overwritten.
	
	The meaning of `queryParams` is the same as in `get()`.
	
	The function returns the result of `RNFS.downloadFile(downloadFileOptions)`.
		
		GDrive.files.download(fileId, downloadFileOptions, queryParams);
		
 - [getId()<i class="icon-up"></i>](#gdriveFiles)

	Gets the id of the first file with the specified metadata. The function returns a `Promise`. It's rejected on failure and resolved to the file id or `undefined` (if nothing is found) on success.
	
		GDrive.files.getId(
			name: String, // The name.
			parents: [String], // The parents.
			mimeType: String, // The mime type.
			trashed: Boolean // Whether the file is trashed. Default: false
		);
		
 - [list()<i class="icon-up"></i>](#gdriveFiles)
	
	[Lists or searches files](https://developers.google.com/drive/v3/reference/files/list) returning the result of `fetch()`.
	
		GDrive.files.list({q: "'root' in parents"});
	
 - [safeCreateFolder()<i class="icon-up"></i>](#gdriveFiles)
	
	Creates a folder with the specified `name` and `parents` if it doesn't exist. Then the function returns a `Promise`, that is resolved to the folder id on success and is rejected on failure.
	
		GDrive.files.safeCreateFolder({
			name: "My folder",
			parents: ["root"]
		});

#### <a id="gdrivePermissions">[Permissions<i class="icon-up"></i>](#cgdrivePermissions)</a>

### <a id="preferences">[Preferences<i class="icon-up"></i>](#cPreferences)</a>

#### ArrayPreference
#### NumberPreference
#### Preference
#### Preferences
#### SwitchPreference

### <a id="sqlbuilder">[SQLBuilder<i class="icon-up"></i>](#csqlbuilder)</a>
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

## <a id="versionHistory">[Version history<i class="icon-up"></i>](#cVersionHistory)</a>
Version number|Changes
-|-
v1.0.6 - v1.0.8|Readme updated.
v1.0.5|1.&nbsp;Readme updated.<br>2.&nbsp;Components/Button: arbitrary children supported.
v1.0.2 - v1.0.4|Readme updated.
v1.0.1|Readme added.
v1.0.0|Initial release.
<br><br>
> Written with [StackEdit](https://stackedit.io/).
