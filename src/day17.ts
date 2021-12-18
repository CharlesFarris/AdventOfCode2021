/* eslint-disable no-console */
// AoC Day 17 Challenge

import { Range } from "./range";

export { daySeventeenPartOne, daySeventeenPartTwo };

// Test values
// const line = "target area: x=20..30, y=-10..-5";

// Real values
const line  = "target area: x=94..151, y=-156..-103";

class SimulationResult {
    constructor(
        readonly isSuccess: boolean,
        readonly velocity: number,
        readonly time: number,
        readonly maxPosition: number
    ) {}
}

function runSimulation(
    startPosition: number,
    startVelocity: number,
    acceleration: number,
    targetRange: Range,
    updateVelocity: (time: number, velocity: number, acceleration: number) => number,
    stopCondition: (time: number, position: number, velocity: number, range: Range) => boolean
): SimulationResult {
    let position = startPosition;
    let maxPosition = startPosition;
    let velocity = startVelocity;
    let time = 0;
    while (!stopCondition(time, position, velocity, targetRange)) {
        position += velocity;
        maxPosition = Math.max(maxPosition, position);
        velocity = updateVelocity(time, velocity, acceleration);
        time++;
    }
    if (targetRange.contains(position)) {
        return new SimulationResult(true, startVelocity, time, maxPosition);
    }
    return new SimulationResult(false, Infinity, Infinity, -Infinity);
}

function daySeventeenPartOne(): void {
    const tokens = line.replace("target area: x=", "").replace(" y=", "").split(",");

    const tokensX = tokens[0].split("..");
    const rangeX = new Range(parseInt(tokensX[0]), parseInt(tokensX[1]));

    const tokensY = tokens[1].split("..");
    const rangeY = new Range(parseInt(tokensY[0]), parseInt(tokensY[1]));

    const resultsY: SimulationResult[] = [];
    for (let velocityY = -100; velocityY < 1000; velocityY++) {
        const accelerationY = -1;
        const startY = 0;
        const result = runSimulation(
            startY,
            velocityY,
            accelerationY,
            rangeY,
            (time, velocity, acceleration) => {
                return velocity + acceleration;
            },
            (time, position, velocity, range) => {
                if (range.contains(position)) {
                    return true;
                }
                if (time > 5000) {
                    return true;
                }
                if (velocityY < 0 && position < range.start) {
                    return true;
                }
                return false;
            }
        );
        if (result.isSuccess) {
            resultsY.push(result);
        }
    }
    resultsY.sort((a, b) => {
        return b.maxPosition - a.maxPosition;
    });
    for (const resultY of resultsY) {
        const resultsX: SimulationResult[] = [];
        for (let velocityX = -10; velocityX < 1000; velocityX++) {
            const accelerationX = -Math.sign(velocityX);
            const startX = 0;
            const result = runSimulation(
                startX,
                velocityX,
                accelerationX,
                rangeX,
                (time, velocity, acceleration) => {
                    return velocity === 0 ? velocity : velocity + acceleration;
                },
                (time, position, velocity, range) => {
                    if (time >= resultY.time) {
                        return true;
                    }
                    if (velocity === 0 && !range.contains(position)) {
                        return true;
                    }
                    return false;
                }
            );
            if (result.isSuccess) {
                resultsX.push(result);
                break;
            }
        }
        if (resultsX.length > 0) {
            console.log(`Max Height: ${resultY.maxPosition}`);
            break;
        }
    }
}

function daySeventeenPartTwo(): void {
    // todo
}
