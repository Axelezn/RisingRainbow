class TitleScene extends Phaser.Scene {
    preload() {
        this.tileWidth = 324 ;
        this.tileHeight = 100;
        this.load.image('nuage1', "assets/parallaxes/Sol/sol_demon/1x/nuage_1.png");
        this.load.image('logo', 'assets/logos/Logo_format_normal.png');
        this.load.audio('sonArrivee', "assets/audio/titre.wav");
        this.load.audio('loopArrivee', 'assets/audio/loop_accueil.wav');
    }
    create() {
        // alert("Hello from Title");
        const music = this.sound.add('sonArrivee');
        music.play()
        this.music2 = this.sound.add('loopArrivee');
        this.music2.play({loop:true});
        const logo = this.add.image(400,100, 'logo').setOrigin(0.5,0.5)
        const Title = this.add.text(400, 300, "Démarrer une nouvelle partie", {
            fontSize: 30,
            fontFamily: "Arial Black",
        })
        Title.setOrigin(0.5, 0.5);
        const spaceText = this.add.text(400, 450, "Espace pour une nouvelle partie", {
            fontSize: 20,
            fontFamily: "Arial Black",
            stroke: "gray",
            strokeThickness: 0
        })
        spaceText.setOrigin(0.5, 0.5)
        this.input.keyboard.once("keydown-SPACE", () => {
            this.music2.stop();  
            this.scene.start("game");
        })
        // console.log("hello from title");
    }


}

export default TitleScene;