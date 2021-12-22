/* eslint-disable no-console */
import { Graph, GraphEdge, GraphNode } from "./graph";
import { createMap2d, Map2d } from "./map2d";
import { Point } from "./point";
import { Range } from "./range";

declare module "./point" {
    interface Point {
        getAdjacentPoints(includeDiagonals: boolean): Point[];
    }
}

Point.prototype.getAdjacentPoints = function getAdjacentPoints(includeDiagonals: boolean): Point[] {
    const x: number = this.x;
    const y: number = this.y;
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
};

declare module "./map2d" {
    interface Map2d {
        getValueAtPoint(point: Point): number | undefined;
        setValueAtPoint(point: Point, value: number): void;
        addValueAtPoint(point: Point, value: number): void;
        isPointInMap(point: Point): boolean;
        getIndexAtPoint(point: Point): number | undefined;
        toLog(): void;
        pointFromMapIndex(index: number): Point | undefined;
        getWindow(startX: number, startY: number, endX: number, endY: number): Map2d;
        flipHorizontal(): void;
        flipVertical(): void;
    }
}

Map2d.prototype.getValueAtPoint = function getValueAtPoint(point: Point): number | undefined {
    return this.getValue(point.x, point.y);
};

Map2d.prototype.setValueAtPoint = function setValueAtPoint(point: Point, value: number) {
    this.setValue(point.x, point.y, value);
};

Map2d.prototype.addValueAtPoint = function addValueAtPoint(point: Point, value: number) {
    this.addValue(point.x, point.y, value);
};

Map2d.prototype.isPointInMap = function isPointInMap(point: Point): boolean {
    return this.isInMap(point.x, point.y);
};

Map2d.prototype.getIndexAtPoint = function getIndexAtPoint(point: Point): number | undefined {
    return this.getIndex(point.x, point.y);
};

Map2d.prototype.toLog = function logMap() {
    console.log(`${this.width} x ${this.height}`);
    for (let y = 0; y < this.height; y++) {
        const start: number = y * this.width;
        console.log(this.values.slice(start, start + this.width).join(""));
    }
};

Map2d.prototype.pointFromMapIndex = function pointFromMapIndex(index: number): Point | undefined {
    if (0 <= index && index < this.values.length) {
        const y: number = Math.floor(index / this.width);
        const x: number = index % this.width;
        return new Point(x, y);
    }
    return undefined;
};

Map2d.prototype.getWindow = function getWindow(startX: number, startY: number, endX: number, endY: number): Map2d {
    const validEndX = Math.min(this.width - 1, endX);
    const newWidth: number = validEndX - startX + 1;
    const validEndY = Math.min(this.height - 1, endY);
    const newHeight: number = validEndY - startY + 1;
    const window: Map2d = createMap2d(newWidth, newHeight);
    for (let x = startX; x <= validEndX; x++) {
        for (let y = startY; y <= validEndY; y++) {
            const value = this.getValue(x, y);
            if (value === undefined) {
                continue;
            }
            window.setValue(x - startX, y - startY, value);
        }
    }
    return window;
};

Map2d.prototype.flipHorizontal = function flipHorizontal(): void {
    for (let y = 0; y < this.height; y++) {
        let startX = 0;
        let endX: number = this.width - 1;
        while (startX < endX) {
            const startValue = this.getValue(startX, y);
            if (startValue === undefined) {
                throw new Error("start undefined");
            }
            const endValue = this.getValue(endX, y);
            if (endValue === undefined) {
                throw new Error("endValue undefined");
            }
            this.setValue(startX, y, endValue);
            this.setValue(endX, y, startValue);
            startX++;
            endX--;
        }
    }
};

Map2d.prototype.flipVertical = function flipVertical(): void {
    for (let x = 0; x < this.width; x++) {
        let startY = 0;
        let endY: number = this.height - 1;
        while (startY < endY) {
            const startValue = this.getValue(x, startY);
            if (startValue === undefined) {
                throw new Error("startValue undefined");
            }
            const endValue = this.getValue(x, endY);
            if (endValue === undefined) {
                throw new Error("endValue undefined");
            }
            this.setValue(x, startY, endValue);
            this.setValue(x, endY, startValue);
            startY++;
            endY--;
        }
    }
};

declare module "./graph" {
    interface Graph {
        logGraph(): void;
    }
}

Graph.prototype.logGraph = function logGraph(): void {
    const nodes: GraphNode[] = this.getNodes();
    console.log(`Node: ${nodes.length}`);
    for (const node of nodes) {
        console.log(node.label);
    }
    const edges: GraphEdge[] = this.getEdges();
    console.log(`Edges: ${edges.length}`);
    for (const edge of edges) {
        console.log(`${edge.start.label} - ${edge.end.label}`);
    }
};

declare module "./range" {
    interface Range {
        unionValue(value: number): Range;
        unionRange(range: Range): Range;
    }
}

Range.prototype.unionValue = function unionValue(value: number): Range {
    if (value < this.start) {
        return new Range(value, this.end);
    } else if (value > this.end) {
        return new Range(this.start, value);
    } else {
        return this;
    }
};

Range.prototype.unionRange = function unionRange(range: Range): Range {
    if (this.start <= range.start && range.end <= this.end) {
        return this;
    } else {
        return new Range(Math.min(this.start, range.start), Math.max(this.end, range.end));
    }
};
