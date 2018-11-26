"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { getString } from "tns-core-modules/application-settings";
// import { AuthGuard } from "./auth-guard.service";
exports.authProviders = [
// AuthGuard
];
// path: "home", loadChildren: "./home/home.module#HomeModule"
exports.appRoutes = [
    { path: "", redirectTo: "/setting", pathMatch: "full" },
];
