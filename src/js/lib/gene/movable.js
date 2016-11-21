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

app.lib.gene.Movable = {
	init: function(attrs){
		attrs = app.util.extend({}, defaults, attrs);
		this.init.parent().call(this, attrs);
		this.angle = Math.random() * PI2;
		this.angleDelta = Math.random() * HALFPI;
		this.changeAngleProb = Math.random();
		this.changeSpeedProb = Math.random();
		this.changeSpeed();
		this.restProb = app.util.random(0, this._baseAttrs.restTopProb);
		// app.core.on(app.cfg.event.GENE_ADDED, this._geneAdded.bind(this));
	},
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
	frame: function() {
		this.frame.parent().call(this);
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
	},
	_willMove: function() {
		if(app.core.genePool.length === 1) {
			this.restProb = 1;
		} else {
			this.restProb = app.util.random(0, .01 - app.core.genePool.length / 1000);
		}
	},
	_geneAdded: function () {
		if(app.core.genePool.length <= 5) {
			this._willMove();
		}
	}
}

}(window.app || (window.app = {})));