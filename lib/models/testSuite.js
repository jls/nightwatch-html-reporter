var TestCase = require ('./testCase');
var _ = require('lodash');
module.exports = function(xmlObj, filename){

  this.filename = filename;

  // $ is defined if we have parsed from xml reports.
  if(xmlObj.$)
  {
    this.name = xmlObj.$.name;
    this.package = xmlObj.$.package;
    this.errors = xmlObj.$.errors;
    this.failures = xmlObj.$.failures;
    this.isFailure = this.failures !== '0' || this.errors !== '0';
    this.tests = xmlObj.$.tests;
    this.testcases = [];
    this.errmessages = xmlObj['system-err'];

    _.each(xmlObj.testcase, function(tcase){
      this.testcases.push(new TestCase(tcase, _));
    }, this);

  }
  else
  {

    var testResult = xmlObj;
    this.name = xmlObj.name;
    this.package = filename;
    this.failures = xmlObj.failed;
    this.errors = xmlObj.errors;
    this.isFailure = this.failures !== 0 || this.errors !== 0;
    this.skipped = xmlObj.skipped;
    this.passed = xmlObj.passed;
    this.testcases = [];

    _.each(xmlObj.tests, function(testStatus){
      this.testcases.push(new TestCase(testStatus));
    }, this);

  }

};