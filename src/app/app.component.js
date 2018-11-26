"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var application_settings_1 = require("tns-core-modules/application-settings");
var shared_1 = require("./shared");
var AppComponent = /** @class */ (function () {
    // private pages = new Array(
    //   { name: "Home", icon: String.fromCharCode(0xf2bd), url: "/home" },
    //   { name: "Language", icon: String.fromCharCode(0xf015), url: "/language" },
    //   { name: "Search", icon: String.fromCharCode(0xf002), url: "/search" },
    // );
    function AppComponent(router, routerExtensions, nav, util) {
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.nav = nav;
        this.util = util;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.sideDrawerTransitionBase = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
        this.sideDrawerMenuFilter();
        // this.check_setting();
    };
    AppComponent.prototype.check_setting = function () {
        shared_1.Config.language = application_settings_1.getNumber('language', shared_1.Config.language);
        shared_1.Config.category = application_settings_1.getNumber('category', shared_1.Config.category);
        shared_1.Config.section = application_settings_1.getNumber('section', shared_1.Config.section);
        // setString('page','home');
        shared_1.Config.page = application_settings_1.getString('page', shared_1.Config.page);
        shared_1.Config.books = JSON.parse(application_settings_1.getString('books', JSON.stringify(shared_1.Config.books)));
        // this.router.navigate(Config.page);
        // console.log(Config.page);
        // setString('language','3');
        // let test = getString('language');
        // console.log('configured routes: ', JSON.stringify(Config.books));
        // setNumber('language',Config.language);
        // console.log(Config.language);
        // console.log(JSON.stringify(Config.books));
        // getString('language');
        // static language = 1;
        // static category = 1;
        // static section = 1;
        // static page = "home";
    };
    AppComponent.prototype.sideDrawerMenuFilter = function () {
        // console.log('configured routes: ', JSON.stringify(this.router.config));
        this.sideDrawerMenu = this.router.config.filter(function (page) { return page.data && page.data.hasOwnProperty('name') && !page.data.hasOwnProperty('skip'); });
    };
    Object.defineProperty(AppComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this.sideDrawerTransitionBase;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            moduleId: module.id,
            templateUrl: "./app.component.html",
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_2.RouterExtensions,
            shared_1.CoreNavigation,
            shared_1.CoreUtility])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
