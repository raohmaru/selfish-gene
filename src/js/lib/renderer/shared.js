;(function (app) { 'use strict';

app.lib = app.lib || {};
var p;

(app.lib.SharedRenderer = function(renderer) {
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
		r = new this._renderer();
		r.resize(width, height);
		this._renList[name] = r;
	}
	return this._renList[name];
};

}(window.app || (window.app = {})));