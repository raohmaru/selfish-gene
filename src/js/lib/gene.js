;(function (app) { 'use strict';

app.lib = app.lib || {};
var COLOR = '#000000',
	WIDTH = 4,
	HEIGHT = 4,
	MOVE_SPEED = 2,
	PI2 = 2 * Math.PI,
	HALFPI = Math.PI / 2,
	p;

(app.lib.Gene = function(x, y) {
	this.x = x;
	this.y = y;
	this.init();
	console.log(this);
}).prototype = p = new Object();

p.init = function(){
	this.width = WIDTH;
	this.height = HEIGHT;
	this.angle = Math.random() * PI2;
	this.angleDelta = Math.random() * HALFPI;
	this.changeAngleProb = Math.random();
	this.changeSpeedProb = Math.random();
	this.restProb = app.util.random(0, .005);
	this.changeSpeed();
	this.view = new app.lib.ge();
	this.view.resize(this.width, this.height);
	this.view.drawRect(0, 0, this.width, this.height, COLOR);
};

p.changeSpeed = function () {
	this.speed = app.util.random(MOVE_SPEED);
}

p.changeAngle = function () {
	this.angle += app.util.random(-this.angleDelta, this.angleDelta);
}

p.frame = function(){
	if(this.restFor !== undefined) {
		if(this.restFor-- > 0) {
			return;
		} else {
			this.restFor = undefined;
		}
	}	
	this.move();
	if(app.util.randomBool(this.restProb)) {
		this.restFor = app.util.randomInt(app.core.beatMachine.fps, app.core.beatMachine.fps*5);
	}
	if(app.util.randomBool(this.changeAngleProb)) {
		this.changeAngle();
	}
	if(app.util.randomBool(this.changeSpeedProb)) {
		this.changeSpeed();
	}
};

p.move = function(){
	this.x += Math.cos(this.angle) * this.speed;
	this.y += Math.sin(this.angle) * this.speed;
};

p.getView = function() {		
	return this.view.getView();
}

}(window.app || (window.app = {})));