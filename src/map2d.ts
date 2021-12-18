export { Map2d, mapFromLines };

class Map2d {
    constructor(width: number, height: number, initalValue = 0) {
        this.width = width;
        this.height = height;
        this.values = new Array(width * height).fill(initalValue);
    }

    getIndex(x: number, y: number): number | undefined {
        return this.isInMap(x, y) ? x + this.width * y : undefined;
    }

    getValue(x: number, y: number): number | undefined {
        const index = this.getIndex(x, y);
        return index === undefined ? undefined : this.values[index];
    }

    setValue(x: number, y: number, value: number): void {
        if (this.isInMap(x, y)) {
            const index = this.getIndex(x, y);
            if (index !== undefined) {
                this.values[index] = value;
            }
        }
    }

    addValue(x: number, y: number, value: number): void {
        if (this.isInMap(x, y)) {
            const index = this.getIndex(x, y);
            if (index !== undefined) {
                this.values[index] = this.values[index] + value;
            }
        }
    }

    isInMap(x: number, y: number): boolean {
        return 0 <= x && x < this.width && 0 <= y && y < this.height;
    }

    clear(value = 0): void {
        this.values.fill(value);
    }

    readonly width: number;
    readonly height: number;
    readonly values: number[];
}

function mapFromLines(lines: string[]): Map2d {
    const height: number = lines.length;
    const width: number = lines[0].length;
    const map: Map2d = new Map2d(width, height);
    return lines.reduce((yMap, line, y) => {
        return line.split("").reduce((xMap, character, x) => {
            map.setValue(x, y, parseInt(character));
            return xMap;
        }, yMap);
    }, map);
}
