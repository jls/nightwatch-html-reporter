var TestPackage = require('./testPackage'),
	_ = require('lodash');

module.exports = function(name){

	this.isFailure = false;
	this.name = name;
	this.packages = [];

	this.addSuite = function(suite, opts)
	{
		var package = new TestPackage(suite.package)
		this.packages.push(package);

		if(!opts.hideSuccess || (opts.hideSuccess && suite.isFailure))
			package.addSuite(suite);

		if(package.isFailure)
			this.isFailure = true;
	};

};