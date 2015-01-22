var TestSuite = require('./testSuite'),
	TestGroup = require('./testGroup'),
	path = require('path')
	_ = require('lodash');

module.exports = function(opts){

	this.errmessages = [];
	this.groups = [];
	this.opts = opts;
	this.isFailure = false;

	this._groupCache = {};
	this.addSuite = function(data, moduleName)
	{
		var suite = new TestSuite(data, moduleName);
		var groupName = path.dirname(moduleName.replace(path.resolve(opts.reportsDirectory), ""))
		var group = null;

		if(this._groupCache[groupName]) {
			group = this._groupCache[groupName];
		}	else {
			group = new TestGroup(groupName);
			this._groupCache[groupName] = group;
			this.groups.push(group);
		}

		if(!opts.hideSuccess || (opts.hideSuccess && suite.isFailure))
			group.addSuite(suite, opts);

		if(suite.errmessages && suite.errmessages.length > 0)
			this.addErrorMessages(suite.errmessages);

		// If any of the suites in this test run
		// are failures then the run is marked as a failure.
		if(group.isFailure)
			this.isFailure = true;

	};

	this.addErrorMessages = function(errs)
	{
		this.errmessages = _.uniq(this.errmessages.concat(_.invoke(errs, 'trim')));
	};

};