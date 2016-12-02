;(function (app) { 'use strict';

app.lib = app.lib || {};
app.lib.gene = app.lib.gene || {};
var defaults = {
		color: '#DD0000',
		attackDistance: 30,
		attackPower: 10,
		updateKillEvery: 7  // frames
	};

app.lib.gene.Killer = function(gene) {
	gene._baseAttrs = app.util.extend({}, defaults, gene._baseAttrs);
	gene._baseAttrs.attackDistanceSqr = app.util.sqr(gene._baseAttrs.attackDistance);  // because of the fast 2D distance
	gene.on(app.core.cfg.event.FRAME, frame)
		.on(app.core.cfg.event.SPRITE_DESTROY, destroy);
	app.core.on(app.core.cfg.event.SPRITE_DESTROY, onSpriteDestroyed, gene);
}

var frame = function(e) {
	if(app.core.runTime % this._baseAttrs.updateKillEvery === 0) {
		var genes,
			gene,
			dte;
		if(!this._target) {
			genes = app.core.atlas.getSpritesAt(this.x, this.y, this._baseAttrs.attackDistance)
			for (var i=0, len=genes.length; i<len; i++) {
				gene = app.core.spriteMgr.get(genes[i]);
				if(!gene || genes[i] === this.id || gene.hasTrait('Killer')) {
					continue;
				}
				dte = app.util.dte(this.x, this.y, gene.x, gene.y);
				if(dte < this._baseAttrs.attackDistanceSqr) {
					this._target = gene;
					this._chasing = true;
					break;
				}
			}
		} else {
			this.changeAngle( app.util.ang(this.x, this.y, this._target.x, this._target.y) );
			if(this._target.collide(this)) {
				this._target.hit(-this._baseAttrs.attackPower);
			}
		}
	}
	if(this._target) {
		app.core.renderer.get().drawLine(this.x, this.y, this._target.x, this._target.y, '#FF0000');
	}
};

var destroy = function() {
	this._target = undefined;
	app.core.off(app.core.cfg.event.SPRITE_DESTROY, onSpriteDestroyed, this);
};

var onSpriteDestroyed = function(e, gene) {
	if(this._target === gene) {
		this._target = undefined;
		this._chasing = false;
	}
};

}(window.app || (window.app = {})));