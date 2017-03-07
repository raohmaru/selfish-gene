;(function (app) { 'use strict';

app.ui = app.ui || {};
var	p;

(app.ui.Info = function(el, game, updateEvery) {
	this._el = el;
	this._init();
}).prototype = p = new Object();

p._init = function(){
	this._clickCallback = this._clickHandler.bind(this);
	document.addEventListener('click', this._clickCallback);
};

p._clickHandler = function(e){
	document.removeEventListener('click', this._clickCallback);
	this._el.classList.add('info--hidden');
	this._el.addEventListener('transitionend', function(){
		this.remove();
	});
};

}(window.app || (window.app = {})));