import { Vector3d } from "./vector3d";

test("constructor", () => {
    const v = new Vector3d(1, 2, 3);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(3);
});

test("negate", () => {
    const v = new Vector3d(1, 2, 3);
    v.negate();
    expect(v.x).toBe(-1);
    expect(v.y).toBe(-2);
    expect(v.z).toBe(-3);
});

test("clone", () => {
    const v = new Vector3d(1, 2, 3);
    const c = v.clone();
    expect(c.x).toBe(1);
    expect(c.y).toBe(2);
    expect(c.z).toBe(3);
});

test("add", () => {
    const left = new Vector3d(1, 2, 3);
    const right = new Vector3d(11, 22, 33);
    left.add(right);
    expect(left.x).toBe(12);
    expect(left.y).toBe(24);
    expect(left.z).toBe(36);
});

test("subract", () => {
    const left = new Vector3d(1, 2, 3);
    const right = new Vector3d(11, 22, 33);
    left.subtract(right);
    expect(left.x).toBe(-10);
    expect(left.y).toBe(-20);
    expect(left.z).toBe(-30);
});
