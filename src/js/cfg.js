;(function (app) { 'use strict';

app.cfg = {
	debug: true,
	renderer: null,
	canvasColor: '#c2dcfc',
	fps: 60,
	atlasSectorSize:50,
	atlasUpdate:30,
	geneAttrs: [
		{name:'Basic',    color:'#666666', initial: true},
		{name:'Ally',     color:'#55AE6B'},
		// {name:'Dodger',   color:'#49A1FF'},
		// {name:'Defender', color:'#FABB2C'},
		{name:'Killer',   color:'#DD0000'}
	],
	event: {
		PREPARE_FRAME:  'prepareFrame',
		FRAME:          'frame',
		SPRITE_RENDER:  'spriteRender',
		SPRITE_ADDED:   'spriteAdded',
		SPRITE_CLONE:   'spriteClone',
		SPRITE_DESTROY: 'spriteDestroy',
		WORLD_RESIZE:   'worldResize'
	}
}

}(window.app || (window.app = {})));