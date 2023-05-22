const config = {
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1000,
        height: 1000
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 170 },
            //debug: true
        }
    },
    scene: [Start, Scene2]
};

const game = new Phaser.Game(config);