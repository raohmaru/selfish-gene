;(function (app) { 'use strict';

app.lib = app.lib || {};
var p;

(app.lib.CanvasRenderer = function(canvas, width, height) {
	if(!canvas) {
		canvas = document.createElement("canvas");
	}
	this._canvas = canvas;
	this._init();
	if(width && height) {
		this.resize(width, height);
	}
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
	this._ctx.drawImage(sprite.getView(), sprite.x-(sprite.width>>1), sprite.y-(sprite.height>>1));
	this._empty = false;
};

p.drawImage = function(image, sx, sy){
	// https://jsperf.com/canvas-drawimage-vs-putimagedata/3
	this._ctx.drawImage(image, sx, sy);
	// this._ctx.putImageData(image, sx, sx);
	this._empty = false;
};

p.drawRect = function(x, y, width, height, color){
	this._ctx.fillStyle = color;
	this._ctx.fillRect(x, y, width, height);
	this._empty = false;
};

p.drawLine = function(ox, oy, x, y, color, lineWidth){
	this._ctx.strokeStyle = color;
	this._ctx.lineWidth = lineWidth;
	this._ctx.beginPath();
	this._ctx.moveTo(ox, oy);
	this._ctx.lineTo(x, y);
	this._ctx.stroke();
	this._empty = false;
};

p.drawPoly = function(path, color, lineWidth){
	var points;
	this._ctx.strokeStyle = color;
	this._ctx.lineWidth = lineWidth;
	this._ctx.beginPath();
	for(var i=0, len=path.length; i<len; i++) {
		points = path[i];
		for(var j=0, len2=points.length; j<len2; j+=2) {
			if(j === 0) {
				this._ctx.moveTo(points[j], points[j+1]);
			} else {
				this._ctx.lineTo(points[j], points[j+1]);
			}
		}
	}
	this._ctx.closePath();
	this._ctx.stroke();
	this._empty = false;
};

p.getView = function(){
	return this._canvas;
};

p.isEmpty = function(){
	return this._empty;
};

}(window.app || (window.app = {})));