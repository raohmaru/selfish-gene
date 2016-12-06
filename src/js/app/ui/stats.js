;(function (app) { 'use strict';

app.ui = app.ui || {};
var	p;

(app.ui.Stats = function(el, game, updateEvery) {
	this._el = el;
	this._game = game;
	this._updateEvery = updateEvery || 60;  // frames
	this._init();
}).prototype = p = new Object();

p._init = function(){
	this._$population = this._el.querySelector('.stats__population');
	this._$fps = this._el.querySelector('.stats__fps');
	this._game
		.on(sge.event.SPRITE_ADDED,   this._geneChange, this)
		.on(sge.event.SPRITE_DESTROY, this._geneChange, this)
		.on(sge.event.FRAME,		  this._onFrame,	this);
};

p._geneChange = function(e){
	this._$population.textContent = this._game.spriteMgr.getSize();
};

p._onFrame = function(e){
	if(this._game.runTime % this._updateEvery === 0) {
		this._$fps.textContent = Math.round(this._game.beatMachine.currentFps * 100) / 100;
	}
};

}(window.app || (window.app = {})));