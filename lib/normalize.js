// Accepts either XML data or the report object
// from nightwatch and returns a normalized
// object structure.
/*
  run: {
    isFailure: t or f
    packages: [{
      name: 'name',
      tests: number of tests
      failures: number of ailures
      isFailure: t or f
      suites: [{
        name: 'name',
        pkgName: 'name from pkg',
        passed: number of tests passed
        failures: number of test failures
        errors: number of test errors
        skipped: number skipped,
        cases: [{
          isFailure: t or f,
          message: 'assertion message',
          stacktrace: empty string or stack trace,
          failure: false or failure message,
          screenshots: ['path/to/screen1', '/path/to/screen2']
        }]
      }]
    }]
  }
*/
var _ = require('lodash'),
    TestRun = require('./models/testRun'),
    logger = require('./logger');

function getScreenshotPath(sysout){
  return sysout[0].replace(/\n/g, '').replace('.png]]', '.png').replace('[[ATTACHMENT|', '').trim();
}

function concatErrMessages(concatTo, errs){
  return _.uniq(concatTo.concat(_.invoke(errs, 'trim')));
}

function parse(str){
  return _.isNaN(str) ? 0 : parseInt(str, 10);
}

var normalizers = {

  // Converts a object parsed from XML report files
  // into models.
  "xml": function(results, run, done){

    _.each(results, function(result){

      var pkg = {
        name: result.testsuites.$.name,
        tests: parse(result.testsuites.$.tests),
        failures: parse(result.testsuites.$.failures),
        suites: []
      };
      pkg.isFailure = pkg.failures > 0;

      var filename = result.filename;
      _.each(result.testsuites.testsuite, function(suiteData){
        var $ = suiteData.$;

        var suite = {
          name: $.name,
          pkgName: $.package,
          failures: parse($.failures),
          errors: parse($.errors),
          skipped: parse($.skipped),
          tests: parse($.tests),
          cases: []
        };

        // Sometimes the package name isn't in the
        // xml reports...
        if(!pkg.name)
          pkg.name = suite.pkgName;

        suite.passed = suite.tests - suite.errors - suite.failures;
        suite.isFailure = suite.errors > 0 || suite.failures > 0;
        suite.errmessages = $['system-err'];
        pkg.suites.push(suite);

        _.each(suiteData.testcase, function(caseData){

          var assert = {
            message: caseData.$.name,
            stacktrace: '',
            failure: false,
            skipped: false,
            screenshots: []
            //failure: false or failure message,
            //screenshots: ['path/to/screen1', '/path/to/screen2']
          };

          if(caseData.skipped)
            assert.skipped = true;

          if(caseData.failure && caseData.failure.length > 0)
            assert.failure = caseData.failure[0].$.message;

          if(caseData['system-out'])
            assert.screenshots.push(getScreenshotPath(caseData['system-out']));

          assert.isFailure = assert.failure;
          suite.cases.push(assert);

          if(assert.isFailure)
            suite.isFailure = true;

        });

        if(suite.isFailure)
          pkg.isFailure = true;

      });


      run.addPackage(pkg);

    });

    done(null, run);
  },

  // Converts an object given to us by nightwatch
  // into models.
  "latest": function(results, run, done){


    run.errmessages = concatErrMessages(run.errmessages, results.errmessages);
    _.forOwn(results.modules, function(pkg, pkgName){

      var npkg = {
        name: pkgName,
        suites: [],
        tests: pkg.tests,
        failures: pkg.failures,
        errors: pkg.errors,
        isFailure: (pkg.failures !== 0 && pkg.errors !== 0)
      };

      _.forOwn(pkg.completed, function(suite, suiteName){

        var nsuite = {
          name: suiteName,
          pkgName: npkg.name,
          passed: suite.passed,
          failures: suite.failed,
          errors: suite.errors,
          skipped: suite.skipped,
          cases: []
        };

        // Little weird here but the report object
        // will not report an error, it will instead
        // have X failed and empty assertions array.
        if(nsuite.failures > 0 && suite.assertions.length === 0)
          nsuite.errors = nsuite.failures;

        nsuite.isFailure = nsuite.failures !== 0 || nsuite.errors !== 0;
        npkg.suites.push(nsuite);

        _.each(suite.assertions, function(assertion){

          var assert = _.clone(assertion, true);
          assert.isFailure = assertion.failure;
          nsuite.cases.push(assert);

          if(assert.isFailure)
            nsuite.isFailure = true;

        });

        if(nsuite.isFailure)
          npkg.isFailure = true;

      });

      run.addPackage(npkg);

      if(npkg.isFailure)
        run.isFailure = npkg.isFailure;

    });

    done(null, run);

  }



};

module.exports = function(options, data, callback){

  var opts = _.defaults({}, options, {fromXML: false, hideSuccess: false});
  var testRun = new TestRun(opts);
  return normalizers[(opts.fromXML) ? 'xml' : 'latest'](data, testRun, callback);

};