import { Alu } from "./alu";

test("constructor", () => {
    const alu = new Alu();
    const variables = alu.getVariables();
    expect(variables.length).toBe(4);
    expect(variables[0]).toBe(0);
    expect(variables[1]).toBe(0);
    expect(variables[2]).toBe(0);
    expect(variables[3]).toBe(0);
});

test("compile", () => {
    const alu = new Alu();

    const lines1: string[] = ["inp x", "inp y", "inp z", "inp w"];
    const instructions1 = alu.compile(lines1);
    expect(instructions1.length).toBe(4);

    expect(instructions1[0].length).toBe(2);
    expect(instructions1[0][0]).toBe(0);
    expect(instructions1[0][1]).toBe(0);

    expect(instructions1[1].length).toBe(2);
    expect(instructions1[1][0]).toBe(0);
    expect(instructions1[1][1]).toBe(1);

    expect(instructions1[2].length).toBe(2);
    expect(instructions1[2][0]).toBe(0);
    expect(instructions1[2][1]).toBe(2);

    expect(instructions1[3].length).toBe(2);
    expect(instructions1[3][0]).toBe(0);
    expect(instructions1[3][1]).toBe(3);

    const lines2: string[] = ["add y z", "add w 123"];
    const instructions2 = alu.compile(lines2);
    expect(instructions2.length).toBe(2);

    expect(instructions2[0].length).toBe(4);
    expect(instructions2[0][0]).toBe(1);
    expect(instructions2[0][1]).toBe(1);
    expect(instructions2[0][2]).toBe(1);
    expect(instructions2[0][3]).toBe(2);

    expect(instructions2[1].length).toBe(4);
    expect(instructions2[1][0]).toBe(1);
    expect(instructions2[1][1]).toBe(3);
    expect(instructions2[1][2]).toBe(0);
    expect(instructions2[1][3]).toBe(123);

    const lines3: string[] = ["mul y z", "mul w 123"];
    const instructions3 = alu.compile(lines3);
    expect(instructions3.length).toBe(2);

    expect(instructions3[0].length).toBe(4);
    expect(instructions3[0][0]).toBe(2);
    expect(instructions3[0][1]).toBe(1);
    expect(instructions3[0][2]).toBe(1);
    expect(instructions3[0][3]).toBe(2);

    expect(instructions3[1].length).toBe(4);
    expect(instructions3[1][0]).toBe(2);
    expect(instructions3[1][1]).toBe(3);
    expect(instructions3[1][2]).toBe(0);
    expect(instructions2[1][3]).toBe(123);

    const lines4: string[] = ["div y z", "div w 123"];
    const instructions4 = alu.compile(lines4);
    expect(instructions4.length).toBe(2);

    expect(instructions4[0].length).toBe(4);
    expect(instructions4[0][0]).toBe(3);
    expect(instructions4[0][1]).toBe(1);
    expect(instructions4[0][2]).toBe(1);
    expect(instructions4[0][3]).toBe(2);

    expect(instructions4[1].length).toBe(4);
    expect(instructions4[1][0]).toBe(3);
    expect(instructions4[1][1]).toBe(3);
    expect(instructions4[1][2]).toBe(0);
    expect(instructions4[1][3]).toBe(123);

    const lines5: string[] = ["mod y z", "mod w 123"];
    const instructions5 = alu.compile(lines5);
    expect(instructions5.length).toBe(2);

    expect(instructions5[0].length).toBe(4);
    expect(instructions5[0][0]).toBe(4);
    expect(instructions5[0][1]).toBe(1);
    expect(instructions5[0][2]).toBe(1);
    expect(instructions5[0][3]).toBe(2);

    expect(instructions5[1].length).toBe(4);
    expect(instructions5[1][0]).toBe(4);
    expect(instructions5[1][1]).toBe(3);
    expect(instructions5[1][2]).toBe(0);
    expect(instructions5[1][3]).toBe(123);

    const lines6: string[] = ["eql y z", "eql w 123"];
    const instructions6 = alu.compile(lines6);
    expect(instructions6.length).toBe(2);

    expect(instructions6[0].length).toBe(4);
    expect(instructions6[0][0]).toBe(5);
    expect(instructions6[0][1]).toBe(1);
    expect(instructions6[0][2]).toBe(1);
    expect(instructions6[0][3]).toBe(2);

    expect(instructions6[1].length).toBe(4);
    expect(instructions6[1][0]).toBe(5);
    expect(instructions6[1][1]).toBe(3);
    expect(instructions6[1][2]).toBe(0);
    expect(instructions6[1][3]).toBe(123);
});

test("execute inp", () => {
    const alu = new Alu();

    const queue: number[] = [1, 2, 3];
    const lines: string[] = ["inp y", "inp z", "inp w"];
    const instructions = alu.compile(lines);

    alu.execute(instructions, queue);
    expect(alu.x()).toBe(0);
    expect(alu.y()).toBe(queue[0]);
    expect(alu.z()).toBe(queue[1]);
    expect(alu.w()).toBe(queue[2]);
});

test("execute add", () => {
    const alu = new Alu();

    const queue: number[] = [1, 2];
    const lines: string[] = ["inp x", "add x 10", "inp y", "add y x"];
    const instructions = alu.compile(lines);

    alu.execute(instructions, queue);
    expect(alu.x()).toBe(11);
    expect(alu.y()).toBe(13);
    expect(alu.z()).toBe(0);
    expect(alu.w()).toBe(0);
});

test("execute mul", () => {
    const alu = new Alu();

    const queue: number[] = [2, 3];
    const lines: string[] = ["inp x", "mul x 10", "inp y", "mul y x"];
    const instructions = alu.compile(lines);

    alu.execute(instructions, queue);
    expect(alu.x()).toBe(20);
    expect(alu.y()).toBe(60);
    expect(alu.z()).toBe(0);
    expect(alu.w()).toBe(0);
});

test("execute div", () => {
    const alu = new Alu();

    const queue: number[] = [36, 60];
    const lines: string[] = ["inp x", "div x 3", "inp y", "div y x"];
    const instructions = alu.compile(lines);

    alu.execute(instructions, queue);
    expect(alu.x()).toBe(12);
    expect(alu.y()).toBe(5);
    expect(alu.z()).toBe(0);
    expect(alu.w()).toBe(0);
});

test("execute mod", () => {
    const alu = new Alu();

    const queue: number[] = [5, 3];
    const lines: string[] = ["inp x", "mod x 3", "inp y", "div y x"];
    const instructions = alu.compile(lines);

    alu.execute(instructions, queue);
    expect(alu.x()).toBe(2);
    expect(alu.y()).toBe(1);
    expect(alu.z()).toBe(0);
    expect(alu.w()).toBe(0);
});

test("execute eql", () => {
    const alu = new Alu();

    const queue: number[] = [5, 1, 2, 1];
    const lines: string[] = ["inp x", "eql x 5", "inp y", "eql y x", "inp z", "eql z 1", "inp w", "eql z w"];
    const instructions = alu.compile(lines);

    alu.execute(instructions, queue);
    expect(alu.x()).toBe(1);
    expect(alu.y()).toBe(1);
    expect(alu.z()).toBe(0);
    expect(alu.w()).toBe(1);
});
