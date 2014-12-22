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
		normalize = require('./normalize');

module.exports = function(options){

	var opts = _.defaults({}, options, {
		reportsDirectory: __dirname + '/reports',
		openBrowser: true,
		hideSuccess: false,
		reportFilename: 'report.html',
		themeName: 'default'
	});


	this.fn = function(results, callback){

		var testRun = normalize(results, {fromXML: false, hideSuccess: opts.hideSuccess});

		ReportGenerator.writeReport(
			testRun,
			opts,
			function(err, reportPathAndFilename){
				if(err){
					console.log('Error generating report.\n' + err);
					return callback(err);
				}

				if(opts.openBrowser){
					open(reportPathAndFilename);
				} else {
					console.log('HTML Report generated at: ' + reportPathAndFilename);
				}
				callback(err);
			}
		);
	};

};