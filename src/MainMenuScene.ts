export default class MainMenuScene extends Phaser.Scene {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super('main-menu');
  }

  create() {
    this.add.text(20, 20, 'Use the arrow keys to move and collect donuts', { fontSize: '20px' });
    this.add.text(20, 40, 'Green donuts are the only good donuts', { fontSize: '20px' });
    this.add.text(20, 60, 'The moving donut can help against bad donuts', { fontSize: '20px' });
    this.add.text(
      20,
      80,
      'Watch the donut counter, gathering 5 donuts takes you to the next level !',
      { fontSize: '20px' }
    );

    this.add.text(380, 250, 'Click to', { fontSize: '20px' });
    const startText = this.add.text(380, 270, 'START, poeziile tale sunt misto !', {
      fontFamily: 'Arial',
      fontSize: '48px',
    });
    startText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
    startText.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, startText.width, startText.height),
      Phaser.Geom.Rectangle.Contains
    );

    startText.on('pointerdown', () => {
      this.scene.start('hello-world');
    });
  }
}
