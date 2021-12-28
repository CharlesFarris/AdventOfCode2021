export { Vector3d };

class Vector3d {
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    copy(v: Vector3d): void {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    }

    clone(): Vector3d {
        return new Vector3d(this.x, this.y, this.z);
    }

    negate(): void {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    }

    add(v: Vector3d): void {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    subtract(v: Vector3d): void {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }

    x: number;
    y: number;
    z: number;
}
