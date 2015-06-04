'use strict';

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
  'file location': function(test) {
    test.expect(1);
    normalize(null, reportObjects.withOneFailure, function(err, normalized) {
      renderer({
        reportsDirectory: __dirname,
        reportFilename: 'testfilename.html',
        themeName: 'default',
        saveFile: false
      }, normalized, function(err, reportFilename, html) {
        test.equal(reportFilename, path.join(__dirname, 'testfilename.html'));
        test.done();
      });
    });

  },

  'shows errors': function(test) {
    test.expect(1);
    normalize(null, reportObjects.withOneError, function(err, normalized) {
      renderer({
        reportsDirectory: __dirname,
        reportFilename: 'testfilename.html',
        themeName: 'default',
        saveFile: false
      }, normalized, function(err, filename, html) {
        test.notEqual(-1, html.indexOf(normalized.errmessages[0].replace(/\"/g, '&quot;')));
        test.done();
      });
    });
  }
};
