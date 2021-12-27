/* eslint-disable no-console */
// AoC Day 24 Challenge

export { dayTwentyFourPartOne, dayTwentyFourPartTwo };

/*
// Test values
const program1: string[] = ["inp x", "mul x -1"];
const queue1 : number[] = [2];
*/

// Real values
const monad: string[] = [
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 1",
    "add x 11",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 14",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 1",
    "add x 14",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 6",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 1",
    "add x 15",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 6",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 1",
    "add x 13",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 13",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 26",
    "add x -12",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 8",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 1",
    "add x 10",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 8",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 26",
    "add x -15",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 7",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 1",
    "add x 13",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 10",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 1",
    "add x 10",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 8",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 26",
    "add x -13",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 12",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 26",
    "add x -13",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 10",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 26",
    "add x -14",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 8",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 26",
    "add x -2",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 8",
    "mul y x",
    "add z y",
    "inp w",
    "mul x 0",
    "add x z",
    "mod x 26",
    "div z 26",
    "add x -9",
    "eql x w",
    "eql x 0",
    "mul y 0",
    "add y 25",
    "mul y x",
    "add y 1",
    "mul z y",
    "mul y 0",
    "add y w",
    "add y 7",
    "mul y x",
    "add z y"
];

class ArthimeticLogicUnit {
    constructor() {
        this.variables = new Array(4).fill(0);
    }

    private getInput(queue: number[]): number {
        const input = queue.shift();
        if (input === undefined) {
            throw new Error("input defined");
        }
        return input;
    }

    private getValue(indexFlag: number, indexOrValue: number): number {
        return indexFlag === 1 ? this.variables[indexOrValue] : indexOrValue;
    }

    execute(instructions: number[][], originalQueue: number[]): void {
        const queue = originalQueue.slice();
        this.reset();
        for (const instruction of instructions) {
            // console.log(instruction);
            const a: number = instruction[1];
            switch (instruction[0]) {
                case 0: // inp
                    this.variables[a] = this.getInput(queue);
                    break;
                case 1: // add
                    this.variables[a] = this.variables[a] + this.getValue(instruction[2], instruction[3]);
                    break;
                case 2: // mul
                    this.variables[a] = this.variables[a] * this.getValue(instruction[2], instruction[3]);
                    break;
                case 3: // div
                    this.variables[a] = Math.floor(this.variables[a] / this.getValue(instruction[2], instruction[3]));
                    break;
                case 4: // mod
                    this.variables[a] = this.variables[a] % this.getValue(instruction[2], instruction[3]);
                    break;
                case 5: // eql
                    this.variables[a] = this.variables[a] === this.getValue(instruction[2], instruction[3]) ? 1 : 0;
                    break;
                default:
                    throw new Error("instruction unknown");
            }
        }
    }

    toLog(): void {
        console.log(`x: ${this.variables[0]} y: ${this.variables[1]} z: ${this.variables[2]} w: ${this.variables[3]}`);
    }

    reset(): void {
        for (let i = 0; i < this.variables.length; i++) {
            this.variables[i] = 0;
        }
    }

    getVariables(): number[] {
        return this.variables.slice();
    }

    z(): number {
        return this.variables[2];
    }

    private readonly variables: number[];
}

function getVariableIndex(variable: string): number {
    switch (variable) {
        case "x":
            return 0;
        case "y":
            return 1;
        case "z":
            return 2;
        case "w":
            return 3;
        default:
            throw new Error("variable unknown");
    }
}

function isVariable(token: string): number {
    switch (token) {
        case "x":
        case "y":
        case "z":
        case "w":
            return 1;
        default:
            return 0;
    }
}

function getVariableOrValue(token: string): number {
    return isVariable(token) ? getVariableIndex(token) : parseInt(token);
}

function preprocess(lines: string[]): number[][] {
    return lines.map((line: string) => {
        const tokens = line.split(" ");
        switch (tokens[0]) {
            case "inp":
                return [0, getVariableIndex(tokens[1])];
            case "add":
                return [1, getVariableIndex(tokens[1]), isVariable(tokens[2]), getVariableOrValue(tokens[2])];
            case "mul":
                return [2, getVariableIndex(tokens[1]), isVariable(tokens[2]), getVariableOrValue(tokens[2])];
            case "div":
                return [3, getVariableIndex(tokens[1]), isVariable(tokens[2]), getVariableOrValue(tokens[2])];
            case "mod":
                return [4, getVariableIndex(tokens[1]), isVariable(tokens[2]), getVariableOrValue(tokens[2])];
            case "eql":
                return [5, getVariableIndex(tokens[1]), isVariable(tokens[2]), getVariableOrValue(tokens[2])];
            default:
                throw new Error("instruction unknown");
        }
    });
}

function dayTwentyFourPartOne(): void {
    const alu = new ArthimeticLogicUnit();
    alu.toLog();

    const instructions = preprocess(monad);

    let isLoop = true;
    const queue = new Array(14).fill(9);
    let minimum = Infinity;
    while (isLoop) {
        // console.log(`Q: ${queue}`);
        alu.execute(instructions, queue);
        if (alu.z() < minimum) {
            minimum = alu.z();
            console.log(queue);
            console.log(minimum);
        }
        // console.log(alu.z());
        if (alu.z() === 0) {
            isLoop = false;
            alu.toLog();
            console.log(queue);
        }

        queue[queue.length - 1] = queue[queue.length - 1] - 1;
        for (let i = queue.length - 1; i > -1; i--) {
            if (queue[i] === 0) {
                queue[i] = 9;
                queue[i - 1] = queue[i - 1] - 1;
                continue;
            }
            break;
        }
    }
}

function dayTwentyFourPartTwo(): void {
    // todo
}
