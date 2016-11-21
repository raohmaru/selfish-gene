;(function (app) { 'use strict';

app.lib = app.lib || {};
var defaults = {
		width: 4,
		height: 4,
		cloneEvery: 120
	},
	view,
	p;

(app.lib.Gene = function(attrs) {
	this._baseAttrs = app.util.extend({}, defaults, attrs);
	this.age = 0;
	this._traits = [];
	this.x = this._baseAttrs.x;
	this.y = this._baseAttrs.y;
	this.width = this._baseAttrs.width;
	this.height = this._baseAttrs.height;
	app.util.sgn(this);
}).prototype = p = new Object();

p.init = function(){
	this._view = app.core.sharedRenderer.get(this.width, this.height, this._baseAttrs.color);
	if(this._view.isEmpty()){
		this._view.drawRect(0, 0, this.width, this.height, this._baseAttrs.color);
	}
};

p.frame = function(){
	this.age++;
	if(this.age % this._baseAttrs.cloneEvery === 0) {
		app.core.trigger(app.cfg.event.GENE_CLONE, this);
	}
	this.trigger(app.cfg.event.FRAME);
};

p.getView = function() {		
	return this._view.getView();
};

p.getTraits = function() {		
	return this._traits.slice();
};

p.addTrait = function(name, func) {
	if(this._traits.indexOf(name) === -1) {
		func(this);
		this._traits.push(name)
	}
};

}(window.app || (window.app = {})));