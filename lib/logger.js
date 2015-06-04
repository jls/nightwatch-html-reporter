var util = require('util');
var levels = ['log', 'info', 'warn', 'error'];
var ret = {
  level: 1,
  setLevel: function(level) {
    this.level = level;
  },
  obj: function(object, method) {
    this[method](util.inspect(object, false, null));
  }
};

levels.forEach(function(fn, index) {
  ret[fn] = function() {
    if (typeof console === 'undefined')
      return;

    if (index >= ret.level) {

      if (!console[fn])
        fn = 'log';

      console[fn].apply(console, arguments);
    }
  };
});

module.exports = ret;
