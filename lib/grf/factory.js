;(function (sge) { 'use strict';

sge.grf = sge.grf || {};
var p;

(sge.grf.RendererFactory = function(type) {
	this._setContext(type);
	this._init();
}).prototype = p = new Object();

p._init = function(){
	this._canvasCount = 0;
};

p._setContext = function (type) {
	if(type === '2D') {
		this._Renderer = sge.grf.CanvasRenderer;
	}
};

p.create = function () {
	this._canvasCount++;
	return sge.obj.callNew(this._Renderer, sge.util.argsToArray(arguments));
};

p.createShared = function(width, height, id) {
	if(!this._sharedRenderer) {
		this._sharedRenderer = new sge.grf.SharedRenderer(this._Renderer);			
	}
	return this._sharedRenderer.get(width, height, id);
};

}(window.sge || (window.sge = {})));