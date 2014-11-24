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
	}
}).env();


var reportsDirectory = nconf.get('report-dir');
var reportThemeName = nconf.get('theme');
var reportFilename = nconf.get('output');
var browser = nconf.get('browser');
var openBrowser = browser === true || browser === 'true';

var exec = require('child_process').exec;
var child = exec("find " + reportsDirectory + " -type f -name '*.xml'",
	function(err, stdout, stderr){
		if(err)
			throw err;

		var files = stdout.split('\n');
		var testSuites = [];
		var generateHTMLReport = _.after(files.length - 1, function(testSuites){
			var reportPathAndFilename = ReportGenerator.writeReport(testSuites, reportsDirectory, reportThemeName, reportFilename, function(err, reportPathAndFilename){
				if(err){
					console.log('There was an error generating the report.\n' + err);
				} else {
					console.log('Generated Report at: ' + reportFilename);
					if(openBrowser)
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
						testSuites.push(new TestSuite(suite, filename, _));
					});
					generateHTMLReport(testSuites);
				});
			});

		});
});