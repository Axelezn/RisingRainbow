class TitleScene extends Phaser.Scene {
    preload() {
        this.tileWidth = 64;
        this.tileHeight = 64;
        this.load.image("tile", "assets/tile.png");
    }
    create() {
        // alert("Hello from Title");
        const Title = this.add.text(400, 200, "Démarrer une nouvelle partie", {
            fontSize: 45,
            fontFamily: "Arial Black",
            stroke: "gray",
            strokeThickness: 5
        })
        Title.setOrigin(0.5, 0.5);
        const spaceText = this.add.text(400, 250, "Espace pour une nouvelle partie", {
            fontSize: 22,
            fontFamily: "Arial Black",
            stroke: "gray",
            strokeThickness: 5
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
        this.ground.create(x, y, "tile").setOrigin(0, 0);
    }


}

export default TitleScene;