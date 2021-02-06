import assert from 'assert';
import { FileReader } from '../shared/FileReader';
import { Logger } from '../shared/TestUtility';
import { executionDay3_1, executionDay3_2 } from './day03';

const sampleTest = () => {
    const testInput = new FileReader('/day03/test.txt').getArrayByDelimiter('\r\n');
    Logger.AssertDescribe('executionDay3_1 with sample data should get the correct result:');
    assert.strictEqual(executionDay3_1(testInput),7);
    Logger.AssertPass('PASS');

    Logger.AssertDescribe('executionDay3_2 with sample data should get the correct result:');
    assert.strictEqual(executionDay3_2(testInput), 336);
    Logger.AssertPass('PASS');
};

const mainTest = () => {
    const mainInput = new FileReader('/day03/input1.txt').getArrayByDelimiter('\r\n');
    Logger.AssertDescribe('executionDay3_1 with main data 1 should get the correct result:');
    assert.strictEqual(executionDay3_1(mainInput), 187);
    Logger.AssertPass('PASS');

    Logger.AssertDescribe('executionDay3_2 with sample data should get the correct result:');
    assert.strictEqual(executionDay3_2(mainInput), 4723283400);
    Logger.AssertPass('PASS');
};


const mainTestDay03 = () => {
    sampleTest();
    mainTest();
};

export { mainTestDay03 };