;(function (app) { 'use strict';

app.lib = app.lib || {};
var p;

(app.lib.Pool = function() {
	this._init();
}).prototype = p = new Object();

p._init = function(){
	this._array = [];
};

p.add = function(item){
	this._array.push(item);
};

p.addAt = function(item, idx){
	this._array[idx] = item;
};

p.getAt = function(idx){
	return this._array[idx];
};

p.walk = function(func){
	this._array.forEach(func);
};

Object.defineProperty(p, 'length', {
	get: function() {
		return this._array.length;
	}
});

}(window.app || (window.app = {})));