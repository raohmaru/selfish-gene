;(function (app) { 'use strict';

var game,
	uiStats,
	uiAttrs;
	
function initGame(canvas) {
	game = app.core.init(canvas, '2D', app.cfg);
	uiStats = new app.ui.Stats(document.getElementById('stats'));
	uiAttrs = new app.ui.Attrs(document.getElementById('attrs'), app.cfg.geneAttrs);
	game.renderer.getView().addEventListener('click', clickHandler, false);
	game.start();
	game.on(app.core.cfg.event.SPRITE_CLONE, cloneGene);
}

function clickHandler(e) {
	var gene = app.lib.geneFactory.create({
			x: e.clientX,
			y: e.clientY
		}, ['Movable', 'Solid'].concat(uiAttrs.getSelectedAttrs()));
	game.spriteMgr.add(gene);
}

function cloneGene(e, gene) {
	var clone = app.lib.geneFactory.clone(gene);
	game.spriteMgr.add(clone);
}

document.addEventListener('DOMContentLoaded', function(){
	var canvas = document.getElementById('maincanvas');
	if(canvas.getContext){
		initGame(canvas);		
	} else {
		// canvas-unsupported code here
	}
});

}(window.app || (window.app = {})));