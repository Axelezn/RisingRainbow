//alert("Script Initialisé")
class GameScene extends Phaser.Scene{
    preload() {
        this.load.image("tile", "src/assets/tile.png")
    }
}
let config = {
    width:800,
    height:500,
    backgroundColor : '#4488AA',
    type:Phaser.AUTO,
}
const game = new Phaser.Game(config);
game.scene.add("game", GameScene);
game.scene.start("game");
