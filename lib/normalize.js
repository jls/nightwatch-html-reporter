// Accepts either XML data or the report object
// from nightwatch and returns an array of
// TestSuite objects.
var _ = require('lodash'),
		TestRun = require('./testRun');
module.exports = function(data, options){

	var opts = _.defaults({}, options, {fromXML: false, hideSuccess: false});
	var testRun = new TestRun(opts);

	function fromReporter(results){
		testRun.errmessages = testRun.errmessages.concat(results.errmessages);
		_.forOwn(results.modules, function(module, moduleName){

			_.forOwn(module, function(step, stepName){

				step.name = stepName;
				testRun.addSuite(step, moduleName);
			});

		});
		return testRun;
	}

	function fromXML(results){

		// Results will be an array of xml2js parsed objects.
		_.each(results, function(result){

			_.each(result.testsuites.testsuite, function(suite){
				testRun.addSuite(suite, result.filename);
			});

			var compare = function(fst, scd) { return fst.name.localeCompare(scd.name); }
			testRun.groups = testRun.groups.sort(compare)

		});
		return testRun;
	}

	return opts.fromXML ? fromXML(data) : fromReporter(data);

};