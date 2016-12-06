;(function (app) { 'use strict';

app.gene = app.gene || {};
var defaults = {
		attackDistance: 30,
		attackPower: 10,
		updateKillEvery: 7  // frames
	};

app.gene.Killer = function(gene) {
	gene._baseAttrs = sge.obj.extend({}, defaults, gene._baseAttrs);
	gene._baseAttrs.attackDistanceSqr = sge.mth.sqr(gene._baseAttrs.attackDistance);  // because of the fast 2D distance
	gene.on(sge.event.FRAME, frame)
		.on(sge.event.SPRITE_DESTROY, destroy);
	gene._core.on(sge.event.SPRITE_DESTROY, onSpriteDestroyed, gene);
}

var frame = function(e) {
	if(this._core.runTime % this._baseAttrs.updateKillEvery === 0) {
		var genes,
			gene,
			dte;
		if(!this._target) {
			genes = this._core.atlas.getSpritesAt(this.x, this.y, this._baseAttrs.attackDistance)
			for (var i=0, len=genes.length; i<len; i++) {
				gene = this._core.spriteMgr.get(genes[i]);
				if(!gene || genes[i] === this.id || gene.hasTrait('Killer')) {
					continue;
				}
				dte = sge.mth.dte(this.x, this.y, gene.x, gene.y);
				if(dte < this._baseAttrs.attackDistanceSqr) {
					this._target = gene;
					this._chasing = true;
					break;
				}
			}
		} else {
			this.changeAngle( sge.mth.ang(this.x, this.y, this._target.x, this._target.y) );
			if(this._target.collide(this)) {
				this._target.hit(-this._baseAttrs.attackPower);
			}
		}
	}
	if(this._target) {
		this._core.renderer.get().drawLine(this.x, this.y, this._target.x, this._target.y, '#FF0000');
	}
};

var destroy = function() {
	this._target = undefined;
	this._core.off(sge.event.SPRITE_DESTROY, onSpriteDestroyed, this);
};

var onSpriteDestroyed = function(e, gene) {
	if(this._target === gene) {
		this._target = undefined;
		this._chasing = false;
	}
};

}(window.app || (window.app = {})));