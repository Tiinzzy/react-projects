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