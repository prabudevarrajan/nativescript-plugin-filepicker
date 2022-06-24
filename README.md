# nativescript-plugin-filepicker

Filepicker plugin supporting both single and multiple selection.
For Android, it uses Intents to open the stock file pickers. For Android 6 (API 23) and above the permissions to read file storage should be explicitly required. See demo for implementation details.

For iOS, it uses stock UIDocumentPickerViewController for picking the file.

## Installation

For NativeScript 6:

```javascript
tns plugin add nativescript-plugin-filepicker
```

For NativeScript 7/8:

```javascript
ns plugin add @prabudevarrajan/filepicker
```

## Usage


Create filepicker in `single` or `multiple` mode to specifiy if the filepicker will be used for single or multiple selection of files

*TypeScript*
```
let context = filepicker.create({
    mode: "single", // use "multiple" for multiple selection
     extensions: ["pdf", "jpg", "doc", "docx"]
});
````

*Javascript*
````
var context = filepicker.create({ mode: "single" }); // use "multiple" for multiple selection
````

### Request permissions, show the file list and process the selection

```
context
    .authorize()
    .then(function() {
        return context.present();
    })
    .then(function(selection) {
        selection.forEach(function(selected) {
            // process the selected file
        });
    }).catch(function (e) {
        // process error
    });
```

> **NOTE**: To request permissions for Android 6+ (API 23+) we use [nativescript-permissions](https://www.npmjs.com/package/nativescript-permissions).

## API

### Methods

* create(options) - creates instance of the filepicker. Possible options are:

| Option | Platform | Default | Description |
| --- |  --- | --- | --- |
| mode | both | multiple | The mode if the filepicker. Possible values are `single` for single selection and `multiple` for multiple selection. |
| extensions | both | For iOS public.item and null(all files) for Android | Choose whether file extension in array. eg. ["pdf", "doc"] |
| showAdvanced | Android | false | Show internal and removable storage options on Android (**WARNING**: [not supported officially](https://issuetracker.google.com/issues/72053350)). |

The **hostView** parameter can be set to the view that hosts the file picker. Applicable in iOS only, intended to be used when open picker from a modal page.

* authorize() - request the required permissions.
* present() - show the file picker to present the user the ability to select files. Returns an array of the selected files.

## Demo

For demo use the sample demo-angular project.

```sh
$ cd demo-angular
$ tns debug android/ios
```

## Contribute
We love PRs! Check out the [contributing guidelines](CONTRIBUTING.md). If you want to contribute, but you are not sure where to start - look for [issues labeled `help wanted`](https://github.com/NativeScript/nativescript-plugin-filepicker/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22).

## Credits

* For iOS, inspiration from [nativescript-mediafilepicker](https://github.com/jibon57/nativescript-mediafilepicker)
* For Android, inspiration from [nativescript-imagepicker](https://github.com/NativeScript/nativescript-imagepicker)

## License

Apache License Version 2.0, January 2004
