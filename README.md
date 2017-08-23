This is a collection of (hopefully useful) classes that can be used in RN projects.

 1. <a id="cInstallation">[Installation.](#installation)</a>
 2. <a id="cPackageContents">[Package contents.](#packageContents)</a>
 3. <a id="cVersionHistory">[Version history.](#versionHistory)</a>

## <a id="installation">[Installation<i class="icon-up"></i>](#cInstallation)</a>
Install with:

    npm i --save react-native-common-utils
If you want to use [native modules](#nativeModules) defined in the package, use the following command afterwards:

    react-native link react-native-common-utils

## <a id="packageContents">[Package contents<i class="icon-up"></i>](#cPackageContents)</a>

 1. <a id="cNativeModules">[Native modules](#nativeModules)</a>
	 2. <a id="cShareData">[ShareData](#shareData)</a>
		 2. <a id="cShareDataDeleteTempFiles">[deleteTempFiles()](#shareDataDeleteTempFiles)</a>
		 3. <a id="cShareDataSend">[send()](#shareDataSend)</a>
	 4. <a id="cGetPath">[GetPath](#getPath)</a>
		 5. <a id="cGetPathGet">[get()](#getPathGet)</a>
 6. <a id="cUIComponents">[UI components](#uiComponents)</a>
 7. <a id="cgdrive">[Google Drive API wrapper](#gdrive)</a>
	 8. <a id="cgdrive2">[GDrive](#gdrive2)</a>
		 9. <a id="cgdrive2SetAccessToken">[setAccessToken()](#gdrive2SetAccessToken)</a>
		 10. <a id="cgdrive2Init">[init()](#gdrive2Init)</a>
		 11. <a id="cgdrive2IsInitialized">[isInitialized()](#gdrive2IsInitialized)</a>
	 12. <a id="cgdriveFiles">[Files](#gdriveFiles)</a>
		 13. <a id="cgdriveFilesCreateFileMultipart">[createFileMultipart()](#gdriveFilesCreateFileMultipart)</a>
		 14. <a id="cgdriveFilesDelete">[delete()](#gdriveFilesDelete)</a>
		 15. <a id="cgdriveFilesGet">[get()](#gdriveFilesGet)</a>
		 16. <a id="cgdriveFilesDownload">[download()](#gdriveFilesDownload)</a>
		 5. <a id="cgdriveFilesGetId">[getId()](#gdriveFilesGetId)</a>
		 6. <a id="cgdriveFilesList">[list()](#gdriveFilesList)</a>
		 7. <a id="cgdriveFilesSafeCreateFolder">[safeCreateFolder()](#gdriveFilesSafeCreateFolder)</a>
	 8. <a id="cgdrivePermissions">[Permissions](#gdrivePermissions)</a>

### <a id="nativeModules">[Native modules<i class="icon-up"></i>](#cNativeModules)</a>

**Warning**: Native modules are currently implemented only for Android. I'll implement them for iOS as soon as I learn Swift / Objective-C well enough &#x263a;.

#### <a id="shareData">[ShareData<i class="icon-up"></i>](#cShareData)</a>

Shares arbitrary data.

    import { ShareData } from "react-native-common-utils";

 - <a id="shareDataDeleteTempFiles">[deleteTempFiles()<i class="icon-up"></a>](#cShareDataDeleteTempFiles)</a>
    
    Invoke to delete the temp files created internally by the module.
    
        ShareData.deleteTempFiles();
        
 - <a id="shareDataSend">[send()<i class="icon-up"></i>](#cShareDataSend)</a>
    
    Shares data. This function returns a `Promise`.
    
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

 - <a id="getPathGet">[get()<i class="icon-up"></i>](#cGetPathGet)</a>
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

#### <a id="gdrive2">[GDrive<i class="icon-up"></i>](#cgdrive2)</a>
This is the "entry point" of the wrapper. It contains only `static` methods.

    import GDrive from "react-native-common-utils/js/gdrive/GDrive";

 - <a id="gdrive2SetAccessToken">[setAccessToken()<i class="icon-up"></i>](#cgdrive2SetAccessToken)</a>
    
    Sets the access token for use in subsequent calls to the api. Get the token from a package you choose to use.
    
        GDrive.setAccessToken(accessToken);
    
 - <a id="gdrive2Init">[init()<i class="icon-up"></i>](#cgdrive2Init)</a>
    
    Initializes the wrapper.
    
        GDrive.init();
    
    or
    
	    const params = {
	        files: {
		        boundary: String // The boundary string for multipart file uploads. Default: "foo_bar_baz".
	        }
	    };
        
        GDrive.init(params);
    
 - <a id="gdrive2IsInitialized">[isInitialized()<i class="icon-up"></i>](#cgdrive2IsInitialized)</a>
    
    Determines whether an access token has been supplied.
    
        GDrive.isInitialized() ? <some code> : <some other code>;

#### <a id="gdriveFiles">[Files<i class="icon-up"></i>](#cgdriveFiles)</a>

 - <a id="gdriveFilesCreateFileMultipart">[createFileMultipart()<i class="icon-up"></i>](#cgdriveFilesCreateFileMultipart)</a>
    
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
            
 - <a id="gdriveFilesDelete">[delete()<i class="icon-up"></i>](#cgdriveFilesDelete)</a>
    
    [Deletes](https://developers.google.com/drive/v3/reference/files/delete) the specified file returning the result of `fetch()`.
    
	    GDrive.files.delete(fileId);

 - <a id="gdriveFilesGet">[get()<i class="icon-up"></i>](#cgdriveFilesGet)</a>
	
    Gets the content of the specified **text** file returning the result of `fetch()`. For `queryParams` see "Optional query parameters" [here](https://developers.google.com/drive/v3/reference/files/get).
	
		GDrive.files.get(fileId, { ... });
		
 - <a id="gdriveFilesDownload">[download()<i class="icon-up"></i>](#cgdriveFilesDownload)</a>
	
	Downloads the specified text or binary file.
	
	For `downloadFileOptions` see the description of`downloadFile()` [here](https://www.npmjs.com/package/react-native-fs). Please, bear in mind that `fromUrl` is set automatically and any user supplied value will be overwritten.
	
	The meaning of `queryParams` is the same as in [get()](#gdriveFilesGet).
	
	The function returns the result of `RNFS.downloadFile(downloadFileOptions)`.
		
		GDrive.files.download(fileId, downloadFileOptions, queryParams);
		
 - <a id="gdriveFilesGetId">[getId()<i class="icon-up"></i>](#cgdriveFilesGetId)</a>

	Gets the id of the first file with the specified metadata. The function returns a `Promise` resolving to the file id on success and to `undefined` on failure.
	
		GDrive.files.getId(
			name: String, // The name.
			parents: [String], // The parents.
			mimeType: String, // The mime type.
			trashed: Boolean // Whether the file is trashed. Default: false
		);
		
 - <a id="gdriveFilesList">[list()<i class="icon-up"></i>](#cgdriveFilesList)</a>
	
	[Lists or searches files](https://developers.google.com/drive/v3/reference/files/list) returning the result of `fetch()`.
	
		GDrive.files.list({q: "'root' in parents"});
	
 - <a id="gdriveFilesSafeCreateFolder">[safeCreateFolder()<i class="icon-up"></i>](#cgdriveFilesSafeCreateFolder)</a>
	
#### <a id="gdrivePermissions">[Permissions<i class="icon-up"></i>](#cgdrivePermissions)</a>

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

## <a id="versionHistory">[Version history<i class="icon-up"></i>](#cVersionHistory)</a>
Version number|Changes
-|-
v1.0.6|Readme updated.
v1.0.5|1.&nbsp;Readme updated.<br>2.&nbsp;Components/Button: arbitrary children supported.
v1.0.2 - v1.0.4|Readme updated.
v1.0.1|Readme added.
v1.0.0|Initial release.
<br><br>
> Written with [StackEdit](https://stackedit.io/).
