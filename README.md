This is a collection of useful classes that can be used in RN projects.

**Warning**: v2.0.0 introduces backwards-incompatible changes. Please see the [version history](#versionHistory).

 1. <a name="cInstallation"></a>[Installation.](#installation)
 1. <a name="cPackageContents"></a>[Package contents.](#packageContents)
 1. <a name="cVersionHistory"></a>[Version history.](#versionHistory)

## <a name="installation"></a>[Installation<i class="icon-up"></i>](#cInstallation)
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

## <a name="packageContents"></a>[Package contents<i class="icon-up"></i>](#cPackageContents)

 1. <a name="cNativeModules"></a>[Native modules](#nativeModules)
 1. <a name="cPreferences"></a>[Preferences](#preferences)
 1. AlterStyles
 1. ContextMenu
 1. DateTimePicker
 1. <a name="cListViewHelper"></a>[ListViewHelper](#listViewHelper)
 1. <a name="cStaticUtils"></a>[StaticUtils](#staticUtils)
 1. strings
 1. <a name="cStyles"></a>[styles](#styles)
 
### <a name="nativeModules"></a>[Native modules<i class="icon-up"></i>](#cNativeModules)

**Warning**: Native modules are currently implemented only for Android. I'll implement them for iOS as soon as I learn Swift / Objective-C well enough.

 1. <a name="cShareData"></a>[ShareData](#shareData)
 1. <a name="cGetPath"></a>[GetPath](#getPath)

#### <a name="shareData"></a>[ShareData<i class="icon-up"></i>](#cShareData)

Shares arbitrary data.

    import { ShareData } from "react-native-common-utils";

 - [deleteTempFiles()<i class="icon-up"></i>](#shareData)
    
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

#### <a name="getPath"></a>[GetPath<i class="icon-up"></i>](#cGetPath)

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




### <a name="preferences"></a>[Preferences<i class="icon-up"></i>](#cPreferences)

#### Preference
#### Preferences
#### ArrayPreference
#### NumberPreference
#### SwitchPreference

### AlterStyles

### ContextMenu

### DateTimePicker

### <a name="listViewHelper"></a>[ListViewHelper](#cListViewHelper)

This class facilitates the use of the [`ListView`](https://facebook.github.io/react-native/docs/listview.html) class.

    import { ListViewHelper } from "react-native-common-utils";

A minimal usage example rendering a ListView with 3 items (10, 20, "abc"):

    class Item extends React.Component {
        render() {
            return <Text>{this.props.data}</Text>;
        }
    }
    
    class Test extends React.Component {
        constructor(props) {
            super(props);
            
            this.lv = new ListViewHelper([10, 20, "abc"], Item);
        }
        
        render() {
            return this.lv.createListView();
        }
    }

**Please keep in mind** that `ListViewHelper` renders row separators using a predefined style from [`styles`](#styles) so don't forget to initialize predefined styles even if you're not going to use them yourself.

**Another point to remember** is that `ListViewHelper` uses the `@autobind` annotation, so if you extend it don't forget to use this annotation on your class as well.

Class methods:

 - constructor()

    Creates and initializes a class instance. All parameters are optional.

        this.lv = new ListViewHelper(
            items, // Array with data for items.
            itemType, // A React Native component to render items.
            ref // String. Used as a ref for the ListView.
        );

 - setItems()

    Specifies items data.

        this.lv.setItems([{
            name: "Leslie",
            kind: "dog"
        }, {
            name: "Alice",
            kind: "cat"
        }]);

    You can pass an `Array` as the data for a particular item. In this case the array's first element must be a React Native component to render this item and its second element must be the data itself. This allows different React Native components to be used for different items.

        this.lv.setItems([{
            name: "Leslie",
            kind: "dog"
        }, {
            name: "Alice",
            kind: "cat"
        },
        [Hippogriff, {
            name: "Buckbeak"
        }]]);

    In this case the component set by the `constructor()` or `setItemType()` will be used for the first two items while the component `Hippogriff` will be used for the third one.

 - setItemType()

    Sets a React Native component to render items.

 - setCallback()

   Sets a callback function to be invoked from an item-rendering component in response to a user action.

        this.lv.setCallback("onEditItem", this.onEditItem);
        this.lv.setCallback("onDeleteItem", this.onDeleteItem);

    The callbacks are stored in a `Map`.

 - deleteCallback()

    Deletes a callback with the specified name.

        this.lv.deleteCallback("onDeleteItem");

 - setOnPress()

    Sets a callback with the `"onPress"` name.

 - setOnLongPress()

    Sets a callback with the `"onLongPress"` name.

 - setStyle()

    Sets a style for the `ListView`.

 - setPageSize()

   Sets a page size for the `ListView`.

 - setSeparatorStyle()

    Sets a style to be used for row separators.

 - setRowParams()

    Sets a JS-object to be passed to **each** item in the list view.

        this.lv.setRowParams({
            owner: "Danny"
        });

 - renderRow()

    Renders an item. See [`ListView.renderRow()`](https://facebook.github.io/react-native/docs/listview.html#renderrow) for parameter description .

    Apart from the item data, each item receives the following:
     - parameters from `renderRow()`;
     - itemCount: the number of items in the list view;
     - callbacks: the callbacks `Map`;
     - onPress: the callback set by `setOnPress()`;
     - onLongPress: the callback set by `setOnLongPress()`;
     - params: the JS-object set by `setRowParams()`.

    All these can be referenced from within an item-rendering component through `this.props`.

 - renderSeparator()

    Renders a row separator, invoking `renderLastRowSeparator()` for the last row and `renderRowSeparator()` for all the others.

    See [`ListView.renderSeparator()`](https://facebook.github.io/react-native/docs/listview.html#renderseparator) for parameter description.

 - renderLastRowSeparator()

    Renders the last row separator simply returning `null`.

 - renderRowSeparator()

    Renders a row separator returning a `View` with a style set by `setSeparatorStyle()`.

 - setEmptyItemsRenderer()

    Sets a callback to be invoked if there are no items in this list view. The callback must return a renderable object.

 - createListView()

    Returns a `ListView` if there are any items set. Otherwise it invokes the callback set by `setEmptyItemsRenderer()` or simply returns `null` if the latter is undefined.

### <a name="staticUtils"></a>[StaticUtils<i class="icon-up"></i>](#cStaticUtils)

A collection of different `static` utility methods extending [StaticUtils](https://www.npmjs.com/package/simple-common-utils#staticUtils) from [simple-common-utils](https://www.npmjs.com/package/simple-common-utils).

    import { StaticUtils } from "react-native-common-utils";

 - spinkitColor()

    Taking an RGBA value, returns a string of the form `#rrggbb` (as [react-native-spinkit](https://www.npmjs.com/package/react-native-spinkit) recognizes).

        StaticUtils.spinkitColor(10); // #000000
        StaticUtils.spinkitColor(0xFF487210); // #ff4872

 - getLocaleId()

    Gets the current locale id.

        StaticUtils.getLocaleId(); // GB

### strings

### <a name="styles"></a>[styles](#cStyles)

A tiny styling infrastructure based on [react-native-extended-stylesheet](https://npmjs.com/packages/react-native-extended-stylesheet), coming with several predefined styles.

**Please bear in mind** that [`ListViewHelper`](#listViewHelper) and several [components](https://www.npmjs.com/package/react-native-common-ui-components) use predefined styles so please don't forget to initialize them even if you're not going to use them yourself.

    // Somewhere BEFORE the first use of dependent classes.
    
    const stls = require("react-native-common-utils/js/styles");
    
    stls.create();
    stls.build();

#### 1. Usage.

The usage is quite simple and is illustrated by an example below. Please note `create()` after the `import` directive and `build()` and`indexObjectWithClassName()` at the last lines. [Variables](#stylesVariables) and [`font` / `fontSize()`](#stylesFont)  are described later and examples of custom style creation are given [here](#stylesCustomStyles).

    // customStyles.js
    
    import indexObjectWithClassName, {
        styles,
        font,
        create,
        build,
        fontSize
    } from "react-native-common-utils/js/styles";
    
    // Tweak variables here and after that invoke...
    
    create();
    
    // Define your custom styles.
    
    styles.mainScene = {
        mySuperView: {
            flex: ... ,
            backgroundColor: ... ,
            ...
        },
        ...
    };
    
    styles.anotherScene = {
        ...
    };
    
    styles.common = {
        ...
    };
    
    build();
    
    module.exports = indexObjectWithClassName;

Then in `MainScene.js`:

    const styles = require("customStyles")("mainScene");
    
    <View style={styles.mySuperView} />
    <View style={styles.all.common} />

That is, if you need styles defined in `styles.mainScene` you simply write `styles.styleToReference`. If you need "common" styles you write `styles.all.styleToReference`.

It's not necessary to specify "the name" of a class when requiring`customStyles`:

    const styles = require("customStyles")();
    
    <View style={styles.mainScene.mySuperView} />
    <View style={styles.common} />

#### 2. <a name="stylesVariables"></a>Variables.

Variables are used to make different UI parts look the same. Their default values are given in brackets. Feel free to modify them as you choose. Either you do it or not, don't forget to call [`create()`](#stylesComplexStyles).

 - marginPadding (15)

    A value used for margins, paddings and the like.

 - activeOpacity (0.5)

    A value for [activeOpacity](https://facebook.github.io/react-native/docs/touchablehighlight.html#activeopacity).

 - baseHeight (50)

    Some referent value to base different height values upon. For example the height of buttons or list view items.

 - textColor (0x55606EFF ![textColor](https://dummyimage.com/20/55606E/000000.png&text=+) )

 - textColorDisabled (0xD0CECEFF ![textColorDisabled](https://dummyimage.com/20/D0CECE/000000.png&text=+) )

 - backgroundColor (0xE9E9E9FF ![backgroundColor](https://dummyimage.com/20/E9E9E9/000000.png&text=+) )

#### 3. Styles.

 - centerCenter
    
    Centers content along both axes.

 - centerCenterFlex1

    Does exactly what the name suggests.

Apart from these, there are <a name="stylesComplexStyles"></a>styles that depend on [variable](#stylesVariables) values. That's why `create()` needs to be called: these styles are created during its invocation. They are described below:

 - navigator
 - navigatorWithPadding
 - scene
 - sceneWithMargin
 - button
 - toggleButtons
 - listView

#### 4. <a name="stylesFont"></a>Font size.

A font size is calculated as `baseFontSize + numberOfSteps * step`. `font` contains all the values and `fontSize()` is a function to calculate the font size: `fontSize(someInteger)`.

`font` fields (with default values in brackets):

 - size (14)

    This is a base font size.
    
 - step (3)

    This is a step value.
 - smallMediumSteps (1)
 - mediumSteps (2)
 - largeSteps (3)

    Variables to use as a number of steps. Assuming `font` fields have default values, `fontSize(mediumSteps)` for example will give `20`.

#### 5. <a name="stylesCustomStyles"></a>Examples of custom styles.

## <a name="versionHistory"></a>[Version history<i class="icon-up"></i>](#cVersionHistory)

Version number|Changes
-|-
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
