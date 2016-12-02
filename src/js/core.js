;(function (app) { 'use strict';

app.core = app.core || {};

app.core.init = function(canvas, ctx, cfg) {
	app.core.cfg = cfg;
	app.util.sgn(app.core);
	app.core.renderer = new app.lib.Renderer(ctx, canvas);
	app.core.spriteMgr = new app.lib.SpriteMgr();
	app.core.beatMachine = new app.lib.Beat({debug:app.core.cfg.debug});
	app.core.atlas = new app.lib.Atlas({
		world: canvas,
		sectorSize: app.core.cfg.atlasSectorSize,
		updateEvery: app.core.cfg.atlasUpdate,
		debug: app.core.cfg.debug
	});
	return app.core;
}

app.core.start = function() {
	window.addEventListener('resize', resizeWorld, false);
	resizeWorld();
	app.core.runTime = 0;
	app.core.beatMachine
		.onBeat(frame)
		.start(app.core.cfg.fps);
}

function frame() {
	var world = app.core.renderer.getView(),
		w = world.width,
		h = world.height;
	app.core.runTime++;
	app.core.renderer.clear(app.core.cfg.canvasColor);
	app.core.emit(app.core.cfg.event.PREPARE_FRAME);
	app.core.renderer.drawSprites(app.core.spriteMgr.getAll(), true);
	app.core.renderer.update();
	app.core.emit(app.core.cfg.event.FRAME);
}

function resizeWorld() {
	app.core.renderer.resize(window.innerWidth, window.innerHeight);
	app.core.emit(app.core.cfg.event.WORLD_RESIZE, window.innerWidth, window.innerHeight);
}

}(window.app || (window.app = {})));