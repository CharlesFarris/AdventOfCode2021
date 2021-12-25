export { Range };

class Range {
    constructor(start: number, end: number) {
        if (start < end) {
            this.start = start;
            this.end = end;
        } else {
            this.start = end;
            this.end = start;
        }
    }

    size(): number {
        return this.end - this.start + 1;
    }

    contains(value: number): boolean {
        return this.start <= value && value <= this.end;
    }

    containsRange(range: Range): boolean {
        return this.start <= range.start && range.end <= this.end;
    }

    isIntersect(range: Range): boolean {
        return Math.max(this.start, range.start) <= Math.min(this.end, range.end);
    }

    intersect(range: Range): Range | undefined {
        const start = Math.max(this.start, range.start);
        const end = Math.min(this.end, range.end);
        return start <= end ? new Range(start, end) : undefined;
    }

    union(range: Range): Range {
        const start = Math.min(this.start, range.start);
        const end = Math.max(this.end, range.end);
        return new Range(start, end);
    }

    readonly start: number;
    readonly end: number;
}
