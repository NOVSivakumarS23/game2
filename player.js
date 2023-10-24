import Player_sprite from "./player_sprite.js";

export default class Player {
  constructor(scene, physics, keylogger) {
    this.scene = scene;
    this.physics = physics;
    this.keys = keylogger
    this.player_sprite = new Player_sprite(scene, physics, this)
    
    this.hitbox_x = 58
    this.hitbox_y = 48
  }
  preload() {
    this.scene.load.image("player", "Sprites/Player/PlayerTemp.png");
    this.player_sprite.preload()
    this.action = "MOVE";
  }
  create() {
    this.player = this.scene.add.rectangle(200, 200, this.hitbox_x, this.hitbox_y);
    this.player.setFillStyle(0xf0f0ff, 0)
    this.scene.physics.add.existing(this.player);
    this.player_sprite.create()
    this.v = [0, 0]
  }
  update() {
    this.action_switch()
    this.player.body.setVelocityX(this.v[0])
    this.player.body.setVelocityY(this.v[1])
    this.player_sprite.update(this.player)
    this.v = [0, 0]
  }

  action_switch() {
    if (this.action == "MOVE") {
      this.move();
    }
  }
  move() {
    this.v[0] = this.keys.Njoy[0] * 100
    this.v[1] = this.keys.Njoy[1] * 100
  }
}