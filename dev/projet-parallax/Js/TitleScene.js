class TitleScene extends Phaser.Scene {
    preload() {
        this.tileWidth = 64 ;
        this.tileHeight = 64;
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

        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start("game",{'level':1});
        })
    }



}

export default TitleScene;