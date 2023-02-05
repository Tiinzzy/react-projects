export const RC_ARRAY = [0, 1, 2];
export const USER = 1;
export const COMPUTER = 10;
export const FREE = 0;

export const COMPUTER_WINS = 'computer-wins';
const COMPUTER_PREVENT = 'preventing-user-wins';
const COMPUTER_PLAN_TO_WIN = 'computer-plans-to-win';
const COMPUTER_INITIAL_MOVE = 'computer-first-move';
export const USER_WINS = 'user-wins';

export function getNextMove(board) {
    let status = checkUserWins(board);
    if (status === USER_WINS) {
        return { cellId: null, status };
    } else {
        return get_comp_next_move(board);
    }
}

function find_row_with_sum(board, sum) {
    let danger_rows = [];
    for (let r = 0; r < 3; r++) {
        let row_sum = 0;
        for (let c = 0; c < 3; c++) {
            row_sum += board[r * 3 + c];
        }
        if (row_sum === sum) {
            danger_rows.push(r);
        }
    }
    return danger_rows;
}

function find_column_sum(board, sum) {
    let danger_cols = [];
    for (let c = 0; c < 3; c++) {
        let col_sum = 0
        for (let r = 0; r < 3; r++) {
            col_sum += board[r * 3 + c];
        }
        if (col_sum === sum) {
            danger_cols.push(c);
        }
    }
    return danger_cols;
}

function find_diagonal_sum(board, sum) {
    let danger_diags = [];
    if (board[0] + board[4] + board[8] === sum) {
        if (board[0] === 0) {
            danger_diags.push(0);
        } else if (board[4] === 0) {
            danger_diags.push(4);
        } else if (board[8] === 0) {
            danger_diags.push(8);
        }
    }
    if (board[2] + board[4] + board[6] === sum) {
        if (board[2] === 0) {
            danger_diags.push(2);
        } else if (board[4] === 0) {
            danger_diags.push(4);
        } else if (board[6] === 0) {
            danger_diags.push(6);
        }
    }

    return danger_diags;
}

function my_nex_play(dr, dc, dd, board) {
    let play = [];
    for (let i in dr) {
        let r = dr[i];
        for (let c = 0; c < 3; c++) {
            if (board[r * 3 + c] === 0) {
                play.push(r * 3 + c);
            }
        }
    }

    for (let i in dc) {
        let c = dc[i];
        for (let r = 0; r < 3; r++) {
            if (board[r * 3 + c] === 0) {
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


function get_comp_next_move_sum(board, sum) {
    let drs = find_row_with_sum(board, sum);
    let dcs = find_column_sum(board, sum);
    let dds = find_diagonal_sum(board, sum);
    let play = my_nex_play(drs, dcs, dds, board);

    return play;
}

function get_a_random_cell_value(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function get_first_move(board) {
    let freeBoard = [];
    for (let i in board) {
        if (board[i] === FREE) {
            freeBoard.push(+i);
        }
    }
    return get_a_random_cell_value(freeBoard);
}

function get_comp_next_move(board) {
    let prevent = get_comp_next_move_sum(board, 2);
    let win20 = get_comp_next_move_sum(board, 20);
    let win10 = get_comp_next_move_sum(board, 10);

    if (win20.length > 0) {
        return { cellId: get_a_random_cell_value(win20), status: COMPUTER_WINS };
    } else if (prevent.length > 0) {
        return { cellId: get_a_random_cell_value(prevent), status: COMPUTER_PREVENT };
    } else if (win10.length > 0) {
        return { cellId: get_a_random_cell_value(win10), status: COMPUTER_PLAN_TO_WIN };
    } else {
        return { cellId: get_first_move(board), status: COMPUTER_INITIAL_MOVE };
    }
}


export function getRandomMessage(arr) {
    let randomSelection = Math.floor(Math.random() * arr.length);
    let message = arr[randomSelection];
    return message;
}

export function checkUserWins(board) {
    let rows = find_row_with_sum(board, 3);
    let columns = find_column_sum(board, 3);
    let diagonals = find_diagonal_sum(board, 3);

    if (rows.length > 0 || diagonals.length > 0 || columns.length > 0) {
        let status = USER_WINS;
        return status;
    }
    return null;
}