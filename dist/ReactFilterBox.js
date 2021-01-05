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
exports.validateQuery = exports.FilterQueryParser = exports.FilterInput = exports.BaseAutoCompleteHandler = exports.GridDataAutoCompleteHandler = exports.BaseResultProcessing = exports.SimpleResultProcessing = void 0;
var React = require("react");
var FilterInput_1 = require("./FilterInput");
exports.FilterInput = FilterInput_1.default;
var SimpleResultProcessing_1 = require("./SimpleResultProcessing");
exports.SimpleResultProcessing = SimpleResultProcessing_1.default;
var GridDataAutoCompleteHandler_1 = require("./GridDataAutoCompleteHandler");
exports.GridDataAutoCompleteHandler = GridDataAutoCompleteHandler_1.default;
var FilterQueryParser_1 = require("./FilterQueryParser");
exports.FilterQueryParser = FilterQueryParser_1.default;
var BaseResultProcessing_1 = require("./BaseResultProcessing");
exports.BaseResultProcessing = BaseResultProcessing_1.default;
var BaseAutoCompleteHandler_1 = require("./BaseAutoCompleteHandler");
exports.BaseAutoCompleteHandler = BaseAutoCompleteHandler_1.default;
var validateQuery_1 = require("./validateQuery");
exports.validateQuery = validateQuery_1.default;
var ReactFilterBox = /** @class */ (function (_super) {
    __extends(ReactFilterBox, _super);
    function ReactFilterBox(props) {
        var _this = _super.call(this, props) || this;
        _this.parser = new FilterQueryParser_1.default();
        var autoCompleteHandler = _this.props.autoCompleteHandler ||
            new GridDataAutoCompleteHandler_1.default(_this.props.data, _this.props.options);
        _this.parser.setAutoCompleteHandler(autoCompleteHandler);
        _this.state = {
            isFocus: false,
            isError: false
        };
        return _this;
        //need onParseOk, onParseError, onChange, options, data
    }
    ReactFilterBox.prototype.needAutoCompleteValues = function (codeMirror, text) {
        return this.parser.getSuggestions(text);
    };
    ReactFilterBox.prototype.onSubmit = function (query) {
        var result = this.parser.parse(query);
        if (result.isError) {
            return this.props.onParseError(result, { isValid: true });
        }
        else if (this.props.strictMode) {
            var validationResult = validateQuery_1.default(result, this.parser.autoCompleteHandler);
            if (!validationResult.isValid) {
                return this.props.onParseError(result, validationResult);
            }
        }
        return this.props.onParseOk(result);
    };
    ReactFilterBox.prototype.onChange = function (query) {
        var validationResult = { isValid: true };
        var result = this.parser.parse(query);
        if (result.isError) {
            this.setState({ isError: true });
        }
        else if (this.props.strictMode) {
            validationResult = validateQuery_1.default(result, this.parser.autoCompleteHandler);
            this.setState({ isError: !validationResult.isValid });
        }
        else {
            this.setState({ isError: false });
        }
        this.props.onChange(query, result, validationResult);
    };
    ReactFilterBox.prototype.onBlur = function () {
        this.setState({ isFocus: false });
    };
    ReactFilterBox.prototype.onFocus = function () {
        this.setState({ isFocus: true });
    };
    ReactFilterBox.prototype.render = function () {
        var className = "react-filter-box";
        if (this.state.isFocus) {
            className += " focus";
        }
        if (this.state.isError) {
            className += " error";
        }
        return React.createElement("div", { className: className },
            React.createElement(FilterInput_1.default, { autoCompletePick: this.props.autoCompletePick, customRenderCompletionItem: this.props.customRenderCompletionItem, onBlur: this.onBlur.bind(this), onFocus: this.onFocus.bind(this), value: this.props.query, needAutoCompleteValues: this.needAutoCompleteValues.bind(this), onSubmit: this.onSubmit.bind(this), onChange: this.onChange.bind(this), editorConfig: this.props.editorConfig }));
    };
    ReactFilterBox.defaultProps = {
        onParseOk: function () { },
        onParseError: function () { },
        onChange: function () { },
        onDataFiltered: function () { },
        autoCompleteHandler: null,
        onBlur: function () { },
        onFocus: function () { },
        editorConfig: {},
        strictMode: false
    };
    return ReactFilterBox;
}(React.Component));
exports.default = ReactFilterBox;
