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
				args = [].slice.call(arguments, 1),
				i = 0;
			for(i; i<len; i++) {
				funcs[i].apply(this, args);
			}
		}
		return this;
	};
};

}(window.app || (window.app = {})));