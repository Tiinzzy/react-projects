export const body = [
    ['row1, col1', 'row1, col2', 'row1, col3'],
    ['row2, col1', 'row2, col2', 'row2, col3'],
    ['row3, col1', 'row3, col2', 'row3, col3']
];

export const ALL_HOUSES = ['row1, col1', 'row1, col2', 'row1, col3',
    'row2, col1', 'row2, col2', 'row2, col3',
    'row3, col1', 'row3, col2', 'row3, col3'];

export const CORNERS = ['row1, col1', 'row1, col3', 'row3, col1', 'row3, col3'];

export const CENTER = ['row2, col2'];

export const EDGES = ['row1, col2', 'row2, col1', 'row2, col3', 'row3, col2'];

export const ROW_OPPOSITE_EDGES = ['row2, col1', 'row2, col3'];

export const COLUMN_OPPOSITE_EDGES = ['row1, col2', 'row3, col2'];

export const WINNING_POSSIBILITIES = [
    ['row1, col1', 'row1, col2', 'row1, col3'],
    ['row2, col1', 'row2, col2', 'row2, col3'],
    ['row3, col1', 'row3, col2', 'row3, col3'],
    ['row1, col1', 'row2, col1', 'row3, col1'],
    ['row1, col2', 'row2, col2', 'row3, col2'],
    ['row1, col3', 'row2, col3', 'row3, col3'],
    ['row1, col1', 'row2, col2', 'row3, col3'],
    ['row1, col3', 'row2, col2', 'row3, col1']
];

export let OCCUPIED_HOUSES = [];

export let USER_CHOICES = [['', '', ''],
['', '', ''],
['', '', '']];

export function pushResultIntoBox(anySelect) {
    OCCUPIED_HOUSES.push(anySelect);
    if (OCCUPIED_HOUSES.length < 9) {
        document.getElementById(anySelect);
        document.getElementById(anySelect).textContent = "O";
    } else {
        return null;
    }
}

export function checkForEmptyHouse(selectedPosition) {
    let emptyHouses = [];
    selectedPosition.forEach(e => {
        if (OCCUPIED_HOUSES.includes(e)) {
            return
        } else {
            emptyHouses.push(e)
        }
    });
    return emptyHouses;
}

export function pushIntoNotEmpty(e) {
    let column;
    if (e.startsWith('row1')) {
        column = e.replace('row1, ', '').trim();
        if (column === 'col1') {
            USER_CHOICES[0][0] = e
        } else if (column === 'col2') {
            USER_CHOICES[0][1] = e

        } else if (column === 'col3') {
            USER_CHOICES[0][2] = e
        }
    } else if (e.startsWith('row2')) {
        column = e.replace('row2, ', '').trim();
        if (column === 'col1') {
            USER_CHOICES[1][0] = e
        } else if (column === 'col2') {
            USER_CHOICES[1][1] = e

        } else if (column === 'col3') {
            USER_CHOICES[1][2] = e
        }
    } else if (e.startsWith('row3')) {
        column = e.replace('row3, ', '').trim();
        if (column === 'col1') {
            USER_CHOICES[2][0] = e
        } else if (column === 'col2') {
            USER_CHOICES[2][1] = e

        } else if (column === 'col3') {
            USER_CHOICES[2][2] = e
        }
    }
}

export function checkForWin() {
    for (let i = 0; i < WINNING_POSSIBILITIES.length; i++) {
        if (WINNING_POSSIBILITIES[i] === USER_CHOICES[0] || WINNING_POSSIBILITIES[i] === USER_CHOICES[1] || WINNING_POSSIBILITIES[i] === USER_CHOICES[2]) {
            return 'win'
        }
    }
}