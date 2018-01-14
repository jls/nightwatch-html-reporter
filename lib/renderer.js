var fs = require('fs'),
    pug = require('pug'),
    path = require('path'),
    logger = require('./logger');

module.exports = function(opts, testRun, callback) {

  var save = typeof opts.saveFile === 'undefined' || opts.saveFile === true;
  var theme = opts.customTheme
  ? path.join(process.cwd(), opts.customTheme)
  : path.join(__dirname, 'themes', opts.themeName, 'index.pug');
  var outputPath = opts.fullOutputFilename;

  var html = null;
  try {
    html = pug.renderFile(theme, {
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
