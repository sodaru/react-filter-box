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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/display/placeholder");
require("./FilterMode");
require("codemirror/lib/codemirror.css");
require("codemirror/addon/hint/show-hint.css");
var react_codemirror2_1 = require("react-codemirror2");
var GrammarUtils_1 = require("./GrammarUtils");
var AutoCompletePopup_1 = require("./AutoCompletePopup");
var FilterInput = /** @class */ (function (_super) {
    __extends(FilterInput, _super);
    function FilterInput(props) {
        var _this = _super.call(this, props) || this;
        if (props.editorConfig) {
            _this.options = __assign(__assign({}, props.editorConfig), { mode: "filter-mode" });
        }
        return _this;
    }
    FilterInput.prototype.findLastSeparatorPositionWithEditor = function () {
        var doc = this.codeMirror.getDoc();
        var currentCursor = doc.getCursor();
        var text = doc.getRange({ line: 0, ch: 0 }, currentCursor);
        var index = GrammarUtils_1.default.findLastSeparatorIndex(text);
        return {
            line: currentCursor.line,
            ch: currentCursor.ch - (text.length - index) + 1
        };
    };
    FilterInput.prototype.handlePressingAnyCharacter = function () {
        if (this.autoCompletePopup.completionShow) {
            return;
        }
        if (this.props.beforeAutoCompleteShow) {
            this.props.beforeAutoCompleteShow(this.codeMirror);
        }
        this.autoCompletePopup.show();
    };
    FilterInput.prototype.onSubmit = function (text) {
        if (this.props.onSubmit) {
            this.props.onSubmit(text);
        }
    };
    FilterInput.prototype.codeMirrorRef = function (ref) {
        var _this = this;
        if (ref == null)
            return;
        if (this.codeMirror == ref.editor) {
            return;
        }
        this.codeMirror = ref.editor;
        this.doc = ref.editor.getDoc();
        this.autoCompletePopup = new AutoCompletePopup_1.default(this.codeMirror, function (text) {
            return _this.props.needAutoCompleteValues(_this.codeMirror, text);
        });
        this.autoCompletePopup.customRenderCompletionItem = this.props.customRenderCompletionItem;
        this.autoCompletePopup.pick = this.props.autoCompletePick;
        ref.editor.on("beforeChange", function (instance, change) {
            var newtext = change.text.join("").replace(/\n/g, ""); // remove ALL \n !
            change.update(change.from, change.to, [newtext]);
            return true;
        });
        ref.editor.on("changes", function () {
            _this.handlePressingAnyCharacter();
        });
        ref.editor.on("focus", function (cm, e) {
            _this.handlePressingAnyCharacter();
            _this.props.onFocus(e);
        });
        ref.editor.on("blur", function (cm, e) {
            _this.onSubmit(_this.doc.getValue());
            _this.props.onBlur(e);
        });
        ref.editor.on("keyup", function (cm, e) {
            if (e.keyCode == 13) {
                _this.onSubmit(_this.doc.getValue());
            }
        });
    };
    FilterInput.prototype.handleEditorChange = function (_editor, _data, value) {
        this.props.onChange(value);
    };
    FilterInput.prototype.render = function () {
        return (React.createElement(react_codemirror2_1.UnControlled, { ref: this.codeMirrorRef.bind(this), onChange: this.handleEditorChange.bind(this), options: this.options, value: this.props.value }));
    };
    return FilterInput;
}(React.Component));
exports.default = FilterInput;
