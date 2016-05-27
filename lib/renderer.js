var fs = require('fs'),
    jade = require('jade'),
    path = require('path'),
    logger = require('./logger');

module.exports = function(opts, testRun, callback) {

  var save = typeof opts.saveFile === 'undefined' || opts.saveFile === true;
  var basename = path.basename(opts.reportFilename, '.html');
  var filename = basename + ((opts.uniqueFilename) ? Date.now() : '') + '.html';
  var outputPath = path.join(opts.reportsDirectory, filename);
  var theme = path.join(__dirname, 'themes', opts.themeName, 'index.jade');

  var html = null;
  try {
    html = jade.renderFile(theme, {
      pretty: true,
      hideSuccess: opts.hideSuccess,
      testRun: testRun
    });
  } catch (e) {
    return callback(e.toString());
  }

  // This option exists for tests so we
  // can check the generated HTML without actually
  // saving the file.
  if (save) {
    logger.log('Saving Report File');
    fs.writeFile(outputPath, html, function(err) {
      callback(err, outputPath, html, testRun);
    });
  } else {
    callback(null, outputPath, html, testRun);
  }

  return outputPath;
};
