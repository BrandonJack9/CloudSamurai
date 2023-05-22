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
    scene: [ SHGamesIntro, OpeningCutscene, GameMenu, level1, level2, level3, Reset]
};

const game = new Phaser.Game(config);