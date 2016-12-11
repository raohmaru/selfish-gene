;(function (sge) { 'use strict';

sge.grf = sge.grf || {};

var Class = function(options){
	this._options = sge.obj.extend({}, options);
	this.factory = new sge.grf.RendererFactory(options.context);
	this._frontbuffer = this.factory.create(options.canvas);
	this._frontbuffer._id = 'main';
	Class.__super__.constructor.call(this);
};
sge.obj.inherits(Class, sge.sys.GameObject);

sge.obj.extend(Class.prototype, {
	init: function(){
		this._layers = [this._frontbuffer];
		this._layerIdx = {};
		this._rebuildLayersIdx();
		if(typeof this._options.size === 'string') {
			this.setFillMode(this._options.size);
		} else {
			this.resize.apply(this, this._options.size);
		}
	},

	resize: function(width, height){
		for(var i=0, len=this._layers.length; i<len; i++) {
			this._layers[i].resize(width, height);
		}
		this._ww = width;
		this._wh = height;
		this._core.emit(sge.event.WORLD_RESIZE, this._ww, this._wh);
	},

	setFillMode: function(mode){
		if(mode === sge.cnst.FILL_WINDOW) {
			window.addEventListener('resize', this._onResizeWindow.bind(this), false);
			this._onResizeWindow();
		}
	},

	clear: function(color){
		this._frontbuffer.clear(color);
	},
	
	update: function(){
		// this._frontbuffer.drawImage(this._backbuffer.getCanvas(), 0, 0);
	},
	
	addLayer: function(name, z){
		if(!this._parentNode) {
			this._parentNode = this._frontbuffer.getCanvas().parentNode;			
		}
		z = z < 0 ? 0 : (z > this._layers.length ? this._layers.length : z) || 0;
		var layer = this.factory.create(null, this._ww, this._wh),
			layerAtZ = this._layers[z] && this._layers[z].getCanvas() || null;
		layer._id = name;
		this._parentNode.insertBefore(layer.getCanvas(), layerAtZ);
		this._layers.splice(z, 0, layer);
		this._rebuildLayersIdx();
	},

	get: function(id){
		if(id) {
			if(typeof id === 'number') {
				return this._layers[id];
			} else {
				return this._layers[this._layerIdx[id]];
			}
		}
		return this._frontbuffer;
	},

	getWorld: function(){
		return this._frontbuffer.getCanvas();
	},
	
	drawSprites: function(sprites, onlyVisible){
		if(!sprites.length) {
			return;
		}
		var e = sge.event.SPRITE_RENDER;
		sprites.forEach(function(sprite){
			if(!onlyVisible || (sprite.x > 0 && sprite.y > 0 && sprite.x < this._ww && sprite.y < this._wh)) {
				this._frontbuffer.drawSprite(sprite);
			}
			sprite.frame();
		}.bind(this));
	},

	_onResizeWindow: function() {
		this.resize(window.innerWidth, window.innerHeight);
	},
	
	_rebuildLayersIdx: function() {
		for(var i=0, len=this._layers.length; i<len; i++) {
			this._layerIdx[this._layers[i]._id] = i;
		}
	}
});

sge.grf.Renderer = Class;

}(window.sge || (window.sge = {})));