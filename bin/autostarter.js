#!/usr/bin/env node
'use strict';

var join = require('path').join;
var test = require('shelljs').test;
var homedir = require('os').homedir();
var minimist = require('minimist');
var autostarter = require('../src/autostarter.js');

var CONFIG_ROOT = '.autostarter';
var TEMPLATE_ROOT = 'root';

/**
 * autostarter <src> <dest> [options]
 */

var argv = minimist(process.argv.slice(2));
var src = join(homedir, CONFIG_ROOT, argv._[0], TEMPLATE_ROOT);
var dest = argv._[1];

if (!src || !dest) { throw 'syntax: autostarter <src> <dest> [options]'; }
if (!test('-d', src)) { throw 'error: not found: ' + src; }

argv.name = dest;
autostarter(src, dest, argv);
