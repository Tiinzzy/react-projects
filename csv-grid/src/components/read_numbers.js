const NUMBER_TO_TEXT = {
    '0': 'zero',
    '1': 'One',
    '2': 'Two',
    '3': 'Three',
    '4': 'Four',
    '5': 'Five',
    '6': 'Six',
    '7': 'Seven',
    '8': 'Eight',
    '9': 'Nine',
    '10': 'Ten',
    '11': 'Eleven',
    '12': 'Twelve',
    '13': 'Thirteen',
    '14': 'Fourteen',
    '15': 'Fifteen',
    '16': 'Sixteen',
    '17': 'Seventeen',
    '18': 'Eighteen',
    '19': 'Nineteen',
    '20': 'Twenty',
    '30': 'Thirty',
    '40': 'Fourty',
    '50': 'Fifty',
    '60': 'Sixty',
    '70': 'Seventy',
    '80': 'Eighty',
    '90': 'Ninty',
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
        let hudredStart = NUMBER_TO_TEXT[order100] + ' Hundred';
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

        return read3Digit(first3Digits) + ' Thousand ' + (second3Digits > 0 ? ' break ' + read3Digit(second3Digits) : '');
    }

    // 999,000..999,999,999
    if (n < 1000000000) {
        let first3Digit = Math.floor(n / 1000000);
        let second3Digit = n - first3Digit * 1000000;

        return read3Digit(first3Digit) + ' Million ' + (second3Digit > 0 ? ' break ' + readNumber(second3Digit) : '');
    }

    // 999,999,999..999,999,999,999
    if (n < 1000000000000) {
        let firstThreeDigits = Math.floor(n / 1000000000);;
        let secondThreeDigit = n - firstThreeDigits * 1000000000;

        return read3Digit(firstThreeDigits) + ' Billion ' + (secondThreeDigit > 0 ? ' break ' + readNumber(secondThreeDigit) : '');
    }

    // 999,999,999,999..999,999,999,999,999
    if (n < 1000000000000000) {
        let firstThreeDigits = Math.floor(n / 1000000000000);;
        let secondThreeDigit = n - firstThreeDigits * 1000000000000;

        return read3Digit(firstThreeDigits) + ' Trillion ' + (secondThreeDigit > 0 ? ' break ' + readNumber(secondThreeDigit) : '');
    }
    return 'I STILL DO NOT KNOW HOW TO READ THIS NUMBER!'
}