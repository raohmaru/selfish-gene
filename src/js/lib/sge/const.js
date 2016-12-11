;(function (sge) { 'use strict';

sge.obj.extend(sge, {
	event: {
		PREPARE_FRAME:  'prepareFrame',
		FRAME:		  'frame',
		SPRITE_RENDER:  'spriteRender',
		SPRITE_ADDED:   'spriteAdded',
		SPRITE_CLONE:   'spriteClone',
		SPRITE_DESTROY: 'spriteDestroy',
		WORLD_RESIZE:   'worldResize'
	},
	cnst: {
		FILL_WINDOW: 'fillWindow'
	}
});

}(window.sge || (window.sge = {})));