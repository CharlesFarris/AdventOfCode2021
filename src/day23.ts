/* eslint-disable no-console */
// AoC Day 23 Challenge

export { dayTwentyThreePartOne, dayTwentyThreePartTwo };

enum BoardLocation {
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    H7,
    H8,
    H9,
    H10,
    H11,
    S11,
    S12,
    S21,
    S22,
    S31,
    S32,
    S41,
    S42
}

const pathStrings: string[] = [
    "h1 h2 h3 s11",
    "h1 h2 h3 s11 s12",
    "h1 h2 h3 h4 h5 s21",
    "h1 h2 h3 h4 h5 s21 s22",
    "h1 h2 h3 h4 h5 h6 h7 s31",
    "h1 h2 h3 h4 h5 h6 h7 s31 s32",
    "h1 h2 h3 h4 h5 h6 h7 h8 h9 s41",
    "h1 h2 h3 h4 h5 h6 h7 h8 h9 s41 s42",

    "h2 h3 s11",
    "h2 h3 s11 s12",
    "h2 h3 h4 h5 s21",
    "h2 h3 h4 h5 s21 s22",
    "h2 h3 h4 h5 h6 h7 s31",
    "h2 h3 h4 h5 h6 h7 s31 s32",
    "h2 h3 h4 h5 h6 h7 h8 h9 s41",
    "h2 h3 h4 h5 h6 h7 h8 h9 s41 s42",

    "h4 h3 s11",
    "h4 h3 s11 s12",
    "h4 h5 s21",
    "h4 h5 s21 s22",
    "h4 h5 h6 h7 s31",
    "h4 h5 h6 h7 s31 s32",
    "h4 h5 h6 h7 h8 h9 s41",
    "h4 h5 h6 h7 h8 h9 s41 s42",

    "h6 h5 h4 h3 s11",
    "h6 h5 h4 h3 s11 s12",
    "h6 h5 s21",
    "h6 h5 s21 s22",
    "h6 h7 s31",
    "h6 h7 s31 s32",
    "h6 h7 h8 h9 s41",
    "h6 h7 h8 h9 s41 s42",

    "h8 h7 h6 h5 h4 h3 s11",
    "h8 h7 h6 h5 h4 h3 s11 s12",
    "h8 h7 h6 h5 s21",
    "h8 h7 h6 h5 s21 s22",
    "h8 h7 s31",
    "h8 h7 s31 s32",

    "h10 h9 h8 h7 h6 h5 h4 h3 s11",
    "h10 h9 h8 h7 h6 h5 h4 h3 s11 s12",
    "h10 h9 h8 h7 h6 h5 s21",
    "h10 h9 h8 h7 h6 h5 s21 s22",
    "h10 h9 h8 h7 s31",
    "h10 h9 h8 h7 s31 s32",
    "h10 h9 s41",
    "h10 h9 s41 s42",

    "h11 h10 h9 h8 h7 h6 h5 h4 h3 s11",
    "h11 h10 h9 h8 h7 h6 h5 h4 h3 s11 s12",
    "h11 h10 h9 h8 h7 h6 h5 s21",
    "h11 h10 h9 h8 h7 h6 h5 s21 s22",
    "h11 h10 h9 h8 h7 s31",
    "h11 h10 h9 h8 h7 s31 s32",
    "h11 h10 h9 s41",
    "h11 h10 h9 s41 s42"
];

class Amphipod {
    constructor(readonly type: string, readonly location: BoardLocation) {}
}

class GameState {
    constructor(readonly amphipods: Amphipod[], readonly cost: number, readonly moves: string) {}
}

function isAtStart(location: BoardLocation): boolean {
    switch (location) {
        case BoardLocation.S11:
        case BoardLocation.S12:
        case BoardLocation.S21:
        case BoardLocation.S22:
        case BoardLocation.S31:
        case BoardLocation.S32:
        case BoardLocation.S41:
        case BoardLocation.S42:
            return true;
        default:
            return false;
    }
}

function isInHallway(location: BoardLocation): boolean {
    return !isAtStart(location);
}

function findPathsByStart(start: BoardLocation, paths: BoardLocation[][]): BoardLocation[][] {
    const found: BoardLocation[][] = [];
    for (const path of paths) {
        if (path[0] === start) {
            found.push(path);
        } else if (path[path.length - 1] === start) {
            found.push(path.slice().reverse());
        }
    }
    return found;
}

function isPathBlocked(path: BoardLocation[], amphipods: Amphipod[]): boolean {
    for (let i = 1; i < path.length; i++) {
        if (
            amphipods.find((amphipod: Amphipod) => {
                return amphipod.location === path[i];
            }) !== undefined
        ) {
            return true;
        }
    }
    return false;
}

function getAmphipodAt(amphipods: Amphipod[], location: BoardLocation): Amphipod | undefined {
    return amphipods.find((amphipod: Amphipod) => {
        return amphipod.location === location;
    });
}

function getTypeAt(amphipods: Amphipod[], location: BoardLocation): string {
    return getAmphipodAt(amphipods, location)?.type ?? ".";
}

