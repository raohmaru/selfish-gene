;(function (app) { 'use strict';

var defaults = {
		width: 4,
		height: 4,
		cloneEvery: 960,
		collisionShape: 'circle'
	};
	
var Class = function(attrs){
	Class.__super__.constructor.call(this, sge.obj.extend({}, defaults, attrs));
};
Class = sge.obj.inherits(Class, sge.sys.Sprite);

sge.obj.extend(Class.prototype, {
	init: function(){
		Class.__super__.init.call(this, arguments);
		this.createView(this._baseAttrs.color);
		this.repaint();
		this.on(sge.event.FRAME, frame);
	},
	
	setSize: function(width, height){
		this.resize(width, height, this._baseAttrs.color);
		this.repaint();
	},
	
	repaint: function() {
		if(this._view.isEmpty()) {
			this._view.drawRect(0, 0, this.width, this.height, this._baseAttrs.color);
		}		
	}
});

var frame = function(){
	if(this.age % this._baseAttrs.cloneEvery === 0) {
		var clone = this.clone();
		clone.x = this.x;
		clone.y = this.y;
		this._core.spriteMgr.add(clone);
	}
};

app.Gene = Class;

}(window.app || (window.app = {})));