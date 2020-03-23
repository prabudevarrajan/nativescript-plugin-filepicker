import { Component, OnInit } from "@angular/core";
import * as filepicker from "nativescript-plugin-filepicker";
import { isIOS } from "tns-core-modules/ui/page/page";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    public onSelectMultipleTap() {

        let context = filepicker.create({
            mode: "multiple",
            extensions: ["pdf", "jpg", "doc", "docx"]
        });
        this.startSelection(context);
    }

    public onSelectSingleTap() {

        let context = filepicker.create({
            mode: "single",
            //extensions: ["pdf", "jpg", "doc", "docx"]
        });
        this.startSelection(context);
    }

    private startSelection(context) {
        let that = this;

        context
            .authorize()
            .then(() => {
                return context.present();
            })
            .then((selection) => {
                console.log("Selection done: " + JSON.stringify(selection));
            }).catch(function (e) {
                console.log(e);
            });
    }
}
