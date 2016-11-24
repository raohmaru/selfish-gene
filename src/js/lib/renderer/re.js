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
	this._ww = width;
	this._wh = height;
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

p.drawSprites = function(sprites, onlyVisible){
	if(!sprites.length) {
		return;
	}
	var e = app.cfg.event.SPRITE_RENDER;
	sprites.forEach(function(sprite){
		if(!onlyVisible || (sprite.x > 0 && sprite.y > 0 && sprite.x < this._ww && sprite.y < this._wh)) {
			this._backbuffer.drawSprite(sprite);
			app.core.trigger(e, sprite);
		}
		sprite.frame();
	}.bind(this));
};

}(window.app || (window.app = {})));