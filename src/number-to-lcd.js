const { LCD_DIGITS } = require('./lcd-numbers')

class NumberToLcd {
    convertToLCD = (number) => {
        this.validateNumber(number);

        return LCD_DIGITS[number];
    }

    manyToLCD = (numbers, scale = { width: 1, height: 1 }) => {
        this.validateNumber(numbers, true);

        const splitNumber = numbers.toString().split('');
        const digitLines = [];
        let { width, height } = scale;

        if (width < 1) width = 1;
        if (height < 1) height = 1;

        for (const number of splitNumber) {
            const lcdDigit = this.convertToLCD(number);

            digitLines.push(this.digitToDigitLine(lcdDigit, { width, height }));
        }

        return this.joinLCDDigitLines(digitLines);
    }

    resizeDigitWidth = (digit, width) => {
        width = width < 1 ? 1 : width;
        const height = 1;
        const digitLine = this.digitToDigitLine(digit, { width, height });

        return this.joinLCDDigitLines([digitLine]);
    }

    resizeDigitHeight = (digit, height) => {
        height = height < 1 ? 1 : height;
        const width = 1;
        const digitLine = this.digitToDigitLine(digit, { width, height });

        return this.joinLCDDigitLines([digitLine]);
    }

    digitToDigitLine = (digit, scale) => {
        let { width, height } = scale;
        const EMPTY = ' ';

        const [
            [ TOP_LEFT, TOP, TOP_RIGHT ],
            [ MIDDLE_LEFT, MIDDLE, MIDDLE_RIGHT ],
            [ BOTTOM_LEFT, BOTTOM, BOTTOM_RIGHT ]
        ] = digit.split('\n');

        return [
            TOP_LEFT + TOP.repeat(width) + TOP_RIGHT,
            ...this.copy(height - 1, MIDDLE_LEFT + EMPTY.repeat(width) + MIDDLE_RIGHT),
            MIDDLE_LEFT + MIDDLE.repeat(width) + MIDDLE_RIGHT,
            ...this.copy(height - 1, BOTTOM_LEFT + EMPTY.repeat(width) + BOTTOM_RIGHT),
            BOTTOM_LEFT + BOTTOM.repeat(width) + BOTTOM_RIGHT,
        ];
    }

    copy = (count, element) => {
        return Array(count).fill(element);
    }

    joinLCDDigitLines = (digitLines) => {
        return digitLines
            .reduce((lines, digit) => lines.map((line, index) => line + digit[index]))
            .join('\n') + '\n';
    }

    validateNumber = (number, isMany = false) => {
        const stringRegex = isMany ? '^\\d+$' : '^\\d$';
        const regex = new RegExp(stringRegex);

        if (!regex.test(number)) {
            throw new Error('Argument must be a number!');
        }
    }
}

module.exports = new NumberToLcd();