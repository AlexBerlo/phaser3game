const gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [100, 350],
  platformSizeRange: [50, 250],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 2,
};

export default class PlatformerScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  platformPool: Phaser.GameObjects.Group | undefined;
  platformGroup: Phaser.GameObjects.Group | undefined;
  playerJumps = 0;
  nextPlatformDistance = 0;

  constructor() {
    super('platformer');
  }

  preload() {
    this.load.atlasXML(
      'female',
      '/assets/character_femalePerson_sheetHD.png',
      '/assets/character_femalePerson_sheetHD.xml'
    );
    this.load.image('platform', '/assets/platformPack_tile001.png');
  }

  create() {
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('female', { prefix: 'walk', start: 0, end: 7 }),
      frameRate: 8,
      repeat: -1,
    });

    this.player = this.physics.add.sprite(
      gameOptions.playerStartPosition,
      600 / 2,
      'female',
      'idle'
    );
    this.player.scale = 0.3;

    this.player.play('walk');

    this.platformGroup = this.add.group({
      removeCallback: (platform) => {
        this.platformPool?.add(platform);
      },
    });

    this.platformPool = this.add.group({
      removeCallback: (platform) => {
        this.platformGroup?.add(platform);
      },
    });

    // adding a platform to the game, the arguments are platform width and x position
    this.addPlatform(900, 600 / 2);

    // adding the player;
    this.player.setGravityY(gameOptions.playerGravity);

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup);

    // checking for input
    this.input.on('pointerdown', this.jump, this);
  }

  addPlatform(platformWidth: number, posX: number) {
    let platform;
    if (this.platformPool?.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, 600 * 0.8, 'platform');
      platform.setImmovable(true);
      platform.setVelocityX(gameOptions.platformStartSpeed * -1);
      this.platformGroup?.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(
      gameOptions.spawnRange[0],
      gameOptions.spawnRange[1]
    );
  }

  jump() {
    if (
      this.player?.body.touching.down ||
      (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)
    ) {
      if (this.player?.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player?.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;
    }
  }

  update() {
    if (this.player) {
      if (this.player.y > 500) {
        this.scene.start('platformer');
      }
      this.player.x = gameOptions.playerStartPosition;

      // recycling platforms
      let minDistance = 900;
      this.platformGroup?.getChildren().forEach((platform: any) => {
        let platformDistance = 900 - platform.x - platform.displayWidth / 2;
        minDistance = Math.min(minDistance, platformDistance);
        if (platform.x < -platform.displayWidth / 2) {
          this.platformGroup?.killAndHide(platform);
          this.platformGroup?.remove(platform);
        }
      });

      // adding new platforms
      if (minDistance > this.nextPlatformDistance) {
        var nextPlatformWidth = Phaser.Math.Between(
          gameOptions.platformSizeRange[0],
          gameOptions.platformSizeRange[1]
        );
        this.addPlatform(nextPlatformWidth, 900 + nextPlatformWidth / 2);
      }
    }
  }
}
