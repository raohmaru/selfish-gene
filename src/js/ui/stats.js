;(function (app) { 'use strict';

app.ui = app.ui || {};
var p;

(app.ui.Stats = function(el) {
	this.el = el;
	this.init();
}).prototype = p = new Object();

p.init = function(){
	this.$population = this.el.querySelector('.stats__population');
	this.$fps = this.el.querySelector('.stats__fps');
	app.core
		.on('geneAdded', this.geneAdded.bind(this))
		.on('frame', this.onFrame.bind(this));
};

p.geneAdded = function(){
	this.$population.textContent = app.core.genePool.length;
};

p.onFrame = function(){
	this.$fps.textContent = Math.round(app.core.beatMachine.currentFps * 100) / 100;
};

}(window.app || (window.app = {})));