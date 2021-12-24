import { Range } from "./range";

export class Cuboid {
    constructor(readonly rangeX: Range, readonly rangeY: Range, readonly rangeZ: Range) { }

    contains(cuboid: Cuboid): boolean {
        return (
            this.rangeX.containsRange(cuboid.rangeX) &&
            this.rangeY.containsRange(cuboid.rangeY) &&
            this.rangeZ.containsRange(cuboid.rangeZ)
        );
    }
}
