;(function (sge) { 'use strict';

sge.sys = sge.sys || {};
var count = 0;

var Class = function() {
	this.id = 'sp' + count++;
	this._core = sge.getGame();
	this.init();
};

sge.obj.extend(Class.prototype, {
	init: function() {},

	destroy: function() {
		this._core = undefined;
	}
});

sge.sys.GameObject = Class;

}(window.sge || (window.sge = {})));