var fs = require('fs'),
		jade = require('jade'),
		path = require('path');
exports.writeReport = function(testSuites, opts, callback){

	var saveFile = typeof opts.saveFile === 'undefined' || opts.saveFile === true;
	var reportPathAndFilename = path.join(opts.reportsDirectory, opts.reportFilename);
	var themeIndexFile = path.join(__dirname, 'themes', opts.themeName, 'index.jade');

	// Compile the theme index.
	var themeIndex = jade.compileFile(themeIndexFile, {pretty: true});

	// Render the function
	var html = themeIndex({
		hideSuccess: opts.hideSuccess,
		testSuites: testSuites,
		assetPath: function(/* ... */){
			var args = [].slice.call(arguments);
			args.unshift(path.dirname(themeIndexFile));
			return path.join.apply(this, args);
		}
	});

	// This option exists for tests so we
	// can check the generated HTML without actually
	// saving the file.
	if(saveFile)
	{
		fs.writeFile(reportPathAndFilename, html, function(err){
			callback(err, reportPathAndFilename, html);
		});
	}
	else
	{
		callback(null, reportPathAndFilename, html);
	}


	return reportPathAndFilename;
};