import {
	Stage,
	game,
	ColorLayer,
	BitmapText,
} from 'melonjs/dist/melonjs.module.js';

class PlayScreen extends Stage {
	/**
	 *  action to perform on state change
	 */
	onResetEvent() {
		game.world.addChild(new ColorLayer('background', '#202020'));
		game.world.addChild(
			new BitmapText(game.viewport.width / 2, game.viewport.height / 2, {
				font: 'PressStart2P',
				size: 3.5,
				textBaseline: 'middle',
				textAlign: 'center',
				text: 'Hello World !',
			}),
		);
	}
}

export default PlayScreen;
