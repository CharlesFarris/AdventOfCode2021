export { Alu };

class Alu {
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

    toLog(console: Console): void {
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

    x(): number {
        return this.variables[0];
    }

    y(): number {
        return this.variables[1];
    }

    z(): number {
        return this.variables[2];
    }

    w(): number {
        return this.variables[3];
    }

    compile(lines: string[]): number[][] {
        return lines.map((line: string) => {
            const tokens = line.split(" ");
            switch (tokens[0]) {
                case "inp":
                    return [0, this.getVariableIndex(tokens[1])];
                case "add":
                    return [
                        1,
                        this.getVariableIndex(tokens[1]),
                        this.isVariable(tokens[2]),
                        this.getVariableOrValue(tokens[2])
                    ];
                case "mul":
                    return [
                        2,
                        this.getVariableIndex(tokens[1]),
                        this.isVariable(tokens[2]),
                        this.getVariableOrValue(tokens[2])
                    ];
                case "div":
                    return [
                        3,
                        this.getVariableIndex(tokens[1]),
                        this.isVariable(tokens[2]),
                        this.getVariableOrValue(tokens[2])
                    ];
                case "mod":
                    return [
                        4,
                        this.getVariableIndex(tokens[1]),
                        this.isVariable(tokens[2]),
                        this.getVariableOrValue(tokens[2])
                    ];
                case "eql":
                    return [
                        5,
                        this.getVariableIndex(tokens[1]),
                        this.isVariable(tokens[2]),
                        this.getVariableOrValue(tokens[2])
                    ];
                default:
                    throw new Error("instruction unknown");
            }
        });
    }

    private getVariableIndex(variable: string): number {
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

    private isVariable(token: string): number {
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

    private getVariableOrValue(token: string): number {
        return this.isVariable(token) ? this.getVariableIndex(token) : parseInt(token);
    }

    private readonly variables: number[];
}
