export default class Player {
  keylog(){
    this.space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.enter = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.W = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.left);
    this.right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.right);
    this.up = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.up);
    this.down = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.down);
  }
  joystick(){
    if(this.W.isDown || this.up.isDown){
      this.joy[1] -=1
    }
    if(this.S.isDown || this.down.isDown){
      this.joy[1] +=1
    }
    if(this.A.isDown || this.left.isDown){
      this.joy[0] -=1
    }
    if(this.D.isDown || this.right.isDown){
      this.joy[0] +=1
    }
    this.Njoy[0] = this.joy[0];
    this.Njoy[1] = this.joy[1]
    var m = 0.001+Math.sqrt((this.Njoy[0]*this.Njoy[0])+(this.Njoy[1]*this.Njoy[1]))
    this.Njoy[0] = this.Njoy[0]/m
    this.Njoy[1] = this.Njoy[1]/m
  }

  constructor(scene, physics) {
    this.scene = scene;
    this.physics = physics;
  }
  preload(){
    this.scene.load.image("player", "Sprites/Player/PlayerTemp.png");
    this.action = "MOVE";
  }
  create(){
    this.player = this.physics.add.sprite(200, 200, "player"); 
    this.keylog()
    this.v = [0,0]
    this.joy = [0,0]
    this.Njoy = [0,0]

  }
  update(){
    this.joystick()

    this.action_switch()

    this.player.body.setVelocityX(this.v[0])
    this.player.body.setVelocityY(this.v[1])
    this.v = [0,0]
    this.joy = [0,0]
    this.Njoy = [0,0]
  }

  action_switch(){
    if(this.action=="MOVE"){
      this.move();
    }
  }

  move(){
    this.v[0] = this.Njoy[0]*100
    this.v[1] = this.Njoy[1]*100
  }
}