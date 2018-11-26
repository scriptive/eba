"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// @Injectable()
var BookService = /** @class */ (function () {
    function BookService() {
        this.books = new Array({
            id: 1, name: "Zomi", updated: 12355467
        }, {
            id: 2, name: "English", updated: 12355467
        }, {
            id: 3, name: "Myanmar", updated: 12355467
        }, {
            id: 4, name: "NoDaat", updated: 12355467
        });
        // tmp(book: Book) {
        //     return new Promise((resolve, reject) => {
        //     });
        // }
    }
    BookService.prototype.getBooks = function () {
        return this.books;
    };
    BookService.prototype.getBook = function (id) {
        return this.books.filter(function (book) { return book.id === id; })[0];
    };
    BookService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], BookService);
    return BookService;
}());
exports.BookService = BookService;
