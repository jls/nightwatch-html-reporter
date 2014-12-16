'use strict';

var nightwatch_html_reporter = require('../lib/nightwatch-html-reporter.js');
var reportObjects = require('./nightwatchReportObjects.js');
var xmlObjects = require('./parsedXMLObject.js');
var _ = require('lodash');
var normalize = require('../lib/normalize.js');

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

exports['normalize xml object'] = {
	setUp: function(done){
		done();
	},
	'fromXML option': function(test){
		var normalized = normalize([xmlObjects.withOneError], {fromXML: true});

		test.equal(normalized.length, 3);
		test.equal(normalized[0].isFailure, false, "Correctly determine isFailure");
		test.equal(normalized[0].testcases.length, 2, "Correct number of test cases");
		test.equal(normalized[2].isFailure, true, "Correctly determine isFailure on error");
		test.done();
	}
};

exports['normalize report object'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'no options': function(test) {
    var normalized = normalize(reportObjects.withOneFailure);

    test.equal(normalized.length, 3);
    test.equal(normalized[0].isFailure, false, "Correctly determine isFailure");
    test.equal(normalized[0].testcases.length, 2, "Correct number of test cases");
    test.equal(normalized[2].isFailure, true, "Correctly determine isFailure");
    test.done();
  },

	'hideSuccess option': function(test){
		var normalized = normalize(reportObjects.withOneFailure, {hideSuccess: true});
		test.equal(normalized.length, 1);
		test.equal(normalized[0].name, 'step three');
		test.done();
	}
};
