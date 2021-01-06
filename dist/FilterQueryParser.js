"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PEG = require("pegjs");
var _ = require("lodash");
var BaseAutoCompleteHandler_1 = require("./BaseAutoCompleteHandler");
var ParseTrace_1 = require("./ParseTrace");
var GrammarUtils_1 = require("./GrammarUtils");
var grammar_1 = require("./grammar");
var FilterQueryParser = /** @class */ (function () {
    function FilterQueryParser() {
        this.autoCompleteHandler = new BaseAutoCompleteHandler_1.default();
        this.lastError = null;
        this.parseTrace = new ParseTrace_1.default();
        this.parser = null;
        this.parser = PEG.generate(grammar_1.default);
    }
    FilterQueryParser.prototype.parse = function (query) {
        query = _.trim(query);
        if (_.isEmpty(query)) {
            return [];
        }
        try {
            return this.parseQuery(query);
        }
        catch (ex) {
            ex.isError = true;
            return ex;
        }
    };
    FilterQueryParser.prototype.parseQuery = function (query) {
        this.parseTrace.clear();
        return this.parser.parse(query, { parseTrace: this.parseTrace });
    };
    FilterQueryParser.prototype.getSuggestions = function (query) {
        query = GrammarUtils_1.default.stripEndWithNonSeparatorCharacters(query);
        try {
            this.parseQuery(query);
            if (!query || GrammarUtils_1.default.isLastCharacterWhiteSpace(query)) {
                return _.map(["AND", "OR"], function (f) { return { value: f, type: "literal" }; });
            }
            return [];
        }
        catch (ex) {
            return this.autoCompleteHandler.handleParseError(this.parser, this.parseTrace, ex);
        }
    };
    FilterQueryParser.prototype.setAutoCompleteHandler = function (autoCompleteHandler) {
        this.autoCompleteHandler = autoCompleteHandler;
    };
    return FilterQueryParser;
}());
exports.default = FilterQueryParser;
