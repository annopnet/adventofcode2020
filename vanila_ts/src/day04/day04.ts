import { ImportsNotUsedAsValues } from 'typescript';
import { KeyValue } from '../shared/Utility';

export const processInput = (input: string[]): string[] => {
    return input.map((value) => { return value.split('\r\n').join(' ').trim()});
};

export const getKeyValue = (field: string): KeyValue => {
    if (!field.includes(':')) return {} as KeyValue;
    
    const splitInput = field.split(':');
    if (splitInput.length !== 2) return {} as KeyValue;
    
    return {
        key: splitInput[0],
        value: splitInput[1],
    };
};

export const getFields = (text: string): KeyValue[] => {
    if(!text) return [];
    const fields = text.split(' ');
    return fields.map(field => getKeyValue(field));
};

export const getStrictConditions = (): KeyValue[] => {
    return [
        { key: 'ecl', value: '^(amb|blu|brn|gry|grn|hzl|oth)$' },
        { key: 'pid', value: '^[0-9]{9}$' },
        { key: 'eyr', value: '^20(2[0-9]|30)$' },
        { key: 'hcl', value: '^#[0-9a-f]{6}$' },
        { key: 'byr', value: '^(19[2-9][0-9]|200[0-2])$' },
        { key: 'iyr', value: '^20(1[0-9]|20)$' },
        { key: 'hgt', value: '^(1([5-8][0-9]|9[0-3])cm)$|^((59|6[0-9]|7[0-6])in)$' },
    ];
};

export const validatePassport = (rawFields: string): boolean => {
    const conditions = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const conditions_optional = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
    const fields = getFields(rawFields);
    console.log('fields count:' + fields.length);
    const mainValidation = fields.length === 7 && conditions.every((condition) => {
        return fields.find(_ => _.key === condition)});
    console.log('main: ' + mainValidation);
    const optionalValidation = fields.length === 8 && conditions_optional.every((condition) => {
        return fields.find(_ => _.key === condition)});
    console.log('optional: ' + optionalValidation);
    return mainValidation || optionalValidation;
};

export const strictValidatePassport = (rawFields: string): boolean => {
    if (!validatePassport(rawFields)) return false;
    console.log('fields: ' + rawFields);
    const conditions = getStrictConditions();
    const fields = getFields(rawFields);
    // todo: running out of battery should split this in to anoter method to test
    return conditions.every((condition) => {
        return fields.find(_ => _.key === condition.key)?.value?.match(new RegExp(condition?.value ?? '', 'g')) ?? false;
    });
};

export const manualValidatePassport = (rawFields: string): boolean => {
    const conditions = getStrictConditions();
    const fields = getFields(rawFields);
    let isValid = true;
    conditions.forEach((condition) => {
        if (isValid) {
            const field = fields.find(_ => _.key === condition.key);
            if (!field || !field.value) {
                isValid = false;
            } else {
                switch(condition.key) {
                    case 'byr':
                        if (field.value.length === 4 ) {
                            const year = parseInt(field.value);
                            if (!isNaN(year) && year >= 1920 && year <= 2002) {
                                break;
                            }
                        } 
                        isValid = false;
                        break;
                    case 'iyr' : 
                        if (field.value.length === 4) {
                            const year = parseInt(field.value);
                            if (!isNaN(year) && year >= 2010 && year <= 2020) {
                                break;
                            }
                        } 
                        isValid = false;
                        break;
                    case 'eyr': 
                        if (field.value.length === 4) {
                            const year = parseInt(field.value);
                            if (!isNaN(year) && year >= 2020 && year <= 2030) {
                                break;
                            }
                        } 
                        isValid = false;
                        break;
                    case 'hgt':
                        if (field.value.endsWith('cm')) {
                            const height = parseInt(field.value.replace('cm',''));
                            if (!isNaN(height) && height >= 150 && height <= 193) {
                                break;
                            }
                        } else if (field.value.endsWith('in')) {
                            const height = parseInt(field.value.replace('in',''));
                            if (!isNaN(height) && height >= 59 && height <= 76) {
                                break;
                            }
                        }
                        isValid = false;
                        break;
                    case 'hcl':
                        if (field.value.match(/^#[0-9A-Za-z]{6}$/g)) {
                            break;
                        }
                        isValid = false;
                        break;
                    case 'ecl':
                        if (field.value === 'amb' ||
                            field.value === 'blu' ||
                            field.value === 'brn' ||
                            field.value === 'gry' ||
                            field.value === 'grn' ||
                            field.value === 'hzl' ||
                            field.value === 'oth') {
                            break;
                        }
                        isValid = false;
                        break;
                    case 'pid':
                        if (field.value.length === 9 && !isNaN(parseInt(field.value))) {
                            break;
                        }
                        isValid = false;
                        break;
                }
            }
        }
    });
    return isValid;
};

export const executionDay4_1 = (input: string[]):number => {
    const processedInput = processInput(input);
    let validCount = 0;
    processedInput.forEach((value) => {
        validCount += validatePassport(value) ? 1 : 0;
    });
    return validCount;
};

export const executionDay4_2 = (input: string[]):number => {
    console.log(input.length);
    const processedInput = processInput(input);
    console.log(processedInput.length);
    let validCount2 = 0;
    processedInput.forEach((value) => {
        const strictValidation = strictValidatePassport(value);
        console.log('strict: ' + strictValidation);
        validCount2 += strictValidation ? 1 : 0;
        console.log('valid count: ' + validCount2);
    });
    return validCount2;
};