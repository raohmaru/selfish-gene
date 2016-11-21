;(function (app) { 'use strict';

app.lib = app.lib || {};
var p;

(app.lib.CanvasRenderer = function(canvas) {
	if(!canvas) {
		canvas = document.createElement("canvas");
	}
	this._canvas = canvas;
	this._init();
}).prototype = p = new Object();

p._init = function(){
	this._ctx = this._canvas.getContext('2d');
	this._empty = true;
};

p.resize = function(width, height){
	this._canvas.width  = width;
	this._canvas.height = height;
	this._empty = true;
};

p.clear = function(color){
	this._ctx.fillStyle = color;
	this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
	this._empty = true;
};

p.drawSprite = function(sprite){
	this._ctx.drawImage(sprite.getView(), sprite.x, sprite.y);
	this._empty = false;
};

p.drawRect = function(x, y, width, height, color){
	this._ctx.fillStyle = color;
	this._ctx.fillRect(x, y, width, height);
	this._empty = false;
};

p.getView = function(){
	return this._canvas;
};

p.isEmpty = function(){
	return this._empty;
};

}(window.app || (window.app = {})));