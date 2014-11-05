var fs = require('fs');
var _ = require('lodash');
var jade = require('jade');
exports.writeReport = function(testSuites, reportDirectory, themeName, reportFilename, callback){

	var dir = (reportDirectory[reportDirectory.length - 1] === '/') ? reportDirectory : reportDirectory + '/';
	var reportPathAndFilename = dir + reportFilename;

	var themeDirectory = __dirname + '/themes/' + themeName + '/';

	// Compile the theme index.
	var themeIndex = jade.compileFile(themeDirectory + 'index.jade', {pretty: true});

	// Render the function
	var html = themeIndex({
		themeDirectory: themeDirectory,
		testSuites: testSuites
	});

	fs.writeFile(reportPathAndFilename, html, function(err){
		callback(err, reportPathAndFilename);
	});

	return reportPathAndFilename;
};