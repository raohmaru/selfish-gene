;(function (app) { 'use strict';

var game,
	uiStats,
	uiAttrs;
	
function initGame(canvas) {
	game = new sge.Game(canvas, app.cfg);
	uiStats = new app.ui.Stats(document.getElementById('stats'), game);
	uiAttrs = new app.ui.Attrs(document.getElementById('attrs'), app.cfg.geneAttrs);
	game.renderer.getView().addEventListener('click', clickHandler, false);
	game.start();
}

function clickHandler(e) {
	var attrs = uiAttrs.getSelectedAttrs(),
		gene = app.geneFactory.create({
			x:     e.clientX,
			y:     e.clientY,
			color: attrs[0].color
		}, ['Destroyable', 'Solid', 'Movable'].concat(attrs));
	game.spriteMgr.add(gene);
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