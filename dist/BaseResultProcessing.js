"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var BaseResultProcessing = /** @class */ (function () {
    function BaseResultProcessing() {
    }
    BaseResultProcessing.prototype.process = function (data, parsedResult) {
        var _this = this;
        return _.filter(data, function (f) {
            return _this.predicate(f, parsedResult);
        });
    };
    BaseResultProcessing.prototype.predicateSingle = function (item, parsedResult) {
        return this.filter(item, parsedResult.category, parsedResult.operator, parsedResult.value);
    };
    BaseResultProcessing.prototype.predicate = function (item, parsedResult) {
        var _this = this;
        var expressions = null;
        if (_.isArray(parsedResult)) {
            expressions = parsedResult;
        }
        else if (_.isArray(parsedResult.expressions)) {
            expressions = parsedResult.expressions;
        }
        else {
            return this.predicateSingle(item, parsedResult);
        }
        var result = true;
        expressions.forEach(function (f) {
            if (_.isUndefined(f.conditionType)) {
                result = _this.predicate(item, f);
            }
            else if (f.conditionType.toLowerCase() == "and") {
                result = result && _this.predicate(item, f);
            }
            else if (f.conditionType.toLowerCase() == "or") {
                result = result || _this.predicate(item, f);
            }
        });
        return result;
    };
    BaseResultProcessing.prototype.filter = function (row, field, operator, value) {
        return true;
    };
    return BaseResultProcessing;
}());
exports.default = BaseResultProcessing;
