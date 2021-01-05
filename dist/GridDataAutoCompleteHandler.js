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
var BaseAutoCompleteHandler_1 = require("./BaseAutoCompleteHandler");
var _ = require("lodash");
var GridDataAutoCompleteHandler = /** @class */ (function (_super) {
    __extends(GridDataAutoCompleteHandler, _super);
    function GridDataAutoCompleteHandler(data, options) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.options = options;
        _this.cache = {};
        _this.parseResult = null;
        _this.categories = _.map(_this.options, function (f) {
            if (f.columnText)
                return f.columnText;
            return f.columnField;
        });
        return _this;
    }
    GridDataAutoCompleteHandler.prototype.hasCategory = function (category) {
        var found = _.find(this.options, function (f) {
            return (category === f.columnField || category === f.columnText);
        });
        return found !== undefined;
    };
    GridDataAutoCompleteHandler.prototype.hasOperator = function (category, operator) {
        return this.needOperators(category).indexOf(operator) >= 0;
    };
    GridDataAutoCompleteHandler.prototype.needCategories = function () {
        return this.categories;
    };
    GridDataAutoCompleteHandler.prototype.needOperators = function (parsedCategory) {
        // parsedCategory = this.tryToGetFieldCategory(parsedCategory);
        var found = _.find(this.options, function (f) {
            return f.customOperatorFunc != null && (f.columnText == parsedCategory || f.columnField == parsedCategory);
        });
        if (found) {
            return found.customOperatorFunc(parsedCategory);
        }
        return ["==", "!=", "contains", "!contains"];
    };
    GridDataAutoCompleteHandler.prototype.needValues = function (parsedCategory, parsedOperator) {
        // parsedCategory = this.tryToGetFieldCategory(parsedCategory);
        var found = _.find(this.options, function (f) { return f.columnField == parsedCategory || f.columnText == parsedCategory; });
        if (found != null && found.type == "selection" && this.data != null) {
            if (!this.cache[parsedCategory]) {
                this.cache[parsedCategory] = _.chain(this.data).map(function (f) { return f[parsedCategory]; }).uniq().value();
            }
            return this.cache[parsedCategory];
        }
        if (found != null && found.customValuesFunc) {
            return found.customValuesFunc(parsedCategory, parsedOperator);
        }
        return [];
    };
    return GridDataAutoCompleteHandler;
}(BaseAutoCompleteHandler_1.default));
exports.default = GridDataAutoCompleteHandler;
