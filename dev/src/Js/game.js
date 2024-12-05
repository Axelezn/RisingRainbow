//alert("Script Initialisé")
class GameScene extends Phaser.Scene{
    //On load les assets ici
    preload() {
        //this.load.image("tile", "assets/tile.png");
        this.load.image('tile', )
        this.load.atlas("dino", "assets/rondoudou@2x.png")
    }
    // Créer l'entité de jeu 
    create() {
        this.tileWidth=64;
        this.tileHeight = 64;
        this.dino = this.add.sprite(200,343, "dino").setOrigin(0,0).setScale(0.17,0.25)
      //this.add.image(200,300, "tile").setOrigin(0,0);
        this.ground = this.physics.add.group();
        this.addBase();
    }
    update() {
        console.log("Je cours !")
    }
    addBase() {
        let tileNeeded = Math.ceil(this.sys.game.config.width / this.tileWidth);
        let y = this.sys.game.config.height - this.tileHeight;
        for (let i=0; i< tileNeeded; i++) {
            this.addTile(i * this.tileWidth, y)
        }
        //Rapidité : 
        this.ground.children.iterate((child) => {
            child.setVelocityW(Math.max(--this.groundSpeed, -230));
        })

    }
    addTile(x,y) {
        this.ground.create(x,y,"tile").setOrigin(0,0);
    }
}
let config = {
    width:800,
    height:500,
    backgroundColor : '#850606', // '#4488AA',
    type:Phaser.AUTO,
    physics : {
        default:"arcade",
        arcade:{
            gravity:{
                y:0
            },
            debug:true
        }
    }
}
const game = new Phaser.Game(config);
game.scene.add("game", GameScene);
game.scene.start("game");
