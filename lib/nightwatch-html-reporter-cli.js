#! /usr/bin/env node
/*
 * nightwatch-html-reporter
 * https://github.com/jls/nightwatch-html-reporter
 *
 * Copyright (c) 2014 James Smith
 * Licensed under the MIT license.
 */

var _ = require('lodash');
var fs = require('fs');
var nconf = require('nconf');
var TestSuite = require('./testSuite');
var ReportGenerator = require('./reportGenerator');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

nconf.argv({
	'd': {
		alias: 'report-dir',
		describe: 'Directory where nightwatch reports are stored.',
		demand: true
	},
	't': {
		alias: 'theme',
		describe: 'Name of theme to use.  Should match a directory in lib/themes.',
		default: 'default'
	},
	'o': {
		alias: 'output',
		describe: 'Filename to use when saving the generated report.',
		default: 'generatedReport.html'
	},
	'b': {
		alias: 'browser',
		describe: 'If true generated report will be opened in the browser.',
		default: true
	},
	'c': {
		alias: 'compact',
		describe: 'Hides success cases and only shows error cases.'
	}
}).env();

var opts = {
	reportsDirectory: nconf.get('report-dir'),
	themeName: nconf.get('theme'),
	reportFilename: nconf.get('output'),
	openBrowser: nconf.get('browser') === true || nconf.get('browser') === true,
	hideSuccess: typeof(nconf.get('compact')) !== 'undefined'
};

var exec = require('child_process').exec;
var child = exec("find " + opts.reportsDirectory + " -type f -name '*.xml'",
	function(err, stdout, stderr){
		if(err)
			throw err;

		var files = stdout.split('\n');
		var testSuites = [];
		var generateHTMLReport = _.after(files.length - 1, function(testSuites){
			var reportPathAndFilename = ReportGenerator.writeReport(testSuites, opts, function(err, reportPathAndFilename){
				if(err){
					console.log('There was an error generating the report.\n' + err);
				} else {
					console.log('Generated Report at: ' + reportPathAndFilename);
					if(opts.openBrowser)
						exec("open " + reportPathAndFilename);
				}
			});
		});

		_.each(files, function(filename){
			if(filename === '')
				return;

			fs.readFile(filename, function(err, data){
				parser.parseString(data, function(err, result){
					_.each(result.testsuites.testsuite, function(suite){
						var testSuite = new TestSuite(suite, filename, _);
						if(!opts.hideSuccess || (opts.hideSuccess && testSuite.isFailure))
							testSuites.push(testSuite);
					});
					generateHTMLReport(testSuites);
				});
			});

		});
});