import { Range } from "./range";

export class Cuboid {
    constructor(readonly rangeX: Range, readonly rangeY: Range, readonly rangeZ: Range) {}

    size(): number {
        return this.rangeX.size() * this.rangeY.size() * this.rangeZ.size();
    }

    contains(cuboid: Cuboid): boolean {
        return (
            this.rangeX.containsRange(cuboid.rangeX) &&
            this.rangeY.containsRange(cuboid.rangeY) &&
            this.rangeZ.containsRange(cuboid.rangeZ)
        );
    }

    intersect(cuboid: Cuboid): Cuboid | undefined {
        const intersectX = this.rangeX.intersect(cuboid.rangeX);
        if (intersectX === undefined) {
            return undefined;
        }
        const intersectY = this.rangeY.intersect(cuboid.rangeY);
        if (intersectY === undefined) {
            return undefined;
        }
        const intersectZ = this.rangeZ.intersect(cuboid.rangeZ);
        return intersectZ === undefined ? undefined : new Cuboid(intersectX, intersectY, intersectZ);
    }

    isMatch(cuboid: Cuboid): boolean {
        return (
            this.rangeX.start === cuboid.rangeX.start &&
            this.rangeX.end === cuboid.rangeX.end &&
            this.rangeY.start === cuboid.rangeY.start &&
            this.rangeY.end === cuboid.rangeY.end &&
            this.rangeZ.start === cuboid.rangeZ.start &&
            this.rangeZ.end === cuboid.rangeZ.end
        );
    }

    static fromPoints(
        startX: number,
        startY: number,
        startZ: number,
        endX: number,
        endY: number,
        endZ: number
    ): Cuboid {
        return new Cuboid(new Range(startX, endX), new Range(startY, endY), new Range(startZ, endZ));
    }
}
