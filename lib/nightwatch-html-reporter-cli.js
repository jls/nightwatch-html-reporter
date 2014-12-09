#! /usr/bin/env node
/*
 * nightwatch-html-reporter
 * https://github.com/jls/nightwatch-html-reporter
 *
 * Copyright (c) 2014 James Smith
 * Licensed under the MIT license.
 */

var _ = require('lodash'),
		fs = require('fs'),
		nconf = require('nconf'),
		TestSuite = require('./testSuite'),
		ReportGenerator = require('./reportGenerator'),
		readdirp = require('readdirp'),
		open = require('open'),
		path = require('path'),
		xml2js = require('xml2js'),
		parser = new xml2js.Parser();

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

var testSuites = [],
		reportFiles = [];

function generateHTMLReport(testSuites)
{
	ReportGenerator.writeReport(testSuites, opts, function(err, reportPathAndFilename){
		if(err){
			console.log('There was an error generating the report.\n', err);
		} else {
			console.log('Generated Report at: ', reportPathAndFilename);
			if(opts.openBrowser) open(reportPathAndFilename);
		}
	});
}

function handleParsedFile(done, filename, err, result)
{
	_.each(result.testsuites.testsuite, function(suite){
		var testSuite = new TestSuite(suite, filename, _);
		if(!opts.hideSuccess || (opts.hideSuccess && testSuite.isFailure))
			testSuites.push(testSuite);
	});
	done();
}

var stream = readdirp({root: path.resolve(opts.reportsDirectory), fileFilter: "*.xml", entryType: 'files'}, function(errs, results){

	if(errs)
	{
		_.each(errs, function(err){
			console.error('Error: ', err);
		});
		return;
	}

	var files = results.files;
	var done = _.after(files.length, _.bind(generateHTMLReport, this, testSuites));
	var parseCallback = _.curry(handleParsedFile)(done);
	_.each(files, function(entry){
		fs.readFile(entry.fullPath, function(err, data){
			parser.parseString(data, parseCallback(entry.fullPath));
		});
	});

});