const NUMBER_TO_TEXT = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '10': 'ten',
    '11': 'eleven',
    '12': 'twelve',
    '13': 'thirteen',
    '14': 'fourteen',
    '15': 'fifteen',
    '16': 'sixteen',
    '17': 'seventeen',
    '18': 'eighteen',
    '19': 'nineteen',

    '20': 'twenty',
    '30': 'thirty',
    '40': 'fourty',
    '50': 'fifty',
    '60': 'sixty',
    '70': 'seventy',
    '80': 'eighty',
    '90': 'ninty',

}


function read3Digit(n) {
    n = n * 1;
    if (isNaN(n)) {
        return 'PLEASE, ONLY NUMBERS';
    }

    // 0..19
    if (n < 20) {
        return NUMBER_TO_TEXT[n];
    }

    // 20..99
    if (n < 100) {
        let order1 = n % 10;
        let order10 = Math.floor(n / 10) * 10;

        let text = NUMBER_TO_TEXT[order10];
        if (order1 > 0) {
            text += ' ' + NUMBER_TO_TEXT[order1];
        }

        return text;
    }

    // 100..999
    if (n < 1000) {
        let order100 = Math.floor(n / 100);
        let hudredStart = NUMBER_TO_TEXT[order100] + ' hundred';
        let rest = n - order100 * 100;

        return hudredStart + (rest > 0 ? ' & ' + readNumber(rest) : '');
    }

    return 'ERROR'
}

export function readNumber(n) {
    n = n * 1;
    if (n < 1000) {
        return read3Digit(n);
    }

    // 1,000..999,000
    if (n < 1000000) {
        let first3Digits = Math.floor(n / 1000);
        let second3Digits = n - first3Digits * 1000;

        return read3Digit(first3Digits) + ' thousand ' + (second3Digits > 0 ? ' & ' + read3Digit(second3Digits) : '');
    }

    // 999,000..999,999,999
    if (n < 1000000000) {
        let first3Digit = Math.floor(n / 1000000);
        let second3Digit = n - first3Digit * 1000000;

        return read3Digit(first3Digit) + ' million ' + (second3Digit > 0 ? ' & ' + readNumber(second3Digit) : '');
    }

    // 999,999,999..999,999,999,999
    if (n < 1000000000000) {
        let firstThreeDigits = Math.floor(n / 1000000000);;
        let secondThreeDigit = n - firstThreeDigits * 1000000000;

        return read3Digit(firstThreeDigits) + ' billion ' + (secondThreeDigit > 0 ? ' & ' + readNumber(secondThreeDigit) : '');
    }

    // 999,999,999,999..999,999,999,999,999
    if (n < 1000000000000000) {
        let firstThreeDigits = Math.floor(n / 1000000000000);;
        let secondThreeDigit = n - firstThreeDigits * 1000000000000;

        return read3Digit(firstThreeDigits) + ' trillion ' + (secondThreeDigit > 0 ? ' & ' + readNumber(secondThreeDigit) : '');
    }
    return 'I STILL DO NOT KNOW HOW TO READ THIS NUMBER!'
}