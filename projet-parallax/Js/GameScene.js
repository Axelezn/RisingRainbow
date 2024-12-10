// alert("Hello From Script");
class GameScene extends Phaser.Scene {
  init(data) {
    if (!data.level) data.level = 1;
    this.level = data.level;
    console.log("level " + this.level);
    switch (this.level % 3) {
      case 1: // monde 1
        this.images = {
          ground: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_1.png",
          parallax1: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_2.png",
          parallax2: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_3.png",
          parallax3: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_4.png",
          parallax4: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_5.png",
        };
        this.spritefile = "assets/dude.png";
        break;
      case 2: //monde 2
        this.images = {
          ground: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_1.png",
          parallax1: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_2.png",
          parallax2: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_3.png",
          parallax3: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_4.png",
          parallax4: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_5.png",
        };
        this.spritefile = "assets/dude.png";
        break;
      case 0: //monde 3
        this.images = {
          ground: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_1.png",
          parallax1: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_2.png",
          parallax2: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_3.png",
          parallax3: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_4.png",
          parallax4: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_5.png",
        };
        this.spritefile = "assets/dude.png";
        break;
    }
    // calcul de la vitesse ne fonction du niveau
    this.speed = 160 * 1.2 ** this.level;
  }

  // load assets
  preload() {
    //load all images
    for (const id in this.images) {
      const fichier = this.images[id];
      this.load.image(id, fichier);
    }
    this.load.spritesheet("dude", this.spritefile, {
      frameWidth: 88,
      frameHeight: 87,
    });
  }

  // create game entities
  create() {
    this.mult = 10;
    this.parallax4 = this.add
      .tileSprite(
        -Phaser.Math.RND.integerInRange(100, this.game.config.width + 100),
        this.game.config.height - 700,
        this.game.config.width * this.mult,
        787,
        "parallax4"
      )
      .setScale(0.5)
      .setAlpha(0.8);
    this.parallax3 = this.add
      .tileSprite(
        -Phaser.Math.RND.integerInRange(100, this.game.config.width + 100),
        this.game.config.height - 450,
        this.game.config.width * this.mult,
        529,
        "parallax3"
      )
      .setScale(0.5)
      .setAlpha(0.8);
    this.parallax2 = this.add
      .tileSprite(
        -Phaser.Math.RND.integerInRange(100, this.game.config.width + 100),
        this.game.config.height - 300,
        this.game.config.width * this.mult,
        533,
        "parallax2"
      )
      .setScale(0.5)
      .setAlpha(0.8);
    this.parallax1 = this.add
      .tileSprite(
        -Phaser.Math.RND.integerInRange(100, this.game.config.width + 100),
        this.game.config.height - 150,
        this.game.config.width * this.mult,
        280,
        "parallax1"
      )
      .setScale(0.5)
      .setAlpha(0.8);
    this.parallax1.setOrigin(0, 0);
    this.parallax2.setOrigin(0, 0);
    this.parallax3.setOrigin(0, 0);
    this.parallax4.setOrigin(0, 0);
    this.parallax1.setScrollFactor(0.667);
    this.parallax2.setScrollFactor(0.444);
    this.parallax3.setScrollFactor(0.296);
    this.parallax4.setScrollFactor(0.197);
    this.player = this.physics.add.sprite(100, 450, "dude");
    this.cameras.main.startFollow(this.player, false, 1, 0.05, -300, 150);
    this.ground = this.add.tileSprite(
      0,
      this.game.config.height + 50,
      this.game.config.width * this.mult,
      311,
      "ground"
    );
    this.ground.setOrigin(0, 0);
    this.player.setBounce(0);
    this.physics.add.existing(this.ground, true);
    this.physics.add.collider(this.player, this.ground);

    const spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    spaceKey.on("down", (key, event) => {
      if (this.player.body.touching.down) this.player.setVelocityY(-400);
    });

    this.cameras.main.setBackgroundColor(0xbababa);
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
    this.player.setVelocityX(this.speed);
    if (this.player.x >= this.game.config.width * (this.mult - 5)) {
      //fin du niveau
      this.scene.pause();
      this.level++;
      this.scene.start("game", { level: this.level });
    }
  }
}

export default GameScene;
