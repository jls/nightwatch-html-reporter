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
var TestSuite = require('./testSuite');
var ReportGenerator = require('./reportGenerator');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var args = process.argv.slice(2);

if(args.length === 0){
	console.log('Usage: nightwatch-html-reporter <reports-directory> [themeName(default:default)] [reportFilename(default:generatedReport.html)]');
	return;
}

var reportsDirectory = args[0];
var reportThemeName = args[1] || 'default';
var reportFilename = args[2] || 'generatedReport.html';

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