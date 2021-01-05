"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var validateExpression = function (expression, autoCompleteHandler) {
    var result = { isValid: true };
    var expressions = expression.expressions;
    if (expressions === undefined) {
        if (autoCompleteHandler.hasCategory(expression.category) === false) {
            result = {
                isValid: false,
                message: "Invalid category '" + expression.category + "' in expression " + expression.category + " " + expression.operator + " " + expression.value
            };
        }
        else if (autoCompleteHandler.hasOperator(expression.category, expression.operator) === false) {
            result = {
                isValid: false,
                message: "Invalid operator '" + expression.operator + "' in expression " + expression.category + " " + expression.operator + " " + expression.value
            };
        }
    }
    else if (expressions) {
        _.find(expressions, function (expr) {
            result = validateExpression(expr, autoCompleteHandler);
            return result.isValid === false;
        });
    }
    return result;
};
var validateQuery = function (parsedQuery, autoCompleteHandler) {
    var result = { isValid: true };
    _.find(parsedQuery, function (expr) {
        result = validateExpression(expr, autoCompleteHandler);
        return result.isValid === false;
    });
    return result;
};
exports.default = validateQuery;
