;(function (sge) { 'use strict';

sge.sys = sge.sys || {};
sge.sys.trait = sge.sys.trait || {};
var defaults = {
		hp: 100,
	};

sge.sys.trait.Destroyable = function(gene) {
	gene._baseAttrs = sge.obj.extend({}, defaults, gene._baseAttrs);
	sge.obj.extend(gene, {
		hp : gene._baseAttrs.hp,
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