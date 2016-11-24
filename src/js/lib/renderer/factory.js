;(function (app) { 'use strict';

app.lib = app.lib || {};
var Renderer,
	sharedRenderer;

app.lib.rendererFactory = {
	init: function (type) {
		this.setContext(type);
	},

	setContext: function(type) {
		if(type === '2D') {
			Renderer = app.lib.CanvasRenderer;
		}
	},

	create: function () {
		return app.util.callNew(Renderer, app.util.argsToArray(arguments));
	},

	createShared: function(width, height, id) {
		if(!sharedRenderer) {
			sharedRenderer = new app.lib.SharedRenderer(Renderer);			
		}
		return sharedRenderer.get(width, height, id);
	}
};

}(window.app || (window.app = {})));