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

export function readNumber(n) {
    n = n * 1;
    if (isNaN(n)) {
        return 'PLEASE, ONLY NUMBERS';
    }

    if (n < 20) {
        return NUMBER_TO_TEXT[n];
    }

    // now we know n is larger than 19

    if (n < 100) {
        let order1 = n % 10;
        let order10 = Math.floor(n / 10) * 10;

        let text = NUMBER_TO_TEXT[order10];
        if (order1 > 0) {
            text += ' ' + NUMBER_TO_TEXT[order1];
        }

        return text;
    }

    // now we know n is larger than 99

    if (n < 1000) {
        let order100 = Math.floor(n / 100);
        let hudredStart = NUMBER_TO_TEXT[order100] + ' hundred';
        let rest = n - order100 * 100;

        return hudredStart + ' & ' + readNumber(rest);
    }

    // now we know n is larger than 1000

    if (n < 10000) {
        let order1000 = Math.floor(n / 1000);
        let thousandStart = NUMBER_TO_TEXT[order1000] + ' thousand';
        let restNum = n - order1000 * 1000;

        return thousandStart + ' & ' + readNumber(restNum);
    }

    // now we know n is larger than 10000

    if (n < 20000) {
        let order10000 = Math.floor(n / 1000);
        let hundredThousandStart = NUMBER_TO_TEXT[order10000] + ' thousand';
        let restNumb = n - order10000 * 1000;

        return hundredThousandStart + ' & ' + readNumber(restNumb);
    }

    // now we know n is larger than 20000

    if (n < 100000) {
        let firstOrder = Math.floor(n / 10000) * 10;
        let secondOrder = Math.floor((n % 10000) / 1000);
        let hundredThousandStarter = NUMBER_TO_TEXT[firstOrder] + NUMBER_TO_TEXT[secondOrder] + ' thousand';
        let result = Math.floor(n % 1000);

        return hundredThousandStarter + ' & ' + readNumber(result);
    }

    return 'I STILL DO NOT KNOW HOW TO READ THIS NUMBER!'
}