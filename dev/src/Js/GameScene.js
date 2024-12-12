// alert("Hello From Script");
class GameScene extends Phaser.Scene {
  init(data) {
    if (!data.level) data.level = 1;
    this.level = data.level;
    console.log("level " + this.level);
    switch (this.level % 3) {
      case 1: // monde 1
        this.images = {
          ground: "assets/parallaxes/Sol/sol_demon/1x/Nuage_1.png",
          parallax1: "assets/parallaxes/sol/Sol_demon/1x/Nuage_2.png",
          parallax2: "assets/parallaxes/sol/Sol_demon/1x/Nuage_3.png",
          parallax3: "assets/parallaxes/sol/Sol_demon/1x/Nuage_4.png",
          parallax4: "assets/parallaxes/sol/Sol_demon/1x/Nuage_5.png",
          obstacle: "assets/objects/obstacle_demon/obstacle_arc_en_ciel.png",
          obstacle2:
            "assets/objects/obstacle_demon/obstacle_demi_arc_en_ciel.png",
        };
        this.spritefile = "assets/dude.png";
        this.cameras.main.setBackgroundColor(0x80ff80);

        break;
      case 2: //monde 2
        this.images = {
          ground: "assets/parallaxes/Sol/Sol_berger/2x/decor_berger",
          parallax1: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_2.png",
          parallax2: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_3.png",
          parallax3: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_4.png",
          parallax4: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_5.png",
          obstacle: "assets/objects/berger_obstacles/obstacle_berger.png",
        };
        this.spritefile = "assets/dude.png";
        this.cameras.main.setBackgroundColor(0x8080ff);
        break;
      case 0: //monde 3
        this.images = {
          ground: "assets/parallaxes/Sol/Sol_rondoudou/2x/decor_rondoudou.png",
          parallax1: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_2.png",
          parallax2: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_3.png",
          parallax3: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_4.png",
          parallax4: "assets/parallaxes/Sol/Sol_demon/1x/Nuage_5.png",
          obstacle: "assets/objects/rondoudou_obstacles/obstacle_rondoudou.png",
        };
        this.spritefile = "assets/dude.png";
        this.cameras.main.setBackgroundColor(0xff8080);
        break;
    }
    // calcul de la vitesse ne fonction du niveau
    this.speed = 160 * 1.2 ** this.level;
    this.obstacleDelay = 3000;
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
  create() {
    this.mult = 10;
    this.groupGame = this.add.group();
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
    this.spawnObstacle();
    this.parallax3.setOrigin(0, 0);
    this.parallax4.setOrigin(0, 0);
    this.parallax1.setScrollFactor(0.667);
    this.parallax2.setScrollFactor(0.444);
    this.parallax3.setScrollFactor(0.296);
    this.parallax4.setScrollFactor(0.197);
    this.player = this.physics.add.sprite(100, 650, "dude");
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
    this.player.setVelocityX(this.speed);
    this.speed2 = this.speed;
    this.physics.add.existing(this.ground, true);
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.player,this.obstacle,this.gameOver,null,this);
    this.physics.add.collider(this.ground, this.obstacle);

    const spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    spaceKey.on("down", (key, event) => {
      if (this.player.body.touching.down) {
        this.player.setVelocityY(-400);
        this.speed2 = this.speed;
      }
    });
    this.groupGame.add(this.parallax1);
    this.groupGame.add(this.parallax2);
    this.groupGame.add(this.parallax3);
    this.groupGame.add(this.parallax4);
    this.groupGame.add(this.player);
    this.groupGame.add(this.ground);

    this.scoreText = this.add.text(600, 25, "SCORE:0", {
      fontSize: "28px",
      fontFamily: "Arial Black",
      stroke: "gray",
      strokeThickness: 5,
    });
    this.topScore = localStorage.getItem("topScore") == null ? 0 : localStorage.getItem("topScore");
    this.topScoreText = this.add.text(30, 25, "MAX: " + this.topScore, {fontSize: "28px", fontFamily: "Arial Black", stroke: "gray", strokeThickness: 5});
    this.groupText = this.add.group();
    this.groupText.add(this.scoreText);
    this.groupText.add(this.topScoreText);
    this.UICam = this.cameras.add(0, 0, this.game.width, this.game.height);
    this.cameras.main.ignore(this.groupText.getChildren());
    this.UICam.ignore(this.groupGame.getChildren());
    this.cameras.main.ignore(this.scoreText);
    this.cameras.main.ignore(this.topScoreText);
    this.handleScore();
  }

  gameOver() {
    console.log("Game Over");
    this.scene.pause();
    //this.sound.playAudioSprite("sfx", "shot");
    localStorage.setItem(
      "topScore",
      Math.max(localStorage.getItem("topScore"), this.score)
    );
    this.scene.start("restart");
  }

  spawnObstacle() {
    this.time.addEvent({
      delay: this.obstacleDelay,
      loop: true,
      callbaclScope: this,
      callback: () => {
        let obstacle = this.physics.add.sprite(this.player.x+this.game.config.width,300, "obstacle");
        obstacle.setScale(0.2).setOrigin(0,0);
        obstacle.setVelocityY(0);
        this.UICam.ignore(obstacle);
        console.log(this.player.x+"  -  "+obstacle.x+"  [ "+this.game.config.width+" ]");
      }
    });
  }

  handleScore() {
    this.time.addEvent({
      delay: 250,
      loop: true,
      callback: () => {
        this.score++;
        this.scoreText.setText("SCORE: " + this.score);
        // if (this.score % 100 == 0) {
        //     this.sound.playAudioSprite("sfx", "ping");
        // }
      },
      callbackScope: this,
    });
  }

  update() {
    this.newT = Date.now();
    if (this.player.body.touching.down) {
      this.player.setVelocityX(this.speed);
      this.oldT = this.newT;
    } else {
      this.player.setVelocityX(this.speed2);
      if (this.newT - this.oldT > 500) {
        this.speed2 = this.speed2 / 1.2;
        this.oldT = this.newT;
      }
    }
    if (this.player.x >= this.game.config.width * (this.mult - 5)) {
      //fin du niveau
      this.scene.pause();
      this.level++;
      this.scene.start("game", { level: this.level, score: this.score });
    }
  }
}
export default GameScene;
