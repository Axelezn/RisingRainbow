// alert("Hello From Script");
class GameScene extends Phaser.Scene {
  init() {}
  // load assets
  preload() {
    const images = {
      nuage1: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_1.png",
      nuage2: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_2.png",
      nuage3: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_3.png",
      nuage4: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_4.png",
      nuage5: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_5.png",
    };
    //load all images
    for (const id in images) {
      const fichier = images[id];
      this.load.image(id, fichier);
    }
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  // create game entities
  create() {
    const mult=100;
    this.nuage5 = this.add.tileSprite(0, this.game.config.height-500, this.game.config.width*mult, 787, "nuage5").setScale(0.5).setAlpha(0.8);
    this.nuage4 = this.add.tileSprite(0, this.game.config.height-350, this.game.config.width*mult, 529, "nuage4").setScale(0.5).setAlpha(0.8);
    this.nuage3 = this.add.tileSprite(0, this.game.config.height-225, this.game.config.width*mult, 533, "nuage3").setScale(0.5).setAlpha(0.8);
    this.nuage2 = this.add.tileSprite(0, this.game.config.height-140, this.game.config.width*mult, 280, "nuage2").setScale(0.5).setAlpha(0.8);
    // this.nuage2.setOrigin(0,0);
    // this.nuage3.setOrigin(0,0);
    // this.nuage5.setOrigin(0,0);
    this.nuage2.setScrollFactor(0.667);
    this.nuage3.setScrollFactor(0.444);
    this.nuage4.setScrollFactor(0.296);
    this.nuage5.setScrollFactor(0.197);
    this.player = this.physics.add.sprite(100, 450, 'dude'); 
    this.cameras.main.startFollow(this.player,false,1,0.05,-300,150);
    this.nuage1 = this.add.tileSprite(0, this.game.config.height+50, this.game.config.width*mult, 311, 'nuage1');
    this.player.setBounce(0.2);
    this.physics.add.existing(this.nuage1, true);
    this.physics.add.collider(this.player, this.nuage1);
  }
  
  gameOver() {
    console.log("Game Over");
    this.scene.pause();
    localStorage.setItem(
      "topScore",
      Math.max(localStorage.getItem("topScore"), this.score)
    );
    this.scene.start("restart");
  }

  update() {
    this.player.setVelocityX(160);
  }

}

export default GameScene;
