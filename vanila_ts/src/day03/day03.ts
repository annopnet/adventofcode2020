import { ReplaceAt } from '../shared/Utility';

export function executionDay3_1(input: string[], debug?: boolean): number {
    return customMove(3, 1, input, debug);
};

export function executionDay3_2(input: string[], debug?: boolean): number {
    const move1 = customMove(1, 1, input, debug);
    const move2 = customMove(3, 1, input, debug);
    const move3 = customMove(5, 1, input, debug);
    const move4 = customMove(7, 1, input, debug);
    const move5 = customMove(1, 2, input, debug);
    return move1 * move2 * move3 * move4 * move5;
};

const customMove = (x:number, y:number, input: string[], debug?:boolean):number => {
    if (debug) console.log(input);
    const xMax = input[0].length;
    let position = {x:0,y:0};
    let treeCount = 0;
    let output = [];
    output.push(input[0] + ':0');
    while (position.y < input.length - 1) {
        position.x = (position.x + x) % xMax;
        position.y += y;
        if (input[position.y][position.x] === '#') {
            treeCount++;
            output.push(ReplaceAt(input[position.y], position.x, 'O') + ':' + position.y);
        } else {
            output.push(ReplaceAt(input[position.y], position.x, 'X') + ':' + position.y);
        }
    }
    if (debug) console.log(output);
    return treeCount;
};