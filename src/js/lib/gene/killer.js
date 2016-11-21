;(function (app) { 'use strict';

app.lib = app.lib || {};
app.lib.gene = app.lib.gene || {};
var PI2 = 2 * Math.PI,
	HALFPI = Math.PI / 2,
	defaults = {
		color: '#DD0000'
	},
	p;

app.lib.gene.Killer = function(gene) {
	app.util.extend(gene, {
		killerFrame: function() {
		}
	});
	gene._baseAttrs = app.util.extend({}, defaults, gene._baseAttrs);
	gene.on(app.cfg.event.FRAME, gene.killerFrame);
}

}(window.app || (window.app = {})));