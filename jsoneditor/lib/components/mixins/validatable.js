(function() {
  var Validatable, rules;

  rules = {
    ASCII: function(value) {
      var flag;
      flag = !/[^a-zA-Z0-9]/.test(value);
      if (flag) {
        return !/^[0-9]/.test(value);
      }
      return flag;
    }
  };

  Validatable = {
    validate: function(rule, value) {
      if (rules[rule]) {
        return rules[rule](value);
      }
      return true;
    }
  };

  module.exports = Validatable;

}).call(this);
