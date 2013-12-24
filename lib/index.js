// Directory Array
// ===============
//
// Returns files in a directory and all subdirectories recursively.
//
// > (c) Trendalytics Innovation Labs, Inc.
// > <info@trendalytics.co>

'use strict';

var fs   = require('fs');
var path = require('path');
var us   = require('underscore.string');

var DEFAULT_FILE_EXTENSIONS = ['.js'];

// Note: To list all files regardless of extensions, we can use a trick of
// passing `[""]` to the second argument.
function dirarray(dir, fileExtensions) {
  // Determine whether to set default `fileExtensions`.
  if (fileExtensions === undefined) {
    fileExtensions = DEFAULT_FILE_EXTENSIONS;
  }

  var files = fs.readdirSync(dir);

  var result = [];

  files.forEach(function (file) {
    var filePath = path.join(dir, file);
    var stats = fs.statSync(filePath);

    if (stats.isFile()) {
      if (fileExtensions.some(function(m) {
        return us.endsWith(file, m);
      })) {
        result.push(filePath);
      }
    } else if (stats.isDirectory()) {
      // Recursively call `dirarray` to walk subdirectories. It will be better that
      // we have an inner "recursive-only" function. But since our module is small,
      // it may be not necessary because it will add complexity.
      result = result.concat(dirarray(filePath, fileExtensions));
    } else {
      throw new Error('Not a file or directory: ' + filePath);
    }
  });

  return result;
}

module.exports = dirarray;
