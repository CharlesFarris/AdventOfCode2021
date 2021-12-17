/* eslint-disable no-console */
// AoC Day 16 Challenge

export { daySixteenPartOne, daySixteenPartTwo };

// Test values
/*
const lines: string[] = [
    "D2FE28",
    "38006F45291200",
    "EE00D40C823060",
    "8A004A801A8002F478",
    "D8005AC2A8F0",
    "620080001611562C8802118E34"
];
const lines: string[] = [
    "C200B40A82",
    "04005AC33890",
    "880086C3E88112",
    "CE00C43D881120",
    "D8005AC2A8F0",
    "F600BC2D8F",
    "9C005AC2F8F0",
    "9C0141080250320F1802104A08"
];
*/

// Real values
const lines: string[] = [
    "220D6448300428021F9EFE668D3F5FD6025165C00C602FC980B45002A40400B402548808A310028400C001B5CC00B10029C0096011C0003C55003C0028270025400C1002E4F19099F7600142C801098CD0761290021B19627C1D3007E33C4A8A640143CE85CB9D49144C134927100823275CC28D9C01234BD21F8144A6F90D1B2804F39B972B13D9D60939384FE29BA3B8803535E8DF04F33BC4AFCAFC9E4EE32600C4E2F4896CE079802D4012148DF5ACB9C8DF5ACB9CD821007874014B4ECE1A8FEF9D1BCC72A293A0E801C7C9CA36A5A9D6396F8FCC52D18E91E77DD9EB16649AA9EC9DA4F4600ACE7F90DFA30BA160066A200FC448EB05C401B8291F22A2002051D247856600949C3C73A009C8F0CA7FBCCF77F88B0000B905A3C1802B3F7990E8029375AC7DDE2DCA20C2C1004E4BE9F392D0E90073D31634C0090667FF8D9E667FF8D9F0C01693F8FE8024000844688FF0900010D8EB0923A9802903F80357100663DC2987C0008744F8B5138803739EB67223C00E4CC74BA46B0AD42C001DE8392C0B0DE4E8F660095006AA200EC198671A00010E87F08E184FCD7840289C1995749197295AC265B2BFC76811381880193C8EE36C324F95CA69C26D92364B66779D63EA071008C360098002191A637C7310062224108C3263A600A49334C19100A1A000864728BF0980010E8571EE188803D19A294477008A595A53BC841526BE313D6F88CE7E16A7AC60401A9E80273728D2CC53728D2CCD2AA2600A466A007CE680E5E79EFEB07360041A6B20D0F4C021982C966D9810993B9E9F3B1C7970C00B9577300526F52FCAB3DF87EC01296AFBC1F3BC9A6200109309240156CC41B38015796EABCB7540804B7C00B926BD6AC36B1338C4717E7D7A76378C85D8043F947C966593FD2BBBCB27710E57FDF6A686E00EC229B4C9247300528029393EC3BAA32C9F61DD51925AD9AB2B001F72B2EE464C0139580D680232FA129668"
];

function toBinary(hex: string): string {
    switch (hex) {
        case "0":
            return "0000";
        case "1":
            return "0001";
        case "2":
            return "0010";
        case "3":
            return "0011";
        case "4":
            return "0100";
        case "5":
            return "0101";
        case "6":
            return "0110";
        case "7":
            return "0111";
        case "8":
            return "1000";
        case "9":
            return "1001";
        case "A":
            return "1010";
        case "B":
            return "1011";
        case "C":
            return "1100";
        case "D":
            return "1101";
        case "E":
            return "1110";
        case "F":
            return "1111";
        default:
            throw new Error("binary unknown");
    }
}

function chunkify(line: string, chunkSize: number): string[] {
    const chunks = [];
    while (line.length > 0) {
        chunks.push(line.substring(0, chunkSize));
        line = line.substring(chunkSize);
    }
    return chunks;
}

class PacketHeader {
    constructor(readonly version: number, readonly type: number) {}
}

class Packet {
    constructor(readonly header: PacketHeader) {}
    readonly subPackets: Packet[] = [];

    evaluate(): number {
        throw new Error("evaluate not implemented.");
    }
}

class LiteralValuePacket extends Packet {
    constructor(header: PacketHeader, value: number) {
        super(header);
        this.value = value;
    }
    evaluate(): number {
        return this.value;
    }

    readonly value: number;
}

class OperatorPacket extends Packet {
    constructor(header: PacketHeader) {
        super(header);
    }

