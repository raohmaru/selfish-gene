;(function (app) { 'use strict';

app.core = app.core || {};
var uiStats,
	uiAttrs;

app.core.start = function(canvas) {
	app.util.sgn(app.core);
	app.core.renderer = new app.lib.CanvasRenderer(canvas);
	app.core.sharedRenderer = new app.lib.SharedRenderer(app.lib.CanvasRenderer);
	app.core.genePool = new app.lib.Pool();
	app.core.beatMachine = new app.lib.Beat({debug:app.cfg.debug});
	uiStats = new app.ui.Stats(document.getElementById('stats'));
	uiAttrs = new app.ui.Attrs(document.getElementById('attrs'));
	init();
}

function init() {
	app.core.renderer.getView().addEventListener('click', clickHandler, false);
	window.addEventListener('resize', resizeCanvas, false);	
	resizeCanvas();
	app.core.beatMachine
		.onBeat(frame)
		.start(app.cfg.fps);
	app.core.on(app.cfg.event.GENE_CLONE, cloneGene);
}

function clickHandler(e) {
	var gene = app.lib.GeneFactory.create({
		x: e.clientX,
		y: e.clientY
	}, uiAttrs.getSelectedAttrs());
	addGene(gene);
}

function frame() {
	var view = app.core.renderer.getView(),
		w = view.width,
		h = view.height;
	app.core.renderer.clear(app.cfg.canvasColor);
	app.core.genePool.map(function(gene){
		if(gene.x > 0 && gene.y > 0 && gene.x < w && gene.y < h) {
			app.core.renderer.drawSprite(gene);
		}
		gene.frame();
	});
	app.core.trigger(app.cfg.event.FRAME);
}

function resizeCanvas() {
	app.core.renderer.resize(window.innerWidth, window.innerHeight);
}

function addGene(gene) {
	app.core.genePool.add(gene);
	app.core.trigger(app.cfg.event.GENE_ADDED);
	// console.log(gene);
}

function cloneGene(gene) {
	var clone = app.lib.GeneFactory.clone(gene);
	addGene(clone);
}

}(window.app || (window.app = {})));