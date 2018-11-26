"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var component_1 = require("./component");
// import { AuthGuard } from "../auth-guard.service";
// { path: "groceries", component: GroceriesComponent, canActivate: [AuthGuard] },
var page = [
    {
        path: "home", component: component_1.HomeComponent,
        data: {
            name: "Home", icon: String.fromCharCode(0xf015)
        }
    },
];
exports.HomeRouting = router_1.RouterModule.forChild(page);
