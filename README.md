#PI Test Globals - index.js

This module is defines some global properties onto an Object which are useful in debugging and testing.

## Installation

Install using `` npm install piTestGlobals``

## Usage

Below is an example on how to use show the line number of your file within the console.

```

 var piTestGlobals = require('piTestGlobals');

 console.log(__line);

```

## Stubs

###__fullStack

Generates the a error stack object and is available globally    

###__line

Gets the current line number from the first item in the full stack

###__functionName

Gets the current function name from the first item in the full stack

###__fileName

Gets the current file name from the first item in the full stack

###__typeName

Gets the current type name from the first item in the full stack

###__column

Gets the current column number from the first item in the full stack

###__stack

Generates a stack from the __fullStack with the following:

* fileName

* typeName

* functionName

* line

* column

* message (at typeName.functionName (fileName:line:column)

