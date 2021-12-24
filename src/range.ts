export { EmptyRange, intersection, Range, split, union };

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

    containsRange(range: Range): boolean {
        return this.start <= range.start && range.end <= this.end;
    }

    isOverlapping(range: Range): boolean {
        return Math.max(this.start, range.start) <= Math.min(this.end, range.end);
    }

    isAdjacent(range: Range): boolean {
        return range.end + 1 === this.start || this.end + 1 === range.start;
    }

    canSplit(value: number): boolean {
        return this.start < value && value < this.end;
    }

    readonly start: number;
    readonly end: number;
}

const EmptyRange: Range = new Range(0, 0);

function union(left: Range, right: Range): Range {
    return new Range(Math.min(left.start, right.start), Math.max(left.end, right.end));
}

function intersection(left: Range, right: Range): Range | undefined {
    if (right.start > left.end || left.start > right.end) {
        return undefined;
    }
    return new Range(Math.max(left.start, right.start), Math.min(left.end, right.end));
}

function split(range: Range, value: number): Range[] {
    return range.start < value && value < range.end
        ? [new Range(range.start, value), new Range(value, range.end)]
        : [range];
}
