;(function (app) { 'use strict';

app.gene = app.gene || {};
var PI2 = 2 * Math.PI,
	HALFPI = Math.PI / 2,
	defaults = {
		moveSpeed: 1,
		restMaxTime: 5,
		restTopProb: .005,
		updateMovEvery: 7  // frames
	};

app.gene.Movable = function(gene) {
	gene._baseAttrs = sge.obj.extend({}, defaults, gene._baseAttrs);
	sge.obj.extend(gene, {
		angleDelta     : Math.random() * HALFPI,
		changeAngleProb: Math.random(),
		changeSpeedProb: Math.random(),
		restProb       : sge.rnd.random(0, gene._baseAttrs.restTopProb),
		changeSpeed    : changeSpeed,
		changeAngle    : changeAngle,
		move           : move
	});
	gene.changeAngle(Math.random() * PI2);
	gene.changeSpeed();
	gene.on(sge.event.FRAME, frame);
};

var changeSpeed = function(n) {
	if(n === undefined) {
		n = sge.rnd.random(this._baseAttrs.moveSpeed)
	}
	this.speed = n;
};
var changeAngle = function(n) {
	if(n === undefined) {
		n = this.angle + sge.rnd.random(-this.angleDelta, this.angleDelta);
	}
	this.angle = n;
	this.angleCos = Math.cos(n);
	this.angleSin = Math.sin(n);
};
var move = function(){
	this.x += this.angleCos * this.speed;
	this.y += this.angleSin * this.speed;
};
var frame = function(e) {
	if(this.restFor !== undefined) {
		if(this.restFor-- > 0) {
			return;
		} else {
			this.restFor = undefined;
		}
	}	
	this.move();
	if(this._core.runTime % this._baseAttrs.updateMovEvery === 0) {
		if(!this._chasing && sge.rnd.randomBool(this.restProb)) {
			this.restFor = sge.rnd.randomInt(this._core.beatMachine.fps, this._core.beatMachine.fps*this._baseAttrs.restMaxTime);
		}			
		if(!this._chasing && sge.rnd.randomBool(this.changeAngleProb)) {
			this.changeAngle();
		}
		if(sge.rnd.randomBool(this.changeSpeedProb)) {
			this.changeSpeed();
		}
	}
};

}(window.app || (window.app = {})));