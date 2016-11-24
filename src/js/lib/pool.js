;(function (app) { 'use strict';

app.lib = app.lib || {};
var p;

(app.lib.Pool = function() {
	this._init();
}).prototype = p = new Object();

p._init = function(){
	this._array = [];
	this._length = 0;
};

p.add = function(item, idx){
	if(idx) {
		this._array[idx] = item;
	} else {
		this._array.push(item);
	}
	this._length++;
};

p.remove = function(item, idx){
	if(idx) {
		if(this._array[idx]) {
			delete this._array[idx];
			this._length--;
		}
	} else {
		var idx = this._array.indexOf(item);
		if(idx > -1) {
			this._array.splice(idx, 1);
			this._length--;
		}
	}
};

p.get = function(idx){
	return this._array[idx];
};

p.forEach = function(func){
	for (var key in this._array) {
		func(this._array[key]);
	}
};

Object.defineProperty(p, 'length', {
	get: function() {
		return this._length;
	}
});

}(window.app || (window.app = {})));