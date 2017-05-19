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
var mockParsed = require('./mockdata/parsedxmlobjs_0-6-4.js');
var mockReport = require('./mockdata/nightwatchReport_0-6-4.js');
function createRun(opts, validateCallback) {
  var mock = (opts.fromXML) ? mockParsed : mockReport;
  normalize(opts, mock.mockData, function(err, run) {
    validateCallback(run);
  });
}

exports['normalize xml object'] = {
  setUp: function(done) {

    done();
  },
  'fromXML option': function(test) {
    createRun({ fromXML: true }, function(run) {

      // console.log(JSON.stringify(run, null, '\t'));

      test.equal(run.packages[0].name, 'GoogleTest');

      test.equal(run.packages[0].suites.length, 1);
      test.equal(run.packages[0].suites[0].isFailure, false);
      test.equal(run.packages[0].suites[0].cases.length, 3);
      test.equal(run.packages[0].suites[0].cases[0].message, 'Element <body> was visible after 52 milliseconds.');

      // Second package has 1 suite and it is failing
      test.equal(run.packages[1].name, 'FailingGoogleTest');
      test.equal(run.packages[1].suites[0].cases.length, 1);
      test.equal(run.packages[1].suites[0].isFailure, true);
      test.equal(run.packages[1].suites[0].failures, 1);
      test.equal(run.packages[1].suites[0].cases[0].message, 'Failing test Google');
      test.equal(run.packages[1].suites[0].cases[0].failure,
        'Timed out while waiting for element <button[name=btnGFAIL]> to be present for 1000 milliseconds.');
      test.equal(run.packages[1].suites[0].cases[0].screenshots.length, 2);

      // jscs:disable
      test.equal(run.packages[1].suites[0].cases[0].screenshots[0],
        '/Users/userOne/code/nightwatch/nightwatch-tests/tests/nightwatch/screenshots/ERROR_Mon-Apr-20-2015-175522-GMT-0400.png');
      test.equal(run.packages[1].suites[0].cases[0].screenshots[1],
        '/Users/userOne/code/nightwatch/nightwatch-tests/tests/nightwatch/screenshots/ERROR_Mon-Apr-20-2015-175523-GMT-0400.png');
      // jscs:enable

      test.equal(run.packages[2].suites[0].cases.length, 2);
      test.equal(run.packages[2].suites[0].isFailure, true);
      test.equal(run.packages[2].suites[0].cases[0].message, 'Error Multistep Test');
      test.equal(run.packages[2].suites[0].cases[1].message, 'error Multistep Test Part 2');

      test.equal(run.packages[5].suites[0].name, 'SkippedTest');
      test.equal(run.packages[5].suites[0].cases.length, 3);
      test.equal(run.packages[5].suites[0].cases[0].skipped, true);
      test.equal(run.packages[5].suites[0].skipped, 3);

      test.done();
    });

  },

  'hideSuccess option': function(test) {
    createRun({ fromXML: true, hideSuccess: true }, function(run) {

      test.equal(run.packages.length, 3);
      test.equal(run.packages[0].suites[0].name, 'FailingGoogleTest');

      test.done();
    });
  }
};

exports['normalize report object'] = {
  'no options': function(test) {
    createRun({}, function(run) {

      test.equal(run.packages.length, 5);

      // GoogleTest
      test.equal(run.packages[0].name, 'FailingGoogleTest');
      test.equal(run.packages[0].suites.length, 1);
      test.equal(run.packages[0].suites[0].isFailure, true);
      test.equal(run.packages[0].suites[0].cases.length, 2);
      test.equal(run.packages[0].suites[0].cases[0].message, 'Element <body> was visible after 49 milliseconds.');
      test.equal(run.packages[0].suites[0].cases[1].failure, 'Expected \'visible\' but got: \'not found\'');

      // jscs:disable
      test.equal(run.packages[0].suites[0].cases[1].screenshots[0],
        '/Users/userOne/code/nightwatch/nightwatch-tests/tests/nightwatch/screenshots/ERROR_Mon-Apr-20-2015-172756-GMT-0400.png');
      // jscs:enable

      test.equal(run.packages[1].name, 'FailingMultiStepTest');
      test.equal(run.packages[1].isFailure, true);
      test.equal(run.packages[1].suites[1].isFailure, true);
      test.equal(run.packages[1].suites[1].cases.length, 0);

      test.done();

    });
  }

};
