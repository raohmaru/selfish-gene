;(function (sge) { 'use strict';

var currentGame,
	p;

(sge.Game = function(canvas, cfg) {
	currentGame = this;	
	sge.util.sgn(this);
	this.cfg = cfg;
	this.renderer	 = new sge.grf.Renderer(cfg.renderer, canvas);
	this.spriteMgr   = new sge.core.SpriteMgr();
	this.beatMachine = new sge.core.Beat({debug:cfg.debug});
	this.atlas	     = new sge.core.Atlas({
		world	   : canvas,
		sectorSize : cfg.atlasSectorSize,
		updateEvery: cfg.atlasUpdate,
		debug	   : cfg.debug
	});
}).prototype = p = new Object();

sge.getGame = function() {
	return currentGame;
};

p.start = function() {
	window.addEventListener('resize', this.resizeWorld.bind(this), false);
	this.resizeWorld();
	this.runTime = 0;
	this.beatMachine
		.onBeat(this.frame.bind(this))
		.start(this.cfg.fps);
};

p.frame = function() {
	this.runTime++;
	this.renderer.clear(this.cfg.canvasColor);
	this.emit(sge.event.PREPARE_FRAME);
	this.renderer.drawSprites(this.spriteMgr.getAll(), true);
	this.renderer.update();
	this.emit(sge.event.FRAME);
};

p.resizeWorld = function() {
	this.renderer.resize(window.innerWidth, window.innerHeight);
	this.emit(sge.event.WORLD_RESIZE, window.innerWidth, window.innerHeight);
};

}(window.sge || (window.sge = {})));