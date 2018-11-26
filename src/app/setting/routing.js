"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var component_1 = require("./component");
var page = [
    {
        path: "setting", component: component_1.SettingComponent,
        data: {
            name: "Setting", icon: String.fromCharCode(0xf015), skip: true
        }
    },
];
exports.SettingRouting = router_1.RouterModule.forChild(page);
