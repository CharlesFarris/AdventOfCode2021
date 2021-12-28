import { Point3d } from "./point3d";

test("constructor", () => {
    const p = new Point3d(1, 2, 3);
    expect(p.x).toBe(1);
    expect(p.y).toBe(2);
    expect(p.z).toBe(3);
});

test("subtract", () => {
    const left = new Point3d(11, 22, 33);
    const right = new Point3d(2, 3, 4);
    const v = left.subract(right);
    expect(v.x).toBe(9);
    expect(v.y).toBe(19);
    expect(v.z).toBe(29);
});

test("toArray", () => {
    const p = new Point3d(1, 2, 3);
    const array = p.toArray();
    expect(array.length).toBe(3);
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
    expect(array[2]).toBe(3);
});
