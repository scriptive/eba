"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var routing_1 = require("./routing");
var component_1 = require("./component");
var SettingModule = /** @class */ (function () {
    function SettingModule() {
    }
    SettingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                routing_1.SettingRouting
            ],
            declarations: [
                component_1.SettingComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], SettingModule);
    return SettingModule;
}());
exports.SettingModule = SettingModule;
