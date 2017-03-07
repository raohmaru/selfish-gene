;(function (sge) { 'use strict';

var currentGame;

sge.getGame = function() {
	return currentGame;
};

sge.Game = function(canvas, cfg) {
	currentGame = this;	
	sge.util.sgn(this);
	this.cfg = sge.obj.extend({}, cfg);
	this.renderer	 = new sge.grf.Renderer({
		context: cfg.renderer,
		canvas : canvas,
		size   : cfg.size
	});
	if(cfg.debug) {
		this.renderer.addLayer('debug');
	}
	this.spriteMgr   = new sge.core.SpriteMgr();
	this.beatMachine = new sge.core.Beat({debug:cfg.debug});
	this.atlas	     = new sge.core.Atlas({
		world	   : canvas,
		sectorSize : cfg.atlasSectorSize,
		updateEvery: cfg.atlasUpdate,
		debug	   : cfg.debug
	});
};
sge.Game.prototype = (function() {
	function start() {
		this.runTime = 0;
		this.beatMachine
			.onBeat(this.frame.bind(this))
			.start(this.cfg.fps);
	}

	function frame() {
		this.runTime++;
		this.renderer.clear(this.cfg.canvasColor);
		this.emit(sge.event.PREPARE_FRAME);
		this.renderer.drawSprites(this.spriteMgr.getAll(), true);
		this.renderer.update();
		this.emit(sge.event.FRAME);
	}

	function getWorld() {
		return this.renderer.getWorld();
	}
	
	return {
		start   : start,
		frame   : frame,
		getWorld: getWorld
	};
})();

}(window.sge || (window.sge = {})));