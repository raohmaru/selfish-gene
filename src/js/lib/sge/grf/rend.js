;(function (sge) { 'use strict';

sge.grf = sge.grf || {};

var Class = function(ctx, canvas){
	Class.__super__.constructor.call(this);
	this.factory = new sge.grf.RendererFactory(ctx);
	this._backbuffer  = this.factory.create();
	this._frontbuffer = this.factory.create(canvas);
};
sge.obj.inherits(Class, sge.sys.GameObject);

sge.obj.extend(Class.prototype, {
	update: function(){
		this._frontbuffer.drawImage(this._backbuffer.getView(), 0, 0);
	},

	resize: function(width, height){
		this._backbuffer.resize(width, height);
		this._frontbuffer.resize(width, height);
		this._ww = width;
		this._wh = height;
	},

	clear: function(color){
		this._backbuffer.clear(color);
		this._frontbuffer.clear(color);
	},

	get: function(){
		return this._backbuffer;
	},

	getView: function(){
		return this._frontbuffer.getView();
	},

	drawSprites: function(sprites, onlyVisible){
		if(!sprites.length) {
			return;
		}
		var e = sge.event.SPRITE_RENDER;
		sprites.forEach(function(sprite){
			if(!onlyVisible || (sprite.x > 0 && sprite.y > 0 && sprite.x < this._ww && sprite.y < this._wh)) {
				this._backbuffer.drawSprite(sprite);
				this._core.emit(e, sprite);
			}
			sprite.frame();
		}.bind(this));
	}
});

sge.grf.Renderer = Class;

}(window.sge || (window.sge = {})));