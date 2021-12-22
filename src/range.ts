export { EmptyRange, intersection, IntersectionResult, Range, union };

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

function union(left: Range, right: Range): Range {
    return new Range(Math.min(left.start, right.start), Math.max(left.end, right.end));
}

class IntersectionResult {
    constructor(readonly status: boolean, readonly range: Range) {}
}

function intersection(left: Range, right: Range): IntersectionResult {
    if (right.start > left.end || left.start > right.end) {
        return new IntersectionResult(false, EmptyRange);
    }
    return new IntersectionResult(true, new Range(Math.max(left.start, right.start), Math.min(left.end, right.end)));
}
