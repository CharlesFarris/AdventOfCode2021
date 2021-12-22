/* eslint-disable no-console */
// AoC Day 18 Challenge

import { useDebugValue } from "react";

export { dayEighteenPartOne, dayEighteenPartTwo };

// Test values
/*
const lines: string[] = ["[[[[4,3],4],4],[7,[[8,4],9]]]", "[1,1]"];
const lines: string[] = [
    "[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]",
    "[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]",
    "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]",
    "[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]",
    "[7,[5,[[3,8],[1,4]]]]",
    "[[2,[2,2]],[8,[8,1]]]",
    "[2,9]",
    "[1,[[[9,3],9],[[9,0],[0,7]]]]",
    "[[[5,[7,4]],7],1]",
    "[[[[4,2],2],6],[8,7]]"
];
const lines: string[] = ["[1,1]", "[2,2]", "[3,3]", "[4,4]"];
const lines: string[] = ["[1,1]", "[2,2]", "[3,3]", "[4,4]", "[5,5]", "[6,6]"];
const lines: string[] = [
    "[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]",
    "[[[5,[2,8]],4],[5,[[9,9],0]]]",
    "[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]",
    "[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]",
    "[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]",
    "[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]",
    "[[[[5,4],[7,7]],8],[[8,3],8]]",
    "[[9,3],[[9,9],[6,[4,9]]]]",
    "[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]",
    "[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]"
];
*/

