;(function (sge) { 'use strict';

sge.obj = sge.obj || {};
var toString = Object.prototype.toString;

sge.obj.typeOf = function (obj) {
	if (obj === null) {
		return "null";
	}
	var type = typeof(obj);
	if (type == "undefined" || type == "number" || type == "string" || type == "boolean") {
		return type;
	}
	return toString.call(obj).slice(8, -1).toLowerCase();
};

sge.obj.extend = function(out) {
	var key,
		obj;
		// copy,
		// type;
	out = out || {};
	for (var i=1, len=arguments.length; i<len; i++) {
		obj = arguments[i];
		if (!obj) {
			continue;			
		}
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				out[key] = obj[key];				
				// copy = obj[key];
				// type = sge.obj.typeOf(copy);
				// if(type == "object") {
					// out[key] = sge.obj.extend({}, copy);
				// } else if(type == "array") {
					// out[key] = sge.obj.extend([], copy);
				// } else {
					// out[key] = copy;
				// }
			}
		}
	}
	return out;
};

sge.obj.callNew = function(F, args) {
	args.unshift(F);
	return new (Function.prototype.bind.apply(F, args));
};

// sge.obj.inherits = function (child, parent) {
	// var Temp = function () {};
	// var Func = function () {
		// parent.apply(this, arguments);
		// child.apply(this, arguments);
		// this.constructor = child;
	// };
	// Func.__super__ = parent.prototype;
	// Temp.prototype = parent.prototype;
	// Func.prototype = new Temp();
	// return Func;
// };

sge.obj.inherits = function (child, parent) {
	var Temp = function () {};
	var Func = function () {
		this.constructor = child;
	};	
	Func.prototype = parent.prototype;
	child.prototype = new Func();
	child.__super__ = parent.prototype;
	return child;
};

}(window.sge || (window.sge = {})));