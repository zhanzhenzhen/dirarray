Directory Array
===============

Returns files in a directory and all subdirectories recursively.

> (c) Trendalytics Innovation Labs, Inc.
> <info@trendalytics.co>

This utility function will be very useful if you want to "require" all JavaScript
files in a specific directory, especially on Windows platforms, which don't have
the UNIX-like "find" command.

Usage
=====

This utility is an npm package so first make sure you have Node.js installed on your
computer.

```javascript
var dirarray = require('dirarray');
```

Syntax
======

`dirarray(dir, [fileExtensions])`

Where `dir` is the directory you want to walk, and the optional `fileExtensions`
is an array of file extensions. `fileExtensions` defaults to `[".js"]`.

Note: A file extension includes the leading dot character.

Example
=======

For example, if your working directory consists of the following files:

- package.json
- foo.js
- bar/zig.js

Then you call `dirarray(".")`, then the return array will be:

```javascript
["bar/zig.js", "foo.js"]
```

Notes
=====

_**Warning**: File operations are synchronous. So do NOT call the function during
web request processing._
