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
    ReportGenerator = require('./reportGenerator'),
    open = require('open'),
    async = require('async'),
    normalize = require('./normalize'),
    logger = require('./logger');

module.exports = function(options){

  var opts = _.defaults({}, options, {
    reportsDirectory: __dirname + '/reports',
    openBrowser: true,
    hideSuccess: false,
    reportFilename: 'report.html',
    themeName: 'default',
    logLevel: 1,
    debug: {
      saveNightwatch: false
    }
  });

  logger.setLevel(opts.logLevel);

  this.fn = function(results, done){

    var generateReport = function generateReport(next){

      var normalizeOpts = {fromXML: false, hideSuccess: opts.hideSuccess};
      async.waterfall([
        normalize.bind(this, normalizeOpts, results),
        ReportGenerator.writeReport.bind(this, opts)
      ], function(err, reportFilename){

        if(err){
          logger.error('Error generating report: ' + err.toString());
          return done(err);
        }

        logger.info('HTML Report Generated at: ' + reportFilename);
        if(opts.openBrowser)
          open(reportFilename);

        done();

      });
    };

    async.series([
      function saveResults(next){

        if(opts.debug.saveNightwatch){
          logger.log('Saving Nightwatch Report Object');
          var fs = require('fs');
          fs.writeFile(opts.debug.saveNightwatch, JSON.stringify(results, null, '\t'), function(err) {
            next(err);
          });
        } else {
          next(null);
        }

      },
      generateReport
    ], function(err){
      done(err.toString());
    });

  };

};