/* eslint-disable no-console */
import { Graph, GraphEdge, GraphNode } from "./graph";
import { Map } from "./map";
import { Point } from "./point";

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

declare module "./map" {
    interface Map {
        getValueAtPoint(point: Point): number | undefined;
        setValueAtPoint(point: Point, value: number): void;
        addValueAtPoint(point: Point, value: number): void;
        isPointInMap(point: Point): boolean;
        getIndexAtPoint(point: Point): number | undefined;
        toLog(): void;
        pointFromMapIndex(index: number): Point | undefined;
    }
}

Map.prototype.getValueAtPoint = function getValueAtPoint(point: Point): number | undefined {
    return this.getValue(point.x, point.y);
};

Map.prototype.setValueAtPoint = function setValueAtPoint(point: Point, value: number) {
    this.setValue(point.x, point.y, value);
};

Map.prototype.addValueAtPoint = function addValueAtPoint(point: Point, value: number) {
    this.addValue(point.x, point.y, value);
};

Map.prototype.isPointInMap = function isPointInMap(point: Point): boolean {
    return this.isInMap(point.x, point.y);
};

Map.prototype.getIndexAtPoint = function getIndexAtPoint(point: Point): number | undefined {
    return this.getIndex(point.x, point.y);
};

Map.prototype.toLog = function logMap() {
    console.log(`${this.width} x ${this.height}`);
    for (let y = 0; y < this.height; y++) {
        const start: number = y * this.width;
        console.log(this.values.slice(start, start + this.width).join(""));
    }
};

Map.prototype.pointFromMapIndex = function pointFromMapIndex(index: number): Point | undefined {
    if (0 <= index && index < this.values.length) {
        const y: number = Math.floor(index / this.width);
        const x: number = index % this.width;
        return new Point(x, y);
    }
    return undefined;
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
