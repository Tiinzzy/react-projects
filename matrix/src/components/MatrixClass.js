export default class MatrixClass {
    constructor() {
        this.grid = null;
        this.rows = null;
        this.columns = null;
        this.blocked = null;
        this.FREE = 0;
        this.START = 1;
        this.PATH = 2;
        this.END = 9;
        this.BLOCKED = 8;
    }

    #ceq(a, b) {
        return a[0] === b[0] && a[1] === b[1];
    };

    #get_random_int(max) {
        return Math.floor(Math.random() * max);
    }

    #grid_sum(grid) {
        return grid
            .reduce(function (a, b) {
                return a.concat(b);
            })
            .reduce(function (a, b) {
                return a + b;
            });
    }

    initializeGrid(rows, cols, blocked) {
        let g = [];
        for (let i = 0; i < rows; i++) {
            g[i] = Array(cols * 1).fill(this.FREE);
        }

        while (this.#grid_sum(g) < blocked * this.BLOCKED) {
            let r = this.#get_random_int(rows);
            let c = this.#get_random_int(cols);
            g[r][c] = this.BLOCKED;
        }

        return g;
    }

    find_a_path(grid, start, end) {
        let path = [start];
        let result = false;

        if (grid[start[0]][start[1]] !== this.FREE) {
            return { path, grid, result };
        }

        if (grid[end[0]][end[1]] !== this.FREE) {
            return { path, grid, result };
        }

        grid[start[0]][start[1]] = this.START;
        grid[end[0]][end[1]] = this.END;

        let current = start;
        while (!this.#ceq(current, this.END)) {
            let next_cell = this.#get_next_cell(grid, current);
            if (next_cell === null) {
                break;
            } else if (this.#ceq(next_cell, end)) {
                path.push(end);
                result = true;
                break;
            } else {
                current = next_cell;
                path.push(current);
                grid[current[0]][current[1]] = this.PATH;
            }
        }

        return { path, grid, result };
    };

    #get_next_cell(grid, current) {
        let options = [];

        let top = [current[0] - 1, current[1]];
        if (
            top[0] >= 0 &&
            (grid[top[0]][top[1]] === this.FREE || grid[top[0]][top[1]] === this.END)
        ) {
            options.push(top);
        }

        let right = [current[0], current[1] + 1];
        if (
            right[1] < grid[0].length &&
            (grid[right[0]][right[1]] === this.FREE || grid[right[0]][right[1]] === this.END)
        ) {
            options.push(right);
        }

        let bottom = [current[0] + 1, current[1]];
        if (
            bottom[0] < grid.length &&
            (grid[bottom[0]][bottom[1]] === this.FREE || grid[bottom[0]][bottom[1]] === this.END)
        ) {
            options.push(bottom);
        }

        let left = [current[0], current[1] - 1];
        if (
            left[1] >= 0 &&
            (grid[left[0]][left[1]] === this.FREE || grid[left[0]][left[1]] === this.END)
        ) {
            options.push(left);
        }

        if (options.length > 0) {
            return options[this.#get_random_int(options.length)];
        } else {
            return null;
        }
    };

}