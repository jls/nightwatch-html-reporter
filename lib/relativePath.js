var path = require('path');

module.exports = function(outputFilename, screenshotPath) {
  var absOut = path.resolve(outputFilename);
  var absDir = path.dirname(absOut);
  return path.relative(absDir, screenshotPath);
}
