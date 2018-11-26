"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Application = require("tns-core-modules/application");
var application_settings_1 = require("tns-core-modules/application-settings");
var router_2 = require("nativescript-angular/router");
var CoreNavigation = /** @class */ (function () {
    function CoreNavigation(router, activatedRoute, routerExtensions) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.routerExtensions = routerExtensions;
        this.hasPage();
    }
    CoreNavigation.prototype.sideDrawerShow = function () {
        if (this.sideDrawer())
            this.sideDrawer().showDrawer();
    };
    CoreNavigation.prototype.sideDrawerHide = function () {
        if (this.sideDrawer())
            this.sideDrawer().closeDrawer();
    };
    CoreNavigation.prototype.sideDrawer = function () {
        return Application.getRootView();
    };
    CoreNavigation.prototype.to = function (currentRouteName, routeTransition) {
        if (routeTransition === void 0) { routeTransition = 'fade'; }
        // NOTE: flip,fade
        this.routerExtensions.navigate([currentRouteName], {
            transition: {
                name: routeTransition
            }
        });
        this.sideDrawerHide();
    };
    CoreNavigation.prototype.isPage = function (currentRouteName) {
        return currentRouteName === this.router.url.replace(/^\//, '');
    };
    CoreNavigation.prototype.hasPage = function () {
        var _this = this;
        // this.activatedRoute.url.subscribe(url =>{ });
        this.router.events.subscribe(function (e) {
            // NavigationStart, NavigationEnd
            if (e.constructor.name === "NavigationEnd") {
                application_settings_1.setString('page', _this.router.url);
            }
        });
    };
    CoreNavigation = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            router_2.RouterExtensions])
    ], CoreNavigation);
    return CoreNavigation;
}());
exports.CoreNavigation = CoreNavigation;
