import { Point } from "./point";

test("point construtor", () => {
    const x: number = 12;
    const y: number = 34;
    const point: Point = new Point(x, y);
    expect(point.x).toBe(x);
    expect(point.y).toBe(y);
});
