import chalk from 'chalk';

module Logger {
    export function AssertDescribe(text:string) {
        console.log(chalk.yellow(text));
    }

    export function AssertPass(text:string) {
        console.log(chalk.greenBright(text));
    }
}

export { Logger };