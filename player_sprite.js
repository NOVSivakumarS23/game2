export default class Player_sprite {
  constructor(scene, physics, player) {
    this.scene = scene;
    this.physics = physics;
    this.player_data = player
  }
  preload() {
    this.scene.load.image("player", "Sprites/Player/PlayerTemp.png");
  }
  create() {
    this.player_sprite = this.scene.add.sprite(200, 200, "player");
  }
  update(player) {
    var hitbox_x = this.player_data.hitbox_x
    var hitbox_y = this.player_data.hitbox_y
    this.player_sprite.setPosition(player.body.x + (hitbox_x/2)+1, player.body.y)
  }
}