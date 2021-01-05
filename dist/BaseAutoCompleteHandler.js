"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var BaseAutoCompleteHandler = /** @class */ (function () {
    function BaseAutoCompleteHandler() {
    }
    BaseAutoCompleteHandler.prototype.quote = function (text) {
        if (/\s/g.test(text)) {
            return "\"" + text + "\"";
        }
        return text;
    };
    BaseAutoCompleteHandler.prototype.buildDefaultObjOrGetOriginal = function (value, type) {
        if (_.isString(value)) {
            return {
                value: this.quote(value),
                type: type
            };
        }
        return {
            value: value,
            type: type
        };
    };
    BaseAutoCompleteHandler.prototype.handleParseError = function (parser, parseTrace, error) {
        var _this = this;
        var trace = parseTrace;
        return _.flatMap(error.expected, function (f) {
            var result = [];
            if (f.type == "literal") {
                result = _.map([f.text || f.value], function (f) { return { value: f, type: "literal" }; });
            }
            if (f.type == "other") {
                var lastTokenType = trace.getLastTokenType() || "value";
                if (lastTokenType == "value") {
                    result = _.map(_this.needCategories(), function (f) { return _this.buildDefaultObjOrGetOriginal(f, "category"); });
                }
                if (lastTokenType == "category") {
                    result = _.map(_this.needOperators(trace.getLastCategory()), function (f) { return _this.buildDefaultObjOrGetOriginal(f, "operator"); });
                }
                if (lastTokenType == "operator") {
                    result = _.map(_this.needValues(trace.getLastCategory(), trace.getLastOperator()), function (f) { return _this.buildDefaultObjOrGetOriginal(f, "value"); });
                }
            }
            return result;
        });
    };
    BaseAutoCompleteHandler.prototype.hasCategory = function (category) {
        return false;
    };
    BaseAutoCompleteHandler.prototype.hasOperator = function (category, operator) {
        return false;
    };
    BaseAutoCompleteHandler.prototype.needCategories = function () {
        return [];
    };
    BaseAutoCompleteHandler.prototype.needOperators = function (lastOperator) {
        return [];
    };
    BaseAutoCompleteHandler.prototype.needValues = function (lastCategory, lastOperator) {
        return [];
    };
    return BaseAutoCompleteHandler;
}());
exports.default = BaseAutoCompleteHandler;
