"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { RouterModule, Routes } from '@angular/router';
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var shared_1 = require("./shared");
var module_1 = require("./home/module");
var module_2 = require("./setting/module");
// import { AboutModule } from "./about/module";
// import { BookmarkModule } from "./bookmark/module";
// import { ContactModule } from "./contact/module";
// import { RandomModule } from "./random/module";
// import { CategoryModule } from "./book/category";
// import { SectionModule } from "./book/section";
// import { SearchModule } from "./book/search";
// import { ReaderModule } from "./book/reader";
// import { LanguageListModule } from "./book/language.list";
// import { LanguageDetailModule } from "./book/language.detail";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                // AppRoutingModule,
                nativescript_module_1.NativeScriptModule,
                router_1.NativeScriptRouterModule,
                forms_1.NativeScriptFormsModule,
                nativescript_module_1.NativeScriptModule,
                angular_1.NativeScriptUISideDrawerModule,
                router_1.NativeScriptRouterModule.forRoot(app_routing_module_1.appRoutes),
                module_1.HomeModule,
                module_2.SettingModule
            ],
            exports: [],
            declarations: [
                app_component_1.AppComponent,
            ],
            providers: [
                shared_1.CoreUtility,
                shared_1.CoreNavigation
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
