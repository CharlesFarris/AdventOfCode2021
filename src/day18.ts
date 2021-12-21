/* eslint-disable no-console */
// AoC Day 18 Challenge

export { dayEighteenPartOne, dayEighteenPartTwo };

// Test values
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
/*
const lines: string[] = ["[1,1]", "[2,2]", "[3,3]", "[4,4]"];
const lines: string[] = ["[1,1]", "[2,2]", "[3,3]", "[4,4]", "[5,5]", "[6,6]"];
*/

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

    getDepth(): number {
        let depth = 0;
        let current: Pair | undefined = this.parent;
        while (current !== undefined) {
            depth++;
            current = current?.parent;
        }
        return depth;
    }

    getRoot(): Pair {
        if (this.parent === undefined) {
            return this;
        }
        let current = this.parent;
        while (current !== undefined) {
            if (current.parent === undefined) {
                return current;
            }
            current = current.parent;
        }
        throw new Error("parent not found");
    }

    isNumberPair(): boolean {
        return typeof this.x === "number" && typeof this.y === "number";
    }

    isPartialNumberPair(): boolean {
        return typeof this.x === "number" || typeof this.y === "number";
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
        return this.checkDigit(this.line[0]);
    }

    private checkDigit(character: string): boolean {
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

    isComma(): boolean {
        return this.line[0] === ",";
    }

    popCharacter(): void {
        this.line = this.line.substring(1);
    }

    popNumber(): number {
        for (let i = 0; i < this.line.length; i++) {
            if (!this.checkDigit(this.line[i])) {
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

function depthFirstSearch<T>(
    pair: Pair | undefined,
    handleCurrent: (stack: (Pair | number)[], localCurrent: Pair | number, localResults: T[]) => boolean
): T[] {
    const results: T[] = [];
    if (pair !== undefined) {
        const stack: (Pair | number)[] = [pair];
        while (stack.length > 0) {
            const current = stack.pop();
            if (current === undefined) {
                throw new Error("current undefined");
            }
            if (handleCurrent(stack, current, results)) {
                break;
            }
        }
    }
    return results;
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

function convertToString(pair: Pair): string {
    let result = "[";
    if (pair.x instanceof Pair) {
        result = result + convertToString(pair.x);
    } else {
        result = result + pair.x.toString();
    }
    result = `${result},`;
    if (pair.y instanceof Pair) {
        result = result + convertToString(pair.y);
    } else {
        result = result + pair.y.toString();
    }
    return `${result}]`;
}

function add(left: Pair, right: Pair, factory: PairFactory): Pair {
    console.log(`${convertToString(left)} + ${convertToString(right)}`);
    const sum = factory.create(left, right, undefined);
    // logDot(sum);
    let isLoop = true;
    while (isLoop) {
        console.log(convertToString(sum));
        if (explode(sum)) {
            continue;
        }
        if (split(sum, factory)) {
            continue;
        }
        isLoop = false;
    }
    console.log(convertToString(sum));
    return sum;
}

function getPairsWithNumbers(pair: Pair): Pair[] {
    return depthFirstSearch(pair, (stack1, current, results) => {
        if (typeof current === "number") {
            return false;
        }
        if (current.isPartialNumberPair()) {
            results.push(current);
        }
        stack1.push(current.y);
        stack1.push(current.x);
        return false;
    });
}

function getLeftPair(pair: Pair): Pair | undefined {
    const root = pair.getRoot();
    console.log(convertToString(root));
    const results = flatten(root); // getPairsWithNumbers(root);
    const index = results.indexOf(pair);
    if (index === -1) {
        throw new Error("current not found");
    }
    return index < 1 ? undefined : results[index - 1];
}

function getRightPair(pair: Pair): Pair | undefined {
    const root = pair.getRoot();
    console.log(convertToString(root));
    const results = flatten(root); //getPairsWithNumbers(root);
    const index = results.indexOf(pair);
    if (index === -1) {
        throw new Error("current not found");
    }
    return index === results.length - 1 ? undefined : results[index + 1];
}

function recurse(pair: Pair, pairs: Pair[]): void {
    if (pair.isPartialNumberPair()) {
        pairs.push(pair);
    }
    if (typeof pair.x !== "number") {
        recurse(pair.x, pairs);
    }
    if (typeof pair.y !== "number") {
        recurse(pair.y, pairs);
    }
}

function flatten(pair: Pair): Pair[] {
    const pairs: Pair[] = [];
    recurse(pair, pairs);
    return pairs;
}

function explode(pair: Pair): boolean {
    return (
        depthFirstSearch<Pair>(pair, (localStack, localCurrent, localResults) => {
            if (typeof localCurrent !== "number") {
                if (localCurrent.isNumberPair()) {
                    const depth = localCurrent.getDepth();
                    if (depth > 3) {
                        const parent = localCurrent.parent;
                        if (parent === undefined) {
                            throw new Error("parent undefined");
                        }
                        localResults.push(localCurrent);
                        if (typeof parent.x !== "number" && parent.x.id === localCurrent.id) {
                            parent.x = 0;
                            if (typeof parent.y === "number") {
                                parent.y = parent.y + (localCurrent.y as number);
                            } else {
                                const right = getRightPair(parent);
                                if (right === undefined) {
                                    // todo
                                } else if (typeof right.x === "number") {
                                    right.x = right.x + (localCurrent.y as number);
                                }
                            }
                            const left = getLeftPair(parent);
                            if (left === undefined) {
                                // todo
                            } else if (typeof left.y === "number") {
                                left.y = left.y + (localCurrent.x as number);
                            }
                        }
                        if (typeof parent.y !== "number" && parent.y.id === localCurrent.id) {
                            parent.y = 0;
                            if (typeof parent.x === "number") {
                                parent.x = parent.x + (localCurrent.x as number);
                            } else {
                                const left = getLeftPair(parent);
                                if (left === undefined) {
                                    // todo
                                } else if (typeof left.y === "number") {
                                    left.y = left.y + (localCurrent.x as number);
                                }
                            }
                            const right = getRightPair(parent);
                            if (right === undefined) {
                                // todo
                            } else if (typeof right.x === "number") {
                                right.x = right.x + (localCurrent.y as number);
                            }
                        }
                        return true;
                    }
                } else {
                    localStack.push(localCurrent.y);
                    localStack.push(localCurrent.x);
                }
            }
            return false;
        }).length > 0
    );
}

function split(pair: Pair, factory: PairFactory): boolean {
    return (
        depthFirstSearch<Pair>(pair, (stack, current, results) => {
            if (typeof current !== "number") {
                if (typeof current.x === "number" && current.x > 9) {
                    results.push(current);
                    const x = Math.floor(current.x / 2);
                    const y = Math.ceil(current.x / 2);
                    current.x = factory.create(x, y, current.parent);
                    return true;
                }
                if (typeof current.y === "number" && current.y > 9) {
                    results.push(current);
                    const x = Math.floor(current.y / 2);
                    const y = Math.ceil(current.y / 2);
                    current.y = factory.create(x, y, current.parent);
                    return true;
                }
                stack.push(current.y);
                stack.push(current.x);
            }
            return false;
        }).length > 0
    );
}

function logDot(pair: Pair): void {
    console.log("strict graph {");
    depthFirstSearch<Pair>(pair, (stack, current, results) => {
        let localId = 1;
        if (typeof current !== "number") {
            console.log(`${current.id}[label="` + `_` + `"]`);
            if (typeof current.x === "number") {
                const id = `${current.id}${current.x}${localId}`;
                localId++;
                console.log(`${id} [label="${current.x}"]`);
                console.log(`${current.id} -- ${id}`);
            } else {
                stack.push(current.x);
                console.log(`${current.id} -- ${current.x.id}`);
            }
            if (typeof current.y === "number") {
                const id = `${current.id}${current.y}${localId}`;
                localId++;
                console.log(`${id} [label="${current.y}"]`);
                console.log(`${current.id} -- ${id}`);
            } else {
                stack.push(current.y);
                console.log(`${current.id} -- ${current.y.id}`);
            }
        }
        return false;
    });
    console.log("}");
}

function dayEighteenPartOne(): void {
    const factory = new PairFactory();

    const x = parse("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]", undefined, factory);
    explode(x);

    const pairs: Pair[] = [];
    for (const line of lines) {
        const pair = parse(line, undefined, factory);
        pairs.push(pair);
    }
    const sum = pairs.reduce((localSum: Pair, pair: Pair) => {
        return localSum === pair ? localSum : add(localSum, pair, factory);
    });
    console.log(convertToString(sum));
    console.log(sum.magnitude());
}

function dayEighteenPartTwo(): void {
    // todo
}
