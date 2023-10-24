export default class Keylog {
  create_keys(){
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
  
  constructor(scene){
    this.scene = scene
    this.joy = [0,0]
    this.Njoy = [0,0]
    this.key_dict = {}
    this.delta_key_dict = {}
    this.k = Phaser.Input.Keyboard
    console.log("hello")
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
  create(){
    this.create_keys()
  }
  update(){
    this.joystick()
  }
  late_update(){
    this.joy = [0,0]
    this.Njoy = [0,0]
  }
}