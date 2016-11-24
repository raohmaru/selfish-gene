;(function (app) { 'use strict';

app.lib = app.lib || {};
app.lib.gene = app.lib.gene || {};
var PI2 = 2 * Math.PI,
	HALFPI = Math.PI / 2,
	defaults = {
		moveSpeed: 1,
		restMaxTime: 5,
		restTopProb: .005,
		updateMovEvery: 7  // frames
	};

app.lib.gene.Movable = function(gene) {
	app.util.extend(gene, {
		_baseAttrs:      app.util.extend({}, defaults, gene._baseAttrs),
		angleDelta:      Math.random() * HALFPI,
		changeAngleProb: Math.random(),
		changeSpeedProb: Math.random(),
		restProb:        app.util.random(0, gene._baseAttrs.restTopProb),
		changeSpeed:     changeSpeed,
		changeAngle:     changeAngle,
		move:            move
	});
	gene.changeAngle(Math.random() * PI2);
	gene.changeSpeed();
	gene.on(app.cfg.event.FRAME, frame.bind(gene));
};

var changeSpeed = function(n) {
	if(n === undefined) {
		n = app.util.random(this._baseAttrs.moveSpeed)
	}
	this.speed = n;
};
var changeAngle = function(n) {
	if(n === undefined) {
		n = this.angle + app.util.random(-this.angleDelta, this.angleDelta);
	}
	this.angle = n;
	this.angleCos = Math.cos(n);
	this.angleSin = Math.sin(n);
};
var move = function(){
	this.x += this.angleCos * this.speed;
	this.y += this.angleSin * this.speed;
};
var frame = function() {
	if(this.restFor !== undefined) {
		if(this.restFor-- > 0) {
			return;
		} else {
			this.restFor = undefined;
		}
	}	
	this.move();
	if(app.core.runTime % this._baseAttrs.updateMovEvery === 0) {
		if(!this._chasing && app.util.randomBool(this.restProb)) {
			this.restFor = app.util.randomInt(app.core.beatMachine.fps, app.core.beatMachine.fps*this._baseAttrs.restMaxTime);
		}			
		if(!this._chasing && app.util.randomBool(this.changeAngleProb)) {
			this.changeAngle();
		}
		if(app.util.randomBool(this.changeSpeedProb)) {
			this.changeSpeed();
		}
	}
};

}(window.app || (window.app = {})));