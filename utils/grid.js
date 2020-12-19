export class Grid {
    constructor(w,h,r,c) {
        this.width = w;
        this.height = h;
        this.rows = r
        this.columns = c;
        this.grid = []
        this.init()
        
    }
    init() {
        for(let i=0; i < this.rows;i++) {
            this.grid[i] = []
            for(let j=0; j < this.columns;j++) {
                this.grid[i][j] = "0"
            }
        }
    }

    debug() {
        console.log(this.grid)
    }

    distance(a,b) {
        return Math.hypot((b.x/this.width)-(a.x/this.width), (b.y/this.height)-(a.y/this.height))
    }
    tileX(value){
        return (value*this.width)+this.width
    }
    tileY(value){
        return value*this.height
    }
}
