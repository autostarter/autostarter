"use strict";

var join = require('path').join;
var mustache = require('mustache');
var shell = require('shelljs');
var template = require('./template');

var test = shell.test;
var mkdir = shell.mkdir;
var cat = shell.cat;

var renderFilePath = function (data) {
  return function (path) {
    return mustache.render(path, data);
  };
};

var autostarter = function (src, dest, data) {
  if (test('-e', dest)) { throw 'error: destination exists'; }

  var files = template.files(src),
      paths = template.paths(files);

  paths.forEach(function (path) {
    var destPath = join(dest, mustache.render(path, data));
    mkdir('-p', destPath);
  });

  files.forEach(function (file) {
    var srcFile = join(src, file),
        destFile = join(dest, mustache.render(file, data));

    mustache.render(cat(srcFile), data)
    .to(destFile);
  });
};

module.exports = autostarter;
