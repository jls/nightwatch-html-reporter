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
    logLevel: 1
  });

  logger.setLevel(opts.logLevel);
  this.fn = function(results, callback){

    async.waterfall([

      normalize.bind(this, {fromXML: false, hideSuccess: opts.hideSuccess}, results),
      ReportGenerator.writeReport.bind(this, opts)

    ], function(err, reportFilename){

      if(err){
        logger.error('Error generating report: ' + err.toString());
        return callback(err);
      }

      logger.info('HTML Report Generated at: ' + reportFilename);
      if(opts.openBrowser)
        open(reportFilename);

      callback();

    });

  };

};