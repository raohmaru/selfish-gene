;(function (app) { 'use strict';

app.lib = app.lib || {};
var defaults = {
		width: 4,
		height: 4,
		color: '#000000',
		cloneEvery: 960
	},
	view,
	p;

(app.lib.Gene = function() {
}).prototype = p = new Object();

p.init = function(attrs){
	this._baseAttrs = app.util.extend({}, defaults, attrs);
	this.age = 0;
	this.x = this._baseAttrs.x;
	this.y = this._baseAttrs.y;
	this.width = this._baseAttrs.width;
	this.height = this._baseAttrs.height;
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
};

p.clone = function() {
	var gene = new this.constructor();
	return gene;
};

p.getView = function() {		
	return this._view.getView();
};

}(window.app || (window.app = {})));