;(function (app) { 'use strict';

app.lib = app.lib || {};
var defaults = {
		sectorSize: 100,
		updateEvery: 60,
		debug: false
	},
	p;

(app.lib.Atlas = function(options) {
	this._options = app.util.extend({}, defaults, options);
	this.init();
}).prototype = p = new Object();

p.init = function(){
	this._atlas = [];
	app.core
		.on(app.cfg.event.WORLD_RESIZE,  this._worldResize,    this)
		.on(app.cfg.event.PREPARE_FRAME, this._reset,          this)
		.on(app.cfg.event.SPRITE_ADDED,  this._onSpriteAdded,  this)
		.on(app.cfg.event.SPRITE_RENDER, this._onSpriteUpdate, this);
	if(this._options.debug) {
		this._view = app.lib.rendererFactory.create();
		app.core.on(app.cfg.event.PREPARE_FRAME, this._frame, this);
	}
};

p._reset = function(e){
	if(app.core.runTime % this._options.updateEvery === 0) {
		this._atlas.length = 0;
	}
};

p._onSpriteAdded = function(e, sprite){;
	this._onSpriteUpdate(null, sprite, true);
};

p._onSpriteUpdate = function(e, sprite, force){;
	if(force || app.core.runTime % this._options.updateEvery === 0) {
		var sector = this.getSectorAt(sprite.x, sprite.y);
		if(sector) {
			if(!this._atlas[sector[0]]) {
				this._atlas[sector[0]] = [];
			}
			if(!this._atlas[sector[0]][sector[1]]) {
				this._atlas[sector[0]][sector[1]] = [];
			}
			this._atlas[sector[0]][sector[1]].push(sprite.id);
		}
	}
};

p._worldResize = function(e, w, h) {
	this._worldWidth = w;
	this._worldHeight = h;
	this._hSectors = Math.round(w / this._options.sectorSize);
	this._vSectors = Math.round(h / this._options.sectorSize);
	this._hSectorSize = Math.round(w / this._hSectors);
	this._vSectorSize = Math.round(h / this._vSectors);
	if(this._options.debug) {
		var path = [],
			n;
		this._view.resize(w, h);
		for(var i=1; i<this._hSectors; i++) {
			n = this._hSectorSize * i;
			path.push([n, 0, n, h]);
		}
		for(i=1; i<this._vSectors; i++) {
			n = this._vSectorSize * i;
			path.push([0, n, w, n]);
		}
		this._view.drawPoly(path, '#FFFFFF', 1);
	}
};

p._frame = function(e) {
	app.core.renderer.get().drawImage(this._view.getView(), 0, 0);
};

p.getSectorAt = function(x, y, restrictToWorld) {
	var row = Math.floor((x / this._worldWidth)  * (this._hSectors-1)),
		col = Math.floor((y / this._worldHeight) * (this._vSectors-1));
	if(restrictToWorld) {
		row = row >= 0 ? (row >= this._hSectors ? this._hSectors-1 : row) : 0;
		col = col >= 0 ? (col >= this._vSectors ? this._vSectors-1 : col) : 0;
	}
	if(row >= 0 && col >= 0 && row < this._hSectors && col < this._vSectors) {
		return [row, col];
	}
	return null;
};

p.getSpritesAtSector = function(col, row) {
	if(this._atlas[col] && this._atlas[col][row]) {
		return this._atlas[col][row];
	}
	return [];
};

p.getSpritesAt = function(x, y, radix) {
	var sector = this.getSectorAt(x, y);
	if(!sector) {
		return [];
	}
	radix = radix || 0;
	if(radix > 0) {
		var leftTopSector = this.getSectorAt(x-radix, y-radix, true),
			rightBottomSector = this.getSectorAt(x+radix, y+radix, true),
			sprites = [];
		for(var i=leftTopSector[0]; i<=rightBottomSector[0]; i++) {
			for(var j=leftTopSector[1]; j<=rightBottomSector[1]; j++) {
				sprites = sprites.concat(this.getSpritesAtSector(i, j));
			}
		}
		return sprites;
	} else {
		return this.getSpritesAtSector(sector[0], sector[1]);
	}
};

}(window.app || (window.app = {})));