"use strict";

var stat = require('fs').statSync;
var find = require('shelljs').find;
var dirname = require('path').dirname;

/**
 * maps
 */

var stats = function (path) {
  var stats = stat(path);
  stats.path = path;
  return stats;
};

var relativeTo = function (base) {
  return function (stats) {
    return stats.path.replace(base, '');
  };
};

/**
 * filters
 */

var not = function (filter) {
  return function () {
    return !filter.apply(null, arguments);
  };
};

var directory = function (stats) {
  return stats.isDirectory();
};

var root = function (path) {
  return path === '.';
};

var uniq = function (item, index, array) {
  return array.indexOf(item) === index;
};

var files = function (path) {
  return find(path).
    map(stats).
    filter(not(directory)).
    map(relativeTo(path));
};

var paths = function (files) {
  return files.
    map(dirname).
    filter(not(root)).
    filter(uniq);
};

module.exports = {
  files: files,
  paths: paths
};
