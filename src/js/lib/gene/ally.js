;(function (app) { 'use strict';

app.lib = app.lib || {};
app.lib.gene = app.lib.gene || {};
var PI = Math.PI,
	defaults = {
		color: '#5EC175',
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
		_lineColors: []
	});
	gene.on(app.cfg.event.FRAME, frame.bind(gene));
	// because of the fast 2D disntance
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
				gene = app.core.spriteMgr.getAt(genes[i]);
				if(genes[i] === this.id || gene.getTraits().length > 2 || this._allies.indexOf(gene) !== -1) {
					continue;
				}
				dte = app.util.dte(this.x, this.y, gene.x, gene.y);
				if(dte < this._baseAttrs.allyDistanceSqr) {
					this._allies.push(gene);
					break;
				}
			}
		}
		this._lineColors.length = 0;
		for(i=0, len=this._allies.length; i<len; i++) {
			gene = this._allies[i];
			if(!gene) {
				continue;
			}
			dte = app.util.dte(this.x, this.y, gene.x, gene.y);
			if(dte > this._baseAttrs.allyTensionSqr) {
				if(dte > this._baseAttrs.allyMaxTensionSqr) {
					this._allies.splice(i, 1);
					this._lineColors.splice(i, 1);
					i -= 1;
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
		for(i=0, len=this._allies.length; i<len; i++) {
			gene = this._allies[i];
			app.core.renderer.get().drawLine(this.x, this.y, gene.x, gene.y, this._lineColors[i]);
		}
	}
};

}(window.app || (window.app = {})));