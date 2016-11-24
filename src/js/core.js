;(function (app) { 'use strict';

app.core = app.core || {};
var	uiStats,
	uiAttrs;

app.core.start = function(canvas, ctx) {
	app.util.sgn(app.core);
	app.core.renderer = new app.lib.Renderer(ctx, canvas);
	app.core.spriteMgr = new app.lib.SpriteMgr();
	app.core.beatMachine = new app.lib.Beat({debug:app.cfg.debug});
	app.core.atlas = new app.lib.Atlas({
		world: canvas,
		sectorSize: app.cfg.atlasSectorSize,
		updateEvery: app.cfg.atlasUpdate,
		debug: app.cfg.debug
	});
	uiStats = new app.ui.Stats(document.getElementById('stats'));
	uiAttrs = new app.ui.Attrs(document.getElementById('attrs'));
	init();
}

function init() {
	app.core.renderer.getView().addEventListener('click', clickHandler, false);
	window.addEventListener('resize', resizeWorld, false);
	resizeWorld();
	app.core.runTime = 0;
	app.core.beatMachine
		.onBeat(frame)
		.start(app.cfg.fps);
	app.core.on(app.cfg.event.SPRITE_CLONE, cloneGene);
}

function clickHandler(e) {
	var gene = app.lib.geneFactory.create({
			x: e.clientX,
			y: e.clientY
		}, ['Movable', 'Solid'].concat(uiAttrs.getSelectedAttrs()));
	app.core.spriteMgr.add(gene);
}

function frame() {
	var world = app.core.renderer.getView(),
		w = world.width,
		h = world.height;
	app.core.runTime++;
	app.core.renderer.clear(app.cfg.canvasColor);
	app.core.trigger(app.cfg.event.PREPARE_FRAME);
	app.core.spriteMgr.getAll().walk(function(sprite){
		if(sprite.x > 0 && sprite.y > 0 && sprite.x < w && sprite.y < h) {
			app.core.renderer.get().drawSprite(sprite);
			app.core.trigger(app.cfg.event.SPRITE_RENDER, sprite);
		}
		sprite.frame();
	});
	app.core.renderer.update();
	app.core.trigger(app.cfg.event.FRAME);
}

function resizeWorld() {
	app.core.renderer.resize(window.innerWidth, window.innerHeight);
	app.core.trigger(app.cfg.event.WORLD_RESIZE, window.innerWidth, window.innerHeight);
}

function cloneGene(e, gene) {
	var clone = app.lib.geneFactory.clone(gene);
	app.core.spriteMgr.add(clone);
}

}(window.app || (window.app = {})));