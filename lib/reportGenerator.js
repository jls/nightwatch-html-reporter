var fs = require('fs'),
    jade = require('jade'),
    path = require('path'),
    logger = require('./logger');

exports.writeReport = function(opts, testRun, callback){

  var saveFile = typeof opts.saveFile === 'undefined' || opts.saveFile === true;
  var reportPathAndFilename = path.join(opts.reportsDirectory, opts.reportFilename);
  var themeIndexFile = path.join(__dirname, 'themes', opts.themeName, 'index.jade');

  var html = null;
  try{
    html = jade.renderFile(themeIndexFile, {
      pretty: true,
      hideSuccess: opts.hideSuccess,
      testRun: testRun
    });
  } catch(e) {
    return callback(e.toString());
  }

  // This option exists for tests so we
  // can check the generated HTML without actually
  // saving the file.
  if(saveFile)
  {
    logger.log('Saving Report File');
    fs.writeFile(reportPathAndFilename, html, function(err){
      callback(err, reportPathAndFilename, html, testRun);
    });
  }
  else
  {
    callback(null, reportPathAndFilename, html, testRun);
  }

  return reportPathAndFilename;
};