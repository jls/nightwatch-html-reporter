var reportObjects = require('./mockdata/nightwatchReportObjects.js');
var normalize = require('../lib/normalize.js');
var getOutputFilename = require('../lib/outputFilename.js').getOutputFilename;
var insertSuiteNameIntoFilename = require('../lib/outputFilename.js').insertSuiteNameIntoFilename;
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
    normalize(null, reportObjects.withOneFailure, function(err, normal) {
      this.normalized = normal;
      done();
    }.bind(this));
  },

  'file location': function(test) {
    test.expect(1);
    var opts = {
      reportsDirectory: __dirname,
      reportFilename: 'testfilename.html'
    };
    var filename = getOutputFilename(opts, this.normalized);
    test.equal(filename, path.join(__dirname, 'testfilename.html'));
    test.done();
  },

  'file location relative': function(test) {
    test.expect(1);
    var opts = {
      reportsDirectory: __dirname,
      reportFilename: '../outputTest/testfilename.html'
    };
    var filename = getOutputFilename(opts, this.normalized);
    test.equal(filename, path.join(__dirname, '..', 'outputTest', 'testfilename.html'));
    test.done();
  },

  'generates a unique filename': function(test) {
    var opts = {
      reportsDirectory: __dirname,
      reportFilename: 'testfilename.html',
      uniqueFilename: true
    };
    var filename = getOutputFilename(opts, this.normalized);
    test.ok(filename.match(/testfilename\d+\.html/));
    test.done();
  },

  'generates a unique relative filename': function(test) {
    var opts = {
      reportsDirectory: __dirname,
      reportFilename: '../outputTest/testfilename.html',
      uniqueFilename: true
    };
    var filename = getOutputFilename(opts, this.normalized);
    test.ok(filename.match(/testfilename\d+\.html/));
    test.done();
  },

  'inserts suite name into filename': function(test) {
    var opts = {
      reportsDirectory: __dirname,
      reportFilename: '../outputTest/testfilename.html'
    };
    var filename = getOutputFilename(opts, this.normalized);
    filename = insertSuiteNameIntoFilename(filename, 'SpecialSuiteName');
    test.ok(filename.indexOf('testfilename-SpecialSuiteName.html') != -1);
    test.done();
  },

  'inserts suite name into filename removing group slashes': function(test) {
    var opts = {
      reportsDirectory: __dirname,
      reportFilename: '../outputTest/testfilename.html'
    };
    var filename = getOutputFilename(opts, this.normalized);
    filename = insertSuiteNameIntoFilename(filename, 'MyGroup/SpecialSuiteName');
    console.log(filename);
    test.ok(filename.indexOf('testfilename-MyGroup-SpecialSuiteName.html') != -1);
    test.done();
  }

};
