;(function (app) { 'use strict';

app.lib = app.lib || {};
var protos = {};

app.lib.GeneFactory = {
	create: function(attrs, traits) {
		var Proto = this.generateProto(['Movable'].concat(traits)),
			gene = new Proto();
		gene.init(attrs);
		return gene;
	},

	generateProto: function (traits) {
		var name = '',
			arr = [],
			f;
		for (var i=0, len=traits.length; i<len; i++) {
			if(app.lib.gene[traits[i]]) {
				name += traits[i];
				arr.push(app.lib.gene[traits[i]]);
			}
		}
		if(!protos[name]) {			
			f = function(){};
			app.util.inherits.apply(this, [f.prototype, app.lib.Gene.prototype].concat(arr));
			protos[name] = f;
		}
		return protos[name];
	},

	clone: function(gene) {
		var clone = gene.clone();
		clone.init({
			x: gene.x,
			y: gene.y
		});
		return clone;
	}
};

}(window.app || (window.app = {})));