// Real values
const lines: string[] = [
    "[[[0,[4,4]],6],[[[7,6],6],[[5,3],[3,2]]]]",
    "[[[[4,6],[1,7]],[5,8]],[[9,7],[9,6]]]",
    "[[[2,[7,1]],[[8,2],[9,3]]],3]",
    "[[[[2,1],6],2],4]",
    "[[[[0,3],0],6],[[9,[0,8]],[[2,1],[0,2]]]]",
    "[[[5,1],[[0,5],1]],[[[9,9],[8,7]],7]]",
    "[[[[0,2],8],8],[0,[7,[2,7]]]]",
    "[[[[3,8],[6,4]],[[2,0],2]],3]",
    "[[[[1,5],3],[[5,3],[5,4]]],[[0,1],[[1,2],8]]]",
    "[[[1,1],[[9,3],9]],[[9,[6,5]],[2,6]]]",
    "[[[9,3],[6,[1,5]]],[[3,8],[[4,6],[8,0]]]]",
    "[[3,[6,7]],[[3,0],[5,[3,4]]]]",
    "[1,[2,[[4,1],[2,3]]]]",
    "[[6,[7,8]],[[0,[0,3]],[6,7]]]",
    "[[8,[[0,0],[9,3]]],[[2,6],[[9,1],[4,9]]]]",
    "[[3,0],[[8,[7,1]],4]]",
    "[[[1,0],[[9,7],[7,8]]],[[[0,0],5],[[4,9],4]]]",
    "[[[[4,2],7],[[4,0],0]],[[[5,4],[6,7]],[0,[1,2]]]]",
    "[[[4,[4,3]],[[1,4],[1,1]]],6]",
    "[[[0,[5,9]],[[7,4],2]],[[9,1],[4,7]]]",
    "[[[[5,5],[7,0]],[8,[5,3]]],[[0,[0,2]],[[1,3],[5,8]]]]",
    "[[9,[[9,9],2]],[[9,6],[[4,7],5]]]",
    "[[[[8,7],[5,3]],9],[3,[6,9]]]",
    "[[3,[0,3]],[2,6]]",
    "[[[2,[7,0]],[6,6]],[[7,0],[[3,8],[8,5]]]]",
    "[[[2,6],[2,7]],[[3,6],[0,[9,5]]]]",
    "[[[5,4],1],[5,[[4,9],5]]]",
    "[[[6,3],6],[[[6,0],0],[[4,0],7]]]",
    "[[[[4,1],2],[3,[9,0]]],[0,8]]",
    "[[[2,[3,9]],[[8,3],8]],[[1,[2,2]],[8,[6,4]]]]",
    "[[[[4,3],[5,2]],0],[9,[5,[7,5]]]]",
    "[[[3,2],5],[[[6,3],9],[[2,0],[6,7]]]]",
    "[[[3,9],[[0,6],[0,7]]],[6,[3,2]]]",
    "[0,0]",
    "[[[[0,3],9],[8,[3,9]]],[[0,2],[[0,1],[3,7]]]]",
    "[[0,[4,[3,0]]],[[7,9],[5,[8,7]]]]",
    "[[2,9],[[0,[2,2]],1]]",
    "[[[[5,4],[1,7]],6],[2,[[5,3],[7,7]]]]",
    "[[[[0,4],4],[[6,6],[1,4]]],4]",
    "[[[[4,8],5],[[6,4],[2,3]]],[9,[[8,6],[4,0]]]]",
    "[[1,[6,[1,9]]],[3,[[4,2],[1,8]]]]",
    "[[[[3,7],[5,9]],[[3,8],[3,3]]],[[[7,8],3],[7,3]]]",
    "[[[[0,4],5],[4,[9,0]]],[3,[[4,1],6]]]",
    "[[[7,[2,1]],[[1,9],1]],[[[3,4],[8,6]],6]]",
    "[[[4,1],[5,[8,2]]],[[[1,6],9],[[4,4],2]]]",
    "[[[7,[6,4]],[[0,1],4]],[[5,2],[[9,5],[9,3]]]]",
    "[[[4,2],[1,8]],2]",
    "[[[1,6],5],[8,[2,[2,3]]]]",
    "[[[[0,2],[5,0]],[7,[0,0]]],[[6,[5,9]],5]]",
    "[[[7,6],[9,[2,4]]],[[5,[2,6]],2]]",
    "[[[6,2],4],[[2,9],[[3,0],[4,3]]]]",
    "[[8,[[6,4],[0,2]]],1]",
    "[[[4,1],[7,5]],[9,[[2,4],4]]]",
    "[[[[4,8],[7,5]],[1,[8,5]]],[[3,5],[[9,9],[4,2]]]]",
    "[[[7,[8,4]],[4,[5,8]]],5]",
    "[[7,9],[2,[[9,1],[7,1]]]]",
    "[3,[[[5,8],[4,8]],[5,4]]]",
    "[[[0,[5,5]],[[5,4],[5,4]]],[[9,6],[[9,4],[6,5]]]]",
    "[[7,2],[1,[8,[1,7]]]]",
    "[2,[9,[2,[2,3]]]]",
    "[[[3,[5,1]],[8,[6,4]]],[[2,8],[[2,2],8]]]",
    "[[[7,3],[0,4]],[[4,0],[6,[3,4]]]]",
    "[[4,[2,[2,8]]],[4,[[7,1],9]]]",
    "[[8,[[6,1],2]],[1,[[1,5],9]]]",
    "[[0,[2,[9,4]]],[[[7,4],7],8]]",
    "[[[2,[7,0]],5],[3,[4,4]]]",
    "[[7,[4,[6,0]]],[[4,7],[[3,7],5]]]",
    "[[2,[[8,0],[6,1]]],[[6,[6,1]],[3,9]]]",
    "[[9,0],[[[3,7],0],[[5,8],4]]]",
    "[6,[[[5,8],8],[3,[4,1]]]]",
    "[[8,[[9,3],[8,4]]],[4,[8,2]]]",
    "[[[[8,0],8],[3,7]],[[7,[4,3]],0]]",
    "[[[7,[2,6]],[8,0]],[4,[[1,3],[4,1]]]]",
    "[1,[[[4,9],[4,9]],[[7,0],[6,6]]]]",
    "[9,4]",
    "[[6,7],4]",
    "[[2,[5,2]],[[2,4],[[4,6],[5,5]]]]",
    "[[[5,2],[[5,5],[8,1]]],[[9,[1,6]],3]]",
    "[[[[4,3],1],[8,9]],6]",
    "[[[[3,2],[4,5]],4],[[[4,3],[0,0]],[[3,0],1]]]",
    "[[6,7],[[8,5],[[7,2],4]]]",
    "[[[[8,1],[5,8]],7],[[[5,2],[4,3]],1]]",
    "[[2,[[4,9],5]],[1,1]]",
    "[[9,1],[[[0,8],[1,8]],7]]",
    "[[9,3],[6,4]]",
    "[[8,[4,2]],[[7,[7,4]],[[0,9],[6,1]]]]",
    "[[[[0,5],7],[[7,7],2]],[[2,[5,8]],[9,6]]]",
    "[[[2,1],[7,[1,3]]],[[2,[7,1]],0]]",
    "[[[8,[8,4]],[2,[4,3]]],[[2,[5,6]],[[2,0],[7,3]]]]",
    "[[4,[[4,3],[5,2]]],[1,3]]",
    "[[5,[5,0]],9]",
    "[[[2,[7,6]],[1,8]],[[[5,2],2],0]]",
    "[[2,[2,3]],[[9,8],[[0,1],[3,5]]]]",
    "[[7,[[3,7],3]],[[[7,6],[4,8]],[[1,7],[8,6]]]]",
    "[[[0,0],[[6,1],5]],[5,[5,4]]]",
    "[[2,3],[4,[3,5]]]",
    "[[8,[7,7]],[8,[4,[8,1]]]]",
    "[[[[4,0],3],[[0,0],[0,0]]],[[[6,0],4],[[1,7],0]]]",
    "[[[[6,4],[3,1]],[[2,8],[1,2]]],[4,[[6,5],4]]]",
    "[[[[5,3],7],[4,[2,6]]],[[6,[4,5]],[1,[9,0]]]]"
];

