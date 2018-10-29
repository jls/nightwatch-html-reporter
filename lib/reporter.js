/*
 * nightwatch-html-reporter
 * https://github.com/jls/nightwatch-html-reporter
 *
 * A reporter for nightwatch that generates HTML reports.
 * Example nightwatch/globals.js:
 * var HtmlReporter = require('nightwatch-html-reporter');
 * var htmlReporter = new HtmlReporter({openBrowser: true, reportsDirectory: __dirname + '/reports'});
 * module.exports = {
 *   reporter: htmlReporter.fn
 * }
 * Copyright (c) 2014 James Smith
 * Licensed under the MIT license.
 */
var _ = require('lodash'),
    renderer = require('./renderer'),
    open = require('opn'),
    async = require('async'),
    normalize = require('./normalize'),
    logger = require('./logger'),
    filenameHelpers = require('./outputFilename');

module.exports = function(options) {

  var opts = _.defaults({}, options, {
    reportsDirectory: __dirname + '/reports',
    openBrowser: true,
    hideSuccess: false,
    reportFilename: 'report.html',
    uniqueFilename: false,
    relativeScreenshots: false,
    themeName: 'default',
    logLevel: 1,
    fromXML: false, // Always false for reporter interface.
    debug: {
      saveNightwatch: false
    }
  });

  logger.setLevel(opts.logLevel);
  opts.fullOutputFilename = filenameHelpers.getOutputFilename(opts);

  this.fn = function(results, done) {
    if (opts.separateReportPerSuite) {
      opts.fullOutputFilename = filenameHelpers.insertSuiteNameIntoFilename(
        opts.fullOutputFilename,
        _.last(Object.keys(results.modules))
      );
    }
    var generate = function generate(next) {

      async.waterfall([
        normalize.bind(this, opts, results),
        renderer.bind(this, opts)
      ], function(err, reportFilename) {

        if (err) {
          logger.error('Error generating report: ' + err.toString());
          return next(err);
        }

        logger.info('HTML Report Generated at: ' + reportFilename);
        if (opts.openBrowser)
          open(reportFilename);

        next();

      });
    };

    async.series([
      function saveResults(next) {
        if (opts.debug.saveNightwatch) {
          logger.log('Saving Nightwatch Report Object');
          var fs = require('fs');
          fs.writeFile(opts.debug.saveNightwatch, JSON.stringify(results, null, '\t'), function(err) {
            next(err);
          });
        } else {
          next(null);
        }
      },
      generate
    ], function(err) {
      done(err);
    });

  };

};
