const MatrixClass = require('./MatrixClass');

describe('MatrixClass', () => {

    describe('initializeGrid', () => {
        it('should initialize the grid with the correct number of rows and columns', () => {
            let matrix = new MatrixClass();

            const rows = 3;
            const cols = 5;
            const blocked = 5;

            const grid = matrix.initializeGrid(rows, cols, blocked);

            expect(grid.length).toStrictEqual(rows);
            grid.forEach(row => expect(row.length).toBe(cols));
        });

        it('should initialize the grid with the correct number of blocked cells', () => {
            let matrix = new MatrixClass();

            const rows = 5;
            const cols = 5;
            const blocked = 10;

            const grid = matrix.initializeGrid(rows, cols, blocked);

            const blockedCells = grid.reduce((acc, row) => {
                return acc + row.filter(cell => cell === matrix.BLOCKED).length;
            }, 0);

            expect(blockedCells).toStrictEqual(blocked);
        });
    });

    describe('find_a_path', () => {
        it('should find a path between the start and end points', () => {
            let matrix = new MatrixClass();

            const grid = [
                [0, 0, 0, 0, 0],
                [0, 0, 8, 0, 0],
                [0, 0, 0, 0, 0],
            ];
            const start = [0, 0];
            const end = [2, 4];

            const { path, result } = matrix.find_a_path(grid, start, end);

            expect(result).toBe(true);
            expect(path[0]).toEqual(start);
            expect(path[path.length - 1]).toEqual(end);
        });

        it('should return result=false if the start or end points are blocked', () => {
            let matrix = new MatrixClass();

            const grid = [
                [0, 0, 0, 0, 0],
                [0, 0, 8, 0, 0],
                [0, 0, 0, 0, 0],
            ];
            const start = [1, 2];
            const end = [2, 4];

            const { result } = matrix.find_a_path(grid, start, end);

            expect(result).toBe(false);

            const start2 = [0, 0];
            const end2 = [1, 2];

            const { result: result2 } = matrix.find_a_path(grid, start2, end2);

            expect(result2).toStrictEqual(false);
        });
    });
});
