const ReplaceAt = function(source:string, index:number, replacement:string) {
    return source.substr(0, index) + replacement + source.substr(index + replacement.length);
}

class KeyValue {
    constructor(
        public key?: string,
        public value?: string,
    ) {}
};

export { ReplaceAt, KeyValue };