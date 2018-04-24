"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
* validate rule
*/
// do the right thing

var rules = {
  //仅数字和字母
  ASCII: function ASCII(value) {
    var flag = !/[^a-zA-Z0-9]/.test(value);
    if (flag) {
      //以数字开头
      return !/^[0-9]/.test(value);
    }
    return flag;
  },

  //仅数字
  number: function number(value) {
    return !isNaN(value - 0);
  }
};

var Validatable = {
  _validate: function _validate(rule, value) {
    if (rules[rule]) {
      return rules[rule](value);
    }
    return true;
  }
};

exports.default = Validatable;