import main_loop from "./main_loop.js";

var config = {
	height: 700,
	width: 1000,
	physics: {
        default: 'arcade',
        arcade: {debug: true}
    },
	scene: [title_screen, main_loop]
}

var game = new Phaser.Game(config);
