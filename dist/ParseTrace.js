"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var ParseTrace = /** @class */ (function () {
    function ParseTrace() {
        this.arr = [];
        this.arr = [];
    }
    ParseTrace.prototype.push = function (item) {
        this.arr.push(item);
        // console.log(item);;
    };
    ParseTrace.prototype.clear = function () {
        this.arr = [];
    };
    ParseTrace.prototype.getLastOperator = function () {
        // console.log("last");
        return _.findLast(this.arr, function (f) { return f.type == "operator"; }).value;
    };
    ParseTrace.prototype.getLastCategory = function () {
        return _.findLast(this.arr, function (f) { return f.type == "category"; }).value;
    };
    ParseTrace.prototype.getLastTokenType = function () {
        if (this.arr.length <= 0)
            return null;
        return _.last(this.arr).type;
    };
    ParseTrace.prototype.pushOperator = function (operator) {
        this.push({ type: "operator", value: operator });
    };
    ParseTrace.prototype.pushCategory = function (category) {
        this.push({ type: "category", value: category });
    };
    ParseTrace.prototype.pushValue = function (value) {
        this.push({ type: "value", value: value });
    };
    return ParseTrace;
}());
exports.default = ParseTrace;
