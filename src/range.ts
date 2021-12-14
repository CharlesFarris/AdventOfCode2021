export { EmptyRange, Range };

class Range {
    constructor(start: number, end: number) {
        if (start < end) {
            this.start = start;
            this.end = end;
        } else {
            this.start = end;
            this.end = end;
        }
    }

    isEmpty(): boolean {
        return this.start === this.end;
    }

    contains(value: number): boolean {
        return this.start <= value && value <= this.end;
    }

    readonly start: number;
    readonly end: number;
}

const EmptyRange: Range = new Range(0, 0);
