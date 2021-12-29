/* eslint-disable no-console */
// AoC Day 14 Challenge

import { unstable_renderSubtreeIntoContainer } from "react-dom";

export { dayFourteenPartOne, dayFourteenPartTwo };

/*
// Test values
const template = "NNCB";
const rules: string[] = [
    "CH -> B",
    "HH -> N",
    "CB -> H",
    "NH -> C",
    "HB -> C",
    "HC -> B",
    "HN -> C",
    "NN -> C",
    "BH -> H",
    "NC -> B",
    "NB -> B",
    "BN -> B",
    "BB -> N",
    "BC -> B",
    "CC -> N",
    "CN -> C"
];
*/

// Real values
const template = "HBCHSNFFVOBNOFHFOBNO";
const rules: string[] = [
    "HF -> O",
    "KF -> F",
    "NK -> F",
    "BN -> O",
    "OH -> H",
    "VC -> F",
    "PK -> B",
    "SO -> B",
    "PP -> H",
    "KO -> F",
    "VN -> S",
    "OS -> B",
    "NP -> C",
    "OV -> C",
    "CS -> P",
    "BH -> P",
    "SS -> P",
    "BB -> H",
    "PH -> V",
    "HN -> F",
    "KV -> H",
    "HC -> B",
    "BC -> P",
    "CK -> P",
    "PS -> O",
    "SH -> N",
    "FH -> N",
    "NN -> P",
    "HS -> O",
    "CB -> F",
    "HH -> F",
    "SB -> P",
    "NB -> F",
    "BO -> V",
    "PN -> H",
    "VP -> B",
    "SC -> C",
    "HB -> H",
    "FP -> O",
    "FC -> H",
    "KP -> B",
    "FB -> B",
    "VK -> F",
    "CV -> P",
    "VF -> V",
    "SP -> K",
    "CC -> K",
    "HV -> P",
    "NC -> N",
    "VH -> K",
    "PF -> P",
    "PB -> S",
    "BF -> K",
    "FF -> C",
    "FV -> V",
    "KS -> H",
    "VB -> F",
    "SV -> F",
    "HO -> B",
    "FN -> C",
    "SN -> F",
    "OB -> N",
    "KN -> P",
    "BV -> H",
    "ON -> N",
    "NF -> S",
    "OF -> P",
    "NV -> S",
    "VS -> C",
    "OO -> C",
    "BP -> H",
    "BK -> N",
    "CP -> N",
    "PC -> K",
    "CN -> H",
    "KB -> B",
    "BS -> P",
    "KK -> P",
    "SF -> V",
    "CO -> V",
    "CH -> P",
    "FO -> B",
    "FS -> F",
    "VO -> H",
    "NS -> F",
    "KC -> H",
    "VV -> K",
    "NO -> P",
    "OK -> F",
    "PO -> V",
    "FK -> H",
    "OP -> H",
    "PV -> N",
    "CF -> P",
    "NH -> K",
    "SK -> O",
    "KH -> P",
    "HP -> V",
    "OC -> V",
    "HK -> F"
];

function dayFourteenPartOne(): void {
    const ruleMap = rules.reduce((map: Map<string, string>, rule: string) => {
        const tokens = rule.split(" -> ");
        map.set(tokens[0], tokens[1]);
        return map;
    }, new Map<string, string>());

    let currentTemplate: string = template;
    for (let iteration = 0; iteration < 10; iteration++) {
        console.log(`Iteration: ${iteration}`);
        let newTemplate = "";
        const characters = currentTemplate.split("");
        const inserts: string[] = [];
        for (let i = 0; i < characters.length - 1; i++) {
            const pair = characters[i] + characters[i + 1];
            const insert = ruleMap.get(pair);
            if (insert === undefined) {
                // todo
            } else {
                inserts.push(insert);
                newTemplate = newTemplate + characters[i] + insert;
            }
        }
        newTemplate = newTemplate + characters[characters.length - 1];
        // console.log(newTemplate);
        currentTemplate = newTemplate;
    }
    const elementMap = currentTemplate.split("").reduce((localMap: Map<string, number>, element: string) => {
        const count = localMap.get(element);
        if (count === undefined) {
            localMap.set(element, 1);
        } else {
            localMap.set(element, count + 1);
        }
        return localMap;
    }, new Map<string, number>());
    let mostCommonElement = "";
    let mostCommonCount = -Infinity;
    let leastCommonElement = "";
    let leastCommonCount = Infinity;

    const iterator = elementMap.keys();
    let result = iterator.next();
    while (!result.done) {
        const key = result.value;
        const value = elementMap.get(key);
        if (value === undefined) {
            continue;
        }
        if (value > mostCommonCount) {
            mostCommonCount = value;
            mostCommonElement = key;
        }
        if (value < leastCommonCount) {
            leastCommonCount = value;
            leastCommonElement = key;
        }
        result = iterator.next();
    }
    console.log(`Difference: ${(mostCommonCount - leastCommonCount).toString()}`);
}

