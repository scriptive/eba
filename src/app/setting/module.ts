import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SettingRouting } from "./routing";
import { SettingComponent } from "./component";

@NgModule({
    imports: [
      NativeScriptCommonModule,
      SettingRouting
    ],
    declarations: [
        SettingComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SettingModule { }