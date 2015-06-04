#! /usr/bin/env node
/*
 * nightwatch-html-reporter
 * https://github.com/jls/nightwatch-html-reporter
 *
 * Copyright (c) 2014 James Smith
 * Licensed under the MIT license.
 */

var fs = require('fs'),
    async = require('async'),
    nconf = require('nconf'),
    renderer = require('./renderer'),
    readdirp = require('readdirp'),
    open = require('open'),
    path = require('path'),
    xml2js = require('xml2js'),
    parseString = xml2js.parseString,
    normalize = require('./normalize');

nconf.argv({
  d: {
    alias: 'report-dir',
    describe: 'Directory where nightwatch reports are stored.',
    demand: true
  },
  t: {
    alias: 'theme',
    describe: 'Name of theme to use.  Should match a directory in lib/themes.',
    default: 'default'
  },
  o: {
    alias: 'output',
    describe: 'Filename to use when saving the generated report.',
    default: 'generatedReport.html'
  },
  b: {
    alias: 'browser',
    describe: 'If true generated report will be opened in the browser.',
    default: true
  },
  c: {
    alias: 'compact',
    describe: 'Hides success cases and only shows error cases.'
  },
  l: {
    alias: 'log-level',
    describe: 'Sets what is logged to the console. 0 - all, 1 - info, 2 - warn, 3 - error',
    default: 1
  },
  'save-nightwatch-report': {
    describe: 'Debug: A filename we use to save the report object passed to us by nightwatch.'
  },
  'save-xml-report': {
    describe: 'Debug: A filename we use to save the parsed XML object from XML reports.'
  }
}).env();

var opts = {
  reportsDirectory: nconf.get('report-dir'),
  themeName: nconf.get('theme'),
  reportFilename: nconf.get('output'),
  openBrowser: nconf.get('browser') === true,
  hideSuccess: typeof (nconf.get('compact')) !== 'undefined',
  logLevel: nconf.get('log-level'),
  debug: {
    saveNightwatch: nconf.get('save-nightwatch-report'),
    saveXML: nconf.get('save-xml-report')
  }
};

var logger = require('./logger.js');
logger.setLevel(opts.logLevel);

logger.info('Reading reports directory...');

var readOpts = {
  root: path.resolve(opts.reportsDirectory),
  fileFilter: '*.xml',
  entryType: 'files'
};

async.waterfall([

  readdirp.bind(readdirp, readOpts),

  function readFiles(results, next) {
    async.map(results.files, function(result, rnext) {
      fs.readFile(result.fullPath, rnext);
    }, next);
  },

  function parseFiles(data, next) {
    async.map(data, parseString, next);
  },

  function saveParsedXML(parsedData, next) {
    if (opts.debug.saveXML) {
      var fs = require('fs');
      fs.writeFile(opts.debug.saveXML, JSON.stringify(parsedData, null, '\t'), function(err) {
        next(err, parsedData);
      });
    } else {
      next(null, parsedData);
    }
  },

  normalize.bind(this, { fromXML: true, hideSuccess: opts.hideSuccess }),

  renderer.bind(this, opts)

], function(err, reportFilename, html, run) {

  if (err)
    return logger.error('Error generating report: ' + err.toString());

  logger.info('Generated Report at: ' + reportFilename);
  if (opts.openBrowser)
    open(reportFilename);

});
