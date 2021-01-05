"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var GrammarUtils = /** @class */ (function () {
    function GrammarUtils() {
    }
    GrammarUtils.prototype.isSeparator = function (c) {
        return c == " " || c == "\r" || c == "\n" || c == "\t" || c == "(" || c == ")";
    };
    GrammarUtils.prototype.isWhiteSpace = function (c) {
        return c == " " || c == "\r" || c == "\n" || c == "\t";
    };
    GrammarUtils.prototype.findLastSeparatorIndex = function (text) {
        var _this = this;
        return _.findLastIndex(text, function (f) { return _this.isSeparator(f); });
    };
    GrammarUtils.prototype.needSpaceAfter = function (char) {
        return !(char == "(");
    };
    GrammarUtils.prototype.isLastCharacterWhiteSpace = function (text) {
        return !!text && this.isWhiteSpace(text[text.length - 1]);
    };
    GrammarUtils.prototype.stripEndWithNonSeparatorCharacters = function (text) {
        if (!text)
            return text;
        if (this.isSeparator(text[text.length - 1])) {
            return text;
        }
        var index = this.findLastSeparatorIndex(text);
        if (index < 0)
            return "";
        return text.substr(0, index + 1);
    };
    GrammarUtils.prototype.getEndNotSeparatorCharacers = function (text) {
        if (!text)
            return text;
        if (this.isSeparator(text[text.length - 1])) {
            return "";
        }
        var index = this.findLastSeparatorIndex(text);
        if (index < 0)
            return text;
        return text.substr(index + 1);
    };
    return GrammarUtils;
}());
exports.default = new GrammarUtils();
