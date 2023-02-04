export function getNextMove(board, freeId) {
    for (let i in board) {
        if (board[i] === freeId) {
            return { cellId: i, status: 'valid-move-found' };
        }
    }
    return { cellId: null, status: 'no-valid-move-found' };
}