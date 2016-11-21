;(function (app) { 'use strict';

app.lib = app.lib || {};

app.lib.GeneFactory = {
	create: function (attrs, traits) {
		var gene = new app.lib.Gene(attrs);
		for (var i=0, len=traits.length; i<len; i++) {
			if(app.lib.gene[traits[i]]) {
				gene.addTrait(traits[i], app.lib.gene[traits[i]]);
			}
		}
		gene.init(attrs);
		return gene;
	},

	clone: function(gene) {
		var clone = this.create({
			x: gene.x,
			y: gene.y
		}, gene.getTraits());
		return clone;
	}
};

}(window.app || (window.app = {})));