    evaluate(): number {
        switch (this.header.type) {
            case 0:
                return this.subPackets.reduce((sum: number, packet: Packet) => {
                    return sum + packet.evaluate();
                }, 0);
            case 1:
                return this.subPackets.reduce((product: number, packet: Packet) => {
                    return product * packet.evaluate();
                }, 1);
            case 2:
                return this.subPackets.reduce((minimum: number, packet: Packet) => {
                    return Math.min(minimum, packet.evaluate());
                }, Infinity);
            case 3:
                return this.subPackets.reduce((maximum: number, packet: Packet) => {
                    return Math.max(maximum, packet.evaluate());
                }, -Infinity);
            case 5:
                return this.subPackets[0].evaluate() > this.subPackets[1].evaluate() ? 1 : 0;
            case 6:
                return this.subPackets[0].evaluate() < this.subPackets[1].evaluate() ? 1 : 0;
            case 7:
                return this.subPackets[0].evaluate() === this.subPackets[1].evaluate() ? 1 : 0;
            default:
                return 0;
        }
    }
}

function getPacketHeader(packet: string): PacketHeader {
    const chunks: string[] = chunkify(packet.substring(0, 6), 3);
    return new PacketHeader(parseInt(chunks[0], 2), parseInt(chunks[1], 2));
}

function convertPacketToBinary(packet: string): string {
    return packet.split("").reduce((binary: string, character: string) => {
        return binary + toBinary(character);
    }, "");
}
class Context {
    constructor(private line: string) {}

    take(count: number): string {
        const taken = this.line.substring(0, count);
        this.line = this.line.substring(count);
        return taken;
    }

    takeAsNumber(count: number): number {
        return parseInt(this.take(count), 2);
    }

    has(count: number): boolean {
        return count <= this.line.length;
    }
}

function parse4(context: Context, header: PacketHeader, parent: Packet): void {
    let loop = true;
    let literal = "";
    while (loop) {
        const taken = context.take(5);
        literal += taken.substring(1);
        if (taken.startsWith("0")) {
            loop = false;
        }
    }
    const value = parseInt(literal, 2);
    const packet = new LiteralValuePacket(header, value);
    parent.subPackets.push(packet);
}

function parseOperator(context: Context, header: PacketHeader, parent: Packet): void {
    const packet = new OperatorPacket(header);
    parent.subPackets.push(packet);
    switch (context.takeAsNumber(1)) {
        case 0:
            {
                const bitsLength = context.takeAsNumber(15);
                const bits = context.take(bitsLength);
                console.log(bits.length);
                const subContext = new Context(bits);
                parse(subContext, packet);
            }
            break;
        case 1:
            {
                const subPacketCount: number = context.takeAsNumber(11);
                parse(context, packet, subPacketCount);
            }
            break;
    }
}

function parse(context: Context, parent: Packet, maxCount = -1): void {
    let count = 0;
    while (context.has(6)) {
        const version = context.takeAsNumber(3);
        const type = context.takeAsNumber(3);
        const header = new PacketHeader(version, type);
        switch (header.type) {
            case 4:
                parse4(context, header, parent);
                break;
            default:
                parseOperator(context, header, parent);
                break;
        }
        count++;
        if (maxCount !== -1 && count === maxCount) {
            break;
        }
    }
}

function daySixteenPartOne(): void {
    for (const input of lines) {
        console.log(`Line: ${input}`);
        const root = new Packet(new PacketHeader(0, 0));
        const binary = input.split("").reduce((localBinary: string, character: string) => {
            return localBinary + toBinary(character);
        }, "");
        const context = new Context(binary);
        parse(context, root);
        const stack: Packet[] = [root];
        let sum = 0;
        while (stack.length > 0) {
            const packet = stack.pop();
            if (packet === undefined) {
                throw new Error("packet is undefined");
            }
            sum += packet.header.version;
            for (const subPacket of packet.subPackets) {
                stack.push(subPacket);
            }
        }
        console.log(`Sum: ${sum}`);
    }
}

function daySixteenPartTwo(): void {
    for (const input of lines) {
        console.log(`Line: ${input}`);
        const root = new Packet(new PacketHeader(0, 0));
        const binary = input.split("").reduce((localBinary: string, character: string) => {
            return localBinary + toBinary(character);
        }, "");
        const context = new Context(binary);
        parse(context, root);
        console.log(`Value: ${root.subPackets[0].evaluate()}`);
    }
}
