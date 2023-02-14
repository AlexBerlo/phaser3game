import Phaser from 'phaser';

import HelloWorldScene from './HelloWorldScene';
import MainMenuScene from './MainMenuScene';
import PlatformerScene from './PlatformerScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 900,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [MainMenuScene, HelloWorldScene, PlatformerScene],
  // scene: [PlatformerScene],
};

export default new Phaser.Game(config);
