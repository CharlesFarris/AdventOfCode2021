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
    S44,
    Max
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

class GameState {
    constructor(readonly board: string[], readonly cost: number) {}
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

function createBoard(): string[] {
    return new Array(BoardLocation.Max).fill(".");
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

function isPathBlocked(path: BoardLocation[], board: string[]): boolean {
    for (let i = 1; i < path.length; i++) {
        if (board[path[i]] !== ".") {
            return true;
        }
    }
    return false;
}

function isPathValid(path: BoardLocation[], type: string, board: string[]): boolean {
    const destination = path[path.length - 1];
    if (isInHallway(destination)) {
        return true;
    }
    if (isAtStart(destination)) {
        switch (type) {
            case "A":
                switch (destination) {
                    case BoardLocation.S11:
                        return (
                            board[BoardLocation.S12] === type &&
                            board[BoardLocation.S13] === type &&
                            board[BoardLocation.S14] === type
                        );
                    case BoardLocation.S12:
                        return board[BoardLocation.S13] === type && board[BoardLocation.S14] === type;
                    case BoardLocation.S13:
                        return board[BoardLocation.S14] === type;
                    case BoardLocation.S14:
                        return true;
                }
                return false;
            case "B":
                switch (destination) {
                    case BoardLocation.S21:
                        return (
                            board[BoardLocation.S22] === type &&
                            board[BoardLocation.S23] === type &&
                            board[BoardLocation.S24] === type
                        );
                    case BoardLocation.S22:
                        return board[BoardLocation.S23] === type && board[BoardLocation.S24] === type;
                    case BoardLocation.S23:
                        return board[BoardLocation.S24] === type;
                    case BoardLocation.S24:
                        return true;
                }
                return false;
            case "C":
                switch (destination) {
                    case BoardLocation.S31:
                        return (
                            board[BoardLocation.S32] === type &&
                            board[BoardLocation.S33] === type &&
                            board[BoardLocation.S34] === type
                        );
                    case BoardLocation.S32:
                        return board[BoardLocation.S33] === type && board[BoardLocation.S34] === type;
                    case BoardLocation.S33:
                        return board[BoardLocation.S34] === type;
                    case BoardLocation.S34:
                        return true;
                }
                return false;
            case "D":
                switch (destination) {
                    case BoardLocation.S41:
                        return (
                            board[BoardLocation.S42] === type &&
                            board[BoardLocation.S43] === type &&
                            board[BoardLocation.S44] === type
                        );
                    case BoardLocation.S42:
                        return board[BoardLocation.S43] === type && board[BoardLocation.S44] === type;
                    case BoardLocation.S43:
                        return board[BoardLocation.S44] === type;
                    case BoardLocation.S44:
                        return true;
                }
                return false;
        }
    }
    return false;
}

function atDestination(type: string, location: BoardLocation, board: string[]): boolean {
    switch (type) {
        case "A":
            switch (location) {
                case BoardLocation.S11:
                    return (
                        board[BoardLocation.S12] === type &&
                        board[BoardLocation.S13] === type &&
                        board[BoardLocation.S14] === type
                    );
                case BoardLocation.S12:
                    return board[BoardLocation.S13] === type && board[BoardLocation.S14] === type;
                case BoardLocation.S13:
                    return board[BoardLocation.S14] === type;
                case BoardLocation.S14:
                    return true;
            }
            break;
        case "B":
            switch (location) {
                case BoardLocation.S21:
                    return (
                        board[BoardLocation.S22] === type &&
                        board[BoardLocation.S23] === type &&
                        board[BoardLocation.S24] === type
                    );
                case BoardLocation.S22:
                    return board[BoardLocation.S23] === type && board[BoardLocation.S24] === type;
                case BoardLocation.S23:
                    return board[BoardLocation.S24] === type;
                case BoardLocation.S24:
                    return true;
            }
            break;
        case "C":
            switch (location) {
                case BoardLocation.S31:
                    return (
                        board[BoardLocation.S32] === type &&
                        board[BoardLocation.S33] === type &&
                        board[BoardLocation.S34] === type
                    );
                case BoardLocation.S32:
                    return board[BoardLocation.S33] === type && board[BoardLocation.S34] === type;
                case BoardLocation.S33:
                    return board[BoardLocation.S34] === type;
                case BoardLocation.S34:
                    return true;
            }
            break;
        case "D":
            switch (location) {
                case BoardLocation.S41:
                    return (
                        board[BoardLocation.S42] === type &&
                        board[BoardLocation.S43] === type &&
                        board[BoardLocation.S44] === type
                    );
                case BoardLocation.S42:
                    return board[BoardLocation.S43] === type && board[BoardLocation.S44] === type;
                case BoardLocation.S43:
                    return board[BoardLocation.S44] === type;
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
        state.board[BoardLocation.S11] === "A" &&
        state.board[BoardLocation.S12] === "A" &&
        state.board[BoardLocation.S13] === "A" &&
        state.board[BoardLocation.S14] === "A" &&
        state.board[BoardLocation.S21] === "B" &&
        state.board[BoardLocation.S22] === "B" &&
        state.board[BoardLocation.S23] === "B" &&
        state.board[BoardLocation.S24] === "B" &&
        state.board[BoardLocation.S31] === "C" &&
        state.board[BoardLocation.S32] === "C" &&
        state.board[BoardLocation.S33] === "C" &&
        state.board[BoardLocation.S34] === "C" &&
        state.board[BoardLocation.S41] === "D" &&
        state.board[BoardLocation.S42] === "D" &&
        state.board[BoardLocation.S43] === "D" &&
        state.board[BoardLocation.S44] === "D"
    );
}

function toLog(state: GameState): void {
    console.log("#############");
    const board = state.board;
    let line = `#${board[BoardLocation.H1]}${board[BoardLocation.H2]}${board[BoardLocation.H3]}${
        board[BoardLocation.H4]
    }${board[BoardLocation.H5]}${board[BoardLocation.H6]}${board[BoardLocation.H7]}${board[BoardLocation.H8]}${
        board[BoardLocation.H9]
    }${board[BoardLocation.H10]}${board[BoardLocation.H11]}#`;
    console.log(line);
    line = `###${board[BoardLocation.S11]}#${board[BoardLocation.S21]}#${board[BoardLocation.S31]}#${
        board[BoardLocation.S41]
    }###`;
    console.log(line);
    line = `  #${board[BoardLocation.S12]}#${board[BoardLocation.S22]}#${board[BoardLocation.S32]}#${
        board[BoardLocation.S42]
    }#`;
    console.log(line);
    line = `  #${board[BoardLocation.S13]}#${board[BoardLocation.S23]}#${board[BoardLocation.S33]}#${
        board[BoardLocation.S43]
    }#`;
    console.log(line);
    line = `  #${board[BoardLocation.S14]}#${board[BoardLocation.S24]}#${board[BoardLocation.S34]}#${
        board[BoardLocation.S44]
    }#`;
    console.log(line);
    line = "  #########";
    console.log(line);
    console.log(state.cost);
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

    const locations: BoardLocation[] = [
        BoardLocation.H1,
        BoardLocation.H2,
        BoardLocation.H3,
        BoardLocation.H4,
        BoardLocation.H5,
        BoardLocation.H6,
        BoardLocation.H7,
        BoardLocation.H8,
        BoardLocation.H9,
        BoardLocation.H10,
        BoardLocation.H11,
        BoardLocation.S11,
        BoardLocation.S12,
        BoardLocation.S13,
        BoardLocation.S14,
        BoardLocation.S21,
        BoardLocation.S22,
        BoardLocation.S23,
        BoardLocation.S24,
        BoardLocation.S31,
        BoardLocation.S32,
        BoardLocation.S33,
        BoardLocation.S34,
        BoardLocation.S41,
        BoardLocation.S42,
        BoardLocation.S43,
        BoardLocation.S44
    ];

    // Real Values
    const initialBoard = createBoard();
    initialBoard[BoardLocation.S11] = "A";
    initialBoard[BoardLocation.S12] = "D";
    initialBoard[BoardLocation.S13] = "D";
    initialBoard[BoardLocation.S14] = "C";

    initialBoard[BoardLocation.S21] = "D";
    initialBoard[BoardLocation.S22] = "C";
    initialBoard[BoardLocation.S23] = "B";
    initialBoard[BoardLocation.S24] = "D";

    initialBoard[BoardLocation.S31] = "C";
    initialBoard[BoardLocation.S32] = "B";
    initialBoard[BoardLocation.S33] = "A";
    initialBoard[BoardLocation.S34] = "B";

    initialBoard[BoardLocation.S41] = "A";
    initialBoard[BoardLocation.S42] = "A";
    initialBoard[BoardLocation.S43] = "C";
    initialBoard[BoardLocation.S44] = "B";

    const initialGameState: GameState = new GameState(initialBoard, 0);
    toLog(initialGameState);

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
        // toLog(current);
        if (hasWinningState && minimumEnergy < current.cost) {
            continue;
        }
        for (const location of locations) {
            const type = current.board[location];
            if (type === ".") {
                continue;
            }
            if (atDestination(type, location, current.board)) {
                continue;
            }

            const availablePaths = findPathsByStart(location, paths);
            for (const availablePath of availablePaths) {
                const destination = availablePath[availablePath.length - 1];
                if (isPathBlocked(availablePath, current.board)) {
                    continue;
                }
                if (!isPathValid(availablePath, type, current.board)) {
                    continue;
                }
                const newCost = current.cost + getMoveCost(type) * (availablePath.length - 1);
                if (hasWinningState && newCost > minimumEnergy) {
                    continue;
                }
                const newBoard = current.board.slice();
                newBoard[location] = ".";
                newBoard[destination] = type;
                const newState = new GameState(newBoard, newCost);
                // toLog(newState);
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
