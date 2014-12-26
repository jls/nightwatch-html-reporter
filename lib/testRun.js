var TestSuite = require('./testSuite'),
		_ = require('lodash');
module.exports = function(opts){
	this.errmessages = [];
	this.suites = [];
	this.opts = opts;
	this.isFailure = false;

	this.addSuite = function(data, moduleName)
	{
		var suite = new TestSuite(data, moduleName);
		if(!opts.hideSuccess || (opts.hideSuccess && suite.isFailure))
			this.suites.push(suite);

		if(suite.errmessages && suite.errmessages.length > 0)
			this.addErrorMessages(suite.errmessages);

		// If any of the suites in this test run
		// are failures then the run is marked as a failure.
		if(suite.isFailure)
			this.isFailure = true;

	};

	this.addErrorMessages = function(errs)
	{
		this.errmessages = _.uniq(this.errmessages.concat(_.invoke(errs, 'trim')));
	};
};