;(function (app) { 'use strict';

app.util = app.util || {};
var PI = Math.PI;

app.util.sqr = function(num) {
	return num * num;
};

app.util.dte = function(x1, y1, x2, y2) {
	return (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
};

app.util.ang = function(x1, y1, x2, y2) {
	var angle = Math.atan((y2 - y1) / (x2 - x1));
	if(x1 > x2) {
		angle += PI;
	}
	return angle;
};

}(window.app || (window.app = {})));