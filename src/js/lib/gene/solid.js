;(function (app) { 'use strict';

app.lib = app.lib || {};
app.lib.gene = app.lib.gene || {};

app.lib.gene.Solid = function(gene) {
	app.util.extend(gene, {
		collide: collide
	});
	gene.hitBox = createHitArea(gene._baseAttrs.collisionShape, gene);
};

var collide = function(target) {
	if(this.hitBox instanceof HitCircle && target.hitBox instanceof HitCircle) {
		var dte = app.util.dte(this.x, this.y, target.x, target.y)
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
	this.radius = app.util.sqr(sprite.width >> 1);
};

}(window.app || (window.app = {})));