import { Point } from "./point";

test("point construtor", () => {
    const x = 12;
    const y = 34;
    const point: Point = new Point(x, y);
    expect(point.x).toBe(x);
    expect(point.y).toBe(y);
});
