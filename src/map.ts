import { Point } from "./point";

export { Map, mapFromLines };

class Map {
    constructor(width: number, height: number, initalValue: number = 0) {
        this.width = width;
        this.height = height;
        this.values = new Array(width * height).fill(initalValue);
    }

    getIndex(x: number, y: number): number {
        return this.isInMap(x, y) ? x + this.width * y : undefined;
    }

    getValue(x: number, y: number): number {
        return this.isInMap(x, y) ? this.values[this.getIndex(x, y)] : undefined;
    }

    setValue(x: number, y: number, value: number): void {
        this.values[this.getIndex(x, y)] = value;
    }

    addValue(x: number, y: number, value: number): void {
        const index = this.getIndex(x, y);
        this.values[index] = this.values[index] + value;
    }

    isInMap(x: number, y: number): boolean {
        return 0 <= x && x < this.width && 0 <= y && y < this.height;
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
