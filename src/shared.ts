export { Point, Map, mapFromLines };

class Point {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    readonly x: number;
    readonly y: number;
}

class Map {
    constructor(width: number, height: number, initalValue: number = 0) {
        this.width = width;
        this.height = height;
        this.values = new Array(width * height).fill(initalValue);
    }

    getIndex(x: number, y: number): number {
        return x + this.width * y;
    }

    getValue(x: number, y: number): number {
        return this.isInMap(x, y) ? this.values[this.getIndex(x, y)] : undefined;
    }

    getValueAtPoint(point: Point): number {
        return this.getValue(point.x, point.y);
    }

    setValue(x: number, y: number, value: number): void {
        this.values[this.getIndex(x, y)] = value;
    }

    setValueAtPoint(point: Point, value: number): void {
        this.setValue(point.x, point.y, value);
    }

    isInMap(x: number, y: number): boolean {
        return 0 <= x && x < this.width && 0 <= y && y < this.height;
    }

    isPointInMap(point: Point): boolean {
        return this.isInMap(point.x, point.y);
    }

    clear(value: number = 0): void {
        this.values.fill(value);
    }

    readonly width: number;
    readonly height: number;
    readonly values: number[];
}

function mapFromLines(lines: string[]): Map {
    const height: number = lines.length;
    const width: number = lines[0].length;
    const map: Map = new Map(width, height);
    return lines.reduce((yMap, line, y) => {
        return line.split("").reduce((xMap, character, x) => {
            map.setValue(x, y, parseInt(character));
            return xMap;
        }, yMap);
        return yMap;
    }, map);
}
