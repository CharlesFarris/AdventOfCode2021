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
    S13,
    S14,
    S21,
    S22,
    S23,
    S24,
    S31,
    S32,
    S33,
    S34,
    S41,
    S42,
    S43,
    S44
}

function buildPath(start: number, end: number, paths: string[]): void {
    let basePath = "";
    if (end > start) {
        for (let i = start; i <= end; i++) {
            basePath = `${basePath}h${i.toString()} `;
        }
    } else {
        for (let i = start; i >= end; i--) {
            basePath = `${basePath}h${i.toString()} `;
        }
    }
    let prefix = "";
    switch (end) {
        case 3:
            prefix = "s1";
            break;
        case 5:
            prefix = "s2";
            break;
        case 7:
            prefix = "s3";
            break;
        case 9:
            prefix = "s4";
            break;
    }
    let lastPath = basePath;
    for (let i = 1; i <= 4; i++) {
        if (i > 1) {
            lastPath = `${lastPath} `;
        }
        lastPath = lastPath + prefix + i.toString();
        paths.push(lastPath);
    }
}

function buildPaths(): string[] {
    const paths: string[] = [];
    const starts: number[] = [1, 2, 4, 6, 8, 10, 11];
    const ends: number[] = [3, 5, 7, 9];
    for (const start of starts) {
        for (const end of ends) {
            buildPath(start, end, paths);
        }
    }
    return paths;
}

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
        case BoardLocation.S13:
        case BoardLocation.S14:
        case BoardLocation.S21:
        case BoardLocation.S22:
        case BoardLocation.S23:
        case BoardLocation.S24:
        case BoardLocation.S31:
        case BoardLocation.S32:
        case BoardLocation.S33:
        case BoardLocation.S34:
        case BoardLocation.S41:
        case BoardLocation.S42:
        case BoardLocation.S43:
        case BoardLocation.S44:
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
                switch (destination) {
                    case BoardLocation.S11:
                        return getRoomState(amphipod.type, amphipods) === ".AAA";
                    case BoardLocation.S12:
                        return getRoomState(amphipod.type, amphipods) === "..AA";
                    case BoardLocation.S13:
                        return getRoomState(amphipod.type, amphipods) === "...A";
                    case BoardLocation.S14:
                        return true;
                }
                return false;
            case "B":
                switch (destination) {
                    case BoardLocation.S21:
                        return getRoomState(amphipod.type, amphipods) === ".BBB";
                    case BoardLocation.S22:
                        return getRoomState(amphipod.type, amphipods) === "..BB";
                    case BoardLocation.S23:
                        return getRoomState(amphipod.type, amphipods) === "...B";
                    case BoardLocation.S24:
                        return true;
                }
                return false;
            case "C":
                switch (destination) {
                    case BoardLocation.S31:
                        return getRoomState(amphipod.type, amphipods) === ".CCC";
                    case BoardLocation.S32:
                        return getRoomState(amphipod.type, amphipods) === "..CC";
                    case BoardLocation.S33:
                        return getRoomState(amphipod.type, amphipods) === "...C";
                    case BoardLocation.S34:
                        return true;
                }
                return false;
            case "D":
                switch (destination) {
                    case BoardLocation.S41:
                        return getRoomState(amphipod.type, amphipods) === ".DDD";
                    case BoardLocation.S42:
                        return getRoomState(amphipod.type, amphipods) === "..DD";
                    case BoardLocation.S43:
                        return getRoomState(amphipod.type, amphipods) === "...D";
                    case BoardLocation.S44:
                        return true;
                }
                return false;
        }
    }
    return false;
}

