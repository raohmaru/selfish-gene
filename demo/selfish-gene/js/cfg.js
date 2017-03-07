;(function (app) { 'use strict';

app.cfg = {
	debug: true,
	renderer: '2D',
	size: sge.cnst.FILL_WINDOW,
	width: '100%',
	height: '100%',
	// canvasColor: '#c2dcfc',
	fps: 60,
	atlasSectorSize:50,
	atlasUpdate:30,
	geneAttrs: [
		{name:'Basic',	 color:'#666666', initial: true},
		{name:'Ally',	 color:'#55AE6B'},
		// {name:'Dodger',   color:'#49A1FF'},
		// {name:'Defender', color:'#FABB2C'},
		{name:'Killer',  color:'#DD0000'}
	],
	populationLimit: 4096
}

}(window.app || (window.app = {})));