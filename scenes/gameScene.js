import {
    EnemyData
} from "../utils/enemy.js"
import {
    Grid
} from "../utils/grid.js"
import {
    PlayerData
} from "../utils/player.js"

import {
    barcolor
} from "../utils/bar.js"
export class gameScene extends Phaser.Scene {
    constructor() {
        super("gameScene")
    }
    init(data) {
        console.log(data)
        this.element = data.element
        this.etype = data.etype
        this.world = data.world
    }
    create() {
        this.add.image(0, 0, `background${this.world}`).setOrigin(0, 0)
        if (this.world === 1) {
            this.foreground = this.add.image(0, 298, `foreground${this.world}`).setOrigin(0, 0)
        } else {
            this.foreground = this.add.image(0, 0, `foreground${this.world}`).setOrigin(0, 0)
        }
        this.GridSystem = new Grid(70, 70, 5, 9)
        this.turn = 1
        this.target = this.add.image(0, 0, "target_idle").setVisible(false).setOrigin(0, 0)

        if (this.element === 'water') {
            this.player = this.physics.add.sprite(this.GridSystem.tileX(0), this.GridSystem.tileY(3), `${this.element}_idle`).setOrigin(0.4, 0.55)
        } else if (this.element === 'snow') {
            this.player = this.physics.add.sprite(this.GridSystem.tileX(0), this.GridSystem.tileY(3), `${this.element}_idle`).setOrigin(0.3, 0.3)
        } else {
            this.player = this.physics.add.sprite(this.GridSystem.tileX(0), this.GridSystem.tileY(3), `${this.element}_idle`).setOrigin(0.2, 0.5)
        }
        this.shadow = this.add.image(this.player.x, this.player.y, `${this.element}_shadow`).setVisible(false)
        this.playerData = new PlayerData(this.element)

        this.bottomui = this.add.image(222, 410, `${this.element}bottomui`).setOrigin(0, 0)
        this.timerbase = this.add.image(326.5, 0, `${this.element}timerbase`).setOrigin(0, 0).setVisible(false)
        this.timer = this.add.sprite(340, 16, `${this.element}timer`).setOrigin(0, 0).setVisible(false)
        this.timerbutton = this.add.image(420, 35, `${this.element}timerbutton`).setOrigin(0, 0).setVisible(false)
        this.enemyshadow = {
            x: 0,
            y: 0
        }
        this.enemy = this.physics.add.sprite(this.GridSystem.tileX(8), this.GridSystem.tileY(3), `${this.etype}_idle`).setOrigin(0, 0)
        this.enemyData = new EnemyData(this.etype)
        this.sound.play('backgroundmusicgame', {
            mute: false,
            loop: true,
        });
        this.enemywalk = this.sound.add(`${this.etype}walk`, {
            loop: true
        })
        this.sound.play('snow_appear');
        this.setupGrid()
        this.setupAnims()
        this.player.anims.play(`${this.element}Idle`)
        this.enemy.anims.play(`${this.etype}Idle`)
        this.HealthbarPos()


    }
    setupGrid() {
        for (let i = 0; i < this.GridSystem.grid.length; i++) {
            for (let j = 0; j < this.GridSystem.grid[i].length; j++) {
                let x = (j + 1) * this.GridSystem.width
                let y = (i + 1) * this.GridSystem.height
                if (this.GridSystem.distance(this.player, {
                        x: x,
                        y: y
                    }) === 0) {
                    this.GridSystem.grid[i][j] = this.add.image(x, y, 'tile').setOrigin(0, 0)
                } else if (this.GridSystem.distance(this.enemy, {
                        x: x,
                        y: y
                    }) === 0) {
                    this.GridSystem.grid[i][j] = this.add.image(x, y, 'tile').setOrigin(0, 0)
                } else if (this.GridSystem.distance(this.player, {
                        x: x,
                        y: y
                    }) < this.playerData.move) {
                    this.GridSystem.grid[i][j] = this.add.image(x, y, 'tile_move').setOrigin(0, 0).setInteractive();
                } else {
                    this.GridSystem.grid[i][j] = this.add.image(x, y, 'tile').setOrigin(0, 0)
                }
            }
        }
    }
    update() {
        if (this.turn === 7) {
            this.playerWin()
        } else if (this.turn === 8) {
            this.enemyWin()
        } else {
            this.stopPlayer()
            this.updateDepths()
            this.updateTimer()
        }

        if (this.turn === 2) {
            this.updatePlayer()
        } else if (this.turn === 1) {
            this.createTimer()
        } else if (this.turn === 3) {
            this.updateEnemy()
        }

    }
    clearGrid() {
        for (let i = 0; i < this.GridSystem.grid.length; i++) {
            for (let j = 0; j < this.GridSystem.grid[i].length; j++) {
                this.GridSystem.grid[i][j].destroy()
            }
        }
    }
    updatePlayer() {
        if (this.playerData.health > 0) {
            for (let i = 0; i < this.GridSystem.grid.length; i++) {
                for (let j = 0; j < this.GridSystem.grid[i].length; j++) {
                    this.GridSystem.grid[i][j].visible = true
                    this.GridSystem.grid[i][j].on('pointerdown', () => {
                        if (this.GridSystem.grid[i][j].texture.key === "tile_move") {
                            this.shadow.setVisible(true)
                            this.shadow.x = this.GridSystem.grid[i][j].x
                            this.shadow.y = this.GridSystem.grid[i][j].y
                            if (this.GridSystem.distance(this.shadow, this.enemy) <= this.playerData.range) {
                                this.target.x = this.enemy.x,
                                    this.target.y = this.enemy.y
                                this.target.depth = 1
                                this.target
                                    .setVisible(true)
                                    .setInteractive()
                                    .on('pointerdown', () => {
                                        this.attack = true
                                        this.target.setTint(0x6fbc44)
                                    })
                            } else {
                                this.target.setVisible(false)
                                this.attack = false
                                this.target.clearTint()
                            }
                        }
                    });
                }
            }
        } else {
            this.turn = 8
        }

    }