function isPathValid(path: BoardLocation[], amphipod: Amphipod, amphipods: Amphipod[]): boolean {
    const destination = path[path.length - 1];
    if (isInHallway(destination)) {
        return true;
    }
    if (isAtStart(destination)) {
        switch (amphipod.type) {
            case "A":
                if (destination === BoardLocation.S12) {
                    return true;
                }
                if (destination === BoardLocation.S11) {
                    return getTypeAt(amphipods, BoardLocation.S12) === "A";
                }
                return false;
            case "B":
                if (destination === BoardLocation.S22) {
                    return true;
                }
                if (destination === BoardLocation.S21) {
                    return getTypeAt(amphipods, BoardLocation.S22) === "B";
                }
                return false;
            case "C":
                if (destination === BoardLocation.S32) {
                    return true;
                }
                if (destination === BoardLocation.S31) {
                    return getTypeAt(amphipods, BoardLocation.S32) === "C";
                }
                return false;
            case "D":
                if (destination === BoardLocation.S42) {
                    return true;
                }
                if (destination === BoardLocation.S41) {
                    return getTypeAt(amphipods, BoardLocation.S42) === "D";
                }
                return false;
        }
    }
    return false;
}

function atDestination(amphipod: Amphipod, amphipods: Amphipod[]): boolean {
    switch (amphipod.type) {
        case "A":
            if (amphipod.location === BoardLocation.S12) {
                return true;
            }
            if (amphipod.location === BoardLocation.S11) {
                return getTypeAt(amphipods, BoardLocation.S12) === "A";
            }
            break;
        case "B":
            if (amphipod.location === BoardLocation.S22) {
                return true;
            }
            if (amphipod.location === BoardLocation.S21) {
                return getTypeAt(amphipods, BoardLocation.S22) === "B";
            }
            break;
        case "C":
            if (amphipod.location === BoardLocation.S32) {
                return true;
            }
            if (amphipod.location === BoardLocation.S31) {
                return getTypeAt(amphipods, BoardLocation.S32) === "C";
            }
            break;
        case "D":
            if (amphipod.location === BoardLocation.S42) {
                return true;
            }
            if (amphipod.location === BoardLocation.S41) {
                return getTypeAt(amphipods, BoardLocation.S42) === "D";
            }
            break;
    }
    return false;
}

function getMoveCost(type: string): number {
    switch (type) {
        case "A":
            return 1;
        case "B":
            return 10;
        case "C":
            return 100;
        case "D":
            return 1000;
        default:
            return Infinity;
    }
}

function isWinningGameState(state: GameState): boolean {
    let isWinning = true;
    for (const amphipod of state.amphipods) {
        switch (amphipod.type) {
            case "A":
                isWinning =
                    isWinning && (amphipod.location === BoardLocation.S11 || amphipod.location === BoardLocation.S12);
                break;
            case "B":
                isWinning =
                    isWinning && (amphipod.location === BoardLocation.S21 || amphipod.location === BoardLocation.S22);
                break;
            case "C":
                isWinning =
                    isWinning && (amphipod.location === BoardLocation.S31 || amphipod.location === BoardLocation.S32);
                break;
            case "D":
                isWinning =
                    isWinning && (amphipod.location === BoardLocation.S41 || amphipod.location === BoardLocation.S42);
                break;
        }
    }
    return isWinning;
}

function toLog(amphipods: Amphipod[]): void {
    console.log("#############");
    let line = `#${getTypeAt(amphipods, BoardLocation.H1)}${getTypeAt(amphipods, BoardLocation.H2)}${getTypeAt(
        amphipods,
        BoardLocation.H3
    )}${getTypeAt(amphipods, BoardLocation.H4)}${getTypeAt(amphipods, BoardLocation.H5)}${getTypeAt(
        amphipods,
        BoardLocation.H6
    )}${getTypeAt(amphipods, BoardLocation.H7)}${getTypeAt(amphipods, BoardLocation.H8)}${getTypeAt(
        amphipods,
        BoardLocation.H9
    )}${getTypeAt(amphipods, BoardLocation.H10)}${getTypeAt(amphipods, BoardLocation.H11)}#`;
    console.log(line);
    line = `###${getTypeAt(amphipods, BoardLocation.S11)}#${getTypeAt(amphipods, BoardLocation.S21)}#${getTypeAt(
        amphipods,
        BoardLocation.S31
    )}#${getTypeAt(amphipods, BoardLocation.S41)}###`;
    console.log(line);
    line = `  #${getTypeAt(amphipods, BoardLocation.S12)}#${getTypeAt(amphipods, BoardLocation.S22)}#${getTypeAt(
        amphipods,
        BoardLocation.S32
    )}#${getTypeAt(amphipods, BoardLocation.S42)}#`;
    console.log(line);
    line = "  #########";
    console.log(line);
}

