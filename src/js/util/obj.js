;(function (app) { 'use strict';

app.util = app.util || {};

app.util.extend = function(out) {
	var inherit = false,
		i = 1,
		key,
		oldProp,
		newProp;
	if(typeof out === 'boolean') {
		inherit = true;
		out = arguments[1];
		i = 2;
	}
	out = out || {};
	for (i; i < arguments.length; i++) {
		if (!arguments[i]) {
			continue;			
		}
		for (key in arguments[i]) {
			if (arguments[i].hasOwnProperty(key)) {
				oldProp = out[key];
				newProp = arguments[i][key];
				out[key] = newProp;		
				if(inherit && typeof newProp === 'function' && typeof oldProp === 'function' && newProp !== oldProp) {
					out[key].parent = oldProp;
					out[key].parent = (function(p){
						return function(){
							while(p === this) {
								p = p.parent();
							}
							return p;
						};
					})(oldProp);
				}
			}
		}
	}
	return out;
};

app.util.inherits = function(out) {
	var args = [true].concat([].slice.call(arguments))
	return app.util.extend.apply(this, args);
};

}(window.app || (window.app = {})));