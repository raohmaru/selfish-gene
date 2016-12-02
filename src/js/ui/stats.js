;(function (app) { 'use strict';

app.ui = app.ui || {};
var	p;

(app.ui.Stats = function(el, updateEvery) {
	this._el = el;
	this._updateEvery = updateEvery || 60;  // frames
	this._init();
}).prototype = p = new Object();

p._init = function(){
	this._$population = this._el.querySelector('.stats__population');
	this._$fps = this._el.querySelector('.stats__fps');
	app.core
		.on(app.core.cfg.event.SPRITE_ADDED,   this._geneChange, this)
		.on(app.core.cfg.event.SPRITE_DESTROY, this._geneChange, this)
		.on(app.core.cfg.event.FRAME,          this._onFrame,    this);
};

p._geneChange = function(e){
	this._$population.textContent = app.core.spriteMgr.getSize();
};

p._onFrame = function(e){
	if(app.core.runTime % this._updateEvery === 0) {
		this._$fps.textContent = Math.round(app.core.beatMachine.currentFps * 100) / 100;
	}
};

}(window.app || (window.app = {})));