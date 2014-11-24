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
var _ = require('lodash');
var TestSuite = require('./testSuite');
var ReportGenerator = require('./reportGenerator');
var exec = require('child_process').exec;
module.exports = function(options){

	var opts = _.defaults({}, options, {
		reportsDirectory: __dirname + '/reports',
		openBrowser: true,
		hideSuccess: false,
		reportFilename: 'report.html',
		themeName: 'default'
	});


	this.fn = function(results, callback){

		var testSuites = [];
		// Module keys are test file names (e.g. 'component_guide_tests/ButtonTest')
		Object.keys(results.modules).forEach(function(moduleKey) {
			var testModule = results.modules[moduleKey];
			var suite = new TestSuite(testModule, moduleKey, _);
			if(!opts.hideSuccess || (opts.hideSuccess && suite.isFailure))
				testSuites.push(suite);
		});

		ReportGenerator.writeReport(
			testSuites,
			opts.reportsDirectory,
			opts.themeName,
			opts.reportFilename,
			function(err, reportPathAndFilename){
				if(err){
					console.log('Error generating report.\n' + err);
					return callback(err);
				}

				if(opts.openBrowser){
					exec("open " + reportPathAndFilename);
				} else {
					console.log('HTML Report generated at: ' + reportPathAndFilename);
				}
				callback(err);

			}
		);
	};

};