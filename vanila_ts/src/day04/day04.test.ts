import assert from 'assert';
import { FileReader } from '../shared/FileReader';
import { Logger } from '../shared/TestUtility';
import { KeyValue } from '../shared/Utility';
import { executionDay4_1, executionDay4_2, getFields, getKeyValue, processInput, strictValidatePassport, validatePassport } from './day04';

const delimiter = '\r\n\r\n';

const processInputTestWithTestData = () => {
    const testInput = [
        {
            value: [
                'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\r\n' +
                'byr:1937 iyr:2017 cid:147 hgt:183cm\r\n'],
            expected: [
                'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm'],
        },
        {
            value : [
                'hcl:#ae17e1 iyr:2013\r\n' +
                'eyr:2024\r\n' +
                'ecl:brn pid:760753108 byr:1931\r\n' +
                'hgt:179cm\r\n',
                'hcl:#cfa07d eyr:2025 pid:166559648\r\n' +
                'iyr:2011 ecl:brn hgt:59in'],
            expected: [
                'hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm',
                'hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in'
            ]
        }
    ];

    Logger.AssertDescribe('processInput:---------------------------');
    testInput.forEach((input) => {
        processInputTest(input.value, input.expected);
    });
};

const processInputTest = (value: string[], expected: string[]) => {
    Logger.AssertDescribe(`it should get\r\n ${expected} \r\nwhen processing\r\n ${value}`);
    assert.deepStrictEqual(processInput(value),expected);
    Logger.AssertPass('PASS');
};

const passportTestInputValue = [
    {
        value: 'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm',
        expected: true,
        strictExpected: true,
    },
    {
        value: 'hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm',
        expected: true,
        strictExpected: true,
    },
    {
        value: 'hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in',
        expected: false,
        strictExpected: false,
    }
];

const validatePassportTestWithTestData = () => {
    Logger.AssertDescribe('validatePassport:---------------------------');
    passportTestInputValue.forEach((input) => {
        validatePassportTest(input.value, input.expected);
    });
    Logger.AssertDescribe('strictValidatePassport:---------------------------');
    passportTestInputValue.forEach((input) => {
        strictValidatePassportTest(input.value, input.strictExpected);
    });
};

const validatePassportTest = (value: string, expected: boolean) => {
    Logger.AssertDescribe(`it should ${expected ? 'VALID' : 'INVALID'} \r\nwhen validate:  ${value}`);
    assert.strictEqual(validatePassport(value), expected);
    Logger.AssertPass('PASS');
};

const strictValidatePassportTest = (value: string, expected: boolean) => {
    Logger.AssertDescribe(`it should get: ${expected ? 'VALID' : 'INVALID'} \r\nwhen strictly validate:  ${value}`);
    assert.strictEqual(strictValidatePassport(value), expected);
    Logger.AssertPass('PASS');
};

const getValueTestWithTestData = () => {
    const testInput = [
        {
            value: 'negativetest',
            expected: {} as KeyValue,
        },
        {
            value: 'eyr:2020',
            expected: {
                key: 'eyr',
                value: '2020',
            },
        },
        {
            value: 'hcl:#fffffd',
            expected: {
                key: 'hcl',
                value: '#fffffd',
            },
        }
    ];
    Logger.AssertDescribe('getValue:---------------------------');
    testInput.forEach((input) => {
        getValueTest(input.value, input.expected);
    });
};

const getValueTest = (value:string, expected: KeyValue) => {
    Logger.AssertDescribe(`it should get: ${JSON.stringify(expected)} \r\nwhen get from:  ${value}`);
    assert.deepStrictEqual(getKeyValue(value), expected);
    Logger.AssertPass('PASS');
};

const getFieldsTest = () => {
    Logger.AssertDescribe('getFields:---------------------------');
    const value = 'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm';
    const expected = [
        { key: 'ecl', value: 'gry' },
        { key: 'pid', value: '860033327' },
        { key: 'eyr', value: '2020' },
        { key: 'hcl', value: '#fffffd' },
        { key: 'byr', value: '1937' },
        { key: 'iyr', value: '2017' },
        { key: 'cid', value: '147' },
        { key: 'hgt', value: '183cm' },
    ]
    Logger.AssertDescribe(`it should get: ${JSON.stringify(expected)} \r\nwhen get from:  ${value}`);
    assert.deepStrictEqual(getFields(value), expected);
    Logger.AssertPass('PASS');
};

const sampleTest = () => {
    const testInput = new FileReader('/day04/test.txt').getArrayByDelimiter(delimiter);
    const result1 = executionDay4_1(testInput);
    Logger.AssertDescribe(`executionDay4_1 with sample data should get the correct result: ${result1}`);
    assert.strictEqual(result1, 7);
    Logger.AssertPass('PASS');

    Logger.AssertDescribe('executionDay4_2 with sample data should get the correct result:');
    assert.strictEqual(executionDay4_2(testInput), 3);
    Logger.AssertPass('PASS');
};

const mainTest = () => {
    const mainInput = new FileReader('/day04/input1.txt').getArrayByDelimiter(delimiter);
    console.log('data count: ' + mainInput.length);
    Logger.AssertDescribe('executionDay4_1 with main data 1 should get the correct result:');
    assert.strictEqual(executionDay4_1(mainInput), 202);
    Logger.AssertPass('PASS');

    Logger.AssertDescribe('executionDay4_2 with sample data should get the correct result:');
    assert.strictEqual(executionDay4_2(mainInput), 138);
    Logger.AssertPass('PASS');
};


const mainTestDay04 = () => {
    Logger.AssertDescribe('Day 04: ---------------------------------------');
    processInputTestWithTestData();
    validatePassportTestWithTestData();
    getValueTestWithTestData();
    getFieldsTest();
    sampleTest();
    mainTest();
};
export { mainTestDay04 };