class Start extends Phaser.Scene
{
    cursors;
    currentPlayer;
    player2;
    player1;
    movingPlatform;
    platforms;

    preload ()
    {
        this.load.path = './assets/';
        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'ground.png');
        this.load.image('samurai', 'samurai.png' );
        this.load.image('platform', 'cloudplatform.png' );
        this.load.image('portal1', 'portal1.png');
        this.load.image('portal2', 'portal2.png');
        this.load.image('portal3', 'portal3.png');
        this.load.image('portal4', 'portal4.png');
        this.load.image('portal5', 'portal5.png');
        this.load.image('portal6', 'portal6.png');
        this.load.image('portal7', 'portal7.png');
        this.load.image('portal8', 'portal8.png');
        this.load.image('portal9', 'portal9.png');
        this.load.image('portal10', 'portal10.png');
        this.load.image('portal11', 'portal11.png');
        this.load.image('portal12', 'portal12.png');
    }

    create ()
    {
        

        //this.platforms.create(200, 350, 'ground').setScale(.25).refreshBody();

        


        this.add.image(400, 300, 'sky');

        const ground = this.physics.add.staticGroup();

        ground.create(400, 568, 'ground').setScale(1).refreshBody();

        
        
        this.player1 = this.physics.add.sprite(230, 200, 'samurai').setBounce(0.2).setCollideWorldBounds(true);
        this.player2 = this.physics.add.sprite(500, 200, 'samurai').setTint(0xff5555).setBounce(0.2).setCollideWorldBounds(true);

        this.player1.name = 'Purple';
        this.player2.name = 'Red';

        //this.player2.setPushable(false);

        this.currentPlayer = this.player1;

        //platform mechanics

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 200, 'platform').setScale(.4).refreshBody();

        this.movingPlatform = this.physics.add.image(280, 350, 'platform');
        this.movingPlatform.setScale(.4);
        this.movingPlatform.setImmovable(true);
        this.movingPlatform.body.allowGravity = false;
        this.movingPlatform.setVelocityX(50);

        
        //portal mechanics

        const port = this.physics.add.staticGroup();
        port.create(700, 50, "portal1").refreshBody();;
        this.physics.add.collider(this.currentPlayer, port, () => {
            this.time.delayedCall(200, () => this.scene.start('Scene2'));

        });
        
        this.anims.create({
            key: 'portal',
            frames: [
                { key: 'portal1' },
                { key: 'portal2' },
                { key: 'portal3' },
                { key: 'portal4' },
                { key: 'portal5' },
                { key: 'portal6' },
                { key: 'portal7' },
                { key: 'portal8' },
                { key: 'portal9' },
                { key: 'portal10' },
                { key: 'portal11' },
                { key: 'portal12', duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.add.sprite(700, 50, 'portal1')
            .play('portal');
        /*
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });*/

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player1, ground);
        this.physics.add.collider(this.player2, ground);

        this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.player2, this.movingPlatform);

        // this.physics.add.collider(player2, player1);

        window.body1 = this.player1.body;
        window.physics = this.physics;
        window.showit = false;

        this.input.on('pointerdown', () =>
        {

            if (this.currentPlayer === this.player1)
            {
                this.currentPlayer = this.player2;
            }
            else
            {
                this.currentPlayer = this.player1;
            }

        }, this);

        
        this.physics.add.collider(this.currentPlayer, this.movingPlatform);
        this.physics.add.collider(
            this.currentPlayer,
            this.platforms,
            null,
            (currentPlayer, platforms) =>
            {
                return currentPlayer.body.velocity.y >= 0;
            });

            this.physics.add.collider(
                this.player2,
                this.platforms,
                null,
                (player2, platforms) =>
                {
                    return player2.body.velocity.y >= 0;
                });

        
        this.add.text(10, 10, 'Click to change character', { fontSize: '22px', fill: 'black' });


            
    }

    update ()
    {
        if (this.cursors.left.isDown)
        {
            this.currentPlayer.setVelocityX(-160);

            //this.currentPlayer.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.currentPlayer.setVelocityX(160);

            //this.currentPlayer.anims.play('right', true);
        }
        else
        {
            this.currentPlayer.setVelocityX(0);

            //this.currentPlayer.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.currentPlayer.body.touching.down)
        {
            this.currentPlayer.setVelocityY(-230);

            window.showit = true;
        }

        if (this.movingPlatform.x >= 700)
        {
            this.movingPlatform.setVelocityX(-50);
        }
        else if (this.movingPlatform.x <= 200)
        {
            this.movingPlatform.setVelocityX(50);
        }
    }
}

class Scene2 extends Phaser.Scene
{
    constructor() {
        super("Scene2", "Second Room");
    }

    cursors;
    currentPlayer;
    player2;
    player1;
    movingPlatform;
    platforms;

    preload ()
    {
        this.load.path = './assets/';
        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'ground.png');
        this.load.image('samurai', 'samurai.png' );
        this.load.image('platform', 'cloudplatform.png' );
        this.load.image('portal1', 'portal1.png');
        this.load.image('portal2', 'portal2.png');
        this.load.image('portal3', 'portal3.png');
        this.load.image('portal4', 'portal4.png');
        this.load.image('portal5', 'portal5.png');
        this.load.image('portal6', 'portal6.png');
        this.load.image('portal7', 'portal7.png');
        this.load.image('portal8', 'portal8.png');
        this.load.image('portal9', 'portal9.png');
        this.load.image('portal10', 'portal10.png');
        this.load.image('portal11', 'portal11.png');
        this.load.image('portal12', 'portal12.png');
    }

    create ()
    {
        this.platforms = this.physics.add.staticGroup();

        //this.platforms.create(200, 350, 'ground').setScale(.25).refreshBody();

        


        this.add.image(400, 300, 'sky');

        const ground = this.physics.add.staticGroup();

        ground.create(400, 568, 'ground').setScale(1).refreshBody();

        this.player1 = this.physics.add.sprite(230, 200, 'samurai').setBounce(0.2).setCollideWorldBounds(true);
        this.player2 = this.physics.add.sprite(500, 200, 'samurai').setTint(0xff5555).setBounce(0.2).setCollideWorldBounds(true);

        this.player1.name = 'Purple';
        this.player2.name = 'Red';

        //this.player2.setPushable(false);

        this.currentPlayer = this.player1;

        this.platforms.create(400, 200, 'platform').setScale(.4).refreshBody();

        this.movingPlatform = this.physics.add.image(280, 350, 'platform');
        this.movingPlatform.setScale(.4);
        this.movingPlatform.setImmovable(true);
        this.movingPlatform.body.allowGravity = false;
        this.movingPlatform.setVelocityX(50);

        const port = this.physics.add.staticGroup();
        port.create(400, 100, "portal1").refreshBody();;
        this.physics.add.collider(this.currentPlayer, port, () => {
            //this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Scene2'));

        });
        
        this.anims.create({
            key: 'portal',
            frames: [
                { key: 'portal1' },
                { key: 'portal2' },
                { key: 'portal3' },
                { key: 'portal4' },
                { key: 'portal5' },
                { key: 'portal6' },
                { key: 'portal7' },
                { key: 'portal8' },
                { key: 'portal9' },
                { key: 'portal10' },
                { key: 'portal11' },
                { key: 'portal12', duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.add.sprite(400, 100, 'portal1')
            .play('portal');
        /*
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });*/

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player1, ground);
        this.physics.add.collider(this.player2, ground);

        this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.player2, this.movingPlatform);

        // this.physics.add.collider(player2, player1);

        window.body1 = this.player1.body;
        window.physics = this.physics;
        window.showit = false;

        this.input.on('pointerdown', () =>
        {

            if (this.currentPlayer === this.player1)
            {
                this.currentPlayer = this.player2;
            }
            else
            {
                this.currentPlayer = this.player1;
            }

        }, this);

        this.add.text(10, 10, 'Click to change character', { fontSize: '22px', fill: 'black' });

        this.physics.add.collider(this.currentPlayer, this.movingPlatform);
        this.physics.add.collider(
            this.currentPlayer,
            this.platforms,
            null,
            (currentPlayer, platforms) =>
            {
                return currentPlayer.body.velocity.y >= 0;
            });

            this.physics.add.collider(
                this.player2,
                this.platforms,
                null,
                (player2, platforms) =>
                {
                    return player2.body.velocity.y >= 0;
                });

            
    }

    update ()
    {
        if (this.cursors.left.isDown)
        {
            this.currentPlayer.setVelocityX(-160);

            //this.currentPlayer.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.currentPlayer.setVelocityX(160);

            //this.currentPlayer.anims.play('right', true);
        }
        else
        {
            this.currentPlayer.setVelocityX(0);

            //this.currentPlayer.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.currentPlayer.body.touching.down)
        {
            this.currentPlayer.setVelocityY(-230);

            window.showit = true;
        }

        if (this.movingPlatform.x >= 700)
        {
            this.movingPlatform.setVelocityX(-50);
        }
        else if (this.movingPlatform.x <= 200)
        {
            this.movingPlatform.setVelocityX(50);
        }
    }
}


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 170 },
            debug: true
        }
    },
    scene: [Start, Scene2]
};

const game = new Phaser.Game(config);
