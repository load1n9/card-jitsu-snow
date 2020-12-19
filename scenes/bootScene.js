export class bootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'bootScene'
        })
    }

    preload() {
        this.graphics = this.add.graphics();
        this.newGraphics = this.add.graphics();
        this.graphics.fillStyle(0x211714, 1);
        this.graphics.fillRoundedRect(200, 200, 400, 50,4);

        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRoundedRect(205, 205, 290, 40,4);

        let loadingText = this.add.text(250, 260, "Loading: ", {
            fontSize: '32px',
            fill: '#fc9a08'
        });

        this.load.spritesheet('snowtimer', 'assets/images/snowtimer.png', {
            frameWidth: 75,
            frameHeight: 72
        })
        this.load.spritesheet('firetimer', 'assets/images/snowtimer.png', {
            frameWidth: 75,
            frameHeight: 72
        })
        this.load.spritesheet('watertimer', 'assets/images/snowtimer.png', {
            frameWidth: 75,
            frameHeight: 72
        })

        this.load.image('target_idle', "assets/images/target_red_attack_idle.png")

        this.load.image('snowtimerbase', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/snow_timer/base.png');
        this.load.image('watertimerbase', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/water_timer/base.png');
        this.load.image('firetimerbase', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/water_timer/base.png');

        this.load.image('snowtimerbutton', "https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/snow_timer/button_selected.png")
        this.load.image('firetimerbutton', "https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/fire_timer/button_selected.png")
        this.load.image('watertimerbutton', "https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/water_timer/button_selected.png")

        this.load.image('snowbottomui', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/ui_snow_cards.png');
        this.load.image('waterbottomui', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/ui_water_cards.png');
        this.load.image('firebottomui', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/ui_fire_cards.png');

        this.load.image('Menu_background', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/intro/background.png')
        this.load.image('Menu_background_tusk', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/intro/background_tusk.png')
        this.load.image("Menu_snow_normal", 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/intro/snow_normal.png')
        this.load.image("Menu_water_normal", 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/intro/water_normal.png')
        this.load.image("Menu_fire_normal", 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/intro/fire_normal.png')


        this.load.atlas('snow_idle', 'assets/snow/idle/spritesheet.png', 'assets/snow/idle/spritesheet.json');
        this.load.atlas('fire_idle', 'assets/fire/idle/spritesheet.png', 'assets/fire/idle/spritesheet.json');
        this.load.atlas('water_idle', 'assets/water/idle/spritesheet.png', 'assets/water/idle/spritesheet.json');
        

        this.load.atlas('snow_move', 'assets/snow/move/spritesheet.png', 'assets/snow/move/spritesheet.json');
        this.load.atlas('snow_attack', 'assets/snow/attack/spritesheet.png', 'assets/snow/attack/spritesheet.json');
        this.load.atlas('fire_move', 'assets/fire/move/spritesheet.png', 'assets/fire/move/spritesheet.json');
        this.load.atlas('water_move', 'assets/water/move/spritesheet.png', 'assets/water/move/spritesheet.json');


        this.load.image("snow_shadow", "assets/shadows/snow.png")
        this.load.image("fire_shadow", "assets/shadows/fire.png")
        this.load.image("water_shadow", "assets/shadows/water.png")

        this.load.atlas('sly_idle', 'assets/sly/idle/spritesheet.png', 'assets/sly/idle/spritesheet.json');
        this.load.atlas('sly_move', 'assets/sly/move/spritesheet.png', 'assets/sly/move/spritesheet.json');
        this.load.atlas('sly_attack', 'assets/sly/attack/spritesheet.png', 'assets/sly/attack/spritesheet.json');

        this.load.atlas('scrap_idle', 'assets/scrap/idle/spritesheet.png', 'assets/scrap/idle/spritesheet.json');
        this.load.atlas('scrap_move', 'assets/scrap/move/spritesheet.png', 'assets/scrap/move/spritesheet.json');
        this.load.atlas('scrap_attack', 'assets/scrap/attack/spritesheet.png', 'assets/scrap/attack/spritesheet.json');

        this.load.atlas('tank_idle', 'assets/tank/idle/spritesheet.png', 'assets/tank/idle/spritesheet.json');
        this.load.atlas('tank_move', 'assets/tank/move/spritesheet.png', 'assets/tank/move/spritesheet.json');
        this.load.atlas('tank_attack', 'assets/tank/attack/spritesheet.png', 'assets/tank/attack/spritesheet.json');

        this.load.image('background1', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/background_1.png');
        this.load.image('foreground1', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/foreground_1.png');
        this.load.image('background2', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/background_2.png');
        this.load.image('foreground2', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/foreground_2.png');
        this.load.image('background3', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/background_3.png');

        this.load.image('tile', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/tile_no_move.png')
        this.load.image('tile_move', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/tile_move.png')
        this.load.image('tile_attack', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/assets/images/tile_attack.png')

        this.load.audio('backgroundmusicgame', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/sounds/mus_mg_201303_cjsnow_gamewindamb.mp3');
        this.load.audio('backgroundmusicmenu', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/sounds/menu.mp3');
        this.load.audio('snow_appear', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/sounds/sfx_mg_2013_cjsnow_snowmenappear.mp3')

        this.load.audio('penguinwalk', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/sounds/sfx_mg_2013_cjsnow_footsteppenguin.mp3')
        this.load.audio('tankwalk', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/sounds/sfx_mg_2013_cjsnow_footsteptank.mp3')
        this.load.audio('slywalk', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/sounds/sfx_mg_2013_cjsnow_footstepsly_loop.mp3')
        this.load.audio('scrapwalk', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/sounds/sfx_mg_2013_cjsnow_footstepscrap_loop.mp3')

        this.load.audio('attackwater', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/sounds/sfx_mg_2013_cjsnow_attackwater.mp3')
        this.load.audio('attacksnow', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/sounds/sfx_mg_2013_cjsnow_attacksnow.mp3')
        this.load.audio('attackfire', 'https://raw.githubusercontent.com/load1n9/cardjitsusnow/master/sounds/sfx_mg_2013_cjsnow_attackfire.mp3')
        this.load.on('progress', this.updateBar, {
            newGraphics: this.newGraphics,
            loadingText: loadingText
        });
        this.load.on('complete', this.complete,{scene:this.scene});

        this.load.start();
    }

    updateBar(percentage) {
        this.newGraphics.clear();
        this.newGraphics.fillStyle(0xfdb91f, 1);
        this.newGraphics.fillRoundedRect(205, 205, percentage * 390, 40,4);

        percentage = percentage * 100;
        this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
    }

    complete() {
        this.scene.start('menuScene');
    }


}