function atDestination(amphipod: Amphipod, amphipods: Amphipod[]): boolean {
    const roomState = getRoomState(amphipod.type, amphipods);
    switch (amphipod.type) {
        case "A":
            switch (amphipod.location) {
                case BoardLocation.S11:
                    return roomState === ".AAA";
                case BoardLocation.S12:
                    return roomState === "..AA";
                case BoardLocation.S13:
                    return roomState === "...A";
                case BoardLocation.S14:
                    return true;
            }
            break;
        case "B":
            switch (amphipod.location) {
                case BoardLocation.S21:
                    return roomState === ".BBB";
                case BoardLocation.S22:
                    return roomState === "..BB";
                case BoardLocation.S23:
                    return roomState === "...B";
                case BoardLocation.S24:
                    return true;
            }
            break;
        case "C":
            switch (amphipod.location) {
                case BoardLocation.S31:
                    return roomState === ".CCC";
                case BoardLocation.S32:
                    return roomState === "..CC";
                case BoardLocation.S33:
                    return roomState === "...C";
                case BoardLocation.S34:
                    return true;
            }
            break;
        case "D":
            switch (amphipod.location) {
                case BoardLocation.S41:
                    return roomState === ".DDD";
                case BoardLocation.S42:
                    return roomState === "..DD";
                case BoardLocation.S43:
                    return roomState === "...D";
                case BoardLocation.S44:
                    return true;
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
    return (
        getRoomState("A", state.amphipods) === "AAAA" &&
        getRoomState("B", state.amphipods) === "BBBB" &&
        getRoomState("C", state.amphipods) === "CCCC" &&
        getRoomState("D", state.amphipods) === "DDDD"
    );
}

function getRoomState(type: string, amphipods: Amphipod[]): string {
    switch (type) {
        case "A":
            return (
                getTypeAt(amphipods, BoardLocation.S11) +
                getTypeAt(amphipods, BoardLocation.S12) +
                getTypeAt(amphipods, BoardLocation.S13) +
                getTypeAt(amphipods, BoardLocation.S14)
            );
        case "B":
            return (
                getTypeAt(amphipods, BoardLocation.S21) +
                getTypeAt(amphipods, BoardLocation.S22) +
                getTypeAt(amphipods, BoardLocation.S23) +
                getTypeAt(amphipods, BoardLocation.S24)
            );
        case "C":
            return (
                getTypeAt(amphipods, BoardLocation.S31) +
                getTypeAt(amphipods, BoardLocation.S32) +
                getTypeAt(amphipods, BoardLocation.S33) +
                getTypeAt(amphipods, BoardLocation.S34)
            );
        case "D":
            return (
                getTypeAt(amphipods, BoardLocation.S41) +
                getTypeAt(amphipods, BoardLocation.S42) +
                getTypeAt(amphipods, BoardLocation.S43) +
                getTypeAt(amphipods, BoardLocation.S44)
            );
    }
    return "";
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
    line = `  #${getTypeAt(amphipods, BoardLocation.S13)}#${getTypeAt(amphipods, BoardLocation.S23)}#${getTypeAt(
        amphipods,
        BoardLocation.S33
    )}#${getTypeAt(amphipods, BoardLocation.S43)}#`;
    console.log(line);
    line = `  #${getTypeAt(amphipods, BoardLocation.S14)}#${getTypeAt(amphipods, BoardLocation.S24)}#${getTypeAt(
        amphipods,
        BoardLocation.S34
    )}#${getTypeAt(amphipods, BoardLocation.S44)}#`;
    console.log(line);
    line = "  #########";
    console.log(line);
}

function dayTwentyThreePartOne(): void {
    // todo
}

function dayTwentyThreePartTwo(): void {
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
    locationMap.set("s13", BoardLocation.S13);
    locationMap.set("s14", BoardLocation.S14);

    locationMap.set("s21", BoardLocation.S21);
    locationMap.set("s22", BoardLocation.S22);
    locationMap.set("s23", BoardLocation.S23);
    locationMap.set("s24", BoardLocation.S24);

    locationMap.set("s31", BoardLocation.S31);
    locationMap.set("s32", BoardLocation.S32);
    locationMap.set("s33", BoardLocation.S33);
    locationMap.set("s34", BoardLocation.S34);

    locationMap.set("s41", BoardLocation.S41);
    locationMap.set("s42", BoardLocation.S42);
    locationMap.set("s43", BoardLocation.S43);
    locationMap.set("s44", BoardLocation.S44);

    const paths: BoardLocation[][] = buildPaths().map((value: string) => {
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
            new Amphipod("D", BoardLocation.S12),
            new Amphipod("D", BoardLocation.S13),
            new Amphipod("C", BoardLocation.S14),

            new Amphipod("D", BoardLocation.S21),
            new Amphipod("C", BoardLocation.S22),
            new Amphipod("B", BoardLocation.S23),
            new Amphipod("D", BoardLocation.S24),

            new Amphipod("C", BoardLocation.S31),
            new Amphipod("B", BoardLocation.S32),
            new Amphipod("A", BoardLocation.S33),
            new Amphipod("B", BoardLocation.S34),

            new Amphipod("A", BoardLocation.S41),
            new Amphipod("A", BoardLocation.S42),
            new Amphipod("C", BoardLocation.S43),
            new Amphipod("B", BoardLocation.S44)
        ],
        0,
        ""
    );
    toLog(initialGameState.amphipods);

    let minimumEnergy = Infinity;
    let hasWinningState = false;
    let stack: GameState[] = [initialGameState];
    let iteration = 0;
    while (stack.length > 0) {
        iteration++;
        if (iteration === 50000) {
            iteration = 0;
            console.log(stack.length);
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
                continue;
            }
            const availablePaths = findPathsByStart(amphipod.location, paths);
            for (const availablePath of availablePaths) {
                const destination = availablePath[availablePath.length - 1];
                if (isPathBlocked(availablePath, current.amphipods)) {
                    continue;
                }
                if (!isPathValid(availablePath, amphipod, current.amphipods)) {
                    continue;
                }
                const newCost = current.cost + getMoveCost(amphipod.type) * (availablePath.length - 1);
                if (hasWinningState && newCost > minimumEnergy) {
                    continue;
                }
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
                    if (newState.cost < minimumEnergy) {
                        minimumEnergy = newState.cost;
                        console.log(minimumEnergy);
                        hasWinningState = true;
                        stack = stack.filter((state: GameState) => {
                            return state.cost < minimumEnergy;
                        });
                    }
                } else {
                    stack.push(newState);
                }
            }
        }
    }
    console.log(minimumEnergy);
}
