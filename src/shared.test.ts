import { Point, Map, mapFromLines, mapCopyShape, pointFromMapIndex, getAdjacentPoints } from "./shared";

test("point construtor", () => {
    const x: number = 12;
    const y: number = 34;
    const point: Point = new Point(x, y);
    expect(point.x).toBe(x);
    expect(point.y).toBe(y);
});

test("map constructor", () => {
    const width: number = 3;
    const height: number = 4;
    const initialValue: number = 5;
    const map: Map = new Map(width, height, initialValue);
    expect(map.width).toBe(width);
    expect(map.height).toBe(height);
    expect(map.values).toBeDefined();
    expect(map.values.length).toBe(width * height);
    for (const value of map.values) {
        expect(value).toBe(initialValue);
    }
});

test("map getValue", () => {
    const map: Map = new Map(2, 2);
    map.values[0] = 1;
    map.values[1] = 2;
    map.values[2] = 3;
    map.values[3] = 4;
    // inside points
    expect(map.getValue(0, 0)).toBe(1);
    expect(map.getValue(1, 0)).toBe(2);
    expect(map.getValue(0, 1)).toBe(3);
    expect(map.getValue(1, 1)).toBe(4);
    // outside points
    expect(map.getValue(-1, 0)).toBe(undefined);
});

test("map getValueAtPoint", () => {
    const map: Map = new Map(2, 2);
    map.values[0] = 1;
    map.values[1] = 2;
    map.values[2] = 3;
    map.values[3] = 4;
    // inside points
    expect(map.getValueAtPoint(new Point(0, 0))).toBe(1);
    expect(map.getValueAtPoint(new Point(1, 0))).toBe(2);
    expect(map.getValueAtPoint(new Point(0, 1))).toBe(3);
    expect(map.getValueAtPoint(new Point(1, 1))).toBe(4);
    // outside points
    expect(map.getValueAtPoint(new Point(-1, 0))).toBe(undefined);
});

test("map getIndex", () => {
    const map: Map = new Map(3, 2);
    // inside points
    expect(map.getIndex(0, 0)).toBe(0);
    expect(map.getIndex(1, 0)).toBe(1);
    expect(map.getIndex(0, 1)).toBe(3);
    // outside points
    expect(map.getIndex(-1, 0)).toBeUndefined();
});

test("map setValue", () => {
    const map: Map = new Map(2, 2);
    map.setValue(0, 0, 1);
    expect(map.getValue(0, 0)).toBe(1);
    map.setValue(1, 0, 2);
    expect(map.getValue(1, 0)).toBe(2);
    map.setValue(0, 1, 3);
    expect(map.getValue(0, 1)).toBe(3);
    map.setValue(1, 1, 4);
    expect(map.getValue(1, 1)).toBe(4);
});

test("map setValueAtPoint", () => {
    const map: Map = new Map(2, 2);
    map.setValueAtPoint(new Point(0, 0), 1);
    expect(map.getValue(0, 0)).toBe(1);
    map.setValueAtPoint(new Point(1, 0), 2);
    expect(map.getValue(1, 0)).toBe(2);
    map.setValueAtPoint(new Point(0, 1), 3);
    expect(map.getValue(0, 1)).toBe(3);
    map.setValueAtPoint(new Point(1, 1), 4);
    expect(map.getValue(1, 1)).toBe(4);
});

test("map addValue", () => {
    const map: Map = new Map(2, 2, 5);
    map.addValue(0, 0, 1);
    expect(map.getValue(0, 0)).toBe(6);
    map.addValue(1, 0, 2);
    expect(map.getValue(1, 0)).toBe(7);
    map.addValue(0, 1, 3);
    expect(map.getValue(0, 1)).toBe(8);
    map.addValue(1, 1, 4);
    expect(map.getValue(1, 1)).toBe(9);
});

test("map addValueAtPoint", () => {
    const map: Map = new Map(2, 2, 5);
    map.addValueAtPoint(new Point(0, 0), 1);
    expect(map.getValue(0, 0)).toBe(6);
    map.addValueAtPoint(new Point(1, 0), 2);
    expect(map.getValue(1, 0)).toBe(7);
    map.addValueAtPoint(new Point(0, 1), 3);
    expect(map.getValue(0, 1)).toBe(8);
    map.addValueAtPoint(new Point(1, 1), 4);
    expect(map.getValue(1, 1)).toBe(9);
});

