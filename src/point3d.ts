import { Vector3d } from "./vector3d";

export { Point3d };

class Point3d {
    constructor(readonly x: number, readonly y: number, readonly z: number) {}

    subract(point: Point3d): Vector3d {
        return new Vector3d(this.x - point.x, this.y - point.y, this.z - point.z);
    }

    add(vector: Vector3d): Point3d {
        return new Point3d(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    toArray(): number[] {
        return [this.x, this.y, this.z];
    }

    static fromArray(array: number[]): Point3d {
        return new Point3d(array[0], array[1], array[2]);
    }
}
