import { Map, mapFromLines } from "./map";

test("map constructor", () => {
    const width = 3;
    const height = 4;
    const initialValue = 5;
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
