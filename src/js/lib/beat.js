;(function (app) { 'use strict';

app.lib = app.lib || {};
var defaults = {
		debug: false
	},
	p;

(app.lib.Beat = function(options) {
	this._options = app.util.extend({}, defaults, options);
	this._init();
}).prototype = p = new Object();

p._init = function() {
	this._frameCount = 0;
	this._cbs = [];
};

p.start = function(fps) {
	this._fps = fps;
    this._fpsInterval = 1000 / fps;
    this._then = window.performance.now();
    this._startTime = this.then;
    this._frame();
};

p._frame = function(currentTime) {
    window.requestAnimationFrame(this._frame.bind(this));
    // calc elapsed time since last loop
    var elapsed = currentTime - this._then;
    // if enough time has elapsed, draw the next frame
    if (elapsed > this._fpsInterval) {
		var func;
        // Get ready for next frame by setting then=currentTime, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        this._then = currentTime - (elapsed % this._fpsInterval);
        for(var i=0, len=this._cbs.length; i<len; i++) {
			this._cbs[i]();
		}
		if(this._options.debug) {
			this._frameCount++;
			this.currentFps = 1000 / (currentTime-this._prevTime);
			this._prevTime = currentTime;			
		}
    }
};

p.onBeat = function(func) {
    this._cbs.push(func);
	return this;
};

}(window.app || (window.app = {})));