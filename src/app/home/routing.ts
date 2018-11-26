import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./component";
// import { AuthGuard } from "../auth-guard.service";

// { path: "groceries", component: GroceriesComponent, canActivate: [AuthGuard] },
const page: Routes = [
  {
    path: "home", component: HomeComponent,
    data:{
      name: "Home", icon: String.fromCharCode(0xf015)
    }
  },
];
export const HomeRouting: ModuleWithProviders = RouterModule.forChild(page);