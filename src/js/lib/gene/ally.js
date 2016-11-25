;(function (app) { 'use strict';

app.lib = app.lib || {};
app.lib.gene = app.lib.gene || {};
var PI = Math.PI,
	defaults = {
		color: '#55AE6B',
		allyDistance: 30,
		allyTension: 100,
		allyMaxTension: 125,
		allyLineColor: '#3A764A',
		allyTensionLineColor: '#EAA000',
		allyMax: 3,
		updateAllyEvery: 7  // frames
	};

app.lib.gene.Ally = function(gene) {
	app.util.extend(gene, {
		_baseAttrs:  app.util.extend({}, defaults, gene._baseAttrs),
		_allies:     [],
		_lineColors: [],
		_removeAlly: removeAlly
	});
	gene.on(app.cfg.event.FRAME, frame)
		.on(app.cfg.event.SPRITE_DESTROY, destroy);
	app.core.on(app.cfg.event.SPRITE_DESTROY, onSpriteDestroyed, gene);
	// because of the fast 2D distance
	gene._baseAttrs.allyDistanceSqr   = app.util.sqr(gene._baseAttrs.allyDistance);
	gene._baseAttrs.allyTensionSqr    = app.util.sqr(gene._baseAttrs.allyTension);
	gene._baseAttrs.allyMaxTensionSqr = app.util.sqr(gene._baseAttrs.allyMaxTension);
}

var frame = function(e) {
	var genes,
		gene,
		dte,
		i,
		len;
	if(app.core.runTime % this._baseAttrs.updateAllyEvery === 0) {
		if(this._allies.length < this._baseAttrs.allyMax) {
			genes = app.core.atlas.getSpritesAt(this.x, this.y, this._baseAttrs.allyDistance);
			for (i=0, len=genes.length; i<len; i++) {
				gene = app.core.spriteMgr.get(genes[i]);
				if(!gene || genes[i] === this.id || gene.hasTrait('Killer') || this._allies.indexOf(gene) > -1) {
					continue;
				}
				dte = app.util.dte(this.x, this.y, gene.x, gene.y);
				if(dte < this._baseAttrs.allyDistanceSqr) {
					gene.resize(gene.width+1, gene.height+1);
					gene.hit(25);
					this._allies.push(gene);
					break;
				}
			}
		}
		this._lineColors.length = 0;
		for(i=this._allies.length-1; i>-1; i--) {
			gene = this._allies[i];
			if(!gene) {
				continue;
			}
			dte = app.util.dte(this.x, this.y, gene.x, gene.y);
			if(dte > this._baseAttrs.allyTensionSqr) {
				if(dte > this._baseAttrs.allyMaxTensionSqr) {
					this._removeAlly(gene, i);
					this._lineColors.splice(i, 1);
				} else {
					gene.changeAngle(this.angle);
					this.angle += PI;
					this._lineColors.push(this._baseAttrs.allyTensionLineColor);
				}
			} else {
				this._lineColors.push(this._baseAttrs.allyLineColor);
			}
		}
	}
	if(this._allies.length) {
		var r = app.core.renderer.get();
		for(i=0, len=this._allies.length; i<len; i++) {
			gene = this._allies[i];
			r.drawLine(this.x, this.y, gene.x, gene.y, this._lineColors[i]);
		}
	}
};

var removeAlly = function(gene, idx) {
	if(idx != undefined) {
		if(typeof idx !== "number") {
			idx = this._allies.indexOf(gene);
		}
		if(idx > -1) {
			this._allies.splice(idx, 1);
		}
	}
	if(gene && !gene.destroyed) {
		gene.resize(gene.width-1, gene.height-1);
		gene.hit(-25);
	}
}

var destroy = function() {
	for(var i=0, len=this._allies.length; i<len; i++) {
		this._removeAlly(this._allies[i]);
	}
	this._allies = undefined;
	app.core.off(app.cfg.event.SPRITE_DESTROY, onSpriteDestroyed, this);
};

var onSpriteDestroyed = function(e, gene) {
	if(gene !== this) {
		this._removeAlly(gene, true);
	}
};

}(window.app || (window.app = {})));