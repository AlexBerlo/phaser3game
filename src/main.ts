import Phaser from 'phaser';

import HelloWorldScene from './HelloWorldScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 1400,
  height: 900,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [HelloWorldScene],
};

export default new Phaser.Game(config);
