;(function (sge) { 'use strict';

sge.sys = sge.sys || {};
sge.sys.trait = sge.sys.trait || {};
var defaults = {
		width : 32,
		height: 32
	};

sge.sys.trait.Renderable = function(obj) {
	obj._baseAttrs = sge.obj.extend({}, defaults, obj._baseAttrs);
	sge.obj.extend(obj, {	
		age	      : 0,
		x		  : obj._baseAttrs.x,
		y		  : obj._baseAttrs.y,
		width	  : obj._baseAttrs.width,
		height	  : obj._baseAttrs.height,
		frame	  : frame,
		createView: createView,
		getView   : getView,
		getCanvas : getCanvas,
		resize	  : resize
	});
	obj.on(sge.event.SPRITE_DESTROY, destroy);
	// obj.createView();
}

var frame = function(){
	this.age++;
	this.emit(sge.event.FRAME);
};

var createView = function(id) {
	if(id !== undefined) {
		this._view = this._core.renderer.factory.createShared(this.width, this.height, id);
	} else {
		this._view = this._core.renderer.factory.create(null, this.width, this.height);		
	}
};

var getView = function() {
	return this._view;
};

var getCanvas = function() {
	return this._view.getCanvas();
};

var resize = function(width, height, id) {
	this.width = width || this._baseAttrs.width;
	this.height = height || this._baseAttrs.height;
	if(id !== undefined) {
		this._view = this._core.renderer.factory.createShared(width, height, id);
	} else {
		this._view.resize(width, height);
	}
};

var destroy = function() {
	this._view = undefined;
};

}(window.sge || (window.sge = {})));