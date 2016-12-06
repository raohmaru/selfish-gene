;(function (sge) { 'use strict';

sge.grf = sge.grf || {};
var p;

(sge.grf.CanvasRenderer = function(canvas, width, height) {
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
	this._ctx.drawImage(
		sprite.getView(),
		sprite.x - (sprite.width  >> 1) | 0,
		sprite.y - (sprite.height >> 1) | 0);
	this._empty = false;
};

p.drawImage = function(image, sx, sy){
	// https://jsperf.com/canvas-drawimage-vs-putimagedata/3
	this._ctx.drawImage(image, sx|0, sy|0);
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
	this._ctx.moveTo(ox|0, oy|0);
	this._ctx.lineTo(x|0, y|0);
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
				this._ctx.moveTo(points[j]|0, points[j+1]|0);
			} else {
				this._ctx.lineTo(points[j]|0, points[j+1]|0);
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

}(window.sge || (window.sge = {})));