function isDigit(character: string): boolean {
    switch (character) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            return true;
        default:
            return false;
    }
}

function add(left: string, right: string): string {
    const sum = `[${left},${right}]`;
    return reduce(sum);
}

function reduce(pair: string): string {
    let isLoop = true;
    while (isLoop) {
        console.log(pair);
        let updated = explode(pair);
        if (updated !== pair) {
            pair = updated;
            continue;
        }
        updated = split(pair);
        if (updated !== pair) {
            pair = updated;
            continue;
        }
        isLoop = false;
    }
    return pair;
}

function explode(pair: string): string {
    let depth = 0;
    for (let i = 0; i < pair.length; i++) {
        const character = pair[i];
        switch (character) {
            case "[":
                {
                    depth++;
                    if (depth > 4) {
                        if (/^\[(\d*),(\d*)\]/.test(pair.substring(i))) {
                            // Successful match
                            console.log(`explode: ${pair}`);
                            let j = i + 1;
                            let isLoop = true;
                            let numberString = "";
                            while (isLoop) {
                                if (isDigit(pair[j])) {
                                    numberString = numberString + pair[j];
                                    j++;
                                    continue;
                                }
                                isLoop = false;
                            }
                            const x = parseInt(numberString);
                            j++;
                            isLoop = true;
                            numberString = "";
                            while (isLoop) {
                                if (isDigit(pair[j])) {
                                    numberString = numberString + pair[j];
                                    j++;
                                    continue;
                                }
                                isLoop = false;
                            }
                            const y = parseInt(numberString);

                            let temporary = `${pair.substring(0, i)}X${pair.substring(j + 1)}`;

                            j = temporary.indexOf("X");
                            while (j > 0) {
                                const digit = temporary[j];
                                if (isDigit(digit)) {
                                    numberString = digit;
                                    let k = j - 1;
                                    while (k > 0) {
                                        if (isDigit(temporary[k])) {
                                            numberString = temporary[k] + numberString;
                                            j = k;
                                            k--;
                                        }
                                        break;
                                    }
                                    const value = parseInt(numberString) + x;
                                    temporary =
                                        temporary.substring(0, j) +
                                        value.toString() +
                                        temporary.substring(j + numberString.length);
                                    break;
                                }
                                j--;
                            }
                            j = temporary.indexOf("X");
                            while (j < temporary.length) {
                                const digit = temporary[j];
                                if (isDigit(digit)) {
                                    numberString = digit;
                                    let k = j + 1;
                                    while (k < temporary.length - 1) {
                                        if (isDigit(temporary[k])) {
                                            numberString = numberString + temporary[k];
                                            k++;
                                        }
                                        break;
                                    }
                                    const value = parseInt(numberString) + y;
                                    temporary =
                                        temporary.substring(0, j) +
                                        value.toString() +
                                        temporary.substring(j + numberString.length);
                                    break;
                                }
                                j++;
                            }
                            temporary = temporary.replace("X", "0");
                            return temporary;
                        }
                    }
                }
                break;
            case "]":
                {
                    depth--;
                }
                break;
        }
    }
    return pair;
}

function split(pair: string): string {
    for (let i = 0; i < pair.length; i++) {
        const character = pair[i];
        if (isDigit(character)) {
            let numberString = character;
            let j = i + 1;
            while (j < pair.length) {
                if (isDigit(pair[j])) {
                    numberString = numberString + pair[j];
                    j++;
                }
                break;
            }
            if (numberString.length > 1) {
                console.log(`split: ${pair}`);
                const value = parseInt(numberString);
                const x = Math.floor(value / 2);
                const y = Math.ceil(value / 2);
                const temporary = `${pair.substring(0, i)}[${x.toString()},${y.toString()}]${pair.substring(
                    i + numberString.length
                )}`;
                return temporary;
            }
        }
    }
    return pair;
}

