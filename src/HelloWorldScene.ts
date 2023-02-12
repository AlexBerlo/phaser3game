import Phaser from 'phaser';

export default class HelloWorldScene extends Phaser.Scene {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  donut: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;

  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  donutCounter = 0;
  text2: Phaser.GameObjects.Text | undefined;

  constructor() {
    super();
  }

  preload() {
    this.load.atlasXML('female', '/assets/character_femalePerson_sheetHD.png', '/assets/character_femalePerson_sheetHD.xml');
    this.load.atlasXML('donuts', '/assets/donuts_sheet.png', '/assets/donuts_sheet.xml');
  }

  create() {
    const text1 = this.add.text(20, 20, 'Donut counter');
    text1.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
    this.text2 = this.add.text(20, 40, this.donutCounter.toString());

    this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;
    console.log(this.textures.get('female'));

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('female', { prefix: 'walk', start: 0, end: 7 }),
      frameRate: 8,
      repeat: -1,
    });

    this.player = this.physics.add.sprite(600, 370, 'female', 'idle');
    this.player.scaleX = 0.5;
    this.player.scaleY = 0.5;

    this.donut = this.physics.add.sprite(300, 200, 'donuts', 'donut_1.png');
    this.donut.scaleX = 0.1;
    this.donut.scaleY = 0.1;

    const particles = this.add.particles('donuts', 'glazing_1.png');
    const emitter = particles.createEmitter({
      speed: 200,
      scale: { start: 0.05, end: 0 },
      blendMode: Phaser.BlendModes.NORMAL,
    });

    this.donut?.setVelocity(100, 200);
    this.donut?.setBounce(1, 1);
    this.donut?.setCollideWorldBounds(true);

    // cody.setBounce(1, 1);
    // cody.setDepth(1);
    this.player?.setCollideWorldBounds(true);

    // this.physics.add.overlap(cody, donut);
    this.physics.add.collider(this.player, this.donut, (player, donut) => {
      (donut as Phaser.Types.Physics.Arcade.ImageWithDynamicBody).setVelocityX(500);
      (donut as Phaser.Types.Physics.Arcade.ImageWithDynamicBody).setVelocityY(500);
    });

    emitter.startFollow(this.donut);

    this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      this.player?.play('walk');
    });
    this.input.keyboard?.on('keyup', (event: KeyboardEvent) => {
      this.player?.stop();
      this.player?.setFrame('idle');
    });

    this.loadRandomDonuts();
  }

  loadRandomDonuts() {
    setInterval(() => {
      const goodDonut = this.physics.add.sprite(Phaser.Math.Between(0, 1400), Phaser.Math.Between(0, 900), 'donuts', 'glazing_5.png');
      goodDonut.scale = 0.2;
      this.physics.add.collider(this.donut as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, goodDonut, (donut, goodDonut) => {
        goodDonut.destroy();
        this.donutCounter += 1;
        this.text2?.setText(this.donutCounter.toString());
      });
      this.physics.add.collider(this.player as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, goodDonut, (player, goodDonut) => {
        goodDonut.destroy();
        this.donutCounter += 1;
        this.text2?.setText(this.donutCounter.toString());
      });

      const badDonut = this.physics.add.sprite(Phaser.Math.Between(0, 1400), Phaser.Math.Between(0, 900), 'donuts', 'glazing_3.png');
      badDonut.scale = 0.2;
      this.physics.add.collider(this.donut as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, badDonut, (donut, badDonut) => {
        badDonut.destroy();
        this.donutCounter -= 1;
        this.text2?.setText(this.donutCounter.toString());
      });

      this.physics.add.collider(this.player as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, badDonut, (donut, badDonut) => {
        badDonut.destroy();
        this.donutCounter -= 1;
        this.text2?.setText(this.donutCounter.toString());
      });
    }, 2000);
  }

  update() {
    this.player?.setVelocity(0);

    if (this.cursors?.left.isDown) {
      this.player?.setVelocityX(-500);
    } else if (this.cursors?.right.isDown) {
      this.player?.setVelocityX(500);
    }

    if (this.cursors?.up.isDown) {
      this.player?.setVelocityY(-500);
    } else if (this.cursors?.down.isDown) {
      this.player?.setVelocityY(500);
    }
  }
}
