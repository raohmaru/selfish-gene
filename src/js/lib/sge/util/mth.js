;(function (sge) { 'use strict';

sge.mth = sge.mth || {};
var PI = Math.PI;

sge.mth.sqr = function(num) {
	return num * num;
};

sge.mth.dte = function(x1, y1, x2, y2) {
	return (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1);
};

sge.mth.ang = function(x1, y1, x2, y2) {
	var angle = Math.atan((y2 - y1) / (x2 - x1));
	if(x1 > x2) {
		angle += PI;
	}
	return angle;
};

}(window.sge || (window.sge = {})));