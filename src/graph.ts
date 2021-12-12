export { GraphNode, GraphEdge, Graph };

class GraphNode {
    constructor(label: string) {
        this.label = label;
    }

    readonly label: string;
}

class GraphEdge {
    constructor(start: GraphNode, end: GraphNode) {
        this.start = start;
        this.end = end;
    }

    hasNode(node: GraphNode): boolean {
        return this.start === node || this.end === node;
    }

    readonly start: GraphNode;
    readonly end: GraphNode;
}

class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(label: string): GraphNode {
        let node: GraphNode = this.getNodeByLabel(label);
        if (node === undefined) {
            node = new GraphNode(label);
            this.nodes.push(node);
        }
        return node;
    }

    getNodeByLabel(label: string): GraphNode {
        return this.nodes.find((node: GraphNode) => {
            return node.label === label;
        });
    }

    getNodes(): GraphNode[] {
        return this.nodes.slice();
    }

    getEdges(): GraphEdge[] {
        return this.edges.slice();
    }

    addEdge(start: string, end: string): GraphEdge {
        const startNode: GraphNode = this.addNode(start);
        const endNode: GraphNode = this.addNode(end);
        let edge = this.edges.find((edge: GraphEdge) => {
            return (
                (edge.start === startNode && edge.end === endNode) || (edge.start === endNode && edge.end === startNode)
            );
        });
        if (edge === undefined) {
            edge = new GraphEdge(startNode, endNode);
            this.edges.push(edge);
        }
        return edge;
    }

    getAdjacent(node: GraphNode): GraphNode[] {
        return this.edges
            .filter((edge: GraphEdge) => {
                return edge.hasNode(node);
            })
            .map((edge: GraphEdge) => {
                return node === edge.start ? edge.end : edge.start;
            });
    }

    private readonly nodes: GraphNode[];
    private readonly edges: GraphEdge[];
}
