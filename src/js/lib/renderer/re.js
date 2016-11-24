;(function (app) { 'use strict';

app.lib = app.lib || {};
var p;

(app.lib.Renderer = function(ctx, canvas) {
	app.lib.rendererFactory.init(ctx);
	this._backbuffer  = app.lib.rendererFactory.create();
	this._frontbuffer = app.lib.rendererFactory.create(canvas);
	this._init();
}).prototype = p = new Object();

p._init = function(){
};

p.update = function(){
	this._frontbuffer.drawImage(this._backbuffer.getView(), 0, 0);
};

p.resize = function(width, height){
	this._backbuffer.resize(width, height);
	this._frontbuffer.resize(width, height);
};

p.clear = function(color){
	this._backbuffer.clear(color);
	this._frontbuffer.clear(color);
};

p.get = function(){
	return this._backbuffer;
};

p.getView = function(){
	return this._frontbuffer.getView();
};

}(window.app || (window.app = {})));