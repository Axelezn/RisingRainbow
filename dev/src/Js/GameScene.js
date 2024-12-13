// alert("Hello From Script");
class GameScene extends Phaser.Scene {
  init(data) {
    if (!data.level) data.level = 1;
    if (!data.score) data.score = 0;
    
    this.level = data.level;
    this.score=data.score;
    console.log("level " + this.level);
    switch (this.level % 3) {
      case 1: // monde 1
        this.images = {
          ground: "assets/parallaxes/Sol/sol_demon/1x/Nuage_1.png",
          parallax1: "assets/parallaxes/sol/Sol_demon/1x/Nuage_2.png",
          parallax2: "assets/parallaxes/sol/Sol_demon/1x/Nuage_3.png", 
          obstacle: "assets/objects/obstacle_demon/obstacle_arc_en_ciel.png",
          background : "assets/backgrounds/background_demon/background_demon.png"
        };
        this.spritefile = "assets/dude.png";
        //this.cameras.main.setBackgroundColor(0x80ff80);

        break;
      case 2: //monde 2
        this.images = {
          ground: "assets/parallaxes/Sol/Sol_berger/2x/decor_berger.png",
          parallax1: "assets/parallaxes/parallaxe_berger/1x/parallaxe_berger.png",
          parallax2: "assets/parallaxes/parallaxe_berger/1x/parrallaxe_berger_2.png",
          obstacle: "assets/objects/berger_obsatcles/obstacle_berger.png",
          background :'assets/backgrounds/background_berger/background_berger.png'
        };
        this.spritefile = "assets/dude.png";
        //this.cameras.main.setBackgroundColor(0x8080ff);
        break;
      case 0: //monde 3
        this.images = {
          ground: "assets/parallaxes/Sol/Sol_rondoudou/2x/decor_rondoudou.png",
          parallax1: "assets/parallaxes/Sol/Sol_rondoudou/paralaxes_rondoudou.png",
          parallax2: "assets/parallaxes/Sol/Sol_rondoudou/paralaxes_rondoudou2.png",
          obstacle: "assets/objects/rondoudou_obstacles/obstacle_rondoudou.png",
          background : "assets/backgrounds/Background_rondoudou/2x/décors rondoudou@2x.png"
        };
        this.spritefile = "assets/dude.png";
        // this.cameras.main.setBackgroundColor(0xff8080);
        break;
    }
    // calcul de la vitesse ne fonction du niveau
    this.speed = 160 * 1.2 ** this.level;
    if (this.speed>500) this.speed=500;
    this.obstacleDelay = 3000;
  }


  // load assets
  preload() {
    //load all images
    for (const id in this.images) {
      const fichier = this.images[id];
      this.textures.remove(id);
      this.load.image(id, fichier);
      console.log(id+" -> "+fichier);
    }
    this.load.spritesheet("dude", this.spritefile, {
      frameWidth: 88,
      frameHeight: 87,
    });
    this.load.audio('game', 'assets/audio/loop_jeu.wav');
    this.load.audio('game2', 'assets/audio/loop_jeu_drums.wav')
  }


