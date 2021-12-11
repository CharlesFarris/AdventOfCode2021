export { Point, Map, mapFromLines, mapCopyShape, pointFromMapIndex, getAdjacentPoints, logMap };

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
        return this.isInMap(x, y) ? x + this.width * y : undefined;
    }

    getIndexAtPoint(point: Point): number {
        return this.getIndex(point.x, point.y);
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

    addValue(x: number, y: number, value: number): void {
        const index = this.getIndex(x, y);
        this.values[index] = this.values[index] + value;
    }

    addValueAtPoint(point: Point, value: number): void {
        this.addValue(point.x, point.y, value);
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

function mapCopyShape(map: Map, intialValue: number = 0): Map {
    const copy = new Map(map.width, map.height, intialValue);
    return copy;
}

function pointFromMapIndex(map: Map, index: number): Point {
    if (0 <= index && index < map.values.length) {
        const y: number = Math.floor(index / map.width);
        const x: number = index % map.width;
        return new Point(x, y);
    }
    return undefined;
}

function getAdjacentPoints(point: Point, includeDiagonals: boolean = true): Point[] {
    const x: number = point.x;
    const y: number = point.y;
    const adjacentPoints: Point[] = [
        new Point(x - 1, y),
        new Point(x, y - 1),
        new Point(x + 1, y),
        new Point(x, y + 1)
    ];
    if (includeDiagonals) {
        adjacentPoints.push(
            new Point(x - 1, y - 1),
            new Point(x + 1, y - 1),
            new Point(x - 1, y + 1),
            new Point(x + 1, y + 1)
        );
    }
    return adjacentPoints;
}

function logMap(map: Map) {
    console.log(map.width + " x " + map.height);
    for (let y = 0; y < map.height; y++) {
        const start : number = y *map.width;
        console.log(map.values.slice(start, start + map.width).join(""));
    }
}
