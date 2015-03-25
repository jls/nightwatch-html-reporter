var levels = ['log', 'info', 'warn', 'error'];
var ret = {
  level: 1,
  setLevel: function(level){
    this.level = level;
  }
};

levels.forEach(function(fn, index){
  ret[fn] = function(){
    if(typeof console === 'undefined')
      return;

    if(index >= ret.level)
      console[fn].apply(console, arguments);
  };
});

module.exports = ret;