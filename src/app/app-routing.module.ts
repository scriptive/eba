import { Routes } from "@angular/router";
// import { AppConfiguration } from "./shared";
// import { getString } from "tns-core-modules/application-settings";
// import { AuthGuard } from "./auth-guard.service";

export const authProviders = [
  // AuthGuard
];
// path: "home", loadChildren: "./home/home.module#HomeModule"
export const appRoutes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full"},
  // { path: "", redirectTo: getString('page',Config.page), pathMatch: "full"},
  // { path: "", redirectTo: Config.page, pathMatch: "full"},
];
