"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var BaseResultProcessing_1 = require("./BaseResultProcessing");
var SimpleResultProcessing = /** @class */ (function (_super) {
    __extends(SimpleResultProcessing, _super);
    function SimpleResultProcessing(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        return _this;
    }
    SimpleResultProcessing.prototype.tryToGetFieldCategory = function (fieldOrLabel) {
        var found = _.find(this.options, function (f) { return f.columnText == fieldOrLabel; });
        return found ? found.columnField : fieldOrLabel;
    };
    SimpleResultProcessing.prototype.filter = function (row, fieldOrLabel, operator, value) {
        var field = this.tryToGetFieldCategory(fieldOrLabel);
        switch (operator) {
            case "==": return row[field] == value;
            case "!=": return row[field] != value;
            case "contains": return row[field].toLowerCase().indexOf(value.toLowerCase()) >= 0;
            case "!contains": return row[field].toLowerCase().indexOf(value.toLowerCase()) < 0;
        }
        return false;
    };
    return SimpleResultProcessing;
}(BaseResultProcessing_1.default));
exports.default = SimpleResultProcessing;
