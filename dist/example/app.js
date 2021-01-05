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
require("fixed-data-table/dist/fixed-data-table.min.css");
require("../ReactFilterBox.less");
require("./app.less");
var demo1_1 = require("./demo1");
var demo2_1 = require("./demo2");
var demo3_1 = require("./demo3");
var react_hot_loader_1 = require("react-hot-loader");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h2", { style: { textAlign: "center" } }, "React Filter Box"),
            React.createElement(demo1_1.default, null),
            React.createElement(demo2_1.default, null),
            React.createElement(demo3_1.default, null)));
    };
    return App;
}(React.Component));
exports.default = react_hot_loader_1.hot(module)(App);
