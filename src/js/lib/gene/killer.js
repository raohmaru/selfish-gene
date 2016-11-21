;(function (app) { 'use strict';

app.lib = app.lib || {};
app.lib.gene = app.lib.gene || {};
var PI2 = 2 * Math.PI,
	HALFPI = Math.PI / 2,
	defaults = {
		color: '#DD0000'
	},
	p;

app.lib.gene.Killer = {
	init: function(attrs){
		attrs = app.util.extend({}, defaults, attrs);
		this.init.parent().call(this, attrs);
	},
	frame: function() {
		this.frame.parent().call(this);
	}
}

}(window.app || (window.app = {})));