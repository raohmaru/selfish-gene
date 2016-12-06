;(function (sge) { 'use strict';

sge.sys = sge.sys || {};
sge.sys.trait = sge.sys.trait || {};
var defaults = {
		width : 32,
		height: 32
	};

sge.sys.trait.Renderable = function(gene) {
	gene._baseAttrs = sge.obj.extend({}, defaults, gene._baseAttrs);
	sge.obj.extend(gene, {	
		age	      : 0,
		x		  : gene._baseAttrs.x,
		y		  : gene._baseAttrs.y,
		width	  : gene._baseAttrs.width,
		height	  : gene._baseAttrs.height,
		frame	  : frame,
		createView: createView,
		getView   : getView,
		resize	  : resize
	});
	gene.on(sge.event.SPRITE_DESTROY, destroy);
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
	if(!this._view) {
		this.createView();
	}
	return this._view.getView();
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