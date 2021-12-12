// AoC Day 12 Challenge

import { Graph, GraphNode } from "./graph";
import "./extensions";

export { dayTwelvePartOne, dayTwelvePartTwo };

/*
// Test values 1
const lines: string[] = ["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"];
*/

/*
// Test values 2
const lines: string[] = [
    "dc-end",
    "HN-start",
    "start-kj",
    "dc-start",
    "dc-HN",
    "LN-dc",
    "HN-end",
    "kj-sa",
    "kj-HN",
    "kj-dc"
];
*/

/*
// Test values 3
const lines: string[] = [
    "fs-end",
    "he-DX",
    "fs-he",
    "start-DX",
    "pj-DX",
    "end-zg",
    "zg-sl",
    "zg-pj",
    "pj-he",
    "RW-he",
    "fs-DX",
    "pj-RW",
    "zg-RW",
    "start-pj",
    "he-WI",
    "zg-he",
    "pj-fs",
    "start-RW"
];
*/

// Real values
const lines: string[] = [
    "zi-end",
    "XR-start",
    "zk-zi",
    "TS-zk",
    "zw-vl",
    "zk-zw",
    "end-po",
    "ws-zw",
    "TS-ws",
    "po-TS",
    "po-YH",
    "po-xk",
    "zi-ws",
    "zk-end",
    "zi-XR",
    "XR-zk",
    "vl-TS",
    "start-zw",
    "vl-start",
    "XR-zw",
    "XR-vl",
    "XR-ws"
];

class GraphPath {
    constructor(nodes: GraphNode[]) {
        this.nodes = nodes.slice();
        this.id = this.toString();
    }

    clone(node: GraphNode): GraphPath {
        return new GraphPath(node === undefined ? this.nodes : this.nodes.concat(node));
    }

    getLastNode(): GraphNode {
        return this.nodes.length === 0 ? undefined : this.nodes[this.nodes.length - 1];
    }

    getNodes(): GraphNode[] {
        return this.nodes.slice();
    }

    getVisitCount(node: GraphNode): number {
        return this.nodes.reduce((count: number, pathNode: GraphNode) => {
            return count + (node === pathNode ? 1 : 0);
        }, 0);
    }

    private toString(): string {
        return this.nodes
            .map((node: GraphNode) => {
                return node.label;
            })
            .join(",");
    }

    private readonly nodes: GraphNode[];
    readonly id: string;
}

function isSmallCave(node: GraphNode, ignoreStartEnd: boolean) {
    if (ignoreStartEnd && (node.label === "start" || node.label === "end")) {
        return false;
    }
    const firstCharacter: string = node.label[0];
    return firstCharacter == firstCharacter.toLowerCase();
}

function outputGraphviz(graph: Graph): string {
    const output: string[] = [];
    output.push("strict graph {");
    for (const edge of graph.getEdges()) {
        output.push(edge.start.label + " -- " + edge.end.label);
    }
    output.push("}");
    return output.join("\n");
}

function dayTwelvePartOne(): void {
    const graph: Graph = new Graph();
    for (const line of lines) {
        const tokens: string[] = line.split("-");
        graph.addEdge(tokens[0], tokens[1]);
    }
    graph.logGraph();
    const startNode: GraphNode = graph.getNodeByLabel("start");
    const endNode: GraphNode = graph.getNodeByLabel("end");
    const paths: GraphPath[] = [new GraphPath([startNode])];
    const finishedPaths: GraphPath[] = [];
    const discardedPaths: GraphPath[] = [];
    while (paths.length > 0) {
        const currentPath: GraphPath = paths.pop();
        const lastNode = currentPath.getLastNode();
        const adjacentNodes: GraphNode[] = graph.getAdjacent(lastNode);
        for (const adjacentNode of adjacentNodes) {
            const newPath = currentPath.clone(adjacentNode);
            if (adjacentNode === endNode) {
                finishedPaths.push(newPath);
            } else {
                const checkSmallCave: boolean = isSmallCave(adjacentNode, false);
                if (checkSmallCave) {
                    const visitCount: number = newPath.getVisitCount(adjacentNode);
                    if (visitCount > 1) {
                        discardedPaths.push(newPath);
                    } else {
                        paths.push(newPath);
                    }
                } else {
                    paths.push(newPath);
                }
            }
        }
    }
    console.log("Finished Path: " + finishedPaths.length);
    for (const path of finishedPaths) {
        //console.log(path.id);
    }
    //console.log(outputGraphviz(graph));
}

function dayTwelvePartTwo(): void {}