  create() {

    this.mult = 10;
    this.groupGame = this.add.group();

    this.UICam = this.cameras.add(0, 0, this.game.config.width, this.game.config.height);

    // Créer un fond 
    this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, "background").setOrigin(0, 0).setScrollFactor(0).setDepth(-1);
    // Comme un mouvement de parallaxe mais un scrollfactor de 0 
        this.parallax2 = this.add.tileSprite(-Phaser.Math.RND.integerInRange(100, this.game.config.width + 100), this.game.config.height - 300, this.game.config.width * this.mult, 533, "parallax2").setScale(0.5).setAlpha(0.8);
    this.parallax1 = this.add.tileSprite(-Phaser.Math.RND.integerInRange(100, this.game.config.width + 100), this.game.config.height - 150, this.game.config.width * this.mult, 280, "parallax1").setScale(0.5).setAlpha(0.8);
    this.background.setOrigin(0, 0)
    this.parallax1.setOrigin(0, 0);
    this.parallax2.setOrigin(0, 0);
    this.background.setScrollFactor(0);
    this.parallax1.setScrollFactor(0.667);
    this.parallax2.setScrollFactor(0.444);
    this.player = this.physics.add.sprite(100, 650, "dude");
    this.cameras.main.startFollow(this.player, false, 1, 0.05, -300, 150);
    this.ground = this.add.tileSprite(0, this.game.config.height + 50, this.game.config.width * this.mult, 311, "ground");
    this.ground.setOrigin(0, 0);
    this.player.setBounce(0);
    this.player.setVelocityX(this.speed);
    this.speed2 = this.speed;
    this.physics.add.existing(this.ground, true);
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.ground, this.obstacle);

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    spaceKey.on("down", (key, event) => {
      if (this.player.body.touching.down) {
        this.player.setVelocityY(-400);
        this.speed2 = this.speed;
      }
    });
    const combo = this.input.keyboard.createCombo('GOD', { resetOnMatch: true });
    this.input.keyboard.on('keycombomatch', event =>{
      this.god=!this.god;
      if (this.god) {
          this.topScoreText.setText("GOD MODE");
        }
      else    
        this.topScoreText.setText("MAX: " + this.topScore);

    })
    ;
    this.groupGame.add(this.background);
    this.groupGame.add(this.parallax1);
    this.groupGame.add(this.parallax2);
    this.groupGame.add(this.player);
    this.groupGame.add(this.ground);

    this.scoreText = this.add.text(600, 25, "SCORE:0", {fontSize: "28px", fontFamily: "Arial Black", stroke: "gray", strokeThickness: 5,});
    this.topScore = parseInt(localStorage.getItem("topScore"))> 0 ? localStorage.getItem("topScore") : 0;
    console.log(localStorage.getItem("this.topScore"));

    this.topScoreText = this.add.text(30, 25, "MAX: " + this.topScore, {fontSize: "28px", fontFamily: "Arial Black", stroke: "gray", strokeThickness: 5});
    this.groupText = this.add.group();
    this.groupText.add(this.scoreText);
    this.groupText.add(this.topScoreText);
    this.cameras.main.ignore(this.UICam);
    this.cameras.main.ignore(this.groupText.getChildren());
    this.UICam.ignore(this.groupGame.getChildren());
    this.cameras.main.ignore(this.scoreText);
    this.cameras.main.ignore(this.topScoreText);
    this.spawnObstacle();
    this.handleScore();
    this.player.setDepth(2);
    this.ground.setDepth(1);
    this.scoreText.setDepth(3);
    this.topScoreText.setDepth(3);
  }

  gameOver() {
    if (!this.god) {
      console.log("Game Over");
      this.scene.pause();
      //this.sound.playAudioSprite("sfx", "shot");
      localStorage.setItem("topScore", Math.max(localStorage.getItem("topScore"), this.score));
      //this.music.stop();
      //this.music2.stop();
      this.scene.start("restart", {score : this.score});
    }
  }

  spawnObstacle() {
    this.time.addEvent({
      delay: this.obstacleDelay,
      loop: true,
      callbaclScope: this,
      callback: () => {
        this.obstacle = this.physics.add.sprite(this.player.x+this.game.config.width + Phaser.Math.RND.integerInRange(-50,100),300, "obstacle");
        this.obstacle.setScale(0.2).setOrigin(0,0);
        this.obstacle.setVelocityY(0);
        this.UICam.ignore(this.obstacle);
        console.log(this.player.x+"  -  "+this.obstacle.x+"  [ "+this.game.config.width+" ]");
        this.physics.add.collider(this.ground,this.obstacle);
        this.physics.add.collider(this.player,this.obstacle, this.gameOver, null, this);
      }
    });
  }

  handleScore() {
    this.time.addEvent({
      delay: 250,
      loop: true,
      callbackScope: this,
      callback: () => {
        this.score++;
        this.scoreText.setText("SCORE: " + this.score);
        // if (this.score % 100 == 0) {
        //     this.sound.playAudioSprite("sfx", "ping");
        // }
      }
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