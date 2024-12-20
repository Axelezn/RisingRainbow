import GameScene from "./GameScene.js";
import TitleScene from "./TitleScene.js";
import RestartScene from "./RestartScene.js";

let config = {
  width: 1024,
  height: 768,
  backgroundColor: "450700",
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 300
      },
      debug: false,
    },
  },
};
const game = new Phaser.Game(config);

game.scene.add("game", GameScene);
game.scene.add("title", TitleScene);
game.scene.add("restart", RestartScene);
// game.scene.start("game");
game.scene.start("title");
