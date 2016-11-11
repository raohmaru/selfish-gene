;(function (app) { 'use strict';

app.lib = app.lib || {};
var defaults = {
		debug: false
	},
	p;

(app.lib.Beat = function(options) {
	this.options = app.util.extend({}, defaults, options);
	this.init();
}).prototype = p = new Object();

p.init = function() {
	this.frameCount = 0;
	this.cbs = [];
};

p.start = function(fps) {
	this.fps = fps;
    this.fpsInterval = 1000 / fps;
    this.then = window.performance.now();
    this.startTime = this.then;
    this.frame();
};

p.frame = function(currentTime) {
    window.requestAnimationFrame(this.frame.bind(this));
    // calc elapsed time since last loop
    var elapsed = currentTime - this.then;
    // if enough time has elapsed, draw the next frame
    if (elapsed > this.fpsInterval) {
		var func;
        // Get ready for next frame by setting then=currentTime, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        this.then = currentTime - (elapsed % this.fpsInterval);
        for(var i=0, len=this.cbs.length; i<len; i++) {
			func = this.cbs[i];
			func.call(func);
		}
		if(this.options.debug) {
			this.frameCount++;
			this.currentFps = 1000 / (currentTime-this.prevTime);
			this.prevTime = currentTime;			
		}
    }
};

p.onBeat = function(func) {
    this.cbs.push(func);
	return this;
};

}(window.app || (window.app = {})));