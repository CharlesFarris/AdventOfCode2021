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

    split(at: number, plane: SplitPlane, direction: SplitDirection): Cuboid[] {
        switch (plane) {
            case SplitPlane.X: {
                const splitX = splitRange(this.rangeX, at, direction);
                return splitX.length === 1
                    ? [this]
                    : [
                          new Cuboid(splitX[0], this.rangeY, this.rangeZ),
                          new Cuboid(splitX[1], this.rangeY, this.rangeZ)
                      ];
            }
            case SplitPlane.Y: {
                const splitY = splitRange(this.rangeY, at, direction);
                return splitY.length === 1
                    ? [this]
                    : [
                          new Cuboid(this.rangeX, splitY[0], this.rangeZ),
                          new Cuboid(this.rangeX, splitY[1], this.rangeZ)
                      ];
            }
            case SplitPlane.Z: {
                const splitZ = splitRange(this.rangeZ, at, direction);
                return splitZ.length === 1
                    ? [this]
                    : [
                          new Cuboid(this.rangeX, this.rangeY, splitZ[0]),
                          new Cuboid(this.rangeX, this.rangeY, splitZ[1])
                      ];
            }
            default:
                throw new Error("plane unknown");
        }
    }

    private static splitCuboids(cuboids: Cuboid[], at: number, plane: SplitPlane, direction: SplitDirection): Cuboid[] {
        const output: Cuboid[] = [];
        for (const cuboid of cuboids) {
            for (const split of cuboid.split(at, plane, direction)) {
                output.push(split);
            }
        }
        return output;
    }

    subtract(cuboid: Cuboid): Cuboid[] {
        if (cuboid.contains(this)) {
            return [];
        }
        const intersection = this.intersect(cuboid);
        if (intersection === undefined) {
            return [this];
        }
        let output: Cuboid[] = [this];
        output = Cuboid.splitCuboids(output, intersection.rangeX.start, SplitPlane.X, SplitDirection.Negative);
        output = Cuboid.splitCuboids(output, intersection.rangeX.end, SplitPlane.X, SplitDirection.Positive);
        output = Cuboid.splitCuboids(output, intersection.rangeY.start, SplitPlane.Y, SplitDirection.Negative);
        output = Cuboid.splitCuboids(output, intersection.rangeY.end, SplitPlane.Y, SplitDirection.Positive);
        output = Cuboid.splitCuboids(output, intersection.rangeZ.start, SplitPlane.Z, SplitDirection.Negative);
        output = Cuboid.splitCuboids(output, intersection.rangeZ.end, SplitPlane.Z, SplitDirection.Positive);
        const index = output.findIndex((localOutput: Cuboid) => {
            return localOutput.isMatch(intersection);
        });
        if (index !== -1) {
            output.splice(index, 1);
        }
        return output;
    }

    clone(): Cuboid {
        return new Cuboid(this.rangeX, this.rangeY, this.rangeZ);
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

enum SplitDirection {
    Positive,
    Negative
}

enum SplitPlane {
    X,
    Y,
    Z
}

function splitRange(range: Range, at: number, direction: SplitDirection): Range[] {
    switch (direction) {
        case SplitDirection.Positive:
            {
                if (at < range.start) {
                    return [range];
                } else if (range.end <= at) {
                    return [range];
                } else {
                    return [new Range(range.start, at), new Range(at + 1, range.end)];
                }
            }
            break;
        case SplitDirection.Negative:
            {
                if (at <= range.start) {
                    return [range];
                } else if (range.end < at) {
                    return [range];
                } else {
                    return [new Range(range.start, at - 1), new Range(at, range.end)];
                }
            }
            break;
        default:
            throw new Error("direction unknown");
    }
}
