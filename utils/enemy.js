export class EnemyData {
    constructor(type) {
        switch (type) {
            case "sly":
                this.health = 100
                this.range = 3
                this.move = 3
                this.damage = 16
                break;
            case "scrap":
                this.health = 100
                this.range = 4
                this.move = 2
                this.damage = 18
                break;
            case "tank":
                this.health = 100
                this.range = 1
                this.move = 2
                this.damage = 30
                break;
        }
    }
}
