/* eslint-disable no-console */
// AoC Day 14 Challenge

import { unstable_renderSubtreeIntoContainer } from "react-dom";

export { dayFourteenPartOne, dayFourteenPartTwo };

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

/*
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
*/

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

class Node {
    constructor(left: string, right: string, iteration: number) {
        this.key = left + right;
        this.iteration = iteration;
    }

    readonly key: string;
    readonly iteration: number;
}

function dayFourteenPartTwo(): void {
    const ruleMap = rules.reduce((map: Map<string, string>, rule: string) => {
        const tokens = rule.split(" -> ");
        map.set(tokens[0], tokens[1]);
        return map;
    }, new Map<string, string>());

    const currentTemplate = template;
    const elementMap = currentTemplate.split("").reduce((localMap: Map<string, number>, element: string) => {
        const count = localMap.get(element);
        if (count === undefined) {
            localMap.set(element, 1);
        } else {
            localMap.set(element, count + 1);
        }
        return localMap;
    }, new Map<string, number>());

    const characters: string[] = currentTemplate.split("");
    const maxIteration = 40;
    for (let i = 0; i < characters.length - 2; i++) {
        const stack: Node[] = [new Node(characters[i], characters[i + 1], 0)];
        while (stack.length > 0) {
            const current = stack.pop();
            if (current === undefined) {
                throw new Error("current undefied");
            }
            if (current.iteration === maxIteration) {
                continue;
            }
            const insert = ruleMap.get(current.key);
            if (insert === undefined) {
                throw new Error("insert undefined");
            }
            const count = elementMap.get(insert);
            if (count === undefined) {
                elementMap.set(insert, 1);
            } else {
                elementMap.set(insert, count + 1);
            }
            stack.push(new Node(insert, current.key[1], current.iteration + 1));
            stack.push(new Node(current.key[0], insert, current.iteration + 1));
            console.log(stack.length);

            /*
            const left = stack.pop();
            if (left === undefined) {
                throw new Error("left undefined");
            }
            let right = stack[stack.length - 1];
            while (right.iteration < maxIteration) {
                const key = left.character + right.character;
                const insert = ruleMap.get(key);
                if (insert === undefined) {
                    throw new Error("insert undefined");
                }
                const count = elementMap.get(insert);
                if (count === undefined) {
                    elementMap.set(insert, 1);
                } else {
                    elementMap.set(insert, count + 1);
                }
                right = new Letter(insert, right.iteration + 1);
                stack.push(right);
            }
            */
        }
    }

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