test("map isInMap", () => {
    const map: Map = new Map(2, 2);
    // inside points
    expect(map.isInMap(0, 0)).toBe(true);
    expect(map.isInMap(1, 0)).toBe(true);
    expect(map.isInMap(0, 1)).toBe(true);
    expect(map.isInMap(1, 1)).toBe(true);
    // outside point
    expect(map.isInMap(-1, 0)).toBe(false);
    expect(map.isInMap(3, 0)).toBe(false);
    expect(map.isInMap(0, -1)).toBe(false);
    expect(map.isInMap(0, 3)).toBe(false);
});

test("map isPointInMap", () => {
    const map: Map = new Map(2, 2);
    // inside points
    expect(map.isPointInMap(new Point(0, 0))).toBe(true);
    expect(map.isPointInMap(new Point(1, 0))).toBe(true);
    expect(map.isPointInMap(new Point(0, 1))).toBe(true);
    expect(map.isPointInMap(new Point(1, 1))).toBe(true);
    // outside point
    expect(map.isPointInMap(new Point(-1, 0))).toBe(false);
    expect(map.isPointInMap(new Point(3, 0))).toBe(false);
    expect(map.isPointInMap(new Point(0, -1))).toBe(false);
    expect(map.isPointInMap(new Point(0, 3))).toBe(false);
});

test("map clear", () => {
    const map: Map = new Map(2, 2);
    for (const value of map.values) {
        expect(value).toBe(0);
    }
    map.clear(1);
    for (const value of map.values) {
        expect(value).toBe(1);
    }
});

test("mapFromLines", () => {
    const lines: string[] = ["12", "34", "56"];
    const map: Map = mapFromLines(lines);
    expect(map.width).toBe(2);
    expect(map.height).toBe(3);
    expect(map.values[0]).toBe(1);
    expect(map.values[1]).toBe(2);
    expect(map.values[2]).toBe(3);
    expect(map.values[3]).toBe(4);
    expect(map.values[4]).toBe(5);
    expect(map.values[5]).toBe(6);
});

test("mapCopyShape", () => {
    const map: Map = new Map(2, 3);
    const copy = mapCopyShape(map, 9);
    expect(copy.width).toBe(map.width);
    expect(copy.height).toBe(map.height);
    for (const value of copy.values) {
        expect(value).toBe(9);
    }
});

test("pointFromMapIndex", () => {
    const map: Map = new Map(2, 3);
    const point0 = pointFromMapIndex(map, 0);
    expect(point0.x).toBe(0);
    expect(point0.y).toBe(0);

    const point1 = pointFromMapIndex(map, 1);
    expect(point1.x).toBe(1);
    expect(point1.y).toBe(0);

    const point3 = pointFromMapIndex(map, 3);
    expect(point3.x).toBe(1);
    expect(point3.y).toBe(1);

    expect(pointFromMapIndex(map, -1)).toBeUndefined();
});

test("getAdjacentPoints", () => {
    const point: Point = new Point(0, 0);
    const adjacentPoints = getAdjacentPoints(point, false);
    expect(adjacentPoints.length).toBe(4);
    expect(adjacentPoints[0].x).toBe(-1);
    expect(adjacentPoints[0].y).toBe(0);
    expect(adjacentPoints[1].x).toBe(0);
    expect(adjacentPoints[1].y).toBe(-1);
    expect(adjacentPoints[2].x).toBe(1);
    expect(adjacentPoints[2].y).toBe(0);
    expect(adjacentPoints[3].x).toBe(0);
    expect(adjacentPoints[3].y).toBe(1);

    const adjacentPointsAll = getAdjacentPoints(point);
    expect(adjacentPointsAll.length).toBe(8);
    expect(adjacentPointsAll[0].x).toBe(-1);
    expect(adjacentPointsAll[0].y).toBe(0);
    expect(adjacentPointsAll[1].x).toBe(0);
    expect(adjacentPointsAll[1].y).toBe(-1);
    expect(adjacentPointsAll[2].x).toBe(1);
    expect(adjacentPointsAll[2].y).toBe(0);
    expect(adjacentPointsAll[3].x).toBe(0);
    expect(adjacentPointsAll[3].y).toBe(1);
    expect(adjacentPointsAll[4].x).toBe(-1);
    expect(adjacentPointsAll[4].y).toBe(-1);
    expect(adjacentPointsAll[5].x).toBe(1);
    expect(adjacentPointsAll[5].y).toBe(-1);
    expect(adjacentPointsAll[6].x).toBe(-1);
    expect(adjacentPointsAll[6].y).toBe(1);
    expect(adjacentPointsAll[7].x).toBe(1);
    expect(adjacentPointsAll[7].y).toBe(1);
});