    stopPlayer() {
        if (this.turn === 5) {
            this.HealthbarPos()
            let distancePlayer = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.shadow.x, this.shadow.y);
            let distanceEnemy = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.enemyshadow.x, this.enemyshadow.y);
            if (this.player.body.speed > 0) {
                if (distancePlayer < 4) {
                    this.player.body.reset(this.shadow.x, this.shadow.y);
                    this.player.anims.play(`${this.element}Idle`)
                    if (this.attack) {
                        this.target.clearTint()
                        this.clearGrid()
                        this.setupGrid()
                        this.sound.play(`attack${this.element}`)
                        this.player.anims.play(`${this.element}Attack`)
                        this.time.addEvent({
                            delay: 1000,
                            callback: () => {
                                this.enemyData.health -= this.playerData.damage
                                console.log(this.enemyData.health)
                                this.HealthbarPos()
                                this.turn = 3
                                this.player.anims.play(`${this.element}Idle`)
                            },
                            callbackScope: this,
                            loop: false
                        });
                    } else {
                        this.turn = 3
                    }

                }
            }
            if (this.enemy.body.speed > 0) {
                if (distanceEnemy < 4) {
                    this.enemywalk.stop()
                    this.enemy.anims.play(`${this.etype}Idle`)
                    this.enemy.body.reset(this.enemyshadow.x, this.enemyshadow.y);
                    this.clearGrid()
                    this.setupGrid()
                    if (this.enemyAttack) {
                        this.enemy.anims.play(`${this.etype}Attack`)
                        this.time.addEvent({
                            delay: 1000,
                            callback: () => {
                                this.playerData.health -= this.enemyData.damage
                                console.log(this.playerData.health)
                                this.HealthbarPos()
                                this.turn = 1
                                this.enemy.anims.play(`${this.etype}Idle`)
                            },
                            callbackScope: this,
                            loop: false
                        });
                    } else {
                        this.turn = 1
                    }
                }
            }
        }

    }
    createTimer() {
        this.turn = 2
        this.attack = false
        this.timerbase.setVisible(true)
        this.timer.setVisible(true)
        this.timerbutton.setVisible(true)
        this.timer.anims.playReverse(`${this.element}timerIdle`)
        this.time.addEvent({
            delay: 10000,
            callback: () => {
                this.target.setVisible(false)
                this.shadow.setVisible(false)
                this.playerMove(this.shadow.x, this.shadow.y)
            },
            callbackScope: this,
            loop: false
        });
    }

    HealthbarPos() {
        if (this.enemyHealthBar) {
            this.enemyHealthBar.destroy()
            this.enemyHealthBarContainer.destroy()
            this.playerHealthBar.destroy()
            this.playerHealthBarContainer.destroy()
        }
        this.enemyHealthBarContainer = this.makeBar(this.enemy.x + 15, this.enemy.y + 80, 0x464646);
        this.enemyHealthBar = this.makeBar(this.enemy.x + 15, this.enemy.y + 80, barcolor(this.enemyData.health));
        this.playerHealthBarContainer = this.makeBar(this.player.x + 15, this.player.y + 55, 0x464646);
        this.playerHealthBar = this.makeBar(this.player.x + 15, this.player.y + 55, barcolor(this.playerData.health));
        this.setBarValue(this.enemyHealthBar, this.enemyData.health);
        this.setBarValue(this.enemyHealthBarContainer, 100);
        this.setBarValue(this.playerHealthBar, this.playerData.health);
        this.setBarValue(this.playerHealthBarContainer, 100);
    }

    playerWin() {
        this.clearGrid()
        this.enemyHealthBarContainer.destroy()
        this.enemyHealthBar.destroy()
        this.enemy.destroy()
    }

    enemyWin() {
        this.clearGrid()
        this.playerHealthBarContainer.destroy()
        this.playerHealthBar.destroy()
        this.player.destroy()
    }

    updateDepths() {
        this.player.depth = 1
        this.shadow.depth = 1
        this.enemy.depth = 1
        this.foreground.depth = 1
        this.bottomui.depth = 1
        this.timerbase.depth = 1
        this.timer.depth = 1
        this.timerbutton.depth = 1
        this.target.depth = 1
    }
    updateEnemy() {
        if (this.enemyData.health > 0) {
            this.turn = 4
            for (let i = 0; i < this.GridSystem.grid.length; i++) {
                for (let j = 0; j < this.GridSystem.grid[i].length; j++) {
                    this.GridSystem.grid[i][j].visible = false
                }
            }
            let position = this.enemyAI()
            this.enemyshadow.x = position.x
            this.enemyshadow.y = position.y

            this.time.addEvent({
                delay: 5000,
                callback: () => {
                    this.enemyMove(this.enemyshadow.x, this.enemyshadow.y)
                    this.HealthbarPos()
                },
                callbackScope: this,
                loop: false
            });
        } else {
            this.turn = 7;
            console.log("dead")
        }
    }
    playerMove(x, y) {
        this.sound.play('penguinwalk')
        this.player.anims.play(`${this.element}Move`)
        this.physics.moveToObject(this.player, {
            x: x,
            y: y
        }, 200);
        this.turn = 5

    }
    enemyMove(x, y) {
        if (this.GridSystem.distance(this.enemyshadow, this.player) <= this.enemyData.range) {
            console.log(this.GridSystem.distance(this.enemy, this.player))
            this.enemyAttack = true
        } else {
            this.enemyAttack = false
        }
        this.enemywalk.play()
        this.enemy.anims.play(`${this.etype}Move`)
        this.physics.moveToObject(this.enemy, {
            x: x,
            y: y
        }, 200);
        this.turn = 5
    }
    updateTimer() {
        if (this.timer.anims.isPlaying) {
            if (this.timer.anims.currentFrame.index === 1) {
                this.timerbase.setVisible(false)
                this.timer.setVisible(false)
                this.timerbutton.setVisible(false)
            }
        }
    }

    enemyAI() {
        let possibleX = []
        let possibleY = []
        for (let i = 0; i < this.enemyData.move; i++) {
            if (this.enemy.x+this.GridSystem.tileX(i) < this.GridSystem.tileX(8)) {
                possibleX.push(i)
            }
            if (this.enemy.y+this.GridSystem.tileY(i) < this.GridSystem.tileY(5)) {
                possibleY.push(i)
            }
            if (this.enemy.x-this.GridSystem.tileX(i) > this.GridSystem.tileX(1)) {
                possibleX.push(-i)
            }
            if (this.enemy.y-this.GridSystem.tileY(i) > this.GridSystem.tileY(1)) {
                possibleY.push(-i)
            }
        }
        console.log(`
        possibleX: ${possibleX}
        possibleY: ${possibleY}
        `)
        let x = this.enemy.x + this.GridSystem.tileX(possibleX[Phaser.Math.Between(0, possibleX.length-1)])
        let y = this.enemy.y + this.GridSystem.tileY(possibleY[Phaser.Math.Between(0, possibleY.length-1)])
        console.log(`
        x: ${x}
        y: ${y}
        `)
        return {
            x: x,
            y: y
        }

        
    }
    setupAnims() {
        this.anims.create({
            key: `${this.element}timerIdle`,
            frames: this.anims.generateFrameNumbers(`${this.element}timer`, {
                start: 0,
                end: 9
            }),
            frameRate: 1,
        });
        this.anims.create({
            key: 'snowIdle',
            frames: this.anims.generateFrameNames('snow_idle', {
                prefix: 'snowninja_idle_anim_',
                end: 16,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'snowMove',
            frames: this.anims.generateFrameNames('snow_move', {
                end: 9,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'snowAttack',
            frames: this.anims.generateFrameNames('snow_attack', {
                end: 9,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'fireIdle',
            frames: this.anims.generateFrameNames('fire_idle', {
                end: 12,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'fireMove',
            frames: this.anims.generateFrameNames('fire_move', {
                end: 6,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'waterIdle',
            frames: this.anims.generateFrameNames('water_idle', {
                end: 10,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'waterMove',
            frames: this.anims.generateFrameNames('water_move', {
                end: 9,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'slyIdle',
            frames: this.anims.generateFrameNames('sly_idle', {
                end: 24,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'scrapIdle',
            frames: this.anims.generateFrameNames('scrap_idle', {
                end: 52,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'tankIdle',
            frames: this.anims.generateFrameNames('tank_idle', {
                end: 16,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'slyMove',
            frames: this.anims.generateFrameNames('sly_move', {
                end: 11,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'scrapMove',
            frames: this.anims.generateFrameNames('scrap_move', {
                end: 16,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'tankMove',
            frames: this.anims.generateFrameNames('tank_move', {
                end: 15,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'slyAttack',
            frames: this.anims.generateFrameNames('sly_attack', {
                end: 50,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'scrapAttack',
            frames: this.anims.generateFrameNames('scrap_attack', {
                end: 57,
                zeroPad: 0
            }),
            repeat: -1
        });
        this.anims.create({
            key: 'tankAttack',
            frames: this.anims.generateFrameNames('tank_attack', {
                end: 36,
                zeroPad: 0
            }),
            repeat: -1
        });


    }
    makeBar(x, y, color) {
        let bar = this.add.graphics();

        bar.fillStyle(color, 1);
        bar.lineStyle(50, 0x464646)
        bar.fillRoundedRect(0, 0, 50, 10, 4);
        bar.x = x;
        bar.y = y;
        return bar;
    }
    setBarValue(bar, percentage) {
        bar.scaleX = percentage / 100;
    }
}