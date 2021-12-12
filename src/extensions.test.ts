import { Map } from "./map";
import { Point } from "./Point";
import "./extensions";

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

test("getAdjacentPoints", () => {
    const point: Point = new Point(0, 0);
    const adjacentPoints = point.getAdjacentPoints(false);
    expect(adjacentPoints.length).toBe(4);
    expect(adjacentPoints[0].x).toBe(-1);
    expect(adjacentPoints[0].y).toBe(0);
    expect(adjacentPoints[1].x).toBe(0);
    expect(adjacentPoints[1].y).toBe(-1);
    expect(adjacentPoints[2].x).toBe(1);
    expect(adjacentPoints[2].y).toBe(0);
    expect(adjacentPoints[3].x).toBe(0);
    expect(adjacentPoints[3].y).toBe(1);

    const adjacentPointsAll = point.getAdjacentPoints(true);
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


test("pointFromMapIndex", () => {
    const map: Map = new Map(2, 3);
    const point0 = map.pointFromMapIndex(0);
    expect(point0.x).toBe(0);
    expect(point0.y).toBe(0);

    const point1 = map.pointFromMapIndex(1);
    expect(point1.x).toBe(1);
    expect(point1.y).toBe(0);

    const point3 = map.pointFromMapIndex(3);
    expect(point3.x).toBe(1);
    expect(point3.y).toBe(1);

    expect(map.pointFromMapIndex(-1)).toBeUndefined();
});
