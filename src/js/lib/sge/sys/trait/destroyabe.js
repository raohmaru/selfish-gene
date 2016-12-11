;(function (sge) { 'use strict';

sge.sys = sge.sys || {};
sge.sys.trait = sge.sys.trait || {};
var defaults = {
		hp: 100,
	};

sge.sys.trait.Destroyable = function(obj) {
	obj._baseAttrs = sge.obj.extend({}, defaults, obj._baseAttrs);
	sge.obj.extend(obj, {
		hp : obj._baseAttrs.hp,
		hit: hit
	});
}

var hit = function(hitPoints) {
	this.hp += hitPoints;
	if(this.hp <= 0) {
		this.destroy();
	}
};

}(window.sge || (window.sge = {})));