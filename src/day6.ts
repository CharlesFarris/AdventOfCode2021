// AoC Day 6 Challenge

// Test values
//const initialFish: number[] = [3, 4, 3, 1, 2];

// Real values
const initialFish : number[] = [4,1,1,1,5,1,3,1,5,3,4,3,3,1,3,3,1,5,3,2,4,4,3,4,1,4,2,2,1,3,5,1,1,3,2,5,1,1,4,2,5,4,3,2,5,3,3,4,5,4,3,5,4,2,5,5,2,2,2,3,5,5,4,2,1,1,5,1,4,3,2,2,1,2,1,5,3,3,3,5,1,5,4,2,2,2,1,4,2,5,2,3,3,2,3,4,4,1,4,4,3,1,1,1,1,1,4,4,5,4,2,5,1,5,4,4,5,2,3,5,4,1,4,5,2,1,1,2,5,4,5,5,1,1,1,1,1,4,5,3,1,3,4,3,3,1,5,4,2,1,4,4,4,1,1,3,1,3,5,3,1,4,5,3,5,1,1,2,2,4,4,1,4,1,3,1,1,3,1,3,3,5,4,2,1,1,2,1,2,3,3,5,4,1,1,2,1,2,5,3,1,5,4,3,1,5,2,3,4,4,3,1,1,1,2,1,1,2,1,5,4,2,2,1,4,3,1,1,1,1,3,1,5,2,4,1,3,2,3,4,3,4,2,1,2,1,2,4,2,1,5,2,2,5,5,1,1,2,3,1,1,1,3,5,1,3,5,1,3,3,2,4,5,5,3,1,4,1,5,2,4,5,5,5,2,4,2,2,5,2,4,1,3,2,1,1,4,4,1,5];

export { daySixPartOne, daySixPartTwo };

function daySixPartOne() {
    let fish = [...initialFish];
    const numberofDays = 80;
    for (let day = 0; day < numberofDays; day++) {
        //console.log("Day: " + day + ": " + fish.join());
        let count = fish.length;
        for (let i = 0; i < count; i++) {
            let time = fish[i];
            time--;
            if (time < 0) {
                time = 6;
                fish.push(8)
            }
            fish[i] = time;
        }
    }
    //console.log("Day: " + numberofDays + ": " + fish.join());
    console.log("Count: " + fish.length);
}

function daySixPartTwo() {

}