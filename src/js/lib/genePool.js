;(function (app) { 'use strict';

app.lib = app.lib || {};
var p;

(app.lib.GenePool = function() {
	this.init();
}).prototype = p = new Object();

p.init = function(){
	this.genes = [];
};

p.add = function(x, y){
	this.genes.push( new app.lib.Gene(x, y) );
	app.core.trigger('geneAdded');
};

p.map = function(func){
	var len = this.genes.length;
	for(var i=0; i<len; i++) {
		func(this.genes[i]);
	}
};

Object.defineProperty(p, 'length', {
	get: function() {
		return this.genes.length;
	}
});

}(window.app || (window.app = {})));