/* eslint-disable no-console */
// AoC Day 21 Challenge

export { dayTwentyOnePartOne, dayTwentyOnePartTwo };

/*
// Test values
const startingSquares: number[] = [4, 8];
*/

// Real values
const startingSquares: number[] = [10, 6];

class Player {
    constructor(id: number) {
        this.id = id;
        this.square = Infinity;
        this.score = 0;
    }

    playTurn(die: IDie): void {
        const rollsSum = die.roll() + die.roll() + die.roll();
        this.square += rollsSum;
        while (this.square > 10) {
            this.square -= 10;
        }
        this.score += this.square;
        console.log(`Player: ${this.id} Square: ${this.square} Score: ${this.score}`);
    }

    getScore(): number {
        return this.score;
    }

    getSqure(): number {
        return this.square;
    }

    start(square: number): void {
        this.square = square;
        this.score = 0;
    }

    readonly id: number;
    private score: number;
    private square: number;
}

interface IDie {
    roll(): number;
    getRolled(): number;
    reset(): void;
}
class DeterministicDie implements IDie {
    constructor() {
        this.current = 1;
        this.rolled = 0;
    }

    reset(): void {
        this.current = 1;
        this.rolled = 0;
    }

    roll(): number {
        const value = this.current;
        this.rolled++;
        this.current++;
        if (this.current > 100) {
            this.current -= 100;
        }
        console.log(`Roll: ${value}`);
        return value;
    }

    getRolled(): number {
        return this.rolled;
    }

    private current: number;
    private rolled: number;
}

function dayTwentyOnePartOne(): void {
    const players: Player[] = [new Player(0), new Player(1)];
    const maximumScore = 1000;
    const die = new DeterministicDie();
    for (let i = 0; i < players.length; i++) {
        players[i].start(startingSquares[i]);
    }
    let isLoop = true;
    while (isLoop) {
        for (const player of players) {
            player.playTurn(die);
            if (player.getScore() >= maximumScore) {
                isLoop = false;
                break;
            }
        }
    }

    for (const player of players) {
        console.log(`Player: ${player.id} ${die.getRolled() * player.getScore()}`);
    }
}

function dayTwentyOnePartTwo(): void {
    // todo
}
