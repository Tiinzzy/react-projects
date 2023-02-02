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

function toWinTheMatch(wp) {
    let danger = 0;
    for (let i = 0; i < CURRENT_FULL_HOUSES.length; i++) {
        danger += WINNING_POSSIBILITIES[wp][i] * CURRENT_FULL_HOUSES[i];
    }
    return danger;
}

function findMaxDangrWinPOs(wps_danger) {
    let maxDanger = Math.max(...wps_danger);
    for (let i = 0; i < wps_danger.length; i++) {
        if (wps_danger[i] === maxDanger) {
            return WINNING_POSSIBILITIES[i];
        }
    }
    return null;
}

function getComputerMove(md_wp) {
    let moves = [];
    for (let i = 0; i < 9; i++) {
        moves.push(md_wp[i] * CURRENT_FULL_HOUSES[i]);
    }

    for (let j = 0; j < 9; j++) {
        if (moves[j] + md_wp[j] === 1) {
            return j;
        }
    }
    return null;
}

export function findNextMove() {
    let wps_danger = [];
    for (let i in WINNING_POSSIBILITIES) {
        let danger = toWinTheMatch(i);
        wps_danger.push(danger);
        // console.log('current state: ', CURRENT_FULL_HOUSES)
        // console.log('winning possibilites: ', WINNING_POSSIBILITIES[i])
        // console.log('DANGER => ', danger)
        // console.log('------------------------------------------')
    }
    // console.log(wps_danger);
    let md_wp = findMaxDangrWinPOs(wps_danger);
    // console.log(md_wp);

    if (md_wp !== null) {
        let computerMove = getComputerMove(md_wp);
        return computerMove ;
    }

    
}