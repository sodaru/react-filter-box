"use strict";
/*
 * Grammar
 * ==========================
 *
 * Accepts expressions like: nha == nhat AND (nhat == nha or "nhat " contains "tt") OR nhat == "test"
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "\n\n{\n  var parseTrace = options.parseTrace;\n}\n\nExpression\n  = _ head:Condition tail:(ws (\"AND\"i / \"OR\"i) ws Condition)* _ {\n      var result = [head]\n\n      for (var i = 0; i < tail.length; i++) {\n        var current = tail[i][3];\n        current.conditionType = tail[i][1];\n        result.push(current);\n      }\n\n      return result;\n    }\n\nCondition\n  = \"(\" _ expr:Expression _ \")\" \n  \t\t{   \n        \treturn {expressions:expr}; \n        }\n  / ThreeFactorCondition \n  \nThreeFactorCondition\n  = category:ValidName ws operator:Operator ws value:ValidValue \n  \t\t\t{ \n            \t\n            \treturn {\n                \tcategory : category,\n                    operator: operator,\n                    value: value\n                }; \n            } \n  \nOperator \"operator\"\n  = ValidToken+  { parseTrace.pushOperator(text()); return text(); }\n  \n\nValidValue \"value\"\n  = ValidToken+ { parseTrace.pushValue(text() ); return text(); }  \n  /\"\\\"\" name:[^\\\"]* \"\\\"\" {\n        var value = name.join(\"\");\n        parseTrace.pushValue(value);\n        return value;\n      }\nValidName  \"category\"\n  = ValidToken+ { parseTrace.pushCategory(text() ); return text(); }  \n  /\"\\\"\" name:[^\\\"]* \"\\\"\" {\n        var value = name.join(\"\");\n        parseTrace.pushCategory(value);\n        return value;\n      }\nValidToken\n  = [^ \\(\\)\\\"\\t\\n\\r]\n\nws \"whitespace\"\n  = [ \\t\\n\\r]+\n  \n_ \"whitespace\"\n  = [ \\t\\n\\r]*\n\n";
