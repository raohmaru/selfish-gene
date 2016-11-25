;(function (app) { 'use strict';

app.lib = app.lib || {};
var defaults = {
		width: 4,
		height: 4,
		cloneEvery: 960,
		hp: 100,
		collisionShape: 'circle'
	},
	p;

(app.lib.Gene = function(attrs) {
	this._baseAttrs = app.util.extend({}, defaults, attrs);
	this.age = 0;
	this._traits = [];
	this.x = this._baseAttrs.x;
	this.y = this._baseAttrs.y;
	this.hp = this._baseAttrs.hp;
	this.width = this._baseAttrs.width;
	this.height = this._baseAttrs.height;
	app.util.sgn(this);
}).prototype = p = new Object();

p.init = function(){
	this.createView();
};

p.frame = function(){
	this.age++;
	if(this.age % this._baseAttrs.cloneEvery === 0) {
		app.core.trigger(app.cfg.event.SPRITE_CLONE, this);
	}
	this.trigger(app.cfg.event.FRAME);
};

p.createView = function() {
	this._view = app.lib.rendererFactory.createShared(this.width, this.height, this._baseAttrs.color);
	if(this._view.isEmpty()){
		this._view.drawRect(0, 0, this.width, this.height, this._baseAttrs.color);
	}
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

p.hasTrait = function(name) {
	return this._traits.indexOf(name) > -1;
};

p.resize = function(width, height) {
	this.width = width || this._baseAttrs.width;
	this.height = height || this._baseAttrs.height;
	this.createView();
};

p.hit = function(hitPoints) {
	this.hp += hitPoints;
	if(this.hp <= 0) {
		this.destroy();
	}
};

p.destroy = function() {
	if(!this.destroyed) {
		this.destroyed = true;
		this.trigger(app.cfg.event.SPRITE_DESTROY);
		this._view = undefined;
		this.off();
		app.core.trigger(app.cfg.event.SPRITE_DESTROY, this);
	}
};

}(window.app || (window.app = {})));