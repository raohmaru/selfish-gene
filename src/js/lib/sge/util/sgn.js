;(function (sge) { 'use strict';

sge.util = sge.util || {};

sge.util.sgn = function(obj) {
	var events = {};
	
	obj.on = function(eventName, callback, context) {
		if(context) {
			callback = [callback, context];
		}
		if(!events[eventName]) {
			events[eventName] = [callback];
		}
		else if(!(callback in events[eventName])){
			events[eventName].push(callback);
		}
		return this;
	};
	
	obj.off = function(eventName, callback, context) {
		if(events[eventName]) {
			if(callback) {
				var funcs = events[eventName],
					func,
					ctx;
				for(var i=0, len=funcs.length; i<len; i++) {
					func = funcs[i];
					ctx = null;
					if(func instanceof Array) {
						ctx = func[1];
						func = func[0];
					}
					if(func === callback && (!context || context === ctx)) {
						break;
					}
				}
				if(i < len) {
					events[eventName].splice(i, 1);
				}
			} else {
				delete events[eventName];
			}
		} else if(!eventName) {
			events = null;
			delete this.on;
			delete this.off;
			delete this.emit;
		}
		return this;
	};
	
	obj.emit = function(eventName) {
		if(events[eventName]) {
			var funcs = events[eventName],
				// https://techblog.dorogin.com/javascript-performance-loss-on-incorrect-arguments-using-bd644f5c3ee1
				// args = [].slice.call(arguments, 1),
				// args = sge.util.argsToArray.call(null, arguments, 1),
				func,
				ctx;
			for(var i=0, len=funcs.length; i<len; i++) {
				func = funcs[i];
				ctx = this;
				if(func instanceof Array) {
					ctx = func[1];
					func = func[0];
				}
				func.apply(ctx, arguments);
			}
		}
		return this;
	};
};

sge.util.argsToArray = function(args, startIdx) {
	startIdx = startIdx || 0;
	var sources = new Array(args.length - startIdx);
	for (var _i = startIdx; _i < args.length; _i++) {
		sources[_i - startIdx] = args[_i];
	}
	return sources;
}

}(window.sge || (window.sge = {})));