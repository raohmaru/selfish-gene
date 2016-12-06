;(function (sge) { 'use strict';

sge.core = sge.core || {};

var Class = function(ctx, canvas){
	Class.__super__.constructor.call(this);
};
Class = sge.obj.inherits(Class, sge.sys.GameObject);

sge.obj.extend(Class.prototype, {
	init: function(){
		this._pool = new sge.util.Pool();
		this._core.on(sge.event.SPRITE_DESTROY, this._onSpriteDestroyed, this);
	},

	add: function(sprite) {
		this._pool.add(sprite, sprite.id);
		this._core.emit(sge.event.SPRITE_ADDED, sprite);
	},

	remove: function(sprite) {
		this._pool.remove(sprite, sprite.id);
	},

	get: function(idx){
		return this._pool.get(idx);
	},

	getAll: function(idx){
		return this._pool;
	},

	getSize: function(){
		return this._pool.length;
	},

	_onSpriteDestroyed: function(e, sprite) {
		this.remove(sprite);
	}
});

sge.core.SpriteMgr = Class;

}(window.sge || (window.sge = {})));