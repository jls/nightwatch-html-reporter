// Returns the filename of the report that should
// be saved to disk.
var logger = require('./logger');
var path = require('path');

module.exports = {
  getOutputFilename: function(opts, testRun) {
    var basename = path.basename(opts.reportFilename, '.html');
    var dirname = path.dirname(opts.reportFilename);
    var filename = basename + ((opts.uniqueFilename) ? Date.now() : '') + '.html';
    var outputPath = path.join(opts.reportsDirectory, dirname, filename);
    return outputPath;
  },

  insertSuiteNameIntoFilename: function(fullOutputFilename, suiteName) {
    return fullOutputFilename.replace(/\.html/,'') + '-' + suiteName.replace(/\/|\\/g,'-') + '.html';
  }
};
