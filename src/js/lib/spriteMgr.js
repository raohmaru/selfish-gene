;(function (app) { 'use strict';

app.lib = app.lib || {};
var p;

(app.lib.SpriteMgr = function() {
	this._init();
}).prototype = p = new Object();

p._init = function(){
	this._pool = new app.lib.Pool();
	app.core.on(app.cfg.event.SPRITE_DESTROY, this._onSpriteDestroyed.bind(this));
};

p._onSpriteDestroyed = function(e, sprite) {
	this.remove(sprite);
};

p.add = function(sprite) {
	this._pool.add(sprite, sprite.id);
	app.core.trigger(app.cfg.event.SPRITE_ADDED, sprite);
};

p.remove = function(sprite) {
	this._pool.remove(sprite, sprite.id);
};

p.get = function(idx){
	return this._pool.get(idx);
};

p.getAll = function(idx){
	return this._pool;
};

p.getSize = function(){
	return this._pool.length;
};

}(window.app || (window.app = {})));