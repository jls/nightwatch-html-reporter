var TestSuite = require('./testSuite'),
		_ = require('lodash');

module.exports = function(name){

	this.isFailure = false;
	this.name = name;
	this.suites = [];

	this.addSuite = function(suite)
	{
		this.suites.push(suite);

		if(suite.isFailure)
			this.isFailure = true;
	};

};