class PairFactory {
    create(x: Pair | number, y: Pair | number, parent: Pair | undefined): Pair {
        this.id++;
        return new Pair(this.id, x, y, parent);
    }

    private id = 0;
}

class Pair {
    constructor(id: number, x: Pair | number, y: Pair | number, parent: Pair | undefined) {
        this.id = id;
        this.x = x;
        if (typeof x !== "number") {
            x.parent = this;
        }
        this.y = y;
        if (typeof y !== "number") {
            y.parent = this;
        }
        this.parent = parent;
    }

    magnitude(): number {
        let value = 0;
        if (typeof this.x === "number") {
            value += 3 * this.x;
        } else {
            value += 3 * this.x.magnitude();
        }
        if (typeof this.y === "number") {
            value += 2 * this.y;
        } else {
            value += 2 * this.y.magnitude();
        }
        return value;
    }

    x: Pair | number;
    y: Pair | number;
    parent: Pair | undefined;
    readonly id: number;
}

class Context {
    constructor(line: string) {
        this.line = line;
    }

    isLeftBracket(): boolean {
        return this.line[0] === "[";
    }

    isRightBracket(): boolean {
        return this.line[0] === "]";
    }

    isDigit(): boolean {
        return isDigit(this.line[0]);
    }

    isComma(): boolean {
        return this.line[0] === ",";
    }

    popCharacter(): void {
        this.line = this.line.substring(1);
    }

    popNumber(): number {
        for (let i = 0; i < this.line.length; i++) {
            if (!isDigit(this.line[i])) {
                const number = parseInt(this.line.substring(0, i));
                this.line = this.line.substring(i);
                return number;
            }
        }
        throw new Error("unable to parse number");
    }

    hasCharacters(): boolean {
        return this.line.length > 0;
    }

    private line: string;
}

function parseContext(context: Context, parent: Pair | undefined, factory: PairFactory): Pair | number {
    if (context.isLeftBracket()) {
        context.popCharacter();
        const pair = factory.create(Infinity, Infinity, parent);
        pair.x = parseContext(context, pair, factory);
        if (context.isComma()) {
            context.popCharacter();
        } else {
            throw new Error("comma missing");
        }
        pair.y = parseContext(context, pair, factory);
        if (context.isRightBracket()) {
            context.popCharacter();
        } else {
            throw new Error("right bracket missing");
        }
        return pair;
    } else if (context.isDigit()) {
        return context.popNumber();
    }
    throw new Error("invalid character");
}

function parse(line: string, parent: Pair | undefined, factory: PairFactory): Pair {
    const context = new Context(line);
    const result = parseContext(context, parent, factory);
    if (result instanceof Pair) {
        return result;
    }
    throw new Error("invalid result");
}

function test(factory: PairFactory): void {
    const inputs: string[] = [
        "[[[[[9,8],1],2],3],4]",
        "[7,[6,[5,[4,[3,2]]]]]",
        "[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]",
        "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]"
    ];
    const expected: string[] = [
        "[[[[0,9],2],3],4]",
        "[7,[6,[5,[7,0]]]]",
        "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]",
        "[[3,[2,[8,0]]],[9,[5,[7,0]]]]"
    ];
    for (let i = 0; i < inputs.length; i++) {
        const output = explode(inputs[i]);
        if (output === expected[i]) {
            console.log(`Success! ${inputs[i]}`);
        } else {
            console.log(`Failure! ${inputs[i]} ${output} ${expected[i]}`);
        }
    }

    const pairs: string[] = ["[1,1]", "[2,2]", "[3,3]", "[4,4]", "[5,5]", "[6,6]"];
    console.log(addPairs(pairs, factory));
}

function addPairs(pairs: string[], factory: PairFactory): string {
    let sum = pairs.shift() ?? "";
    for (const line of pairs) {
        console.log(`${sum} + ${line}`);
        sum = add(sum, line);
        console.log(sum);
    }
    return sum;
}

function dayEighteenPartOne(): void {
    /*
    const factory = new PairFactory();

    // test(factory);

    const sum = addPairs(lines, factory);
    console.log(`Sum: ${sum}`);
    console.log(`Magnitude: ${parse(sum, undefined, factory).magnitude()}`);
    */
}

function dayEighteenPartTwo(): void {
    const factory = new PairFactory();

    let maximum = -Infinity;
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++) {
            if (i === j) {
                continue;
            }
            const sum = addPairs([lines[i], lines[j]], factory);
            maximum = Math.max(maximum, parse(sum, undefined, factory).magnitude());
        }
    }
    console.log(`Maximum: ${maximum}`);
}
