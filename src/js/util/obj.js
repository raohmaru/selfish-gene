;(function (app) { 'use strict';

app.util = app.util || {};

app.util.extend = function(out) {
	var i = 1,
		key;
	out = out || {};
	for (i; i < arguments.length; i++) {
		if (!arguments[i]) {
			continue;			
		}
		for (key in arguments[i]) {
			if (arguments[i].hasOwnProperty(key)) {
				out[key] = arguments[i][key];
			}
		}
	}
	return out;
};

}(window.app || (window.app = {})));