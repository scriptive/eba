"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.language = 1;
    Config.category = 1;
    Config.section = 1;
    Config.page = "home";
    Config.books = [
        {
            id: 1, name: "Zomi", updated: 12355467
        },
        {
            id: 2, name: "English", updated: 12355467
        },
        {
            id: 3, name: "Myanmar", updated: 12355467
        },
        {
            id: 4, name: "NoDaat", updated: 12355467
        }
    ];
    return Config;
}());
exports.Config = Config;
var Environment = /** @class */ (function () {
    function Environment() {
    }
    return Environment;
}());
exports.Environment = Environment;
