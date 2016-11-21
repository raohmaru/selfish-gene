;(function (app) { 'use strict';

app.cfg = {
	debug: true,
	canvasColor: '#c2dcfc',
	fps: 60,
	geneAttrs: [
		{name:'Dodger',   color:'#49A1FF'},
		{name:'Defender', color:'#FABB2C'},
		{name:'Killer',   color:'#DD0000'}
	],
	event: {
		FRAME:      'frame',
		GENE_ADDED: 'geneAdded',
		GENE_CLONE: 'geneClone'
	}
}

}(window.app || (window.app = {})));