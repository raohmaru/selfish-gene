;(function (sge) { 'use strict';

sge.grf = sge.grf || {};
var p;

(sge.grf.SharedRenderer = function(renderer) {
	this._renderer = renderer;
	this._init();
}).prototype = p = new Object();

p._init = function(){
	this._renList = {};
};

p.get = function(width, height, id){
	var name = [].join.call(arguments, ''),
		r;
	if(!this._renList[name]) {
		r = new this._renderer(null, width, height);
		this._renList[name] = r;
	}
	return this._renList[name];
};

}(window.sge || (window.sge = {})));