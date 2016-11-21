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
	},
	p;

app.lib.gene.Movable = function(gene) {
	app.util.extend(gene, {
		changeSpeed: function () {
			this.speed = app.util.random(this._baseAttrs.moveSpeed);
		},
		changeAngle: function () {
			this.angle += app.util.random(-this.angleDelta, this.angleDelta);
		},
		move: function(){
			this.x += Math.cos(this.angle) * this.speed;
			this.y += Math.sin(this.angle) * this.speed;
		},
		movableFrame: function() {
			if(this.restFor !== undefined) {
				if(this.restFor-- > 0) {
					return;
				} else {
					this.restFor = undefined;
				}
			}	
			this.move();
			if(this.age % this._baseAttrs.updateMovEvery === 0) {
				if(app.util.randomBool(this.restProb)) {
					this.restFor = app.util.randomInt(app.core.beatMachine.fps, app.core.beatMachine.fps*this._baseAttrs.restMaxTime);
				}			
				if(app.util.randomBool(this.changeAngleProb)) {
					this.changeAngle();
				}
				if(app.util.randomBool(this.changeSpeedProb)) {
					this.changeSpeed();
				}
			}
		}
	});
	gene._baseAttrs = app.util.extend({}, defaults, gene._baseAttrs);
	gene.angle = Math.random() * PI2;
	gene.angleDelta = Math.random() * HALFPI;
	gene.changeAngleProb = Math.random();
	gene.changeSpeedProb = Math.random();
	gene.changeSpeed();
	gene.restProb = app.util.random(0, gene._baseAttrs.restTopProb);
	gene.on(app.cfg.event.FRAME, gene.movableFrame);
};

}(window.app || (window.app = {})));