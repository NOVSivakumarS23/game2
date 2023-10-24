export default class Dialogue {
  //TODO: meta data like bold, speed, font, add image, dialogue tree
  constructor(Scene, keylogger) {
    this.scene = Scene
    this.hide = false
    this.ui_group = 0
    
    this.speech = "hello hello this is a example dialogue, i will change the font eventually, i think"
    this.options = ["option 1", "option 2", "option 3"]
    this.options2 = []
    this.packing1 = 0;
    this.packing2 = 0;

    
    this.cursor = 0
    this.options_txt = ""
    this.lines = ""
    this.t = 0;
    this.keys = keylogger

    this.margin = 10;
    this.max_length = 70
    this.i_h = 200
    this.i_w = 200
    this.px = 5
    this.txt_px = 25
    this.opt_pad = 25
  }

  create() {

    var w = this.scene.sys.game.canvas.width;
    var h = this.scene.sys.game.canvas.height;
    var s_w = w-(3*this.margin)-this.i_w-(3*this.px)
    var s_h = this.i_h
    var s_x = (0.5*s_w) + this.margin
    var s_y = h-(0.5*s_h)-this.margin-this.px
    this.speech_box = this.scene.add.rectangle(s_x, s_y, s_w, s_h, 0x000000);
    this.speech_box.setStrokeStyle(this.px, 0xffffff);
    this.speech_box.setScrollFactor(0, 0);

    var i_x = w-(this.i_w*0.5)-this.margin - this.px
    var i_y = h-(this.i_h*0.5)-this.margin - this.px
    this.image_box = this.scene.add.rectangle(i_x, i_y ,this.i_w, this.i_h, 0x000000)
    this.image_box.setStrokeStyle(this.px, 0xffffff);
    this.image_box.setScrollFactor(0, 0);

    this.text = this.scene.add.text(this.px+this.margin+12, h-s_h+5, "DEFUALT TEXT");
    this.text.setScrollFactor(0,0);
    this.text.lineSpacing = 10
    
    this.option_box = this.scene.add.text(this.px+this.margin+12, h-s_h+5, " ");
    this.option_box.setScrollFactor(0,0);
    this.option_box.lineSpacing = 25

    this.S = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.left);
    this.right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.right);
  }
  
  format_option_line(temp_options, c, pack){
    var option_line = ""
    var padding = ' '.repeat(pack)
    var n = Math.floor((this.max_length-(2*pack))/temp_options.length)
    for(var i=0; i<temp_options.length; i++){
      var temp_l = temp_options[i]
      if(c==i){temp_l = "> "+temp_options[i]}
      while(temp_l.length<n-1){
        temp_l = " "+temp_l+" "
      }
      option_line += temp_l
    }
    return padding+option_line+padding
  }
  
  format_options(){
    this.options_txt = this.format_option_line(this.options, this.cursor, this.packing1)
    this.options_txt += "\n"+this.format_option_line(this.options2, this.cursor-this.options.length, this.packing2)
    this.option_box.x = this.text.x
    this.option_box.y = this.text.y+this.opt_pad+(this.txt_px*(this.lines.split("\n").length))
  }
  
  format_speech(){
    var words = this.speech.split(" ");
    this.lines = ""
    var line = ""
    for(var i = 0; i < words.length; i++){
      if(line.length+words[i].length>this.max_length){
        this.lines += line+"\n"
        line = words[i]
      }else{
        line += " "+words[i]
      }
    }
    this.lines+=line
    this.lines = this.lines.slice(1)
  }

  cursor_update(){
    if(this.keys.k.JustDown(this.keys.D) || this.keys.k.JustDown(this.keys.right)){
      this.cursor+=1
    }else if(this.keys.k.JustDown(this.keys.A) || this.keys.k.JustDown(this.keys.left)){
      this.cursor-=1
    }
    if(this.cursor<0){this.cursor=0}
    if(this.cursor>=this.options.length+this.options2.length){this.cursor-=1}
    this.format_options()
  }
  
  update(){
    if(this.hide==false){
      console.log("in")
      this.cursor_update()
      this.speech_box.visible = true
      this.image_box.visible = true
      var shown = ""
      var j = 0
      while(true){
        if(j==Math.floor(this.t)){
          break
        }else if(j==this.lines.length){
          this.option_box.setText(this.options_txt)
          break
        }else{
          shown+=this.lines[j]
        }
        j++
      }
      this.text.setText(shown);
      this.t += 0.5
    }else{
      this.speech_box.visible = false
      this.image_box.visible = false
      this.text.setText(" ")
    }
  }

  late_update(){
    this.text.setDepth(10000000)
    this.image_box.setDepth(10000000)
    this.speech_box.setDepth(10000000)
    this.option_box.setDepth(10000000)
  }
}
