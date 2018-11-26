import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingComponent } from "./component";

const page: Routes = [
  {
    path: "setting", component: SettingComponent,
    data:{
      name: "Setting", icon: String.fromCharCode(0xf015), skip:true
    }
  },
];
export const SettingRouting: ModuleWithProviders = RouterModule.forChild(page);