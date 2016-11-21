;(function (app) { 'use strict';

app.ui = app.ui || {};
var selectedClass = 'attrs__item--selected',
	p;

(app.ui.Attrs = function(el) {
	this._el = el;
	this._init();
}).prototype = p = new Object();

p._init = function(){
	var domstr = '',
		attr;
	for (var i=0, len=app.cfg.geneAttrs.length; i<len; i++) {
		attr = app.cfg.geneAttrs[i];
		domstr += '<span class="attrs__item" \
					data-attr="'+i+'" \
					title="'+attr.name+'" \
					style="background-color:'+attr.color+';" \
					></span>';
	}
	this._el.innerHTML = domstr;
	this._el.addEventListener('click', this._clickHandler.bind(this));
	this._selectedAttrs = [];
};

p._clickHandler = function(e){
	e.target.classList.toggle(selectedClass);
	this._selectedAttrs.length = 0;
	[].slice.call(this._el.querySelectorAll('.'+selectedClass)).forEach(function(node) {
		var idx = parseInt(node.getAttribute('data-attr'), 10);
		this._selectedAttrs.push(app.cfg.geneAttrs[idx].name);
	}, this);
};

p.getSelectedAttrs = function () {
	return this._selectedAttrs.slice();
};

}(window.app || (window.app = {})));