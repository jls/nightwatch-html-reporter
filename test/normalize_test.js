'use strict';

var reportObjects = require('./mockdata/nightwatchReportObjects.js');
var xmlObjects = require('./mockdata/parsedxmlobjs.js');
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
    normalize({fromXML: true}, [xmlObjects.withOneError], function(err, run){
      test.equal(run.packages[0].suites.length, 3);
      test.equal(run.packages[0].suites[0].isFailure, false, "Correctly determine isFailure");
      test.equal((run.packages[0].suites[0].failures === 0), true);
      test.equal(run.packages[0].suites[0].testcases.length, 2, "Correct number of test cases");
      test.equal(run.packages[0].suites[2].isFailure, true, "Correctly determine isFailure on error");
      test.done();
    });
  },

  'hideSuccess option': function(test){
    normalize({fromXML: true, hideSuccess: true}, [xmlObjects.withOneError], function(err, run){
      test.equal(run.packages[0].suites.length, 1);
      test.equal(run.packages[0].suites[0].name, 'step four');
      test.done();
    });
  },

  'retains error messages': function(test){
    normalize({fromXML: true}, [xmlObjects.withOneError], function(err, run){
      test.equal(run.errmessages.length, 1);
      test.done();
    });
  }
};

exports['normalize report object'] = {
  setUp: function(done) {
    done();
  },
  'no options': function(test) {
    normalize(null, reportObjects.withOneFailure, function(err, run){
      test.equal(run.packages[0].suites.length, 3);
      test.equal(run.packages[0].suites[0].isFailure, false, "Correctly determine isFailure");
      test.equal(run.packages[0].suites[0].testcases.length, 2, "Correct number of test cases");
      test.equal(run.packages[0].suites[2].isFailure, true, "Correctly determine isFailure");
      test.done();
    });
  },

  'hideSuccess option': function(test){
    normalize({hideSuccess: true}, reportObjects.withOneFailure, function(err, run){
      test.equal(run.packages[0].suites.length, 1);
      test.equal(run.packages[0].suites[0].name, 'step three');
      test.done();
    });
  },

  'retains error messages': function(test){
    normalize(null, reportObjects.withOneError, function(err, run){
      test.equal(run.errmessages.length, 1);
      test.done();
    });
  }
};
