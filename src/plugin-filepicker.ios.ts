import {
    View,
    Utils,
} from "@nativescript/core";
import { Options } from "./plugin-filepicker.common";
export * from "./plugin-filepicker.common";

export class FilePicker {
    _filePickerController: UIDocumentPickerViewController;
    _hostView: View;

    private _options: Options;

    constructor(options: Options = {}, hostView: View) {
        this._options = options;
        this._hostView = hostView;
    }

    // lazy-load latest frame.topmost() if _hostName is not used
    get hostView() {
        return this._hostView;
    }

    get hostController(): UIViewController {
        let vc = this.hostView ? this.hostView.viewController : UIApplication.sharedApplication.keyWindow.rootViewController;
        while (
            vc.presentedViewController
            && vc.presentedViewController.viewLoaded
            && vc.presentedViewController.view.window
        ) {
            vc = vc.presentedViewController;
        }
        return vc;
    }

    get mode(): string {
        return this._options && this._options.mode && this._options.mode.toLowerCase() === 'single' ? 'single' : 'multiple';
    }

    authorize(): Promise<void> {
        console.log("authorizing...");

        return new Promise<void>((resolve, reject) => {
            resolve();
        });
    }

    get mimeTypeFromExtensions() {
        let mimeTypes = ["public.item"];
        const extensions = this._options && 'extensions' in this._options ? this._options.extensions : [];
        if (extensions && extensions.length > 0) {
            for (let index = 0; index < extensions.length; index++) {
                const element = extensions[index];
                let unmanagedFileUTI = UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, element, null);
                let fileUTI = null;

                if (unmanagedFileUTI) {
                    fileUTI = unmanagedFileUTI.takeRetainedValue();
                    mimeTypes[index] = fileUTI;
                }
            }
        }
        return mimeTypes;
    }


    present() {
        console.log("present...");
        return new Promise<void>((resolve, reject) => {
            let documentTypes = Utils.ios.collections.jsArrayToNSArray(this.mimeTypeFromExtensions);


            let controller = UIDocumentPickerViewController.alloc().initWithDocumentTypesInMode(documentTypes, UIDocumentPickerMode.Import);

            if (this._options.mode === 'multiple') {
                controller.allowsMultipleSelection = true;
            }

            this._filePickerController = controller;
            const imagePickerControllerDelegate = MediafilepickerDocumentPickerDelegate.new();
            imagePickerControllerDelegate._resolve = resolve;
            imagePickerControllerDelegate._reject = reject;

            controller.delegate = imagePickerControllerDelegate;

            this.hostController.presentViewControllerAnimatedCompletion(controller, true, null);
        });

    }
}

@NativeClass()
class MediafilepickerDocumentPickerDelegate extends NSObject implements UIDocumentPickerDelegate {
    _resolve: any;
    _reject: any;

    public static ObjCProtocols = [UIDocumentPickerDelegate];

    static new(): MediafilepickerDocumentPickerDelegate {
        const delegate = <MediafilepickerDocumentPickerDelegate>super.new();
        delegate.registerToGlobal();

        return delegate;
    }

    private registerToGlobal(): any {
        (<any>global).mediaPickerDocumentDelegate = this;
    }

    private deRegisterFromGlobal(): any {
        (<any>global).mediaPickerDocumentDelegate = null;
    }

    public documentPickerDidPickDocumentAtURL(controller: UIDocumentPickerViewController, url: NSURL) {
        if (url) {
            let assets = [url.absoluteString];
            this._resolve(assets);
        } else {
            this._reject('No file!');
        }
        this.deRegisterFromGlobal();
    }

    public documentPickerDidPickDocumentsAtURLs(controller: UIDocumentPickerViewController, urls: NSArray<NSURL>) {
        if (urls.count > 0) {
            let assets = [];

            for (let i = 0; i < urls.count; i++) {
                let url = urls[i];
                assets.push(url.absoluteString);
            }
            this._resolve(assets);
        } else {
            this._reject('No file!');
        }
        this.deRegisterFromGlobal();
    }

    public documentPickerWasCancelled(controller: UIDocumentPickerViewController) {
        this._reject('Picker cancelled');
        this.deRegisterFromGlobal();
    }
}

export function create(options?: Options, hostView?: View): FilePicker {
    return new FilePicker(options, hostView);
}