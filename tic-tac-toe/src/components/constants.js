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
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

export let OCCUPIED_HOUSES = [];

// export function pushResultIntoBox(anySelect) {
//     pushIntoNotEmpty(anySelect);
//     document.getElementById(anySelect);
//     document.getElementById(anySelect).textContent = "O";
// }

// export function checkForEmptyHouse(selectedPosition) {
//     let emptyHouses = [];
//     selectedPosition.forEach(e => {
//         if (notEmpty.includes(e)) {
//             return
//         } else {
//             pushIntoNotEmpty(e)
//         }
//     });
//     return notEmpty;
// }



export let fullHouses = [[, ,],
[, ,],
[, ,]];

export let userChoices = [[, ,],
[, ,],
[, ,]];
export let computerChoices = [[, ,],
[, ,],
[, ,]];

export function occupiedHouses(e, arr) {
    let column;
    if (e.startsWith('row1')) {
        column = e.replace('row1, ', '').trim();
        if (column === 'col1') {
            arr[0][0] = 0
        }
        else if (column === 'col2') {
            arr[0][1] = 1
        } else if (column === 'col3') {
            arr[0][2] = 2
        }
    } else if (e.startsWith('row2')) {
        column = e.replace('row2, ', '').trim();
        if (column === 'col1') {
            arr[1][0] = 3
        } else if (column === 'col2') {
            arr[1][1] = 4
        } else if (column === 'col3') {
            arr[1][2] = 5
        }
    } else if (e.startsWith('row3')) {
        column = e.replace('row3, ', '').trim();
        if (column === 'col1') {
            arr[2][0] = 6
        } else if (column === 'col2') {
            arr[2][1] = 7
        } else if (column === 'col3') {
            arr[2][2] = 8
        }
    }
}

export function giveNUmValue(e) {
    let num;
    let column;
    if (e.startsWith('row1')) {
        column = e.replace('row1, ', '').trim();
        if (column === 'col1') {
            num = 0
            return num;
        }
        else if (column === 'col2') {
            num = 2
            return num;
        } else if (column === 'col3') {
            num = 3
            return num;
        }
    } else if (e.startsWith('row2')) {
        column = e.replace('row2, ', '').trim();
        if (column === 'col1') {
            num = 4
            return num;
        } else if (column === 'col2') {
            num = 5
            return num;
        } else if (column === 'col3') {
            num = 6
            return num;
        }
    } else if (e.startsWith('row3')) {
        column = e.replace('row3, ', '').trim();
        if (column === 'col1') {
            num = 7
            return num;
        } else if (column === 'col2') {
            num = 8
            return num;
        } else if (column === 'col3') {
            num = 9
            return num;
        }
    }
}

function checkForWins() {
    let danger = 0;
    for (let i in fullHouses){
        danger += fullHouses[i] * WINNING_POSSIBILITIES
    }
}