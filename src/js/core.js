;(function (app) { 'use strict';

app.core = app.core || {};

app.core.start = function(canvas) {
	app.util.sgn(app.core);
	app.core.ge = new app.lib.ge(canvas);
	app.core.genePool = new app.lib.GenePool();
	app.core.beatMachine = new app.lib.Beat({debug:app.cfg.debug});
	init();
}

function init() {
	app.core.ge.getView().addEventListener('click', clickHandler, false);
	window.addEventListener('resize', resizeCanvas, false);	
	new app.ui.Stats(document.getElementById('stats'));
	resizeCanvas();
	app.core.beatMachine
		.onBeat(frame)
		.start(app.cfg.fps);
}

function clickHandler(e) {	
	app.core.genePool.add(e.clientX, e.clientY);
}

function frame() {
	app.core.ge.clear(app.cfg.canvasColor);
	app.core.genePool.map(function(gene){
		app.core.ge.drawSprite(gene);
		gene.frame();
	});
	app.core.trigger('frame');
}

function resizeCanvas() {
	app.core.ge.resize(window.innerWidth, window.innerHeight);
}

}(window.app || (window.app = {})));