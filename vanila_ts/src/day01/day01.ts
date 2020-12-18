import { FileReader } from '../shared/FileReader';
const main = () => {
    test();
    const input = new FileReader('/day01/input1.txt').getArrayByDelimiter('\r\n');
    let answer = execution1(input);
    console.log(`part1:${answer}`);
    answer = execution2(input);
    console.log(`part2:${answer}`);
};

const test = () => {
    const input = new FileReader('/day01/test.txt').getArrayByDelimiter('\r\n');
    console.log(input);
    const answer = execution1(input);
    console.log(answer);
};

const execution1 = (input: Array<string>):number => {
    const numbers = input.map((value) => parseInt(value));
    const sortedNumbers = numbers.sort((a, b) => { return a-b; });
    const year = 2020;
    let low = 0;
    let high = 0;
    for (let i = 0; i < sortedNumbers.length; i++) {
        low = sortedNumbers[i];
        const diff = year - low;
        for(let y = sortedNumbers.length -1; y > i && sortedNumbers[y] >= diff; y--) {
            if (sortedNumbers[y] === diff) {
                high = sortedNumbers[y];
                break;
            }
        }
        if (high !== 0) {
            break;
        }
    }        
    return low * high;
}

const execution2 = (input: Array<string>):number => {
    const numbers = new Array<number>();
    input.forEach((value:string) => {
        numbers.push(parseInt(value));
    });
    const sortedNumbers = numbers.sort((a, b) => { return a-b; });
    const year = 2020;
    let num1 = 0;
    let num2 = 0;
    let num3 = 0;
    for (let i = 0; i < sortedNumbers.length; i++) {
        num1 = sortedNumbers[i];
        const diff1 = year - num1;
        for(let y = i+1; y < sortedNumbers.length; y++) {
            num2 = sortedNumbers[y];
            const diff2 = diff1 - num2;
            if(diff2 < 0) {
                break;
            }
            for(let z = y+1; z < sortedNumbers.length; z++) {
                const diff3 = diff2 - sortedNumbers[z];
                console.log(`${diff1}+${diff2}+${diff3}`)
                if(diff3 < 0) {
                    break;
                }

                if (diff3 === 0) {
                    num3 = sortedNumbers[z];
                    break;
                } 
            }
            if (num3 !== 0) {
                break;
            }
        }
        if (num3 !== 0) {
            break;
        }
    }        
    console.log(`${num1}+${num2}+${num3}`);
    return num1 * num2 * num3;
}

main();
