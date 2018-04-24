'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('editors/lib/utils');

Object.keys(_utils).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function get() {
			return _utils[key];
		}
	});
});


function formate(str, params) {
	if (!str) return;
	for (var key in params) {
		if (params.hasOwnProperty(key)) {
			str = str.replace(new RegExp('\\{' + key + '\\}', 'g'), params[key]);
		}
	}
	return str;
}

exports.formate = formate;