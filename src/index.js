import {
	audio,
	loader,
	state,
	device,
	video,
	utils,
	plugin,
	pool,
} from 'melonjs/dist/melonjs.module.js';

import TitleScreen from './stage/title';
import PlayScreen from './stage/play';
import PlayerEntity from './renderables/player';
import DataManifest from './manifest';

device.onReady(() => {
	// initialize the display canvas once the device/browser is ready
	if (!video.init(1100, 500, { parent: 'screen', scale: 'auto' })) {
		alert('Your browser does not support HTML5 canvas.');
		return;
	}

	// initialize the debug plugin in development mode.
	if (process.env.NODE_ENV === 'development') {
		import('./plugin/debugPanel').then((debugPlugin) => {
			// automatically register the debug panel
			utils.function.defer(
				plugin.register,
				this,
				debugPlugin.DebugPanelPlugin,
				'debugPanel',
			);
		});
	}

	// Initialize the audio.
	audio.init('mp3,ogg');

	// allow cross-origin for image/texture loading
	loader.crossOrigin = 'anonymous';

	// set and load all resources.
	loader.preload(DataManifest, function () {
		// set the user defined game stages
		state.set(state.MENU, new TitleScreen());
		state.set(state.PLAY, new PlayScreen());

		// add our player entity in the entity pool
		pool.register('mainPlayer', PlayerEntity);

		// Start the game.
		state.change(state.PLAY);
	});
});
