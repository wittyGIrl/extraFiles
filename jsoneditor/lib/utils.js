(function() {
  var debounce, toString, utils,
    slice = [].slice;

  toString = Object.prototype.toString;

  debounce = require('lodash.debounce');

  utils = {
    debounce: debounce,
    extend: function() {
      var clone, copy, copyIsArray, i, j, len, name, options, source, special, src, target;
      target = arguments[0], source = 3 <= arguments.length ? slice.call(arguments, 1, i = arguments.length - 1) : (i = 1, []), special = arguments[i++];
      if (target == null) {
        target = {};
      }
      if (special == null) {
        special = [];
      }
      if (typeof target !== "object") {
        target = {};
      }
      for (j = 0, len = source.length; j < len; j++) {
        options = source[j];
        if (options == null) {
          continue;
        }
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (copy && (utils.isObject(copy) || (copyIsArray = utils.isArray(copy))) && !~special.indexOf(name)) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && utils.isArray(src) ? src : [];
            } else {
              clone = src && utils.isObject(src) ? src : {};
            }
            target[name] = utils.extend(clone, copy, special);
          } else if (copy != null) {
            target[name] = copy;
          }
        }
      }
      return target;
    }
  };

  ['String', 'Function', 'Array', 'Number', 'RegExp', 'Object'].forEach(function(type) {
    return utils["is" + type] = function(obj) {
      return toString.apply(obj) === ("[object " + type + "]");
    };
  });

  module.exports = utils;

}).call(this);
