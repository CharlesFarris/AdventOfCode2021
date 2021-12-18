/* eslint-disable no-console */
// AoC Day 11 Challenge

// eslint-disable-next-line import/no-unassigned-import
import "./extensions";

import { Map2d, mapFromLines } from "./map2d";
import { Point } from "./point";

/*
// Test values
const initialValues: string[] = [
    "5483143223",
    "2745854711",
    "5264556173",
    "6141336146",
    "6357385478",
    "4167524645",
    "2176841721",
    "6882881134",
    "4846848554",
    "5283751526"
];
*/

// Real values
const initialValues: string[] = [
    "1443668646",
    "7686735716",
    "4261576231",
    "3361258654",
    "4852532611",
    "5587113732",
    "1224426757",
    "5155565133",
    "6488377862",
    "8267833811"
];

export { dayElevenPartOne, dayElevenPartTwo };

function getFlashIndex(map: Map2d, flashed: number[]): number {
    return map.values.findIndex((value: number, index: number) => {
        return value > 9 && flashed.indexOf(index) === -1;
    });
}

function dayElevenPartOne(): void {
    const energyLevelMap: Map2d = mapFromLines(initialValues);
    energyLevelMap.toLog();
    let flashCount = 0;
    for (let step = 0; step < 100; step++) {
        console.log(`Step: ${step}`);
        for (let i = 0; i < energyLevelMap.values.length; i++) {
            energyLevelMap.values[i] = Math.min(10, energyLevelMap.values[i] + 1);
        }
        const flashed: number[] = [];
        let flashIndex: number = getFlashIndex(energyLevelMap, flashed);
        while (flashIndex !== -1) {
            flashed.push(flashIndex);
            const flashPoint = energyLevelMap.pointFromMapIndex(flashIndex);
            if (flashPoint === undefined) {
                throw new Error("flashPoint undefined");
            }
            const adjacentIndices = flashPoint.getAdjacentPoints(true).reduce((indices: number[], point: Point) => {
                const index = energyLevelMap.getIndexAtPoint(point);
                if (index !== undefined) {
                    indices.push(index);
                }
                return indices;
            }, []);
            for (const index of adjacentIndices) {
                energyLevelMap.values[index] = Math.min(10, energyLevelMap.values[index] + 1);
            }
            flashIndex = getFlashIndex(energyLevelMap, flashed);
        }
        for (let i = 0; i < energyLevelMap.values.length; i++) {
            if (energyLevelMap.values[i] > 9) {
                energyLevelMap.values[i] = 0;
                flashCount++;
            }
        }
        // energyLevelMap.toLog();
    }
    console.log(`Flash Count: ${flashCount}`);
}

function dayElevenPartTwo(): void {
    const energyLevelMap: Map2d = mapFromLines(initialValues);
    energyLevelMap.toLog();
    let step = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        step++;
        console.log(`Step: ${step}`);
        for (let i = 0; i < energyLevelMap.values.length; i++) {
            energyLevelMap.values[i] = Math.min(10, energyLevelMap.values[i] + 1);
        }
        const flashed: number[] = [];
        let flashIndex: number = getFlashIndex(energyLevelMap, flashed);
        while (flashIndex !== -1) {
            flashed.push(flashIndex);
            const flashPoint = energyLevelMap.pointFromMapIndex(flashIndex);
            if (flashPoint === undefined) {
                throw new Error("flashPoint undefined");
            }
            const adjacentIndices = flashPoint.getAdjacentPoints(true).reduce((indices: number[], point: Point) => {
                const index = energyLevelMap.getIndexAtPoint(point);
                if (index !== undefined) {
                    indices.push(index);
                }
                return indices;
            }, []);
            for (const index of adjacentIndices) {
                energyLevelMap.values[index] = Math.min(10, energyLevelMap.values[index] + 1);
            }
            flashIndex = getFlashIndex(energyLevelMap, flashed);
        }
        for (let i = 0; i < energyLevelMap.values.length; i++) {
            if (energyLevelMap.values[i] > 9) {
                energyLevelMap.values[i] = 0;
            }
        }
        // energyLevelMap.toLog();
        if (flashed.length === energyLevelMap.values.length) {
            energyLevelMap.toLog();
            break;
        }
    }
}
