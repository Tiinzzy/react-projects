export const GAME_BODY = [
    ['row1, col1', 'row1, col2', 'row1, col3'],
    ['row2, col1', 'row2, col2', 'row2, col3'],
    ['row3, col1', 'row3, col2', 'row3, col3']
];

export const ALL_HOUSES = ['row1, col1', 'row1, col2', 'row1, col3', 'row2, col1', 'row2, col2', 'row2, col3', 'row3, col1', 'row3, col2', 'row3, col3'];

export const CURRENT_FULL_HOUSES = [0, 0, 0, 0, 0, 0, 0, 0, 0];

export const WINNING_POSSIBILITIES = [[1, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 1],
[1, 0, 0, 0, 1, 0, 0, 0, 1], [0, 0, 1, 0, 1, 0, 1, 0, 0], [1, 0, 0, 1, 0, 0, 1, 0, 0], [0, 1, 0, 0, 1, 0, 0, 1, 0], [0, 0, 1, 0, 0, 1, 0, 0, 1]];


export function insertIntoCurrentHouses(e, user) {
    let column;
    if (e.startsWith('row1')) {
        column = e.replace('row1, ', '').trim();
        if (column === 'col1') {
            if (user === 'X') {
                CURRENT_FULL_HOUSES[0] = 1
            } else {
                CURRENT_FULL_HOUSES[0] = -2
            }
        }
        else if (column === 'col2') {
            if (user === 'X') {
                CURRENT_FULL_HOUSES[1] = 1
            } else {
                CURRENT_FULL_HOUSES[1] = -2
            }
        } else if (column === 'col3') {
            if (user === 'X') {
                CURRENT_FULL_HOUSES[2] = 1
            } else {
                CURRENT_FULL_HOUSES[2] = -2
            }
        }
    } else if (e.startsWith('row2')) {
        column = e.replace('row2, ', '').trim();
        if (column === 'col1') {
            if (user === 'X') {
                CURRENT_FULL_HOUSES[3] = 1
            } else {
                CURRENT_FULL_HOUSES[3] = -2
            }
        } else if (column === 'col2') {
            if (user === 'X') {
                CURRENT_FULL_HOUSES[4] = 1
            } else {
                CURRENT_FULL_HOUSES[4] = -2
            }
        } else if (column === 'col3') {
            if (user === 'X') {
                CURRENT_FULL_HOUSES[5] = 1
            } else {
                CURRENT_FULL_HOUSES[5] = -2
            }
        }
    } else if (e.startsWith('row3')) {
        column = e.replace('row3, ', '').trim();
        if (column === 'col1') {
            if (user === 'X') {
                CURRENT_FULL_HOUSES[6] = 1
            } else {
                CURRENT_FULL_HOUSES[6] = -2
            }
        } else if (column === 'col2') {
            if (user === 'X') {
                CURRENT_FULL_HOUSES[7] = 1
            } else {
                CURRENT_FULL_HOUSES[7] = -2
            }
        } else if (column === 'col3') {
            if (user === 'X') {
                CURRENT_FULL_HOUSES[8] = 1
            } else {
                CURRENT_FULL_HOUSES[8] = -2
            }
        }
    }
}
