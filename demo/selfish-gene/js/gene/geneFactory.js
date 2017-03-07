;(function (app) { 'use strict';

var geneCount = 0;

app.geneFactory = {
	create: function (attrs, traits) {
		var gene = new app.Gene(attrs),
			t;
		for (var i=0, len=traits.length; i<len; i++) {
			t = traits[i];
			if(typeof t === 'object') {
				t = t.name;
			}
			if(sge.sys.trait[t]) {
				gene.addTrait(t, sge.sys.trait[t]);
			}
			else if(app.gene[t]) {
				gene.addTrait(t, app.gene[t]);
			}
		}
		return gene;
	}
};

}(window.app || (window.app = {})));