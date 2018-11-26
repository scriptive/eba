"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_1 = require("../shared");
var book_1 = require("../shared/book");
var SettingComponent = /** @class */ (function () {
    function SettingComponent(
    // private router: Router,
    bookService, nav, util) {
        this.bookService = bookService;
        this.nav = nav;
        this.util = util;
        // NOTE: ?
    }
    SettingComponent.prototype.ngOnInit = function () {
        // setString('language','3');
        // let test = getString('language');
        // console.log(test);
        // console.log(JSON.stringify(Config.books));
    };
    SettingComponent = __decorate([
        core_1.Component({
            selector: "home",
            moduleId: module.id,
            templateUrl: "./component.html",
        }),
        __metadata("design:paramtypes", [book_1.BookService,
            shared_1.CoreNavigation,
            shared_1.CoreUtility])
    ], SettingComponent);
    return SettingComponent;
}());
exports.SettingComponent = SettingComponent;
/*
https://docs.nativescript.org/ns-framework-modules/application-settings
import * as Application from "tns-core-modules/application";
import * as applicationModul from "tns-core-modules/application";
import { getString, setString } from "application-settings";

export class BackendService {

    static isLoggedIn(): boolean {
        return !!getString("token");
    }

    static get token(): string {
        return getString("token");
    }

    static set token(theToken: string) {
        setString("token", theToken);
    }
}
*/ 
