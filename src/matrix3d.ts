import { Point3d } from "./point3d";
import { Vector3d } from "./vector3d";

export { Matrix3d };

class Matrix3d {
    constructor(readonly m: number[]) {}

    multiplyPoint(p: Point3d): Point3d {
        return new Point3d(
            this.m[0] * p.x + this.m[1] * p.y + this.m[2] * p.z,
            this.m[3] * p.x + this.m[4] * p.y + this.m[5] * p.z,
            this.m[6] * p.x + this.m[7] * p.y + this.m[8] * p.z
        );
    }

    multiplyPoints(points: Point3d[]): Point3d[] {
        return points.map((p: Point3d) => {
            return this.multiplyPoint(p);
        });
    }

    multiplyVector(v: Vector3d): Vector3d {
        return new Vector3d(
            this.m[0] * v.x + this.m[1] * v.y + this.m[2] * v.z,
            this.m[3] * v.x + this.m[4] * v.y + this.m[5] * v.z,
            this.m[6] * v.x + this.m[7] * v.y + this.m[8] * v.z
        );
    }

    multiplyVectors(vectors: Vector3d[]): Vector3d[] {
        return vectors.map((p: Vector3d) => {
            return this.multiplyVector(p);
        });
    }

    static readonly orientations: Matrix3d[] = [
        new Matrix3d([1, 0, 0, 0, 1, 0, 0, 0, 1]),
        new Matrix3d([1, 0, 0, 0, 0, -1, 0, 1, 0]),
        new Matrix3d([1, 0, 0, 0, -1, 0, 0, 0, -1]),
        new Matrix3d([1, 0, 0, 0, 0, 1, 0, -1, 0]),

        new Matrix3d([0, -1, 0, 1, 0, 0, 0, 0, 1]),
        new Matrix3d([0, 0, 1, 1, 0, 0, 0, 1, 0]),
        new Matrix3d([0, 1, 0, 1, 0, 0, 0, 0, -1]),
        new Matrix3d([0, 0, -1, 1, 0, 0, 0, -1, 0]),

        new Matrix3d([-1, 0, 0, 0, -1, 0, 0, 0, 1]),
        new Matrix3d([-1, 0, 0, 0, 0, -1, 0, -1, 0]),
        new Matrix3d([-1, 0, 0, 0, 1, 0, 0, 0, -1]),
        new Matrix3d([-1, 0, 0, 0, 0, 1, 0, 1, 0]),

        new Matrix3d([0, 1, 0, -1, 0, 0, 0, 0, 1]),
        new Matrix3d([0, 0, 1, -1, 0, 0, 0, -1, 0]),
        new Matrix3d([0, -1, 0, -1, 0, 0, 0, 0, -1]),
        new Matrix3d([0, 0, -1, -1, 0, 0, 0, 1, 0]),

        new Matrix3d([0, 0, -1, 0, 1, 0, 1, 0, 0]),
        new Matrix3d([0, 1, 0, 0, 0, 1, 1, 0, 0]),
        new Matrix3d([0, 0, 1, 0, -1, 0, 1, 0, 0]),
        new Matrix3d([0, -1, 0, 0, 0, -1, 1, 0, 0]),

        new Matrix3d([0, 0, -1, 0, -1, 0, -1, 0, 0]),
        new Matrix3d([0, -1, 0, 0, 0, 1, -1, 0, 0]),
        new Matrix3d([0, 0, 1, 0, 1, 0, -1, 0, 0]),
        new Matrix3d([0, 1, 0, 0, 0, -1, -1, 0, 0])
    ];
}
