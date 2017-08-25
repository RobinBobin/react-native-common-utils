This is a collection of (hopefully useful) classes that can be used in RN projects.

 1. <a name="cInstallation">[Installation.](#installation)</a>
 1. <a name="cPackageContents">[Package contents.](#packageContents)</a>
 1. <a name="cVersionHistory">[Version history.](#versionHistory)</a>

## <a name="installation">[Installation<i class="icon-up"></i>](#cInstallation)</a>
Install with:

    npm i --save react-native-common-utils
If you want to use [native modules](#nativeModules) defined in the package, use the following command afterwards:

    react-native link react-native-common-utils

## <a name="packageContents">[Package contents<i class="icon-up"></i>](#cPackageContents)</a>

 1. <a name="cNativeModules">[Native modules](#nativeModules)</a>
 1. <a name="cUIComponents">[UI components](#uiComponents)</a>
 1. <a name="cgdriveapiw">[Google Drive API wrapper](#gdriveapiw)</a>
 1. <a name="cPreferences">[Preferences](#preferences)</a>
 1. <a name="csqlqbuilder">[SQL query builder](#sqlqbuilder)
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
 
### <a name="nativeModules">[Native modules<i class="icon-up"></i>](#cNativeModules)</a>

**Warning**: Native modules are currently implemented only for Android. I'll implement them for iOS as soon as I learn Swift / Objective-C well enough &#x263a;.

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

### <a name="uiComponents">[UI components<i class="icon-up"></i>](#cUIComponents)</a>
#### ToggleButtons
#### Button
#### MaterialSwitch
#### ProgressBar

### <a name="gdriveapiw">[Google Drive API Wrapper<i class="icon-up"></i>](#cgdriveapiw)</a>

These wrapper facilitates the use of the [google drive api](https://developers.google.com/drive/v3/reference/). 

It doesn't provide any authorization mechanism, so another package has to be used. I use [react-native-google-signin](https://www.npmjs.com/package/react-native-google-signin) (thanks for the great work guys!).

My code uses [react-native-fs](https://www.npmjs.com/package/react-native-fs) (and another thank you goes to its authors!) so please don't forget to install it: it won't be installed automatically.

 1. <a name="cgdriveapiwGDrive">[GDrive](#gdriveapiwGDrive)</a>
 1. <a name="cgdriveapiwFiles">[Files](#gdriveapiwFiles)</a>
 1. <a name="cgdriveapiwPermissions">[Permissions](#gdriveapiwPermissions)</a>

#### <a name="gdriveapiwGDrive">[GDrive<i class="icon-up"></i>](#cgdriveapiwGDrive)</a>
This is the "entry point" of the wrapper. It contains only `static` methods and fields.

    import GDrive from "react-native-common-utils/js/gdriveapiw/GDrive";

 - [setAccessToken()<i class="icon-up"></i>](#gdriveapiwGDrive)
    
    Sets the access token for use in subsequent calls to the api. Get the token from a package you choose to use.
    
        GDrive.setAccessToken(accessToken);
    
 - [init()<i class="icon-up"></i>](#gdriveapiwGDrive)
    
    Initializes the wrapper.
    
        GDrive.init();
    
    or
    
	    const params = {
	        files: {
		        boundary: String // The boundary string for multipart file uploads. Default: "foo_bar_baz".
	        }
	    };
        
        GDrive.init(params);
    
 - [isInitialized()<i class="icon-up"></i>](#gdriveapiwGDrive)
    
    Returns `true` if an access token has been supplied, `false` otherwise.
    
        GDrive.isInitialized() ? <some code> : <some other code>;

#### <a name="gdriveapiwFiles">[Files<i class="icon-up"></i>](#cgdriveapiwFiles)</a>

 - [createFileMultipart()<i class="icon-up"></i>](#gdriveapiwFiles)
    
    Creates a file using [multipart upload](https://developers.google.com/drive/v3/web/manage-uploads). Returns the result of `fetch()`.
    
        const contents = "My text file contents";
        // or
        const contents = [10, 20, 30];
        
        GDrive.files.createFileMultipart(
            contents,
            "corresponding mime type", {
	            parents: ["root"],
	            name: "My file"
            });
            
 - [delete()<i class="icon-up"></i>](#gdriveapiwFiles)
    
    [Deletes](https://developers.google.com/drive/v3/reference/files/delete) the specified file returning the result of `fetch()`.
    
	    GDrive.files.delete(fileId);

 - [get()<i class="icon-up"></i>](#gdriveapiwFiles)
	
    Gets the content of the specified **text** file returning the result of `fetch()` (use `download()` for binary files). For `queryParams` see "Optional query parameters" [here](https://developers.google.com/drive/v3/reference/files/get).
	
		GDrive.files.get(fileId, { ... });
		
 - [download()<i class="icon-up"></i>](#gdriveapiwFiles)
	
	Downloads the specified text or binary file.
	
	For `downloadFileOptions` see the description of`downloadFile()` [here](https://www.npmjs.com/package/react-native-fs). Please, bear in mind that `fromUrl` is set automatically and any user supplied value will be overwritten.
	
	The meaning of `queryParams` is the same as in `get()`.
	
	The function returns the result of `RNFS.downloadFile(downloadFileOptions)`.
		
		GDrive.files.download(fileId, downloadFileOptions, queryParams);
		
 - [getId()<i class="icon-up"></i>](#gdriveapiwFiles)
    
	Gets the id of the first file with the specified metadata. The function returns a `Promise`. It's rejected on failure and resolved to the file id or `undefined` (if nothing is found) on success.
	
        GDrive.files.getId(
            name: String, // The name.
            parents: [String], // The parents.
            mimeType: String, // The mime type.
            trashed: Boolean // Whether the file is trashed. Default: false
        );
		
 - [list()<i class="icon-up"></i>](#gdriveapiwFiles)
	
	[Lists or searches files](https://developers.google.com/drive/v3/reference/files/list) returning the result of `fetch()`.
	
		GDrive.files.list({q: "'root' in parents"});
	
 - [safeCreateFolder()<i class="icon-up"></i>](#gdriveapiwFiles)
	
	Gets the id of the first folder with the specified `name` and `parents`, creating the folder if it doesn't exist. The function returns a `Promise` that is rejected on failure and resolved to the folder id on success.
	
        GDrive.files.safeCreateFolder({
            name: "My folder",
            parents: ["root"]
        });

#### <a name="gdriveapiwPermissions">[Permissions<i class="icon-up"></i>](#cgdriveapiwPermissions)</a>

 - [create()](#gdriveapiwPermissions)
	
	[Creates](https://developers.google.com/drive/v3/reference/permissions/create) a permission for the specified file returning the result of fetch().
	
        GDrive.permissions.create(
            fileId, {
                role: "reader",
                type: "anyone"
            });

### <a name="preferences">[Preferences<i class="icon-up"></i>](#cPreferences)</a>

#### Preference
#### Preferences
#### ArrayPreference
#### NumberPreference
#### SwitchPreference

### <a name="sqlqbuilder">[SQL query builder<i class="icon-up"></i>](#csqlqbuilder)</a>
An SQL query builder / executor (if an executing function is set).

 1. <a name="csqlqbuilderSqlBuilder">[SqlBuilder](#sqlqbuilderSqlBuilder)</a>
 1. <a name="csqlqbuilderTableBuilder">[TableBuilder](#sqlqbuilderTableBuilder)</a>
 1. <a name="csqlqbuilderColumn">[Column](#sqlqbuilderColumn)</a>
 1. <a name="csqlqbuilderUniqueBuilder">[UniqueBuilder](#sqlqbuilderUniqueBuilder)</a>

#### <a name="sqlqbuilderSqlBuilder">[SqlBuilder<i class="icon-up"></i>](#csqlqbuilderSqlBuilder)</a>

This is the "entry point" of the builder. It contains only `static` methods and fields.

	import { SqlBuilder } from "react-native-common-utils";

 - [setDebug()<i class="icon-up"></i>](#sqlqbuilderSqlBuilder)
	
	Turns on or off the debug mode. In debug mode each executed sql statement is logged to the console.
	
		SqlBuilder.setDebug(debug);

 - [setSqlExecutor()<i class="icon-up"></i>](#sqlqbuilderSqlBuilder)

	Sets a function to be used to execute sql statements.
	
		import SQLite from "react-native-sqlite-storage";
		
		...
		
		const db = await SQLite.openDatabase(...);
		
		SqlBuilder.setSqlExecutor(db.executeSql.bind(db));

 - [executeSql()<i class="icon-up"></i>](#sqlqbuilderSqlBuilder)
	
	Executes an sql statement by invoking a function set by `setSqlExecutor()`. It returns the result of that function invocation or simply the passed sql statement if `setSqlExecutor` hasn't been called.
	
	The result of invoking this method is returned from the CRUD methods.
	
		SqlBuilder.executeSql("some sql code);

 - [createTable()<i class="icon-up"></i>](#sqlqbuilderSqlBuilder)
	
	Creates a table using [TableBuilder](#sqlqbuilderTableBuilder).
	
        const name = "weights";
        
        const callback = tableBuilder => {
            tb.integer("rowid").primary();
            tb.integer("millis").notNull();
            tb.integer("gross").notNull();
            tb.integer("net").notNull();
            tb.text("comment").notNull();
        };
        
        const ifNotExists = Boolean; // Adds "IF NOT EXISTS" if true. Default: true.
        
        SqlBuilder.createTable(name, callback, ifNotExists);

#### <a name="sqlqbuilderTableBuilder">[TableBuilder<i class="icon-up"></i>](#csqlqbuilderTableBuilder)</a>

 - [column()](#sqlqbuilderTableBuilder)
	
	Creates a [Column](#sqlqbuilderColumn) and returns it to allow method chaining.
	
        tb
            .column(
                name: "rate",
                type: "REAL")
            .notNull();
	
	There are shorthands for the `INTEGER`, `TEXT` and `BLOB` types:
	
	        tb.integer("rowid").primary();
	        tb.text("comment").notNull();
	        tb.blob("image");

 - [unique()](#sqlqbuilderTableBuilder)
	
	Makes a column unique using [UniqueBuilder](#sqlqbuilderUniqueBuilder).
	    
        tb.unique(ub => {
            ub
                .column("name")
                .collate("NOCASE")
                .order("ASC");
            
            ub
                .column("code")
                .collate("NOCASE")
                .order("ASC");
        });

#### <a name="sqlqbuilderColumn">[Column](#csqlqbuilderColumn)</a>

 - [primary()](#sqlqbuilderColumn)
	
	Adds `PRIMARY KEY` to this column definition.

 - [foreign()](#sqlqbuilderColumn)

	Adds `REFERENCES tableName(columnName)` to this column definition.
	
		tb.integer("type").foreign("tableName", "columnName");

 - [onDelete()](#sqlqbuilderColumn)
	
	Adds `ON DELETE action` to this column definition.
	
        tb.integer("journeyRowid")
            .foreign("tableName", "rowid")
            .onDelete("action");

 - [notNull()](#sqlqbuilderColumn)
	
	Adds `NOT NULL` to this column definition.

#### <a name="sqlqbuilderUniqueBuilder">[UniqueBuilder<i class="icon-up"></i>](#csqlqbuilderUniqueBuilder)

 - [column()](#sqlqbuilderUniqueBuilder)

	Specifies the unique column name and optionally collation and order.
	
        ub
            .column("code")
            .collate("NOCASE")
            .order("ASC");

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

## <a name="versionHistory">[Version history<i class="icon-up"></i>](#cVersionHistory)</a>
Version number|Changes
-|-
v1.0.11|1.&nbsp;Readme updated.<br>2.&nbsp;[react-native-extended-stylesheet](https://www.npmjs.com/package/react-native-extended-stylesheet) and [react-native-localization](https://www.npmjs.com/package/react-native-localization) specified as dependencies.
v1.0.6 - v1.0.10|Readme updated.
v1.0.5|1.&nbsp;Readme updated.<br>2.&nbsp;Components/Button: arbitrary children supported.
v1.0.2 - v1.0.4|Readme updated.
v1.0.1|Readme added.
v1.0.0|Initial release.
<br><br>
> Written with [StackEdit](https://stackedit.io/).
