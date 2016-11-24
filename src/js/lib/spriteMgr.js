;(function (app) { 'use strict';

app.lib = app.lib || {};
var p;

(app.lib.SpriteMgr = function() {
	this._init();
}).prototype = p = new Object();

p._init = function(){
	this._pool = new app.lib.Pool();
};

p.add = function(sprite) {
	this._pool.addAt(sprite, sprite.id);
	app.core.trigger(app.cfg.event.SPRITE_ADDED, sprite);
};

p.getAt = function(idx){
	return this._pool.getAt(idx);
};

p.getAll = function(idx){
	return this._pool;
};

p.getSize = function(){
	return this._pool.length;
};

}(window.app || (window.app = {})));