import Phaser from 'phaser';

import HelloWorldScene from './HelloWorldScene';
import MainMenuScene from './MainMenuScene';
import PlatformerScene from './PlatformerScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: '100%',
  height: '100%',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scale: {
    parent: 'app',
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  scene: [MainMenuScene, HelloWorldScene, PlatformerScene],
  // scene: [PlatformerScene],
};

export default new Phaser.Game(config);
