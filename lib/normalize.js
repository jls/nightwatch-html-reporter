// Accepts either XML data or the report object
// from nightwatch and returns an array of
// TestSuite objects.
var _ = require('lodash'),
		TestSuite = require('./testSuite');
module.exports = function(data, options){

	var opts = _.defaults({}, options, {fromXML: false, hideSuccess: false});

	function fromReporter(results){
		var testSuites = [];
		_.forOwn(results.modules, function(module, moduleName){

			_.forOwn(module, function(step, stepName){

				step.name = stepName;
				var testSuite = new TestSuite(step, moduleName);
				if(!opts.hideSuccess || (opts.hideSuccess && testSuite.isFailure))
					testSuites.push(testSuite);
			});

		});
		return testSuites;
	}

	function fromXML(results){
		var testSuites = [];

		// Results will be an array of xml2js parsed objects.
		_.each(results, function(result){

			_.each(result.testsuites.testsuite, function(suite){
				var tsuite = new TestSuite(suite, result.filename);
				if(!opts.hideSuccess || (opts.hideSuccess && tsuite.isFailure))
					testSuites.push(tsuite);
			});

		});
		return testSuites;
	}

	return opts.fromXML ? fromXML(data) : fromReporter(data);

};