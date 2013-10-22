///#PI Test Globals - index.js
///This module is defines some global properties onto an Object which are useful in debugging and testing.
(function () {    
    //create the default object
    var pitestglobals = {};

    // global on the server, window in the browser
    var root = this;

    ///## Installation
    ///Install using `` npm install pitestglobals``

    ///## Usage
    ///Below is an example on how to use show the line number of your file within the console.
    ///```
    /// var pitestglobals = require('pitestglobals');
    /// console.log(__line);
    ///```

    ///## Stubs

    ///###__fullStack
    ///Generates the a error stack object and is available globally    
    Object.defineProperty(global, '__fullStack', {
        get: function () {
            var orig = Error.prepareStackTrace;
            Error.prepareStackTrace = function (_, stack) { return stack; };
            var err = new Error;
            Error.captureStackTrace(err, arguments.callee);
            var stack = err.stack;
            Error.prepareStackTrace = orig;
            return stack;
        }
    });

    ///###__line
    ///Gets the current line number from the first item in the full stack
    Object.defineProperty(global, '__line', {
        get: function () {
            return __fullStack[1].getLineNumber();
        }
    });

    ///###__functionName
    ///Gets the current function name from the first item in the full stack
    Object.defineProperty(global, '__functionName', {
        get: function () {
            return __fullStack[1].getFunctionName();
        }
    });

    ///###__fileName
    ///Gets the current file name from the first item in the full stack
    Object.defineProperty(global, '__fileName', {
        get: function () {
            return __fullStack[1].getFileName();
        }
    });

    ///###__typeName
    ///Gets the current type name from the first item in the full stack
    Object.defineProperty(global, '__typeName', {
        get: function () {
            return __fullStack[1].getTypeName();
        }
    });

    ///###__column
    ///Gets the current column number from the first item in the full stack
    Object.defineProperty(global, '__column', {
        get: function () {
            return __fullStack[1].getColumnNumber();
        }
    });

    ///###__stack
    ///Generates a stack from the __fullStack with the following:
    ///* fileName
    ///* typeName
    ///* functionName
    ///* line
    ///* column
    ///* message (at typeName.functionName (fileName:line:column)
    Object.defineProperty(global, '__stack', {
        get: function () {
            var errors = [];
            var stack = __fullStack;
            for (var x = 1; x < stack.length; x++) {
                if (stack[x].getFunctionName() !== 'logger.error') {
                    var err = {};
                    err.fileName = stack[x].getFileName();
                    err.functionName = stack[x].getFunctionName();
                    err.typeName = stack[x].getTypeName();
                    err.line = stack[x].getLineNumber();
                    err.column = stack[x].getColumnNumber();
                    err.message = 'at ' + err.typeName + '.' + err.functionName + ' (' + err.fileName + ':' + err.line + ':' + err.column + ')';
                    errors.push(err);
                }
            }
            return errors;
        }
    });

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return pitestglobals;
        });
    }
    // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = pitestglobals;
    }
    // included directly via <script> tag
    else {
        root.pitestglobals = pitestglobals;
    }
} ());
