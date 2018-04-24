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

function guid() {
	return (+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
}

exports.formate = formate;
exports.guid = guid;
exports.$ = $;