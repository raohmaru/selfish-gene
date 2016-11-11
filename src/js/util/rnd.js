;(function (app) { 'use strict';

app.util = app.util || {};

app.util.random = function(min, max) {
	if(!max) {
		if(!min) {
			min = 1;
		}
		max = min;
		min = 0;
	}
	return Math.random()*(max-min) + min;
}

app.util.randomInt = function(min, max) {
	return parseInt( Math.round( app.util.random(min, max) ) );
}

app.util.randomBool = function(perc) {
	if(perc !== undefined) {
		return Math.random() <= perc;
	}
	return !!Math.round(Math.random());
}

}(window.app || (window.app = {})));