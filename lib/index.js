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
var DEFAULT_EXTENSION = 'js';

// Set default prefix to add to each returned file.
var DEFAULT_PREFIX    = '';

// Recursively return an array of files in a directory.
//
// Use `options` to further tweak the behavior of the returned array. If a
// different extension needs to set, use `extension` property. Default to `js`.
// If all the returned files need to include file extension, set `addExtension`
// to `true`. If a prefix is needed, set `prefix` to proper value. The prefix
// is useful to when defining routes '/routes'.
//
// _FIXME: `dir` must be fully qualified directory._
// 
// _Note: This is method is synchronous._
function dirarray(dir, options) {
  var arr   = []; // Resulting array
  var files = fs.readdirSync(dir);

  if (!options) {
    options = {};
  }

  options.extension    = options.extension    || DEFAULT_EXTENSION;
  options.addExtension = options.addExtension || false;
  options.prefix       = options.prefix       || DEFAULT_PREFIX;

  files.forEach(function (file) {
    // It is not recommended to have symbolic links in the directory, because
    // [fs.lstat()][] method is used, which will not follow symbolic links.
    //
    // [fs.lstat()]: http://nodejs.org/api/fs.html#fs_fs_lstat_path_callback
    var stats = fs.lstatSync(dir + '/' + file);

    if (stats.isFile()) {
      // Skip file with the wrong extension.
      if (file.search('.' + options.extension) === -1) {
        return;
      }

      if (options.addExtension) {
        arr.push(options.prefix + file);
      } else {
        arr.push(options.prefix + file.replace('.' + options.extension, ''));
      }
    } else if (stats.isDirectory()) {
      // _TODO: Test: make sure directory and subdirectory all work._
      arr = arr.concat(dirarray(dir + '/' + file, {
        extension: options.extension,
        addExtension: options.addExtension,
        prefix: options.prefix + file + '/',
      }));
    } else {
      // _TODO: Programming error._
      console.error(new Date().toISOString() + ' Not a file nor a directory: ' + options.prefix + file + '.' + options.extension);
    }
  });

  return arr;
}
module.exports = dirarray;

// Quick test cases.
// console.log(dirarray('./endpoints', { prefix: '/' }));
// console.log(dirarray('./endpoints', { extension: 'yml', addExtension: true }));
// console.log(dirarray('./fixme', { addExtension: true }));
