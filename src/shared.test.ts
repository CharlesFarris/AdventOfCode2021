import { Point, Map, mapFromLines } from "./shared";

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
