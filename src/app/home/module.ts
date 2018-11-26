import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRouting } from "./routing";
import { HomeComponent } from "./component";

@NgModule({
    imports: [
      NativeScriptCommonModule,
      HomeRouting
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }