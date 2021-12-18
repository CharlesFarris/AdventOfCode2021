/* eslint-disable no-console */
// AoC Day 17 Challenge

import { Range } from "./range";

export { daySeventeenPartOne, daySeventeenPartTwo };

// Test values
// const line = "target area: x=20..30, y=-10..-5";

// Real values
const line = "target area: x=94..151, y=-156..-103";

class SimulationResultOne {
    constructor(
        readonly isSuccess: boolean,
        readonly velocity: number,
        readonly time: number,
        readonly maxPosition: number
    ) {}
}

class SimulationResultTwo {
    constructor(readonly isSuccess: boolean, readonly velocity: number, readonly times: number[]) {}
}

function runSimulationOne(
    startPosition: number,
    startVelocity: number,
    acceleration: number,
    targetRange: Range,
    updateVelocity: (time: number, velocity: number, acceleration: number) => number,
    stopCondition: (time: number, position: number, velocity: number, range: Range) => boolean
): SimulationResultOne {
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
        return new SimulationResultOne(true, startVelocity, time, maxPosition);
    }
    return new SimulationResultOne(false, Infinity, Infinity, -Infinity);
}

function runSimulationTwo(
    startPosition: number,
    startVelocity: number,
    acceleration: number,
    targetRange: Range,
    updateVelocity: (time: number, velocity: number, acceleration: number) => number,
    stopCondition: (time: number, position: number, velocity: number, range: Range) => boolean
): SimulationResultTwo {
    let position = startPosition;
    let velocity = startVelocity;
    let time = 0;
    const validTimes: number[] = [];
    while (!stopCondition(time, position, velocity, targetRange)) {
        position += velocity;
        velocity = updateVelocity(time, velocity, acceleration);
        time++;
        if (targetRange.contains(position)) {
            validTimes.push(time);
        }
    }
    return new SimulationResultTwo(validTimes.length > 0, startVelocity, validTimes);
}

function daySeventeenPartOne(): void {
    const tokens = line.replace("target area: x=", "").replace(" y=", "").split(",");

    const tokensX = tokens[0].split("..");
    const rangeX = new Range(parseInt(tokensX[0]), parseInt(tokensX[1]));

    const tokensY = tokens[1].split("..");
    const rangeY = new Range(parseInt(tokensY[0]), parseInt(tokensY[1]));

    const resultsY: SimulationResultOne[] = [];
    for (let velocityY = -100; velocityY < 1000; velocityY++) {
        const accelerationY = -1;
        const startY = 0;
        const result = runSimulationOne(
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
        const resultsX: SimulationResultOne[] = [];
        for (let velocityX = -10; velocityX < 1000; velocityX++) {
            const accelerationX = -Math.sign(velocityX);
            const startX = 0;
            const result = runSimulationOne(
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
    const tokens = line.replace("target area: x=", "").replace(" y=", "").split(",");

    const tokensX = tokens[0].split("..");
    const rangeX = new Range(parseInt(tokensX[0]), parseInt(tokensX[1]));

    const tokensY = tokens[1].split("..");
    const rangeY = new Range(parseInt(tokensY[0]), parseInt(tokensY[1]));

    const resultsY: SimulationResultTwo[] = [];
    for (let velocityY = -1000; velocityY < 1000; velocityY++) {
        const accelerationY = -1;
        const startY = 0;
        const result = runSimulationTwo(
            startY,
            velocityY,
            accelerationY,
            rangeY,
            (time, velocity, acceleration) => {
                return velocity + acceleration;
            },
            (time, position, velocity, range) => {
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
    const maxTime = resultsY.reduce((localMaxTime: number, localResult: SimulationResultTwo) => {
        return Math.max(
            localMaxTime,
            localResult.times.reduce((localTime: number, time: number) => {
                return Math.max(localTime, time);
            }, -Infinity)
        );
    }, -Infinity);
    const resultsX: SimulationResultTwo[] = [];
    for (const resultY of resultsY) {
        for (let velocityX = -1000; velocityX < 1000; velocityX++) {
            const accelerationX = -Math.sign(velocityX);
            const startX = 0;
            const result = runSimulationTwo(
                startX,
                velocityX,
                accelerationX,
                rangeX,
                (time, velocity, acceleration) => {
                    return velocity === 0 ? velocity : velocity + acceleration;
                },
                (time, position, velocity, range) => {
                    if (time >= maxTime) {
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
            }
        }
    }
    const velocitiesX: number[][] = [];
    for (let i = 0; i <= maxTime; ++i) {
        const array: number[] = [];
        velocitiesX.push(array);
    }
    for (const result of resultsX) {
        for (const time of result.times) {
            if (velocitiesX[time].indexOf(result.velocity) === -1) {
                velocitiesX[time].push(result.velocity);
            }
        }
    }
    const velocitiesY: number[][] = [];
    for (let i = 0; i <= maxTime; ++i) {
        const array: number[] = [];
        velocitiesY.push(array);
    }
    for (const result of resultsY) {
        for (const time of result.times) {
            if (velocitiesY[time].indexOf(result.velocity) === -1) {
                velocitiesY[time].push(result.velocity);
            }
        }
    }

    const pairs: string[] = [];
    for (let time = 0; time <= maxTime; time++) {
        for (const vx of velocitiesX[time]) {
            for (const vy of velocitiesY[time]) {
                const pair = `${vx},${vy}`;
                if (pairs.indexOf(pair) === -1) {
                    pairs.push(pair);
                }
            }
        }
    }
    console.log(pairs.length);
}
