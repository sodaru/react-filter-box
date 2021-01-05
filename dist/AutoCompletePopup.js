"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var ExtendedCodeMirror_1 = require("./models/ExtendedCodeMirror");
var GrammarUtils_1 = require("./GrammarUtils");
var ReactDOM = require("react-dom");
var React = require("react");
var AutoCompletePopup = /** @class */ (function () {
    function AutoCompletePopup(cm, needAutoCompletevalues) {
        var _this = this;
        this.cm = cm;
        this.needAutoCompletevalues = needAutoCompletevalues;
        this.completionShow = false;
        this.appendSpace = true;
        this.doc = cm.getDoc();
        cm.on("endCompletion", function () {
            _this.completionShow = false;
        });
        this.hintOptions = this.createHintOption();
    }
    AutoCompletePopup.prototype.processText = function (value) {
        if (!_.isString(value)) {
            return value;
        }
        if (GrammarUtils_1.default.needSpaceAfter(value)) {
            return value + " ";
        }
        return value;
    };
    AutoCompletePopup.prototype.onPick = function (cm, self, data) {
        var value = data.value;
        if (this.pick) {
            value = this.pick(cm, self, data);
        }
        if (typeof value !== "string") {
            return;
        }
        cm.replaceRange(this.processText(value), self.from, self.to, "complete");
    };
    AutoCompletePopup.prototype.renderHintElement = function (element, self, data) {
        var _this = this;
        var div = document.createElement("div");
        var className = " hint-value cm-" + data.type;
        var registerAndGetPickFunc = function () {
            //hack with show-hint code mirror https://github.com/codemirror/CodeMirror/blob/master/addon/hint/show-hint.js
            // to prevent handling click event
            element.className += " custom";
            setTimeout(function () {
                element.hintId = null;
            }, 0);
            return _this.manualPick.bind(_this, self, data);
        };
        if (this.customRenderCompletionItem) {
            ReactDOM.render(this.customRenderCompletionItem(self, data, registerAndGetPickFunc), div);
        }
        else {
            ReactDOM.render(React.createElement("div", { className: className }, data.value), div);
        }
        element.appendChild(div);
    };
    AutoCompletePopup.prototype.manualPick = function (self, data, value) {
        var _this = this;
        var completionControl = this.cm.state.completionActive;
        if (completionControl == null)
            return;
        var index = self.list.indexOf(data);
        data.hint = function (cm, self, data) {
            cm.replaceRange(_this.processText(value), self.from, self.to, "complete");
        };
        completionControl.pick(self, index);
    };
    AutoCompletePopup.prototype.buildComletionObj = function (info) {
        return {
            value: info.value,
            type: info.type,
            hint: this.onPick.bind(this),
            render: this.renderHintElement.bind(this)
        };
    };
    AutoCompletePopup.prototype.findLastSeparatorPositionWithEditor = function () {
        var doc = this.cm.getDoc();
        var currentCursor = doc.getCursor();
        var text = doc.getRange({ line: 0, ch: 0 }, currentCursor);
        var index = GrammarUtils_1.default.findLastSeparatorIndex(text);
        return {
            line: currentCursor.line,
            ch: currentCursor.ch - (text.length - index) + 1
        };
    };
    AutoCompletePopup.prototype.show = function () {
        var cursor = this.doc.getCursor();
        var text = this.doc.getRange({ line: 0, ch: 0 }, cursor);
        this.hintOptions.hintValues = this.needAutoCompletevalues(text);
        this.cm.showHint(this.hintOptions);
        this.completionShow = true;
    };
    AutoCompletePopup.prototype.createHintOption = function () {
        var _this = this;
        var hintOptions = new ExtendedCodeMirror_1.HintOptions();
        hintOptions.hint = (function () {
            var hintValues = hintOptions.hintValues;
            var doc = _this.cm.getDoc();
            var cursor = doc.getCursor();
            var lastSeparatorPos = _this.findLastSeparatorPositionWithEditor();
            var text = doc.getRange(lastSeparatorPos, cursor);
            var values = hintValues;
            if (text) {
                values = _.filter(hintValues, function (f) {
                    var value = f.value;
                    return _.isString(f.value) ? _.startsWith(value.toLowerCase(), text.toLowerCase()) : true;
                });
            }
            return {
                list: _.map(values, function (c) { return _this.buildComletionObj(c); }),
                from: lastSeparatorPos,
                to: cursor
            };
        });
        hintOptions.hint.supportsSelection = true;
        return hintOptions;
    };
    return AutoCompletePopup;
}());
exports.default = AutoCompletePopup;
