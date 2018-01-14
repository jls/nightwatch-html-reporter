var reportObjects = require('./mockdata/nightwatchReportObjects.js');
var normalize = require('../lib/normalize.js');
var renderer = require('../lib/renderer.js');
var path = require('path');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.reportGenerator = {
  setUp: function(done) {
    done();
  },

  'shows errors': function(test) {
    test.expect(2);
    normalize(null, reportObjects.withOneError, function(err, normalized) {
      renderer({
        reportsDirectory: __dirname,
        reportFilename: 'testfilename.html',
        themeName: 'default',
        saveFile: false
      }, normalized, function(err, filename, html) {
        test.ok(html);
        test.notEqual(-1, html.indexOf(normalized.errmessages[0].replace(/\"/g, '&quot;')));
        test.done();
      });
    });
  },

  'loads custom theme file when provided customTheme opt': function (test) {
    test.expect(2);
    normalize(null, reportObjects.withOneError, function(err, normalized) {
      renderer({
        reportsDirectory: __dirname,
        reportFilename: 'testfilename.html',
        customTheme: 'test/mockdata/custom-theme.pug',
        saveFile: false
      }, normalized, function(err, filename, html) {
        test.ok(html);
        test.equal(true, html.indexOf('a custom theme') !== -1);
        test.done();
      });
    });
  }
};
