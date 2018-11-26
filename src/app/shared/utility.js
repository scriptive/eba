"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// NOTE: https://docs.nativescript.org/ns-framework-modules/application-settings
// NOTE: import * as xmlModule from "tns-core-modules/xml";
var CoreUtility = /** @class */ (function () {
    // @Injectable({
    //   providedIn: "root"
    // })
    function CoreUtility() {
    }
    CoreUtility = __decorate([
        core_1.Injectable()
        // @Injectable({
        //   providedIn: "root"
        // })
    ], CoreUtility);
    return CoreUtility;
}());
exports.CoreUtility = CoreUtility;
/*
import * as Application from "tns-core-modules/application";
import * as applicationModul from "tns-core-modules/application";
import { getString, setString } from "application-settings";

export class BackendService {

    static isLoggedIn(): boolean {
        return !!getString("token");
    }

    static get token(): string {
        return getString("token");
    }

    static set token(theToken: string) {
        setString("token", theToken);
    }
}
*/ 
