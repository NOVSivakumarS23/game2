import Player from "./player.js";
import Dialogue from "./dialogue.js";
import Keylog from "./keylog.js";

export default class main_loop extends Phaser.Scene {
  //TODO: 1st, trigger for dialoge, 2nd, images, 3rd, collider, 4th speech jskldfj
  constructor() {
    super("playGame");
  }

  preload() {
    this.keylogger = new Keylog(this);
    this.player = new Player(this, this.physics, this.keylogger);
    this.dialogue = new Dialogue(this, this.keylogger);

    this.player.preload();
    this.load.image("ground", "Tilemaps/Upscaled/castle_ground.png")
    this.load.tilemapTiledJSON("temp", "Maps/temp.json")
  }
  create() {

    this.ui_group = this.physics.add.staticGroup()

    this.map = this.add.tilemap("temp")
    var tileset = this.map.addTilesetImage("ground", "ground")
    this.base_color_layer = this.map.createLayer("base_color", tileset)
    this.ground_layer = this.map.createLayer("ground", tileset)
    
    const npcs = this.map.getObjectLayer('npc')
    this.npc_group = this.physics.add.staticGroup()
    npcs.objects.forEach(objData => {
      var data = {}
      data["x"] = objData["x"]
      data["y"] = objData["y"]
      data[objData["properties"]["0"]["name"]] = objData["properties"]["0"]["value"]
      data[objData["properties"]["1"]["name"]] = objData["properties"]["1"]["value"]
      const npc = this.npc_group.create(data["x"], data["y"], 'player');
      //dynamically do this
      npc.setSize(55, 40)
      npc.setOffset(0, 50)
    })
    
    this.keylogger.create()

    this.player.create();
    this.player_body = this.player.player
    this.cameras.main.startFollow(this.player.player)

    this.dialogue.create(this.ui_group);
    this.dialogue.format_speech()
    this.dialogue.format_options()
    
    //this.physics.add.collider(this.player_body, this.npc_group)

  }
  
  update() {
    this.keylogger.update()
    this.player.update()
    this.dialogue.update()
    this.keylogger.late_update()

    //depth sorting
    this.children.each(c => {
      const child = c
      child.setDepth(child.y)
    })
    this.dialogue.late_update()
    
  }
}
