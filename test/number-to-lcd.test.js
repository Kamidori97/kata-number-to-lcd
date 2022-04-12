const NumberToLcd = require('../src/number-to-lcd');
const LCD_DIGITS = [
    ' _ \n' +
    '| |\n' +
    '|_|\n',
    '   \n' +
    '  |\n' +
    '  |\n',
    ' _ \n' +
    ' _|\n' +
    '|_ \n',
    ' _ \n' +
    ' _|\n' +
    ' _|\n',
    '   \n' +
    '|_|\n' +
    '  |\n',
    ' _ \n' +
    '|_ \n' +
    ' _|\n',
    ' _ \n' +
    '|_ \n' +
    '|_|\n',
    ' _ \n' +
    '  |\n' +
    '  |\n',
    ' _ \n' +
    '|_|\n' +
    '|_|\n',
    ' _ \n' +
    '|_|\n' +
    ' _|\n',
];

describe('Convert number to LCD', () => {
    describe('Fail test', () => {
        it('Should throw error if argument not a number or null', () => {
            expect(() => NumberToLcd.convertToLCD('this is a number?'))
                .toThrow('Argument must be a number!');
        });
    });

    describe('Single number', () => {
        LCD_DIGITS.forEach((digit, index) => {
            it(`Should return LCD digit ${index}`, () => {
                const result = NumberToLcd.convertToLCD(index);
                const expectedResult = digit;

            expect(result).toBe(expectedResult);
            });
        });
    });

    describe('2-digit numbers', () => {
        it('Should return LCD digit 69', () => {
            const result = NumberToLcd.convertToLCD(69);
            const expectedResult = '' +
                ' _  _ \n' +
                '|_ |_|\n' +
                '|_| _|\n';

            expect(result).toBe(expectedResult);
        });
    });

    describe('Change height and width of the LCD digits', () => {
        it('Should return LCD digit 2 with width 3 and height 2', () => {
            const result = NumberToLcd.convertToLCD(2, { width: 3, height: 2 });
            const expectedResult = '' +
                ' ___ \n' +
                '    |\n' +
                ' ___|\n' +
                '|    \n' +
                '|___ \n';

            expect(result).toBe(expectedResult);
        });

        it('Should return LCD digit 69 with width 1 and height 3 if width less than 1', () => {
            const result = NumberToLcd.convertToLCD(69, { width: -10, height: 3 });
            const expectedResult = '' +
                ' _  _ \n' +
                '|  | |\n' +
                '|  | |\n' +
                '|_ |_|\n' +
                '| |  |\n' +
                '| |  |\n' +
                '|_| _|\n';

            expect(result).toBe(expectedResult);
        });

        it('Should return LCD digit 69 with width 3 and height 1 if height less than 1', () => {
            const result = NumberToLcd.convertToLCD(69, { width: 3, height: -10000 });
            const expectedResult = '' +
                ' ___  ___ \n' +
                '|___ |___|\n' +
                '|___| ___|\n';

            expect(result).toBe(expectedResult);
        });
    });
});