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
    this.nuage5 = this.add.tileSprite(0, this.game.config.height-787/2, this.game.config.width*mult, 787, "nuage5");
    this.nuage3 = this.add.tileSprite(0, this.game.config.height-529/2, this.game.config.width*mult, 529, "nuage3");
    this.nuage2 = this.add.tileSprite(0, this.game.config.height-280/2, this.game.config.width*mult, 280, "nuage2");
    // this.nuage2.setOrigin(0,0);
    // this.nuage3.setOrigin(0,0);
    // this.nuage5.setOrigin(0,0);
    this.nuage2.setScrollFactor(1);
    this.nuage3.setScrollFactor(0.33);
    this.nuage5.setScrollFactor(0.11);
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.cameras.main.startFollow(this.player);
  }
  *
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

    // this.nuage5.tilePositionX -= 0.05;
    // this.nuage4.tilePositionX -= 0.15;
    // this.nuage3.tilePositionX -= 0.3;
    // this.nuage2.tilePositionX -= 0.45;
    // this.nuage1.tilePositionX -= 0.6;
  }

  addBase(x) {
    let tileNeeded = Math.ceil(
      (this.sys.game.config.width - x) / this.tileWidth
    );
    let y = this.sys.game.config.height - this.tileHeight;
    for (let i = 0; i < tileNeeded; i++) {
      this.addTile(x - 10 + i * this.tileWidth, y);
    }
    // velocity
    this.ground.children.iterate((child) => {
      child.setVelocityX(Math.max(--this.groundSpeed, -230));
      child.setImmovable(true);
    });
  }
  addTile(x, y) {
    this.ground.create(x, y, "nuage1").setOrigin(0, 0);
  }
}

export default GameScene;
