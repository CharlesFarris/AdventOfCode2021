import { Cuboid } from "./cuboid";
import { Range } from "./range";

test("constructor", () => {
    const rangeX = new Range(1, 2);
    const rangeY = new Range(3, 4);
    const rangeZ = new Range(5, 6);
    const cuboid = new Cuboid(rangeX, rangeY, rangeZ);

    expect(cuboid.rangeX.start).toBe(1);
    expect(cuboid.rangeX.end).toBe(2);
    expect(cuboid.rangeY.start).toBe(3);
    expect(cuboid.rangeY.end).toBe(4);
    expect(cuboid.rangeZ.start).toBe(5);
    expect(cuboid.rangeZ.end).toBe(6);
});

test("size", () => {
    const rangeX = new Range(1, 3);
    const rangeY = new Range(3, 9);
    const rangeZ = new Range(5, 13);
    const cuboid = new Cuboid(rangeX, rangeY, rangeZ);
    expect(cuboid.size()).toBe(rangeX.size() * rangeY.size() * rangeZ.size());
});

test("fromPoints", () => {
    const cuboid = Cuboid.fromPoints(1, 2, 3, 4, 5, 6);
    expect(cuboid.rangeX.start).toBe(1);
    expect(cuboid.rangeX.end).toBe(4);
    expect(cuboid.rangeY.start).toBe(2);
    expect(cuboid.rangeY.end).toBe(5);
    expect(cuboid.rangeZ.start).toBe(3);
    expect(cuboid.rangeZ.end).toBe(6);
});

test("contains", () => {
    const left = Cuboid.fromPoints(0, 0, 0, 5, 5, 5);

    const right1 = Cuboid.fromPoints(0, 0, 0, 5, 5, 5);
    expect(left.contains(right1)).toBeTruthy();

    const right2 = Cuboid.fromPoints(1, 1, 1, 4, 4, 4);
    expect(left.contains(right2)).toBeTruthy();

    const right3 = Cuboid.fromPoints(-1, 0, 0, 5, 5, 5);
    expect(left.contains(right3)).toBeFalsy();

    const right4 = Cuboid.fromPoints(0, -1, 0, 5, 5, 5);
    expect(left.contains(right4)).toBeFalsy();

    const right5 = Cuboid.fromPoints(0, 0, -1, 5, 5, 5);
    expect(left.contains(right5)).toBeFalsy();

    const right6 = Cuboid.fromPoints(-5, -5, -5, -1, -1, -1);
    expect(left.contains(right6)).toBeFalsy();
});

test("intersect", () => {
    const left = Cuboid.fromPoints(0, 0, 0, 5, 5, 5);

    const right1 = Cuboid.fromPoints(-5, -5, -5, -1, -1, -1);
    expect(left.intersect(right1)).toBeUndefined();

    const right2 = Cuboid.fromPoints(-5, -5, -5, 1, 2, 3);
    const intersect2 = left.intersect(right2);
    expect(intersect2).toBeDefined();
    expect(intersect2?.rangeX.start).toBe(0);
    expect(intersect2?.rangeX.end).toBe(1);
    expect(intersect2?.rangeY.start).toBe(0);
    expect(intersect2?.rangeY.end).toBe(2);
    expect(intersect2?.rangeZ.start).toBe(0);
    expect(intersect2?.rangeZ.end).toBe(3);

    const right3 = Cuboid.fromPoints(1, 2, 3, 3, 4, 5);
    const intersect3 = left.intersect(right3);
    expect(intersect3).toBeDefined();
    expect(intersect3?.rangeX.start).toBe(1);
    expect(intersect3?.rangeX.end).toBe(3);
    expect(intersect3?.rangeY.start).toBe(2);
    expect(intersect3?.rangeY.end).toBe(4);
    expect(intersect3?.rangeZ.start).toBe(3);
    expect(intersect3?.rangeZ.end).toBe(5);
});

test("isMatch", () => {
    const left = Cuboid.fromPoints(1, 2, 3, 4, 5, 6);

    const right1 = Cuboid.fromPoints(1, 1, 1, 2, 2, 2);
    expect(left.isMatch(right1)).toBeFalsy();

    const right2 = Cuboid.fromPoints(1, 2, 3, 4, 5, 6);
    expect(left.isMatch(right2)).toBeTruthy();
});
