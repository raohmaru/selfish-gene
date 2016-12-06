;(function (sge) { 'use strict';

sge.event = {
	PREPARE_FRAME:  'prepareFrame',
	FRAME:		  'frame',
	SPRITE_RENDER:  'spriteRender',
	SPRITE_ADDED:   'spriteAdded',
	SPRITE_CLONE:   'spriteClone',
	SPRITE_DESTROY: 'spriteDestroy',
	WORLD_RESIZE:   'worldResize'
}

}(window.sge || (window.sge = {})));