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
var fixed_data_table_1 = require("fixed-data-table");
require("fixed-data-table/dist/fixed-data-table.min.css");
var data_1 = require("./data");
var ReactFilterBox_1 = require("../ReactFilterBox");
var Demo1 = /** @class */ (function (_super) {
    __extends(Demo1, _super);
    function Demo1(props) {
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
        return _this;
    }
    Demo1.prototype.onParseOk = function (expressions) {
        var newData = new ReactFilterBox_1.SimpleResultProcessing(this.options).process(data_1.default, expressions);
        this.setState({ data: newData });
        console.log(newData);
    };
    Demo1.prototype.render = function () {
        var rows = this.state.data;
        return React.createElement("div", { className: "main-container" },
            React.createElement("h3", null,
                "Default setting, support filter data out of the box ",
                React.createElement("span", { style: { fontSize: 12, color: "darkgray" } }, "(select Status will show values auto complete) "),
                React.createElement("a", { style: { fontSize: 12, color: "#2196F3" }, href: "https://github.com/nhabuiduc/react-filter-box/blob/master/js-example/src/demo1.js" }, "Source")),
            React.createElement(ReactFilterBox_1.default, { query: this.state.query, data: data_1.default, options: this.options, onParseOk: this.onParseOk.bind(this) }),
            React.createElement(fixed_data_table_1.Table, { rowHeight: 50, rowsCount: rows.length, width: 800, height: 300, headerHeight: 50 },
                React.createElement(fixed_data_table_1.Column, { header: React.createElement(fixed_data_table_1.Cell, null, "Name"), cell: function (_a) {
                        var rowIndex = _a.rowIndex;
                        return (React.createElement(fixed_data_table_1.Cell, null, rows[rowIndex].Name));
                    }, width: 200 }),
                React.createElement(fixed_data_table_1.Column, { header: React.createElement(fixed_data_table_1.Cell, null, "Description"), cell: function (_a) {
                        var rowIndex = _a.rowIndex;
                        return (React.createElement(fixed_data_table_1.Cell, null, rows[rowIndex].Description));
                    }, width: 200 }),
                React.createElement(fixed_data_table_1.Column, { header: React.createElement(fixed_data_table_1.Cell, null, "Status"), cell: function (_a) {
                        var rowIndex = _a.rowIndex;
                        return (React.createElement(fixed_data_table_1.Cell, null, rows[rowIndex].Status));
                    }, width: 200 }),
                React.createElement(fixed_data_table_1.Column, { header: React.createElement(fixed_data_table_1.Cell, null, "Email"), cell: function (_a) {
                        var rowIndex = _a.rowIndex;
                        return (React.createElement(fixed_data_table_1.Cell, null, rows[rowIndex].Email));
                    }, width: 200 })));
    };
    return Demo1;
}(React.Component));
exports.default = Demo1;
