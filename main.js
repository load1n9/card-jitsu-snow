import "https://cdn.jsdelivr.net/npm/phaser@3.23.0/dist/phaser.js"
import {
    bootScene
} from "./scenes/bootScene.js"
import {
    menuScene
} from "./scenes/menuScene.js"
import {
    gameScene
} from "./scenes/gameScene.js"


new Phaser.Game({
    type: Phaser.WEBGL_MULTI,
    multiTexture: true,
    width: 800,
    height: 500,
    backgroundColor: 0x333333,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [bootScene, menuScene, gameScene]
});