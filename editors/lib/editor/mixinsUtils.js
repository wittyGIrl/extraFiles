'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounced = debounced;
exports.validate = validate;

var _utils = require('../utils');

function debounced(func, delay) {
  if (func) {
    if (delay) {
      return (0, _utils.debounce)(func, delay);
    } else {
      return func;
    }
  }
  return null;
} /*
  * component 相关的工具方法
  */


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

function validate(rule, value) {
  if (rules[rule]) {
    return rules[rule](value);
  }
  return true;
}