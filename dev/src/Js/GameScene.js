// alert("Hello From Script");
class GameScene extends Phaser.Scene {
    init() {
        this.tileWidth = 324;
        this.tileHeight = 100;
        this.score = 0;
        this.birdSpeed = -350;
        this.birdDelay = 6000;
        this.plantDelay = 3000;
        this.groundSpeed = -180;
    }
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
      

        // Parallaxe
        
        // this.load.image('nuage1', "assets/Sol/Sol démon/1x/Nuage 1.png");
        // this.load.image('nuage2', "assets/Sol/Sol démon/1x/Nuage 2.png");
        // this.load.image('nuage3', "assets/Sol/Sol démon/1x/Nuage 3.png");
        // this.load.image('nuage4', "assets/Sol/Sol démon/1x/Nuage 4.png");
        // this.load.image('nuage5', "assets/Sol/Sol démon/1x/Nuage 5.png");


    // create game entities
    create() {
        this.ground = this.physics.add.group();

        this.scoreText = this.add.text(600, 25, "SCORE:0", {
            fontSize: "28px",
            fontFamily: "Arial Black",
            stroke: "gray",
            strokeThickness: 5
        });
        this.topScore = localStorage.getItem("topScore") == null ? 0 : localStorage.getItem("topScore");
        this.topScoreText = this.add.text(30, 25, "MAX: " + this.topScore, {
            fontSize: "28px",
            fontFamily: "Arial Black",
            stroke: "gray",
            strokeThickness: 5
        })
        this.handleScore();
        // creates ground
        this.addBase(0);
        this.cursors = this.input.keyboard.createCursorKeys();

        // Parallaxe
        const mult=100;
        this.nuage5 = this.add.tileSprite(0, this.game.config.height-787/2, this.game.config.width*mult, 787, "nuage5").setScale(0.5).setAlpha(0.8);
        this.nuage3 = this.add.tileSprite(0, this.game.config.height-529/2, this.game.config.width*mult, 529, "nuage3").setScale(0.5).setAlpha(0.8);
        this.nuage2 = this.add.tileSprite(0, this.game.config.height-280/2, this.game.config.width*mult, 280, "nuage2").setScale(0.5).setAlpha(0.8);
        // this.nuage2.setOrigin(0,0);
        // this.nuage3.setOrigin(0,0);
        // this.nuage5.setOrigin(0,0);
        this.nuage2.setScrollFactor(1);
        this.nuage3.setScrollFactor(0.33);
        this.nuage5.setScrollFactor(0.11);
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.cameras.main.startFollow(this.player);
      
    }
    gameOver() {
        console.log("Game Over");
        this.scene.pause();
        //this.sound.playAudioSprite("sfx", "shot");
        localStorage.setItem("topScore", Math.max(localStorage.getItem("topScore"), this.score));
        this.scene.start("restart");
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
            callbackScope: this
        })
    }
    update() {

        // create endless ground
        // console.log("I ran");
        this.updateGround()
        this.player.setVelocityX(160);
    }
    updateGround() {
        let lastBlock = this.ground.getLast(true);
        let lastBlockX = lastBlock.x;
        let lastPoint = lastBlockX + this.tileWidth;
        if (lastPoint < this.sys.game.config.width) {
            this.addBase(lastPoint);
            console.log(this.ground.children.size);
            this.ground.children.each((child) => {
                if (child.x < -this.tileWidth * 2) {
                    child.destroy();
                }
            })
        }
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