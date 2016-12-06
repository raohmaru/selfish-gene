;(function (sge) { 'use strict';

sge.sys = sge.sys || {};
sge.sys.trait = sge.sys.trait || {};

var defaults = {
		collisionShape: 'square'
	};
sge.sys.trait.Solid = function(gene) {
	gene._baseAttrs = sge.obj.extend({}, defaults, gene._baseAttrs);
	sge.obj.extend(gene, {
		collide   : collide,
		hitBox	  : createHitArea(gene._baseAttrs.collisionShape, gene)
	});
};

var collide = function(target) {
	if(this.hitBox instanceof HitCircle && target.hitBox instanceof HitCircle) {
		var dte = sge.mth.dte(this.x, this.y, target.x, target.y)
				  - this.hitBox.radius - target.hitBox.radius;
		return dte <= 0;
	}
};

function createHitArea(type, sprite) {
	if(type === 'circle') {
		return new HitCircle(sprite);
	}
	return new HitBox(sprite);
}

var HitBox = function(sprite){
	this.left = -sprite.width >> 1;
	this.right = sprite.width >> 1;
	this.top = -sprite.height >> 1;
	this.bottom = sprite.height >> 1;
};

var HitCircle = function(sprite){
	this.radius = sge.mth.sqr(sprite.width >> 1);
};

}(window.sge || (window.sge = {})));