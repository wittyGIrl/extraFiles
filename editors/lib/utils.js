'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isNil = isNil;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isFunction = isFunction;
exports.isArray = isArray;
exports.isRegExp = isRegExp;
exports.isDate = isDate;
exports.isObject = isObject;
exports.extend = extend;
exports.debounce = debounce;
var toString = Object.prototype.toString;

function isNil(value) {
  return typeof value === 'undefined' || value === null;
}

function isString(obj) {
  return toString.call(obj) === '[object String]';
}

function isNumber(obj) {
  return toString.call(obj) === '[object Number]';
}

function isBoolean(obj) {
  return toString.call(obj) === '[object Boolean]';
}

function isFunction(obj) {
  return toString.call(obj) === '[object Function]';
}

function isArray(obj) {
  return toString.call(obj) === '[object Array]';
}

function isRegExp(obj) {
  return toString.call(obj) === '[object RegExp]';
}

function isDate(obj) {
  return toString.call(obj) === '[object Date]';
}

function isObject(obj) {
  return toString.call(obj) === '[object Object]';
}

function extend() {
  var options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

  // Handle a deep copy situation
  if (typeof target === "boolean") {
    deep = target;

    // Skip the boolean and the target
    target = arguments[i] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object" && !isFunction(target)) {
    target = {};
  }

  // Extend jQuery itself if only one argument is passed
  if (i === length) {
    target = this;
    i--;
  }

  for (; i < length; i++) {

    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {

      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];

        // Prevent never-ending loop
        if (target === copy) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (isObject(copy) || (copyIsArray = isArray(copy)))) {

          if (copyIsArray) {
            copyIsArray = false;
            clone = src && isArray(src) ? src : [];
          } else {
            clone = src && isObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[name] = extend(deep, clone, copy);

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
}

// https://github.com/developit/decko/blob/master/src/decko.js
function debounce(fn, opts) {
  if (typeof opts === 'function') {
    var p = fn;fn = opts;opts = p;
  }
  var delay = opts && opts.delay || opts || 0,
      args = void 0,
      context = void 0,
      timer = void 0;
  return function () {
    for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
      a[_key] = arguments[_key];
    }

    args = a;
    context = this;
    if (!timer) timer = setTimeout(function () {
      fn.apply(context, args);
      args = context = timer = null;
    }, delay);
  };
}