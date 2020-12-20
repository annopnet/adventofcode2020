import { FileReader } from '../shared/FileReader';
const main = () => {
    test();
    const input = new FileReader('/day02/input1.txt').getArrayByDelimiter('\r\n');
    let answer = execution1(input);
    console.log(`part1:${answer}`);
    answer = execution2(input);
    console.log(`part2:${answer}`);
};

const test = () => {
    const input = new FileReader('/day02/test.txt').getArrayByDelimiter('\r\n');
    console.log(input);
    let answer = execution1(input);
    console.log(answer);
    answer = execution2(input);
    console.log(answer);
};

const execution1 = (input: Array<string>) => {
    let total = 0;
    input.map((line:string) => {
        const min = parseInt((line.split('-')[0] || '').trim());
        const max = parseInt(line.slice(line.indexOf('-') + 1,line.indexOf('-') + 3).trim());
        const password = line.slice(line.indexOf(':') + 1).trim();
        const char = line.slice(line.indexOf(':')-1,line.indexOf(':')).trim();

        const count = (password.match(new RegExp(char, 'g')) || []).length;
        return total += (min <= count && count <= max) ? 1 : 0;
    });
    return total;
};

const execution2 = (input: Array<string>) => {
    let total = 0;
    input.map((line:string) => {
        const first = parseInt((line.split('-')[0] || '').trim()) - 1;
        const second = parseInt(line.slice(line.indexOf('-') + 1,line.indexOf('-') + 3).trim()) - 1;
        const password = line.slice(line.indexOf(':') + 1).trim();
        const char = line.slice(line.indexOf(':')-1,line.indexOf(':')).trim();

        const invalid = password[first] === char && password[second] === char; 
        const valid = !invalid && (password[first] === char || password[second] === char);
        return total += valid ? 1 : 0;
    });
    return total;
};


main();