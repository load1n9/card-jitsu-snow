export function barcolor(health) {
    if (health > 75) {
        return 0x6fbc44
    } else if (health > 35){
        return 0xe8d328
    } else {
        return 0xe12a36
    }
}