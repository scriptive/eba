"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_1 = require("../shared");
var book_1 = require("../shared/book");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(
    // private router: Router,
    bookService, nav, util) {
        this.bookService = bookService;
        this.nav = nav;
        this.util = util;
        this.activePageTitle = "EBA";
        // NOTE: ?
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home",
            moduleId: module.id,
            templateUrl: "./component.html",
        }),
        __metadata("design:paramtypes", [book_1.BookService,
            shared_1.CoreNavigation,
            shared_1.CoreUtility])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
