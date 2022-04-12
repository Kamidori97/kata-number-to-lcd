const { LCD_DIGITS } = require('./lcd-numbers');

class NumberToLcd {
    convertToLCD = (numbers, scale = { width: 1, height: 1 }) => {
        if (!/^\d+$/.test(numbers)) {
            throw new Error('Argument must be a number!');
        }

        const splitNumber = numbers.toString().split('');
        const digitLines = [];

        for (const number of splitNumber) {
            digitLines.push(this.lcdDigit(number, scale));
        }

        return digitLines
            .reduce((lines, digit) => lines.map((line, index) => line + digit[index]))
            .join('\n') + '\n';
    }

    lcdDigit = (number, scale) => {
        let { width, height } = scale;
        if (width < 1) {
            width = 1;
        }

        if (height < 1) {
            height = 1;
        }

        const lcdDigit = LCD_DIGITS[number];
        const EMPTY = ' ';

        const [
            [ LEFT_TOP, TOP, RIGHT_TOP ],
            [ LEFT_CENTER, CENTER, RIGHT_CENTER ],
            [ LEFT_BOTTOM, BOTTOM, RIGHT_BOTTOM ]
        ] = lcdDigit.split('\n');

        return [
            LEFT_TOP + TOP.repeat(width) + RIGHT_TOP,
            ...this.copy(height - 1, LEFT_CENTER + EMPTY.repeat(width) + RIGHT_CENTER),
            LEFT_CENTER + CENTER.repeat(width) + RIGHT_CENTER,
            ...this.copy(height - 1, LEFT_BOTTOM + EMPTY.repeat(width) + RIGHT_BOTTOM),
            LEFT_BOTTOM + BOTTOM.repeat(width) + RIGHT_BOTTOM,
        ];
    }

    copy = (count, element) => {
        return Array(count).fill(element);
    }
}

module.exports = new NumberToLcd();