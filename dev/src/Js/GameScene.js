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
        this.load.image("plant", "assets/cactus.png");
        this.load.atlas("dino", "assets/Démon.png", "assets/atlas/sprite.json");
        this.load.spritesheet("bird", "assets/bird.png", { frameWidth: 150, frameHeight: 108 });
        this.load.audioSprite("sfx", "assets/fx_mixdown.json", ["assets/fx_mixdown.mp3", "assets/fx_mixdown.ogg"])
        
        // Parallaxe
        
        this.load.image('nuage1', "assets/parallaxes/Sol/sol_demon/nuage_1.png");
        this.load.image('nuage2', "assets/parallaxes/Sol/sol_demon/nuage_1.png");
        this.load.image('nuage3', "assets/parallaxes/Sol/sol_demon/nuage_1.png");
        this.load.image('nuage4', "assets/parallaxes/Sol/sol_demon/nuage_1.png");
        this.load.image('nuage5', "assets/parallaxes/Sol/sol_demon/nuage_1.png");


    }
    // create game entities
    create() {
        // dino
        this.dino = this.physics.add.sprite(200, 343, "dino").setOrigin(0, 0).setScale(0.17, 0.25);
        // console.log(this.dino.width, this.dino.height);
        this.dino.setSize(this.dino.width * 0.6, this.dino.height * 0.8, false).setOffset(100, 50);
        this.dino.setGravityY(850);
        // this.add.image(200,300,"tile").setOrigin(0,0);
        // ground
        this.ground = this.physics.add.group();
        // this.bird = this.physics.add.sprite(350, 250, "bird");
        this.animation();
        // this.bird.anims.play("fly");
        // this.bird.setVelocityX(this.birdSpeed);
        // scoring
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
        this.spawnBird();
        this.spawnPlant();
        this.dino.anims.play("idle");
        // this.dino.setCollideWorldBounds(true);
        this.physics.add.collider(this.dino, this.ground);
        this.physics.add.collider(this.dino, this.birds, this.gameOver, null, this);
        this.physics.add.collider(this.dino, this.plants, this.gameOver, null, this);
        this.physics.add.collider(this.plants, this.ground);
        this.cursors = this.input.keyboard.createCursorKeys();
        // console.log(this.cursors);

        // Parallaxe
        this.nuage1 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('nuage1').height,
            this.game.width,
            this.game.cache.getImage("nuage1").height,
            'nuage1'
        );
        this.nuage2 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('nuage2').height,
            this.game.width,
            this.game.cache.getImage("nuage2").height,
            'nuage2'
        );
        this.nuage3 = this.game.add.tileSprite(0, 
            this.game.height - this.game.cache.getImage('nuage3').height,
            this.game.width,
            this.game.cache.getImage('nuage3').height,
            'nuage3'
        );
        this.nuage4 = this.game.add.tileSprite(0, 
            this.game.height - this.game.cache.getImage('nuage4').height,
            this.game.width,
            this.game.cache.getImage('nuage4').height,
            'nuage4'
        );
        this.nuage5 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('nuage5').height,
            this.game.width,
            this.game.cache.getImage('nuage5').height,
            'nuage5'
        );
    }
    gameOver() {
        console.log("Game Over");
        this.scene.pause();
        this.sound.playAudioSprite("sfx", "shot");
        localStorage.setItem("topScore", Math.max(localStorage.getItem("topScore"), this.score));
        this.scene.start("restart");
    }
    spawnBird() {
        this.birds = this.physics.add.group();
        this.time.addEvent({
            delay: this.birdDelay,
            loop: true,
            callbackScope: this,
            callback: () => {
                let val = Math.random();
                if (val > 0.5) {
                    this.generateBird(280);
                } else {
                    this.generateBird(360);
                }
            }
        })
    }
    generateBird(y) {
        let bird = this.birds.create(Math.max(Math.random() * 900, 780), y, "bird");
        bird.setScale(0.4).setOrigin(0, 0);
        bird.setVelocityX(Math.max(--this.birdSpeed, -400));
        bird.setSize(bird.width * 0.4, bird.height * 0.4);
        bird.anims.play("fly");
        this.time.addEvent({
            delay: 4000,
            repeat: 0,
            callbackScope: this,
            callback: () => {
                console.log("Line 78", this.birds.children.size);
                bird.destroy();
                console.log("Line 80", this.birds.children.size);
            }
        })


    }
    spawnPlant() {
        this.plants = this.physics.add.group();
        this.time.addEvent({
            delay: this.plantDelay,
            loop: true,
            callbackScope: this,
            callback: () => {
                let scale = Math.random();
                if (scale <= 0.4) {
                    // create 2 plants
                    scale = 0.6;
                    this.generatePlant(scale);
                } else if (scale > 0.9) {
                    scale = 0.9;
                    this.generatePlant(scale);
                } else {
                    this.generatePlant(scale);
                }
            }
        })
    }
    generatePlant(scale) {
        // x,y 
        let sWidth = this.sys.game.config.width;
        let sHeight = this.sys.game.config.height;
        let plantY = sHeight - this.tileHeight - 110;

        let p1 = this.plants.create(sWidth, plantY, "plant").setOrigin(0, 0).setScale(scale);
        p1.setVelocityX(Math.max(this.groundSpeed, -230))
        p1.setGravityY(750);
        p1.setSize(p1.width * 0.5, p1.height, true).setOffset(10, 0);
        this.time.addEvent({
            delay: 3500,
            repeat: 0,
            callbackScope: this,
            callback: () => {
                p1.destroy();
            }
        })
        if (scale == 0.6) {
            let p2 = this.plants.create(sWidth + 10, plantY, "plant").setOrigin(0, 0).setScale(scale);
            p2.setVelocityX(Math.max(this.groundSpeed, -230))
            p2.setGravityY(750);
            p2.setSize(p2.width * 0.5, p2.height, true).setOffset(10, 0);
            this.time.addEvent({
                delay: 3500,
                repeat: 0,
                callbackScope: this,
                callback: () => {
                    p2.destroy();
                }
            })
        }
        // console.log("pSize: ",this.plants.children.size)



    }
    handleScore() {
        this.time.addEvent({
            delay: 250,
            loop: true,
            callback: () => {
                this.score++;
                this.scoreText.setText("SCORE: " + this.score);
                if (this.score % 100 == 0) {
                    this.sound.playAudioSprite("sfx", "ping");
                }
            },
            callbackScope: this
        })
    }
    animation() {
        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNames('bird', { start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1
        })

        // dino
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNames("dino", {
                start: 1,
                end: 10,
                prefix: "Idle_",
                zeroPad: 2,
                suffix: ".png",
            }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: "run",
            frames: this.anims
                .generateFrameNames('dino', {
                    start: 1, end: 8, zeroPad: 2,
                    prefix: "Run_", suffix: ".png"
                }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNames('dino', {
                start: 1, end: 12, zeroPad: 2, prefix: "Jump_", suffix: ".png"
            }),
            frameRate: 10,
        });
    }
    update() {

        this.handleInput();
        // create endless ground
        // console.log("I ran");
        this.updateGround()
        this.nuage1.tilePosition.x -= 0.05;
        this.nuage2.tilePosition.x -= 0.15;
        this.nuage3.tilePosition.x -= 0.3;
        this.nuage4.tilePosition.x -= 0.45;
        this.nuage5.tilePosition.x -= 0.60;
    }
    handleInput() {
        // control
        if (this.cursors.space.isDown && this.dino.body.touching.down) {
            this.dino.setVelocityY(-500);
            this.dino.anims.play("jump");
            this.sound.playAudioSprite("sfx", "numkey");
        } else if (this.dino.body.touching.down) {
            this.dino.anims.play("run", true);
        }
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
        let tileNeeded = Math.ceil((this.sys.game.config.width - x) / this.tileWidth);
        let y = this.sys.game.config.height - this.tileHeight;
        for (let i = 0; i < tileNeeded; i++) {
            this.addTile(x - 10 + (i * this.tileWidth), y);
        }
        // velocity
        this.ground.children.iterate((child) => {
            child.setVelocityX(Math.max(--this.groundSpeed, -230));
            child.setImmovable(true);
        })

    }
    addTile(x, y) {
        this.ground.create(x, y, "nuage1").setOrigin(0, 0);
    }
}

export default GameScene;