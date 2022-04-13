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
            expect(() => NumberToLcd.convertToLCD(''))
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
        it('Should throw error if argument not a numbers', () => {
            expect(() => NumberToLcd.manyToLCD('6ty9'))
                .toThrow('Argument must be a number!');
        });

        it('Should return LCD digit 69', () => {
            const result = NumberToLcd.manyToLCD(69);
            const expectedResult = '' +
                ' _  _ \n' +
                '|_ |_|\n' +
                '|_| _|\n';

            expect(result).toBe(expectedResult);
        });

        it('Should return LCD digit 0123456789', () => {
            const result = NumberToLcd.manyToLCD('0123456789');
            const expectedResult = '' +
                ' _     _  _     _  _  _  _  _ \n' +
                '| |  | _| _||_||_ |_   ||_||_|\n' +
                '|_|  ||_  _|  | _||_|  ||_| _|\n';

            expect(result).toBe(expectedResult);
        });
    });

    describe('Change height and width of the LCD digits', () => {
        it('Should return LCD digit 2 with width 3', () => {
            const width = 3;
            const digit = NumberToLcd.convertToLCD(2);
            const result = NumberToLcd.resizeDigitWidth(digit, width);
            const expectedResult = '' +
                ' ___ \n' +
                ' ___|\n' +
                '|___ \n';

            expect(result).toBe(expectedResult);
        });

        it('Should return LCD digit 3 with width 1 if width less than 1', () => {
            const width = -10;
            const digit = NumberToLcd.convertToLCD(3);
            const result = NumberToLcd.resizeDigitWidth(digit, width);
            const expectedResult = '' +
                ' _ \n' +
                ' _|\n' +
                ' _|\n';

            expect(result).toBe(expectedResult);
        });

        it('Should return LCD digit 6 with height 3', () => {
            const height = 3;
            const digit = NumberToLcd.convertToLCD(6)
            const result = NumberToLcd.resizeDigitHeight(digit, height);
            const expectedResult = '' +
                ' _ \n' +
                '|  \n' +
                '|  \n' +
                '|_ \n' +
                '| |\n' +
                '| |\n' +
                '|_|\n';

            expect(result).toBe(expectedResult);
        });

        it('Should return LCD digit 8 with height 1 if height less than 1 ', () => {
            const height = -3;
            const digit = NumberToLcd.convertToLCD(8)
            const result = NumberToLcd.resizeDigitHeight(digit, height);
            const expectedResult = '' +
                ' _ \n' +
                '|_|\n' +
                '|_|\n';

            expect(result).toBe(expectedResult);
        });

        it('Should return LCD digit 69 with width 3 and height 2', () => {
            const width = 3;
            const height = 2;
            const result = NumberToLcd.manyToLCD(69, { width, height });
            const expectedResult = '' +
                ' ___  ___ \n' +
                '|    |   |\n' +
                '|___ |___|\n' +
                '|   |    |\n' +
                '|___| ___|\n';

            expect(result).toBe(expectedResult);
        });

        it('Should return LCD digit 69 with width 3 and height 1 if height less than 1', () => {
            const width = 3;
            const height = -1000;
            const result = NumberToLcd.manyToLCD(69, { width, height });
            const expectedResult = '' +
                ' ___  ___ \n' +
                '|___ |___|\n' +
                '|___| ___|\n';

            expect(result).toBe(expectedResult);
        });

        it('Should return LCD digit 123 with width 1 and height 3 if width less than 1', () => {
            const width = -9999;
            const height = 3;
            const result = NumberToLcd.manyToLCD(123, { width, height });
            const expectedResult = '' +
                '    _  _ \n' +
                '  |  |  |\n' +
                '  |  |  |\n' +
                '  | _| _|\n' +
                '  ||    |\n' +
                '  ||    |\n' +
                '  ||_  _|\n';

            expect(result).toBe(expectedResult);
        });
    });
});