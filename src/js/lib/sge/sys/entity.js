;(function (sge) { 'use strict';

sge.sys = sge.sys || {};
var defaults = {};
	
var Class = function(attrs){
	this._baseAttrs = sge.obj.extend({}, defaults, attrs);
	this._traits = {};	
	Class.__super__.constructor.call(this);
};
Class = sge.obj.inherits(Class, sge.sys.GameObject);

sge.obj.extend(Class.prototype, {
	init: function(){
		sge.util.sgn(this);
	},
	
	getTraits: function() {	
		return this._traits;
	},

	addTrait: function(name, func) {
		if(!this._traits[name]) {
			func(this);
			this._traits[name] = func;
		}
	},

	hasTrait: function(name) {
		return !!this._traits[name];
	},

	destroy: function() {
		if(!this.destroyed) {
			this.destroyed = true;
			this.emit(sge.event.SPRITE_DESTROY);
			this.off();
			this._core.emit(sge.event.SPRITE_DESTROY, this);
			this._traits = undefined;
		}
		Class.__super__.destroy.call(this);
	},

	clone: function() {
		var clone = new this.constructor(this._baseAttrs);	
		for (var key in this._traits) {
			if (this._traits.hasOwnProperty(key)) {
				clone.addTrait(key, this._traits[key]);
			}
		}
		this._core.emit(sge.event.SPRITE_CLONE, clone);
		return clone;
	}
});

sge.sys.Entity = Class;

}(window.sge || (window.sge = {})));