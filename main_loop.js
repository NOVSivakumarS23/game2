import Player from "./player.js";

export default class main_loop extends Phaser.Scene {

	load_data(){
		var d = document.cookie;
		return document.cookie
	}
	save_data(){
		document.cookie = "savedata=hello";
	}

	constructor(){
		super("playGame");
		this.data = this.load_data();
	}

	preload(){
		this.player = new Player(this, this.physics);
		this.player.preload();
		this.load.image("kingdom_tiles", "Sprites/Tilemaps/Upscaled/kingdom.png")
		this.load.tilemapTiledJSON("test", "Sprites/maps/test.json")
	}
	create(){
		this.map = this.add.tilemap("test")
		var tileset = this.map.addTilesetImage("kingdom", "kingdom_tiles")
		//this.map.createLayer("base_color", tileset)

		this.player.create();
		this.add.text(20,20, "savedata :"+this.load_data());

	}
	update(){
		this.player.update()
		console.log(this.game.loop.actualFps)
	}
	
}