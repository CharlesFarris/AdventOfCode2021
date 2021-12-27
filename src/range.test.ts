import { Range } from "./range";

test("constructor", () => {
    const range1 = new Range(1, 2);
    expect(range1.start).toBe(1);
    expect(range1.end).toBe(2);

    const range2 = new Range(2, 1);
    expect(range2.start).toBe(1);
    expect(range2.end).toBe(2);
});

test("containsValue", () => {
    const range = new Range(1, 3);
    expect(range.contains(0)).toBeFalsy();
    expect(range.contains(1)).toBeTruthy();
    expect(range.contains(2)).toBeTruthy();
    expect(range.contains(3)).toBeTruthy();
    expect(range.contains(4)).toBeFalsy();
});

test("containsRange", () => {
    const range1 = new Range(1, 4);

    const range2 = new Range(0, 5);
    expect(range1.containsRange(range2)).toBeFalsy();

    const range3 = new Range(-1, 0);
    expect(range1.containsRange(range3)).toBeFalsy();

    const range4 = new Range(5, 6);
    expect(range1.containsRange(range4)).toBeFalsy();

    const range5 = new Range(1, 4);
    expect(range1.containsRange(range5)).toBeTruthy();

    const range6 = new Range(2, 3);
    expect(range1.containsRange(range6)).toBeTruthy();
});

test("size", () => {
    const range1 = new Range(1, 1);
    expect(range1.size()).toBe(1);

    const range2 = new Range(12, 32);
    expect(range2.size()).toBe(32 - 12 + 1);
});

test("intersect", () => {
    const left = new Range(1, 3);

    const right1 = new Range(4, 5);
    const intersect1 = left.intersect(right1);
    expect(intersect1).toBeUndefined();

    const right2 = new Range(3, 4);
    const intersect2 = left.intersect(right2);
    expect(intersect2).toBeDefined();
    expect(intersect2?.start).toBe(3);
    expect(intersect2?.end).toBe(3);

    const right3 = new Range(2, 4);
    const intersect3 = left.intersect(right3);
    expect(intersect3).toBeDefined();
    expect(intersect3?.start).toBe(2);
    expect(intersect3?.end).toBe(3);

    const right4 = new Range(-1, 4);
    const intersect4 = left.intersect(right4);
    expect(intersect4).toBeDefined();
    expect(intersect4?.start).toBe(1);
    expect(intersect4?.end).toBe(3);
});

test("union", () => {
    const left = new Range(1, 3);

    const right1 = new Range(1, 3);
    const union1 = left.union(right1);
    expect(union1.start).toBe(1);
    expect(union1.end).toBe(3);

    const right2 = new Range(2, 2);
    const union2 = left.union(right2);
    expect(union2.start).toBe(1);
    expect(union2.end).toBe(3);

    const right3 = new Range(-1, 0);
    const union3 = left.union(right3);
    expect(union3.start).toBe(-1);
    expect(union3.end).toBe(3);

    const right4 = new Range(5, 10);
    const union4 = left.union(right4);
    expect(union4.start).toBe(1);
    expect(union4.end).toBe(10);
});
