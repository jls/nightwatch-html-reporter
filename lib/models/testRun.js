var TestSuite = require('./testSuite'),
    TestPackage = require('./testPackage'),
    _ = require('lodash'),
    logger = require('../logger');

module.exports = function(opts){

  this.errmessages = [];
  this.packages = [];
  this.opts = opts;
  this.isFailure = false;

  this._packageCache = {};
  this.addSuite = function(data, moduleName)
  {
    var suite = new TestSuite(data, moduleName);
    var package = null;

    if(this._packageCache[suite.package]) {
      package = this._packageCache[suite.package];
    } else {
      package = new TestPackage(suite.package);
      this._packageCache[suite.package] = package;
      this.packages.push(package);
    }

    if(!opts.hideSuccess || (opts.hideSuccess && suite.isFailure)){
      package.addSuite(suite);
      logger.log('Added Suite to Package: ' + suite.package);
    } else {
      logger.log('Skipped Suite: hideSuccess: ' + opts.hideSuccess + ' isFailure: ' + suite.isFailure);
    }



    if(suite.errmessages && suite.errmessages.length > 0)
      this.addErrorMessages(suite.errmessages);

    // If any of the suites in this test run
    // are failures then the run is marked as a failure.
    if(package.isFailure)
      this.isFailure = true;

  };

  this.addErrorMessages = function(errs)
  {
    this.errmessages = _.uniq(this.errmessages.concat(_.invoke(errs, 'trim')));
  };

};