function updateCount(elementMap: Map<string, number>, insert: string): void {
    const count = elementMap.get(insert);
    if (count === undefined) {
        elementMap.set(insert, 1);
    } else {
        elementMap.set(insert, count + 1);
    }
}

function recurse(
    left: string,
    right: string,
    step: number,
    maxStep: number,
    ruleMap: Map<string, string>,
    elementMap: Map<string, number>
): void {
    console.log(`${left + right} ${step}`);
    if (step === maxStep) {
        return;
    }
    const insert = ruleMap.get(left + right);
    if (insert === undefined) {
        throw new Error("insert undefined");
    }
    updateCount(elementMap, insert);
    recurse(left, insert, step + 1, maxStep, ruleMap, elementMap);
    recurse(insert, right, step + 1, maxStep, ruleMap, elementMap);
}
class Node {
    constructor(readonly character: string, readonly iteration: number) {}
}

function dayFourteenPartTwo(): void {
    const ruleMap = rules.reduce((map: Map<string, string>, rule: string) => {
        const tokens = rule.split(" -> ");
        map.set(tokens[0], tokens[1]);
        return map;
    }, new Map<string, string>());

    const elementMap = new Map<string, number>();
    template.split("").forEach((character: string) => {
        updateCount(elementMap, character);
    });

    const maxStep = 40;
    const characters = template.split("");
    for (let i = 0; i < characters.length - 1; i++) {
        console.log(characters[i] + characters[i + 1]);
        recurse(characters[i], characters[i + 1], 0, maxStep, ruleMap, elementMap);
    }

    /*

    const stack: Node[] = template
        .split("")
        .reverse()
        .reduce((localStack: Node[], character: string) => {
            localStack.push(new Node(character, 1));
            return localStack;
        }, []);
    while (stack.length > 0) {
        const left = stack.pop();
        if (left === undefined) {
            throw new Error("left undefined");
        }
        let isLoop = true;
        while (isLoop) {
            const right = stack[stack.length - 1];
            if (right === undefined) {
                throw new Error("right undefined");
            }
            const insert = ruleMap.get(left.character + right.character);
            if (insert === undefined) {
                throw new Error("insert undefined");
            }
            updateCount(elementMap, insert);
            const newNode = new Node(insert, right.iteration + 1);
            if (newNode.iteration === maxIteration) {
                isLoop = false;
            } else {
                stack.push(newNode);
            }
        }
    }

    // A1 A1 B1 B1
    // A1 B2 A1 C2 B1 A2 C1
    // A1 C3 B2 C3 A1 B3 C2 A3 B1 C3 A2 B3 C1
    // A1 B4 C3 A4 B2 A4 C3 B4 A1 C4 B3 A4 C2 B4 A3 C4 B1 A4 C3 B4 A2 C4 B3 A4 C1

    // A1 - A1 B1 B1
    // A1 - B2 A1 B1 B1
    // A1 - C3 B2 A1 B1 B1
    // A1 - B4 C3 B2 A1 B1 B1
    // B4
    // C3 - B2 A1 B1 B1
    // A4
    //

    */

    let mostCommonElement = "";
    let mostCommonCount = -Infinity;
    let leastCommonElement = "";
    let leastCommonCount = Infinity;
    const iterator = elementMap.keys();
    let result = iterator.next();
    while (!result.done) {
        const key = result.value;
        const value = elementMap.get(key);
        if (value === undefined) {
            continue;
        }
        if (value > mostCommonCount) {
            mostCommonCount = value;
            mostCommonElement = key;
        }
        if (value < leastCommonCount) {
            leastCommonCount = value;
            leastCommonElement = key;
        }
        result = iterator.next();
    }
    console.log(`Difference: ${(mostCommonCount - leastCommonCount).toString()}`);
}
