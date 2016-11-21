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
	this._array.push( item );
};

p.map = function(func){
	var len = this._array.length;
	for(var i=0; i<len; i++) {
		func(this._array[i]);
	}
};

Object.defineProperty(p, 'length', {
	get: function() {
		return this._array.length;
	}
});

}(window.app || (window.app = {})));