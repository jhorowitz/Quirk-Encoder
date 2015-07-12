var convertToCraziness;
convertToCraziness = (function () {
    "use strict";
    var zero, one, toString, digitConv, numberConv, stringConv, commandConv, obfuscatedCommandConv;

    zero = "+[]";
    one = "++[[]][+[]]";

    toString = function (n) {
        return "[" + n + "]" + "+[]";
    };

    digitConv = function (digit) {
        var result;
        digit = parseInt(digit);
        if (digit === 0) {
            return zero;
        }
        result = one;
        for (var i = 1; i < digit; i++) {
            result += "+ " + one
        }
        return result;
    };

    numberConv = function (n) {
        var result;

        n += "";
        result = "";
        for (var i = 0; i < n.length; i++) {
            if (result.length > 0) {
                result += "+";
            }
            result += toString(digitConv(n[i]))
        }
        return result;
    };

    stringConv = function (str) {
        var result, converter;
        result = [];
        converter = ".map(function(x){return String.fromCharCode(x)}).reduce(function(a,b){return a+b})";

        for (var i = 0; i < str.length; i++) {
            result.push(numberConv(str.charCodeAt(i)));
        }
        return "[" + result + "]" + converter;
    };

    commandConv = function (cmd) {
        return "eval(" + stringConv(cmd) + ")";
    };

    obfuscatedCommandConv = function (cmd) {
        return numberConv("3784320974634534")+ ";" + commandConv(cmd) + ";"
    };

    stringConv.number = numberConv;
    stringConv.string = stringConv;
    stringConv.command = commandConv;
    stringConv.obfuscatedCommand = obfuscatedCommandConv;

    return stringConv;
})();

var message = "Hello, I'm Josh";

console.log(convertToCraziness(message));
console.log(eval(convertToCraziness(message)));