function dayTwentyThreePartOne(): void {
    const locationMap: Map<string, BoardLocation> = new Map<string, BoardLocation>();
    locationMap.set("h1", BoardLocation.H1);
    locationMap.set("h2", BoardLocation.H2);
    locationMap.set("h3", BoardLocation.H3);
    locationMap.set("h4", BoardLocation.H4);
    locationMap.set("h5", BoardLocation.H5);
    locationMap.set("h6", BoardLocation.H6);
    locationMap.set("h7", BoardLocation.H7);
    locationMap.set("h8", BoardLocation.H8);
    locationMap.set("h9", BoardLocation.H9);
    locationMap.set("h10", BoardLocation.H10);
    locationMap.set("h11", BoardLocation.H11);
    locationMap.set("s11", BoardLocation.S11);
    locationMap.set("s12", BoardLocation.S12);
    locationMap.set("s21", BoardLocation.S21);
    locationMap.set("s22", BoardLocation.S22);
    locationMap.set("s31", BoardLocation.S31);
    locationMap.set("s32", BoardLocation.S32);
    locationMap.set("s41", BoardLocation.S41);
    locationMap.set("s42", BoardLocation.S42);

    const paths: BoardLocation[][] = pathStrings.map((value: string) => {
        return value.split(" ").map((token: string) => {
            const location = locationMap.get(token);
            if (location === undefined) {
                throw new Error("location undefined");
            }
            return location;
        });
    });

    /*
    // Test values
    const initialGameState: GameState = new GameState(
        [
            new Amphipod("B", BoardLocation.S11),
            new Amphipod("A", BoardLocation.S12),
            new Amphipod("C", BoardLocation.S21),
            new Amphipod("D", BoardLocation.S22),
            new Amphipod("B", BoardLocation.S31),
            new Amphipod("C", BoardLocation.S32),
            new Amphipod("D", BoardLocation.S41),
            new Amphipod("A", BoardLocation.S42)
        ],
        0
    );
    */

    // Real Values
    const initialGameState: GameState = new GameState(
        [
            new Amphipod("A", BoardLocation.S11),
            new Amphipod("C", BoardLocation.S12),
            new Amphipod("D", BoardLocation.S21),
            new Amphipod("D", BoardLocation.S22),
            new Amphipod("C", BoardLocation.S31),
            new Amphipod("B", BoardLocation.S32),
            new Amphipod("A", BoardLocation.S41),
            new Amphipod("B", BoardLocation.S42)
        ],
        0,
        ""
    );
    toLog(initialGameState.amphipods);

    // const winningStates: GameState[] = [];
    let minimumEnergy = Infinity;
    let hasWinningState = false;
    let stack: GameState[] = [initialGameState];
    let iteration = 0;
    while (stack.length > 0) {
        iteration++;
        if (iteration === 50000) {
            iteration = 0;
            stack.sort((a, b) => {
                return a.cost - b.cost;
            });
            // toLog(stack[stack.length-1].amphipods);
            console.log(stack.length);
            const y = 0;
        }
        const current = stack.pop();
        if (current === undefined) {
            throw new Error("current undefined");
        }
        // toLog(current.amphipods);
        // console.log(current.cost);
        if (hasWinningState && minimumEnergy < current.cost) {
            continue;
        }
        for (const amphipod of current.amphipods) {
            if (atDestination(amphipod, current.amphipods)) {
                // console.log("destination");
                continue;
            }
            const availablePaths = findPathsByStart(amphipod.location, paths);
            for (const availablePath of availablePaths) {
                const destination = availablePath[availablePath.length - 1];
                // console.log(`${amphipod.type} ${amphipod.location}->${destination}`);
                if (isPathBlocked(availablePath, current.amphipods)) {
                    // console.log("blocked");
                    continue;
                }
                if (!isPathValid(availablePath, amphipod, current.amphipods)) {
                    // console.log("invalid");
                    continue;
                }
                const newCost = current.cost + getMoveCost(amphipod.type) * (availablePath.length - 1);
                if (hasWinningState && newCost > minimumEnergy) {
                    continue;
                }
                // console.log(newCost);
                const newAmphipods: Amphipod[] = current.amphipods.map((a: Amphipod) => {
                    if (a === amphipod) {
                        return new Amphipod(a.type, destination);
                    }
                    return a;
                });
                const newState = new GameState(
                    newAmphipods,
                    newCost,
                    `${current.moves}${amphipod.type + amphipod.location.toString()}-${destination},`
                );
                if (isWinningGameState(newState)) {
                    // winningStates.push(newState);
                    if (newState.cost < minimumEnergy) {
                        // toLog(newState.amphipods);
                        minimumEnergy = newState.cost;
                        console.log(minimumEnergy);
                        hasWinningState = true;
                        stack = stack.filter((state: GameState) => {
                            return state.cost < minimumEnergy;
                        });
                    }
                } else {
                    // toLog(newState.amphipods);
                    // console.log(newState.cost);
                    stack.push(newState);
                }
            }
        }
    }
    console.log(minimumEnergy);
}

function dayTwentyThreePartTwo(): void {
    // todo
}
