/* eslint-disable no-console */
// AoC Day 17 Challenge

import { Range } from "./range";

export { daySeventeenPartOne, daySeventeenPartTwo };

// Test values
const line = "target area: x=20..30, y=-10..-5";

// Real values
// const line : string = "target area: x=94..151, y=-156..-103";

function updateVelocityX(velocity: number): number {
    if (velocity > 0) {
        velocity--;
    } else if (velocity < 0) {
        velocity++;
    }
    return velocity;
}

function updateVelocityY(velocity: number): number {
    velocity--;
    return velocity;
}

function findTimeRangeX(startX: number, rangeX: Range, maxTime: number): PossibleVelocity[] {
    for (let vX = -1000; vX < 1000; vX++) {
        const aX = -Math.sign(vX);
        console.log(vX);
        const result1 = quadraticEquation(0.5 * aX, vX, startX - rangeX.start);
        console.log(`${result1.isReal} ${result1.root1} ${result1.root2}`);

        const result2 = quadraticEquation(0.5 * aX, vX, startX - rangeX.end);
        console.log(`${result1.isReal} ${result2.root1} ${result2.root2}`);

        const zeroVelocityTime = -vX / aX;
        console.log(zeroVelocityTime);
    }

    /*
    let time = 0;
    console.log(`${time} x: ${x} vX: ${velocityX}`);
    while (time < maxTime) {
        x += velocityX;
        velocityX = updateVelocityX(velocityX);
        time++;
        console.log(`${time} x: ${x} vX: ${velocityX}`);
        if (velocityX === 0 && !rangeX.contains(x)) {
            break;
        }
    }
    */
    return [];
}

function findTimeRangeY(startY: number, rangeY: Range, maxTime: number): PossibleVelocity[] {
    const possibleVelocities: PossibleVelocity[] = [];
    const aY = -1;
    for (let vY = -1000; vY < 1000; vY++) {
        console.log(vY);
        const result1 = quadraticEquation(0.5 * aY, vY, startY - rangeY.start);
        const result2 = quadraticEquation(0.5 * aY, vY, startY - rangeY.end);
        if (result1.isReal && result2.isReal) {
            console.log(`${result1.isReal} ${result1.root1} ${result1.root2}`);
            console.log(`${result2.isReal} ${result2.root1} ${result2.root2}`);
            let isFailure = true;
            let startTime = 0;
            if (result1.root1 > 0 && result1.root2 > 0) {
                throw new Error("two positive roots");
            } else if (result1.root1 > 0) {
                startTime = Math.ceil(result1.root1);
            } else if (result1.root2 > 0) {
                startTime = Math.ceil(result1.root2);
                isFailure = false;
            }
            let endTime = -1;
            if (result2.root1 > 0 && result2.root2 > 0) {
                throw new Error("two positive roots");
            } else if (result2.root1 > 0) {
                endTime = Math.floor(result2.root1);
                isFailure = false;
            } else if (result2.root2 > 0) {
                endTime = Math.floor(result2.root2);
                isFailure = false;
            }
            if (!isFailure) {
                const y1 = startY + vY * startTime + 0.5 * aY * (startTime * startTime);
                const y2 = startY + vY * endTime + 0.5 * aY * (endTime * endTime);
                if (rangeY.contains(y1) || rangeY.contains(y2)) {
                    possibleVelocities.push(new PossibleVelocity(vY, startTime, endTime));
                }
            }
        } else if (result1.isReal) {
            throw new Error("one real root");
        } else if (result2.isReal) {
            throw new Error("one real root");
        }
    }
    return possibleVelocities;
}

function findMaxHeight(startY: number, startVelocityY: number, rangeY: Range, maxTime: number): number {
    let time = 0;
    let y = startY;
    let velocityY = startVelocityY;
    const accelerationY = -1;
    let maxY = startY;
    while (time < maxTime) {
        y += velocityY;
        maxY = Math.max(y, maxY);
        velocityY += accelerationY;
        time++;
        console.log(`${time} ${y}`);
    }
    return maxY;
}

class QuadraticResult {
    constructor(readonly isReal: boolean, readonly root1: number, readonly root2: number) {}
}

class PossibleVelocity {
    constructor(velocity: number, realTime1: number, realTime2: number) {
        this.velocity = velocity;
        this.timeRange = new Range(realTime1, realTime2);
    }
    readonly velocity: number;
    readonly timeRange: Range;
}

function quadraticEquation(a: number, b: number, c: number): QuadraticResult {
    const discriminant = b * b - 4 * a * c;
    return discriminant < 0
        ? new QuadraticResult(false, -1, -1)
        : new QuadraticResult(true, (-b + Math.sqrt(discriminant)) / (2 * a), (-b - Math.sqrt(discriminant)) / (2 * a));
}

function daySeventeenPartOne(): void {
    const tokens = line.replace("target area: x=", "").replace(" y=", "").split(",");

    const tokensX = tokens[0].split("..");
    const rangeX = new Range(parseInt(tokensX[0]), parseInt(tokensX[1]));

    const tokensY = tokens[1].split("..");
    const rangeY = new Range(parseInt(tokensY[0]), parseInt(tokensY[1]));

    const maxTime = 10000;

    const possibleVelocities = findTimeRangeY(0, rangeY, maxTime);
    let maxY = 0;
    for (const possibleVelocity of possibleVelocities) {
        maxY = Math.max(
            maxY,
            findMaxHeight(
                0,
                possibleVelocity.velocity,
                rangeY,
                Math.max(possibleVelocity.timeRange.start, possibleVelocity.timeRange.end)
            )
        );
    }

    console.log(maxY);
}

function daySeventeenPartTwo(): void {
    // todo
}
