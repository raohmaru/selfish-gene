;(function (sge) { 'use strict';

sge.sys = sge.sys || {};

var Class = function(attrs){
	Class.__super__.constructor.call(this, attrs);
};
Class = sge.obj.inherits(Class, sge.sys.Entity);

sge.obj.extend(Class.prototype, {
	init: function(){
		Class.__super__.init.call(this, arguments);
		this.addTrait('Renderable', sge.sys.trait.Renderable);
	}
});

sge.sys.Sprite = Class;

}(window.sge || (window.sge = {})));