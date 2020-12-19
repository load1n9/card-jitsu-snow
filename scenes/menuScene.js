export class menuScene extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    create() {
        this.add.image(0, 0, 'Menu_background').setOrigin(0, 0)
        let menuwater = this.add.image(-30, 0, 'Menu_water_normal').setOrigin(0, 0).setInteractive();
        let menusnow = this.add.image(230, 0, 'Menu_snow_normal').setOrigin(0, 0).setInteractive();
        let menufire = this.add.image(460, 70, 'Menu_fire_normal').setOrigin(0, 0).setInteractive();
        this.backgroundmusic = this.sound.add('backgroundmusicmenu', {
            mute: false,
            loop: true
        });
        this.backgroundmusic.play();
        menuwater.on('pointerdown', () => {
            this.backgroundmusic.destroy();
            this.scene.start("gameScene", {
                element: "water",
                etype: "scrap",
                world: Phaser.Math.Between(1, 2)
            })
        });
        menusnow.on('pointerdown', () => {
            this.backgroundmusic.destroy();
            this.scene.start("gameScene", {
                element: "snow",
                etype: "sly",
                world: Phaser.Math.Between(1, 2)
            })
        });
        menufire.on('pointerdown', () => {
            menufire.setTexture("Menu_water_normal")
            this.backgroundmusic.destroy();
            this.scene.start("gameScene", {
                element: "fire",
                etype: "tank",
                world: Phaser.Math.Between(1, 2)
            })
        });
    }
    update() {
        this.input.on('gameobjectover', (pointer, gameObject) => {

            gameObject.setTint(0x7878ff);

        });

        this.input.on('gameobjectout', (pointer, gameObject) => {

            gameObject.clearTint();

        });

    }
}