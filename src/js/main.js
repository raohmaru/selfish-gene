;(function (app) { 'use strict';

document.addEventListener('DOMContentLoaded', function(){
	var canvas = document.getElementById('maincanvas');
	if(canvas.getContext){
		app.core.start(canvas, '2D');
	} else {
		// canvas-unsupported code here
	}
});

}(window.app || (window.app = {})));