;(function (app) { 'use strict';

app.lib = app.lib || {};
app.lib.gene = app.lib.gene || {};
var defaults = {
		color: '#000000'
	};

app.lib.gene.Basic = function(gene) {
	app.util.extend(gene, {
		_baseAttrs:  app.util.extend({}, defaults, gene._baseAttrs)
	});
}

}(window.app || (window.app = {})));