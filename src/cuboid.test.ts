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

    const right4 = Cuboid.fromPoints(0, 0, 0, 5, 5, 5);
    const intersect4 = left.intersect(right4);
    expect(intersect4).toBeDefined();
    expect(intersect4?.isMatch(Cuboid.fromPoints(0,0,0,5,5,5))).toBeTruthy();
});

test("isMatch", () => {
    const left = Cuboid.fromPoints(1, 2, 3, 4, 5, 6);

    const right1 = Cuboid.fromPoints(1, 1, 1, 2, 2, 2);
    expect(left.isMatch(right1)).toBeFalsy();

    const right2 = Cuboid.fromPoints(1, 2, 3, 4, 5, 6);
    expect(left.isMatch(right2)).toBeTruthy();
});

test("subtract", () => {
    const left1 = Cuboid.fromPoints(0, 0, 0, 4, 4, 4);

    const right1 = Cuboid.fromPoints(-10, -10, -10, 10, 10, 10);
    const output1 = left1.subtract(right1);
    expect(output1.length).toBe(0);

    const right2 = Cuboid.fromPoints(5, 0, 0, 9, 4, 4);
    const output2 = left1.subtract(right2);
    expect(output2.length).toBe(1);
    expect(output2[0].isMatch(left1)).toBeTruthy();

    const right3 = Cuboid.fromPoints(2, 0, 0, 6, 4, 4);
    const output3 = left1.subtract(right3);
    expect(output3.length).toBe(1);
    expect(output3[0].isMatch(Cuboid.fromPoints(0, 0, 0, 1, 4, 4)));

    const right4 = Cuboid.fromPoints(1, 0, 0, 3, 4, 4);
    const output4 = left1.subtract(right4);
    expect(output4.length).toBe(2);
    expect(output4[0].isMatch(Cuboid.fromPoints(0, 0, 0, 0, 4, 4))).toBeTruthy();
    expect(output4[1].isMatch(Cuboid.fromPoints(4, 0, 0, 4, 4, 4))).toBeTruthy();

    const right5 = Cuboid.fromPoints(0, 0, 0, 4, 4, 4);
    const output5 = left1.subtract(right5);
    expect(output5.length).toBe(0);

    const right6 = Cuboid.fromPoints(4, 0, 0, 4, 4, 4);
    const output6 = left1.subtract(right6);
    expect(output6.length).toBe(1);
    expect(output6[0].isMatch(Cuboid.fromPoints(0, 0, 0, 3, 4, 4))).toBeTruthy();

    const right7 = Cuboid.fromPoints(0, 0, 0, 0, 4, 4);
    const output7 = left1.subtract(right7);
    expect(output7.length).toBe(1);
    expect(output7[0].isMatch(Cuboid.fromPoints(1, 0, 0, 4, 4, 4))).toBeTruthy();

    const right8 = Cuboid.fromPoints(1, 1, 1, 3, 3, 3);
    const output8 = left1.subtract(right8);
    expect(output8.length).toBe(26);
    const splits8: Cuboid[] = [
        Cuboid.fromPoints(0, 0, 0, 0, 0, 0),
        Cuboid.fromPoints(1, 0, 0, 3, 0, 0),
        Cuboid.fromPoints(4, 0, 0, 4, 0, 0),

        Cuboid.fromPoints(0, 1, 0, 0, 3, 0),
        Cuboid.fromPoints(1, 1, 0, 3, 3, 0),
        Cuboid.fromPoints(4, 1, 0, 4, 3, 0),

        Cuboid.fromPoints(0, 4, 0, 0, 4, 0),
        Cuboid.fromPoints(1, 4, 0, 3, 4, 0),
        Cuboid.fromPoints(4, 4, 0, 4, 4, 0),

        Cuboid.fromPoints(0, 0, 1, 0, 0, 3),
        Cuboid.fromPoints(1, 0, 1, 3, 0, 3),
        Cuboid.fromPoints(4, 0, 1, 4, 0, 3),

        Cuboid.fromPoints(0, 1, 1, 0, 3, 3),
        Cuboid.fromPoints(4, 1, 1, 4, 3, 3),

        Cuboid.fromPoints(0, 4, 1, 0, 4, 3),
        Cuboid.fromPoints(1, 4, 1, 3, 4, 3),
        Cuboid.fromPoints(4, 4, 1, 4, 4, 3),

        Cuboid.fromPoints(0, 0, 4, 0, 0, 4),
        Cuboid.fromPoints(1, 0, 4, 3, 0, 4),
        Cuboid.fromPoints(4, 0, 4, 4, 0, 4),

        Cuboid.fromPoints(0, 1, 4, 0, 3, 4),
        Cuboid.fromPoints(1, 1, 4, 3, 3, 4),
        Cuboid.fromPoints(4, 1, 4, 4, 3, 4),

        Cuboid.fromPoints(0, 4, 4, 0, 4, 4),
        Cuboid.fromPoints(1, 4, 4, 3, 4, 4),
        Cuboid.fromPoints(4, 4, 4, 4, 4, 4)
    ];
    for (const split of splits8) {
        expect(
            output8.find(c => {
                return c.isMatch(split);
            })
        ).toBeDefined();
    }

    const left2 = Cuboid.fromPoints(0, 0, 0, 4, 4, 0);

    const right9 = Cuboid.fromPoints(1, 1, 0, 3, 3, 0);
    const output9 = left2.subtract(right9);
    expect(output9.length).toBe(8);
    const splits9: Cuboid[] = [
        Cuboid.fromPoints(0, 0, 0, 0, 0, 0),
        Cuboid.fromPoints(1, 0, 0, 3, 0, 0),
        Cuboid.fromPoints(4, 0, 0, 4, 0, 0),

        Cuboid.fromPoints(0, 1, 0, 0, 3, 0),
        Cuboid.fromPoints(1, 1, 0, 3, 3, 0),
        Cuboid.fromPoints(4, 1, 0, 4, 3, 0),

        Cuboid.fromPoints(0, 4, 0, 0, 4, 0),
        Cuboid.fromPoints(1, 4, 0, 3, 4, 0),
        Cuboid.fromPoints(4, 4, 0, 4, 4, 0)
    ];
    for (const split of splits9) {
        expect(
            output8.find(c => {
                return c.isMatch(split);
            })
        ).toBeDefined();
    }
});

test("clone", () => {
    const cuboid = Cuboid.fromPoints(1, 2, 3, 5, 6, 7);
    const clone = cuboid.clone();
    expect(clone.rangeX.start).toBe(cuboid.rangeX.start);
    expect(clone.rangeX.end).toBe(cuboid.rangeX.end);
    expect(clone.rangeY.start).toBe(cuboid.rangeY.start);
    expect(clone.rangeY.end).toBe(cuboid.rangeY.end);
    expect(clone.rangeZ.start).toBe(cuboid.rangeZ.start);
    expect(clone.rangeZ.end).toBe(cuboid.rangeZ.end);
});
