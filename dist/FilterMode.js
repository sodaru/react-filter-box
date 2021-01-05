"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CodeMirror = require("codemirror");
CodeMirror.defineMode("filter-mode", function (config, modeOptions) {
    function getNextFieldState(fieldState) {
        if (fieldState == FieldStates.category)
            return FieldStates.operator;
        if (fieldState == FieldStates.operator)
            return FieldStates.value;
        if (fieldState == FieldStates.value)
            return FieldStates.category;
    }
    function setNextFieldState(state) {
        var nextFieldState = getNextFieldState(state.fieldState);
        var currentFieldState = state.fieldState;
        state.fieldState = nextFieldState;
        return currentFieldState.toString();
    }
    function isEmpty(char) {
        return char == " " || char == "\r" || char == "\n" || char == "\t";
    }
    return {
        startState: function () {
            return {
                inString: false,
                fieldState: FieldStates.category
            };
        },
        token: function (stream, state) {
            if (isEmpty(stream.peek())) {
                stream.eatSpace();
                return null;
            }
            if (stream.peek() == "(" || stream.peek() == ")") {
                stream.next();
                return "bracket";
            }
            if (stream.match("AND", true, true) || stream.match("OR", true, true)) {
                return "condition";
            }
            // If a string starts here
            if (!state.inString && stream.peek() == '"') {
                stream.next(); // Skip quote
                state.inString = true; // Update state
            }
            if (state.inString) {
                if (stream.skipTo('"')) { // Quote found on this line
                    stream.next(); // Skip quote
                    state.inString = false; // Clear flag
                }
                else {
                    stream.skipToEnd(); // Rest of line is string
                }
                return setNextFieldState(state); // Token style
            }
            stream.eatWhile(/[^\r\n\t\s\(\)]+/);
            return setNextFieldState(state);
        }
    };
});
var FieldStates = /** @class */ (function () {
    function FieldStates() {
    }
    FieldStates.none = "none";
    FieldStates.category = "category";
    FieldStates.operator = "operator";
    FieldStates.value = "value";
    return FieldStates;
}());
