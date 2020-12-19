export class PlayerData {
    constructor(type) {
        this.xp = 0
        this.nextX;
        this.nextY;
        switch (type) {
            case "snow":
                this.health = 100
                this.range = 3
                this.move = 3
                this.damage = 16
                break;
            case "fire":
                this.health = 100
                this.range = 2
                this.move = 2
                this.damage = 18
                break;
            case "water":
                this.health = 100
                this.range = 1
                this.move = 2
                this.damage = 20
                break;
        }
    }
}
