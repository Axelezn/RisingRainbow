class TitleScene extends Phaser.Scene {
    preload() {
        this.tileWidth = 324 ;
        this.tileHeight = 100;
        this.load.image('nuage1', "assets/parallaxes/Sol/sol_demon/1x/nuage_1.png");
    }
    create() {
        // alert("Hello from Title");
        const Title = this.add.text(400, 200, "Démarrer une nouvelle partie", {
            fontSize: 30,
            fontFamily: "Arial Black",
        })
        Title.setOrigin(0.5, 0.5);
        const spaceText = this.add.text(400, 250, "Espace pour une nouvelle partie", {
            fontSize: 20,
            fontFamily: "Arial Black",
            stroke: "gray",
            strokeThickness: 0
        })
        spaceText.setOrigin(0.5, 0.5)
        this.ground = this.physics.add.group();
        this.addBase(0);

        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start("game");
        })
        // console.log("hello from title");
    }

    addBase(x) {
        let tileNeeded = Math.ceil((this.sys.game.config.width - x) / this.tileWidth);
        let y = this.sys.game.config.height - this.tileHeight;
        for (let i = 0; i < tileNeeded; i++) {
            this.addTile(x - 10 + (i * this.tileWidth), y);
        }
        // velocity
    }
    addTile(x, y) {
        this.ground.create(x, y, "nuage1").setOrigin(0, 0);
    }


}

export default TitleScene;