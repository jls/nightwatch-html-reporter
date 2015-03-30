var TestCase = require ('./testCase');
var _ = require('lodash');

function parse(str){
  return _.isNaN(str) ? 0 : parseInt(str, 10);
}

module.exports = function(xmlObj, filename){


  this.filename = filename;

  // $ is truthy if we are initialized
  // from a parsed XML report.
  var $ = xmlObj.$ || false;
  var data = $ ? xmlObj.$ : xmlObj;

  this.name = data.name;
  this.package = $ ? data.package : filename;
  this.failures = $ ? parse(data.failures) : data.failed;
  this.errors = $ ? parse(data.errors) : data.errors;
  this.isFailure = this.failures !== 0 || this.errors !== 0;
  this.skipped = $ ? parse(data.skipped) : data.skipped;
  this.passed = $ ? null : data.passed;
  this.testcases = [];

  // In XML reports error messages are concat'd
  // and added to every testSuite. In the nightwatch
  // report objects they are on the top level report object.
  if($)
    this.errmessages = xmlObj['system-err'];

  _.each($ ? xmlObj.testcase : data.tests, function(tcase){
    this.testcases.push(new TestCase(tcase));
  }, this);

};