import { XMLHttpRequest } from 'xmlhttprequest-ts';

class FileReader {
    private defaultAbsolutePath = '/Users/DELL/Documents/Code/Advent2020/adventofcode2020/vanila_ts/input_files'
    private fileBody = '';
    constructor(path: string) {
        if(path) {
            this.ReadFile(path);
        } 
    }

    getFileBody(): string {
        return this.fileBody;
    }

    getArrayByDelimiter(delimiter: string):Array<string> {
        if(!this.fileBody) {
            return [];
        }
        return this.fileBody.split(delimiter);
    }

    private ReadFile = (path: string): void => {
        const filePath = `file://${this.defaultAbsolutePath}${path}`;
        const rawFile = new XMLHttpRequest();
        try {
            rawFile.open('GET', filePath, false);
            rawFile.onreadystatechange = () => {
                if(rawFile.readyState === 4) {
                    if(rawFile.status === 200 || rawFile.status == 0) {
                        this.fileBody = rawFile.responseText;
                    }
                }
            }
            rawFile.send(null);
        } catch {
            // do nothing
        }
    };
};
export { FileReader };