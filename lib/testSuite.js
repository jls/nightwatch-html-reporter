var TestCase = require ('./testCase');
module.exports = function(xmlObj, filename,  _){

	this.filename = filename;

	// $ is defined if we have parsed from xml reports.
	if(xmlObj.$)
	{
		this.name = xmlObj.$.name;
		this.package = xmlObj.$.package;
		this.errors = xmlObj.$.errors;
		this.failures = xmlObj.$.failures;
		this.isFailure = this.failures !== '0';
		this.tests = xmlObj.$.tests;
		this.testcases = [];

		_.each(xmlObj.testcase, function(tcase){
			this.testcases.push(new TestCase(tcase, _));
		}, this);
	}
	else
	{
		// Test keys are test names, keys in a test file (e.g. 'Button Component Test')
		Object.keys(xmlObj).forEach(function(testKey) {

			var testResult = xmlObj[testKey];
			this.name = testKey;
			this.package = filename;
			this.failures = testResult.failed;
			this.isFailure = this.failures !== 0;
			this.errors = testResult.errors;
			this.skipped = testResult.skipped;
			this.passed = testResult.passed;
			this.testcases = [];

			testResult.tests.forEach(function(testStatus){
				this.testcases.push(new TestCase(testStatus));
			}, this);

		}, this);
	}

};