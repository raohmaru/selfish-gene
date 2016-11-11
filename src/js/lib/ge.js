;(function (app) { 'use strict';

app.lib = app.lib || {};
var p;

(app.lib.ge = function(canvas) {
	if(!canvas) {
		canvas = document.createElement("canvas");
	}
	this.canvas = canvas;
	this.init();
}).prototype = p = new Object();

p.init = function(){
	this.ctx = this.canvas.getContext('2d');
};

p.resize = function(width, height){
	this.canvas.width  = width;
	this.canvas.height = height;
};

p.clear = function(color){
	this.ctx.fillStyle = color;
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

p.drawSprite = function(sprite){
	this.ctx.drawImage(sprite.getView(), sprite.x, sprite.y);
};

p.drawRect = function(x, y, width, height, color){
	this.ctx.fillStyle = color;
	this.ctx.fillRect(x, y, width, height);
};

p.getView = function(){
	return this.canvas;
};

}(window.app || (window.app = {})));