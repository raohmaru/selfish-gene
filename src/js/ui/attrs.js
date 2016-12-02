;(function (app) { 'use strict';

app.ui = app.ui || {};
var itemClass = 'attrs__item',
	selectedItemClass = itemClass + '--selected',
	p;

(app.ui.Attrs = function(el, attrs) {
	this._el = el;
	this._attrs = attrs;
	this._init();
}).prototype = p = new Object();

p._init = function(){
	var domstr = '',
		attr;
	for (var i=0, len=this._attrs.length; i<len; i++) {
		attr = this._attrs[i];
		domstr += '<span class="' + itemClass +
					(attr.initial ? ' ' + selectedItemClass : '') + '" \
					data-attr="' + i + '" \
					title="' + attr.name + '" \
					style="background-color:' + attr.color + ';" \
					></span>';
	}
	this._el.innerHTML = domstr;
	this._el.addEventListener('click', this._clickHandler.bind(this));
	this._selectedAttrs = [];
};

p._clickHandler = function(e){
	if(!e.target.classList.contains(itemClass)) {
		return;
	}
	e.target.classList.toggle(selectedItemClass);
	[].slice.call(this._el.querySelectorAll('.'+selectedItemClass)).forEach(function(node) {
		if(node !== e.target) {
			node.classList.remove(selectedItemClass);
		}
	});
	this._selectedAttrs = [];
	[].slice.call(this._el.querySelectorAll('.'+selectedItemClass)).forEach(function(node) {
		var idx = parseInt(node.getAttribute('data-attr'), 10);
		this._selectedAttrs.push(this._attrs[idx].name);
	}, this);
};

p.getSelectedAttrs = function () {
	return this._selectedAttrs.slice();
};

}(window.app || (window.app = {})));