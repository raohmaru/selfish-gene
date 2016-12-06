;(function (sge) { 'use strict';

sge.rnd = sge.rnd || {};

sge.rnd.random = function(min, max) {
	if(!max) {
		if(!min) {
			min = 1;
		}
		max = min;
		min = 0;
	}
	return Math.random()*(max-min) + min;
}

sge.rnd.randomInt = function(min, max) {
	return parseInt( Math.round( sge.rnd.random(min, max) ) );
}

sge.rnd.randomBool = function(perc) {
	if(perc !== undefined) {
		return Math.random() <= perc;
	}
	return !!Math.round(Math.random());
}

}(window.sge || (window.sge = {})));