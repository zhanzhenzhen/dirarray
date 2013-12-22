// Directory Array
// ===============
//
// Recursively return an array of files in a directory by specifying the type
// of files through extension. The returned array does not include the directory
// nor the current directory as `./`.
// 
// For example, if a directory containing the following files:
// 
// -  foo.js
// -  bar/zig.js
//
// The return array will be:
// 
//     ['foo', 'bar/zig']
//
// Options can be set to included the extension for each returned file.
//
// This utility function will be very useful to `require` all JavaScript files
// in a specific directory.
// 
// _**Warning**: Some operations are synchronous. Use it only during application
// initialization and termination._
//
// _TODO: Turn the library function to an actual module, and submit to NPM
// registry._
// 
// There are a few more existing modules:
//
// -  safedir
// -  recursive-readdir
// 
// Just search them by `npm search directory array`.
// 
// > (c) Trendalytics Innovation Labs, Inc.
// > <info@trendalytics.co>

'use strict';


// Module dependencies.
var fs = require('fs');

// Set default extension to JavaScript files.
var DEFAULT_FILE_EXTENSION = 'js';

// Recursively return an array of files in a directory.
//
// Use `options` to further tweak the behavior of the returned array. If a
// different extension needs to set, use `extension` property. Default to `js`.
//
// _FIXME: `dir` must be fully qualified directory._
// 
// _Note: This is method is synchronous._
function dirarray(dir, options) {
  var arr   = []; // Resulting array
  var files = fs.readdirSync(dir);

  if (options === undefined) {
    options = {};
  }
  if (options.fileExtension === undefined) {
    options.fileExtension = DEFAULT_FILE_EXTENSION;
  }

  files.forEach(function (file) {
    var stats = fs.lstatSync(dir + '/' + file);

    if (stats.isFile()) {
      // Skip file with the wrong extension.
      if (file.search('.' + options.fileExtension) === -1) {
        return;
      }

      arr.push(file.replace('.' + options.fileExtension, ''));
    } else if (stats.isDirectory()) {
      // _TODO: Test: make sure directory and subdirectory all work._
      arr = arr.concat(dirarray(dir + '/' + file, {
        extension: options.fileExtension
      }));
    } else {
      // _TODO: Programming error._
      console.error(new Date().toISOString() + ' Not a file nor a directory: ' + file + '.' + options.fileExtension);
    }
  });

  return arr;
}
module.exports = dirarray;

// Quick test cases.
// console.log(dirarray('./endpoints', { prefix: '/' }));
// console.log(dirarray('./endpoints', { extension: 'yml', addExtension: true }));
// console.log(dirarray('./fixme', { addExtension: true }));
