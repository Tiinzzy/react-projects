const FREE = 0;
const START = 1;
const PATH = 2;
const END = 9;
const BLOCKED = 8;

const clone_2DA = (array) => {
  return array.map((row) => [...row]);
};

const ceq = (a, b) => {
  return a[0] === b[0] && a[1] === b[1];
};

const get_random_int = (max) => {
  return Math.floor(Math.random() * max);
};

const grid_sum = (grid) => {
  return grid
    .reduce(function (a, b) {
      return a.concat(b);
    })
    .reduce(function (a, b) {
      return a + b;
    });
};

const init_grid = (rows, cols, blocked) => {
  let g = [];
  for (let i = 0; i < rows; i++) {
    g.push(new Array(cols).fill(FREE));
  }

  while (grid_sum(g) < blocked * BLOCKED) {
    let r = get_random_int(rows);
    let c = get_random_int(cols);
    g[r][c] = BLOCKED;
  }

  return g;
};

const get_next_cell = (grid, current) => {
  let options = [];

  let top = [current[0] - 1, current[1]];
  if (
    top[0] >= 0 &&
    (grid[top[0]][top[1]] === FREE || grid[top[0]][top[1]] === END)
  ) {
    options.push(top);
  }

  let right = [current[0], current[1] + 1];
  if (
    right[1] < grid[0].length &&
    (grid[right[0]][right[1]] === FREE || grid[right[0]][right[1]] === END)
  ) {
    options.push(right);
  }

  let bottom = [current[0] + 1, current[1]];
  if (
    bottom[0] < grid.length &&
    (grid[bottom[0]][bottom[1]] === FREE || grid[bottom[0]][bottom[1]] === END)
  ) {
    options.push(bottom);
  }

  let left = [current[0], current[1] - 1];
  if (
    left[1] >= 0 &&
    (grid[left[0]][left[1]] === FREE || grid[left[0]][left[1]] === END)
  ) {
    options.push(left);
  }

  if (options.length > 0) {
    return options[get_random_int(options.length)];
  } else {
    return null;
  }
};

const find_a_path = (grid, start, end) => {
  let path = [start];
  let result = false;

  if (grid[start[0]][start[1]] !== FREE) {
    return { path, grid, result };
  }

  if (grid[end[0]][end[1]] !== FREE) {
    return { path, grid, result };
  }

  grid[start[0]][start[1]] = START;
  grid[end[0]][end[1]] = END;

  let current = start;
  while (!ceq(current, END)) {
    let next_cell = get_next_cell(grid, current);
    if (next_cell === null) {
      break;
    } else if (ceq(next_cell, end)) {
      path.push(end);
      result = true;
      break;
    } else {
      current = next_cell;
      path.push(current);
      grid[current[0]][current[1]] = PATH;
    }
  }

  return { path, grid, result };
};

const pretty_path = (path) => {
  if (path.length === 0) {
    return "";
  } else {
    return path
      .map((e) => "(" + e[0] + "," + e[1] + ")")
      .reduce((a, b) => a + " → " + b);
  }
};

const to_cell_char = (cell_id) => {
  if (cell_id === FREE) {
    return " ";
  } else if (cell_id === START) {
    return "○";
  } else if (cell_id === END) {
    return "●";
  } else if (cell_id === BLOCKED) {
    return "▩";
  } else {
    return cell_id;
  }
};

const get_path_arrow = (from_cell, to_cell) => {
  if (from_cell[0] === to_cell[0] && from_cell[1] === to_cell[1] - 1) {
    return '→'
  } else if (from_cell[0] === to_cell[0] && from_cell[1] === to_cell[1] + 1) {
    return '←'
  } else if (from_cell[0] === to_cell[0] - 1 && from_cell[1] === to_cell[1]) {
    return '↓'
  } else if (from_cell[0] === to_cell[0] + 1 && from_cell[1] === to_cell[1]) {
    return '↑'
  }
  return '?';
}

const pretty_print_all = (grid, start, end, iteration) => {
  grid[start[0]][start[1]] = START;
  grid[end[0]][end[1]] = END;

  for (let i = 1; i < iteration.path.length - 1; i++) {
    grid[iteration.path[i][0]][iteration.path[i][1]] = get_path_arrow(iteration.path[i], iteration.path[i+1]);
  }

  let row_up = "┌─";
  for (let c = 0; c < grid[0].length; c++) {
    row_up += c < grid[0].length - 1 ? "──┬─" : "──┐";
  }
  console.log(row_up);

  for (let r = 0; r < grid.length; r++) {
    let row = "│ ";
    let row_down = r < grid.length - 1 ? "├─" : "└─";
    for (let c = 0; c < grid[r].length; c++) {
      row += to_cell_char(grid[r][c]) + " │ ";
      let cross = r < grid.length - 1 ? (c < grid[r].length - 1 ? "┼" : "┤") : (c < grid[r].length - 1 ? "┴": "┘");
      row_down += c < grid[r].length - 1 ? "──" + cross + "─" : "──" + cross;
    }
    console.log(row);
    console.log(row_down);
  }
};



// APP STARTS HERE ----------------------

let grid = init_grid(13, 13, 10);
let iteration = [];
let start = [0, 0];
let end = [8, 9];

for (let i = 0; i < 500; i++) {
  let { path, result } = find_a_path(clone_2DA(grid), start, end);
  let path_str = pretty_path(path);
  if (result && iteration.indexOf(path_str) < 0) {
    iteration.push({ path, path_str: path_str, len: path.length });
  }
}

iteration = iteration.sort((a, b) => {
  if (a.len > b.len) {
    return 1;
  } else if (a.len < b.len) {
    return -1;
  } else {
    return 0;
  }
});

if (iteration.length > 0) {
  console.clear();
  pretty_print_all(grid, start, end, iteration[0]);

  // console.log();
  // console.log();
  // console.log(iteration.length + " differnet path found!");
  // console.log(iteration[0]);
}