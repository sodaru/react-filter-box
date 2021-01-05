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
var React = require("react");
var _ = require("lodash");
require("fixed-data-table/dist/fixed-data-table.min.css");
var data_1 = require("./data");
var ReactFilterBox_1 = require("../ReactFilterBox");
//extend this class to add your custom operator
var CustomAutoComplete = /** @class */ (function (_super) {
    __extends(CustomAutoComplete, _super);
    function CustomAutoComplete() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // override this method to add new your operator
    CustomAutoComplete.prototype.needOperators = function (parsedCategory) {
        var result = _super.prototype.needOperators.call(this, parsedCategory);
        return result.concat(["startsWith"]);
    };
    return CustomAutoComplete;
}(ReactFilterBox_1.GridDataAutoCompleteHandler));
var CustomResultProcessing = /** @class */ (function (_super) {
    __extends(CustomResultProcessing, _super);
    function CustomResultProcessing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // override this method to add your handler for startsWith operator
    CustomResultProcessing.prototype.filter = function (row, fieldOrLabel, operator, value) {
        var field = this.tryToGetFieldCategory(fieldOrLabel);
        switch (operator) {
            case "==": return row[field] == value;
            case "!=": return row[field] != value;
            case "contains": return row[field].toLowerCase().indexOf(value.toLowerCase()) >= 0;
            case "!contains": return row[field].toLowerCase().indexOf(value.toLowerCase()) < 0;
            case "startsWith": return _.startsWith(row[field].toLowerCase(), value.toLowerCase());
        }
        return false;
    };
    return CustomResultProcessing;
}(ReactFilterBox_1.SimpleResultProcessing));
var Demo2 = /** @class */ (function (_super) {
    __extends(Demo2, _super);
    function Demo2(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            data: data_1.default
        };
        _this.options = [
            {
                columnField: "Name",
                type: "text"
            },
            {
                columnField: "Description",
                type: "text"
            },
            {
                columnField: "Status",
                type: "selection"
            },
            {
                columnText: "Email @",
                columnField: "Email",
                type: "text"
            }
        ];
        _this.customAutoComplete = new CustomAutoComplete(data_1.default, _this.options);
        return _this;
    }
    //customer your rendering item in auto complete
    Demo2.prototype.customRenderCompletionItem = function (self, data, pick) {
        var className = " hint-value cm-" + data.type;
        return React.createElement("div", { className: className },
            React.createElement("span", { style: { fontWeight: "bold" } }, data.value),
            React.createElement("span", { style: { color: "gray", fontSize: 10 } },
                " [",
                data.type,
                "] "));
    };
    Demo2.prototype.onParseOk = function (expressions) {
        var newData = new CustomResultProcessing(this.options).process(data_1.default, expressions);
        this.setState({ data: newData });
        // console.log(newData);
    };
    Demo2.prototype.render = function () {
        var rows = this.state.data;
        return React.createElement("div", { className: "main-container" },
            React.createElement("h3", null,
                "Custom Rendering (AutoComplete, Operator) ",
                React.createElement("a", { style: { fontSize: 12, color: "#2196F3" }, href: "https://github.com/nhabuiduc/react-filter-box/blob/master/js-example/src/demo2.js" }, "Source")),
            React.createElement(ReactFilterBox_1.default, { autoCompleteHandler: this.customAutoComplete, customRenderCompletionItem: this.customRenderCompletionItem.bind(this), query: this.state.query, data: data_1.default, options: this.options, onParseOk: this.onParseOk.bind(this) }));
    };
    return Demo2;
}(React.Component));
exports.default = Demo2;
