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
                return CURRENT_FULL_HOUSES[0] = 1
            } else {
                return CURRENT_FULL_HOUSES[0] = 10
            }
        }
        else if (column === 'col2') {
            if (user === 'X') {
                return CURRENT_FULL_HOUSES[1] = 1
            } else {
                return CURRENT_FULL_HOUSES[1] = 10
            }
        } else if (column === 'col3') {
            if (user === 'X') {
                return CURRENT_FULL_HOUSES[2] = 1
            } else {
                return CURRENT_FULL_HOUSES[2] = 10
            }
        }
    } else if (e.startsWith('row2')) {
        column = e.replace('row2, ', '').trim();
        if (column === 'col1') {
            if (user === 'X') {
                return CURRENT_FULL_HOUSES[3] = 1
            } else {
                return CURRENT_FULL_HOUSES[3] = 10
            }
        } else if (column === 'col2') {
            if (user === 'X') {
                return CURRENT_FULL_HOUSES[4] = 1
            } else {
                return CURRENT_FULL_HOUSES[4] = 10
            }
        } else if (column === 'col3') {
            if (user === 'X') {
                return CURRENT_FULL_HOUSES[5] = 1
            } else {
                return CURRENT_FULL_HOUSES[5] = 10
            }
        }
    } else if (e.startsWith('row3')) {
        column = e.replace('row3, ', '').trim();
        if (column === 'col1') {
            if (user === 'X') {
                return CURRENT_FULL_HOUSES[6] = 1
            } else {
                return CURRENT_FULL_HOUSES[6] = 10
            }
        } else if (column === 'col2') {
            if (user === 'X') {
                return CURRENT_FULL_HOUSES[7] = 1
            } else {
                return CURRENT_FULL_HOUSES[7] = 10
            }
        } else if (column === 'col3') {
            if (user === 'X') {
                return CURRENT_FULL_HOUSES[8] = 1
            } else {
                return CURRENT_FULL_HOUSES[8] = 10
            }
        }
    }
}

function toWinTheMatch(wp, cs) {
    let danger = 0;
    for (let i = 0; i < 9; i++) {
        danger += WINNING_POSSIBILITIES[wp][i] * cs[i];
    }
    return danger;
}

function findMaxDangrWinPOs(wps, wps_danger) {
    let maxDanger = Math.max(...wps_danger);
    for (let i = 0; i < wps_danger.length; i++) {
        if (wps_danger[i] === maxDanger) {
            return wps[i];
        }
    }
    return null;
}

function getComputerMove(md_wp, cs) {
    let moves = [];
    for (let i = 0; i < 9; i++) {
        moves.push(md_wp[i] * cs[i]);
    }

    for (let j = 0; j < 9; j++) {
        if (moves[j] + md_wp[j] === 1) {
            return j;
        }
    }
    return null;
}

export function findNextMove(wps, cs) {
    let wps_danger = [];
    for (let wp in wps) {
        let danger = toWinTheMatch(wp, cs);
        wps_danger.push(danger);
        // console.log('current state: ', CURRENT_FULL_HOUSES)
        // console.log('winning possibilites: ', WINNING_POSSIBILITIES[i])
        // console.log('DANGER => ', danger)
        // console.log('------------------------------------------')
    }
    // console.log(wps_danger);
    let md_wp = findMaxDangrWinPOs(wps, wps_danger);
    // console.log(md_wp);

    if (md_wp !== null) {
        let computerMove = getComputerMove(md_wp, cs);
        return computerMove;
    }


}

// ------------------------------------------------------------------------------------------------

export function find_row_with_sum(cs, sum) {
    let danger_rows = [];
    for (let r = 0; r < 3; r++) {
        let row_sum = 0;
        for (let c = 0; c < 3; c++) {
            row_sum += cs[r * 3 + c];
        }
        if (row_sum === sum) {
            danger_rows.push(r);
        }
    }
    return danger_rows;
}

export function find_column_sum(cs, sum) {
    let danger_cols = [];
    for (let c = 0; c < 3; c++) {
        let col_sum = 0
        for (let r = 0; r < 3; r++) {
            col_sum += cs[r * 3 + c];
        }
        if (col_sum === sum) {
            danger_cols.push(c);
        }
    }
    return danger_cols;
}

export function find_diagonal_sum(cs, sum) {
    let danger_diags = [];
    if (cs[0] + cs[4] + cs[8] === sum) {
        if (cs[0] === 0) {
            danger_diags.push(0);
        } else if (cs[4] === 0) {
            danger_diags.push(4);
        } else if (cs[8] === 0) {
            danger_diags.push(8);
        }
    }
    if (cs[2] + cs[4] + cs[6] === sum) {
        if (cs[2] === 0) {
            danger_diags.push(2);
        } else if (cs[4] === 0) {
            danger_diags.push(4);
        } else if (cs[6] === 0) {
            danger_diags.push(6);
        }
    }

    return danger_diags;
}

function my_nex_play(dr, dc, dd, cs) {
    let play = [];
    for (let i in dr) {
        let r = dr[i];
        for (let c = 0; c < 3; c++) {
            if (cs[r * 3 + c] === 0) {
                play.push(r * 3 + c);
            }
        }
    }

    for (let i in dc) {
        let c = dc[i];
        for (let r = 0; r < 3; r++) {
            if (cs[r * 3 + c] === 0) {
                play.push(r * 3 + c);
            }
        }
    }

    for (let i in dd) {
        let d = dd[i]
        play.push(d);
    }

    return play;
}


function get_comp_next_move_sum(cs, sum) {
    console.log('CS: ', cs);

    let drs = find_row_with_sum(cs, sum);
    console.log('DRs:', drs);

    let dcs = find_column_sum(cs, sum);
    console.log('DCs:', dcs);

    let dds = find_diagonal_sum(cs, sum);
    console.log('DDs:', dds);

    let play = my_nex_play(drs, dcs, dds, cs);

    return play;
}

export function get_comp_next_move(cs) {
    let prevent = get_comp_next_move_sum(cs, 2);
    console.log('PREVENT: ', prevent)
    let win20 = get_comp_next_move_sum(cs, 20);
    console.log('WIN20: ', win20)
    let win10 = get_comp_next_move_sum(cs, 10);
    console.log('WIN10: ', win10)

    if (win20.length > 0) {
        return { play: win20, status: 'computer wins 100%' };
    } else if (prevent.length > 0) {
        return { play: prevent, status: 'trying to stop user-win if possible' };
    } else {
        return { play: win10, status: 'planing to win in next couple of moves' };
    }    
}