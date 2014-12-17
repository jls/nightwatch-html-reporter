var fs = require('fs'),
		jade = require('jade'),
		path = require('path');
exports.writeReport = function(testSuites, options, callback){

	var reportsDirectory = options.reportsDirectory;
	var themeName = options.themeName;
	var reportFilename = options.reportFilename;
	var saveFile = typeof options.saveFile === 'undefined' || options.saveFile === true;

	var reportPathAndFilename = path.join(reportsDirectory, reportFilename);
	var themeIndexFile = path.join(__dirname, 'themes', themeName, 'index.jade');

	// Compile the theme index.
	var themeIndex = jade.compileFile(themeIndexFile, {pretty: true});

	// Render the function
	var html = themeIndex({
		hideSuccess: options.hideSuccess,
		testSuites: testSuites,
		assetPath: function(/* ... */){
			var args = [].slice.call(arguments);
			args.unshift(path.dirname(themeIndexFile));
			return path.join.apply(this, args);
		}
	});

	fs.writeFile(reportPathAndFilename, html, function(err){
		callback(err, reportPathAndFilename);
	});

	return reportPathAndFilename;
};