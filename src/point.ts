export { Point };

class Point {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    readonly x: number;
    readonly y: number;
}
