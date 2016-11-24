;(function (app) { 'use strict';

app.util = app.util || {};

app.util.sgn = function(obj) {
	var events = {};
	
	obj.on = function(eventName, callback) {
		if(!events[eventName]) {
			events[eventName] = [callback];
		}
		else if(!(callback in events[eventName])){
			events[eventName].push(callback);
		}
		return this;
	};
	
	obj.off = function(eventName, callback) {
		if(events[eventName]) {
			var idx = events[eventName].indexOf(callback);
			if(idx > -1) {
				events[eventName].splice(idx, 1);
			}
		}
		return this;
	};
	
	obj.trigger = function(eventName) {
		if(events[eventName]) {
			var funcs = events[eventName],
				len = funcs.length,
				// https://techblog.dorogin.com/javascript-performance-loss-on-incorrect-arguments-using-bd644f5c3ee1
				// args = [].slice.call(arguments, 1),
				args = app.util.argsToArray.call(null, arguments, 1),
				i = 0;
			for(i; i<len; i++) {
				funcs[i].apply(this, args);
			}
		}
		return this;
	};
};

app.util.argsToArray = function(args, startIdx) {
	startIdx = startIdx || 0;
	var sources = new Array(args.length - startIdx);
	for (var _i = startIdx; _i < args.length; _i++) {
		sources[_i - startIdx] = args[_i];
	}
	return sources;
}

}(window.app || (window.app = {})));