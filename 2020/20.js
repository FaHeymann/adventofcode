const input = require('fs').readFileSync('inputs/2020/20.txt').toString();

let tiles = [];

input.split('\n\n').forEach((tile, i) => {
  const e = {
    grid: [],
    matches: [],
    index: i,
  };
  tile.split('\n').forEach((line, i) => {
    if (i === 0) {
      e.id = parseInt(line.substr(5, 4), 10);
    } else {
      e.grid[i - 1] = line.split('');
    }
  });
  e.top = [...e.grid[0]];
  e.bottom = [...e.grid[e.grid.length - 1]];
  e.left = e.grid.map(line => line[0]);
  e.right = e.grid.map(line => line[line.length - 1]);
  tiles.push(e);
});

const matches = [];


for (let i = 0; i < tiles.length; i++) {
  for (let j = i + 1; j < tiles.length; j++) {
    ['top', 'bottom', 'left', 'right'].forEach(side1 => {
      ['top', 'bottom', 'left', 'right'].forEach(side2 => {
        if (tiles[i][side1].join('') === tiles[j][side2].join('')) {
          matches.push([tiles[i].id, tiles[j].id]);
          tiles[i].matches.push(tiles[j].id);
          tiles[j].matches.push(tiles[i].id);
          tiles[i][`${side1}Neighbor`] = j;
          tiles[j][`${side2}Neighbor`] = i;
        }
        if (tiles[i][side1].reverse().join('') === tiles[j][side2].join('')) {
          matches.push([tiles[i].id, tiles[j].id]);
          tiles[i].matches.push(tiles[j].id);
          tiles[j].matches.push(tiles[i].id);
          tiles[i][`${side1}Neighbor`] = j;
          tiles[j][`${side2}Neighbor`] = i;
        }
      });
    });
  }
}

console.log(tiles.filter(t => t.matches.length < 3).reduce((product, cur) => product * cur.id, 1));

const rotateGrid = grid => {
  newGrid = [];
  for (let y = 0; y < grid.length; y++) {
    newGrid[y] = [];
    for (let x = 0; x < grid.length; x++) {
      newGrid[y][x] = grid[x][grid.length - 1 - y];
    }
  }
  return newGrid;
}

const flipGrid = grid => grid.map(line => [...line].reverse());

const rotateTile = (tile) => {
  const newTile = {
    id: tile.id,
    index: tile.index,
    leftNeighbor: tile.topNeighbor,
    bottomNeighbor: tile.leftNeighbor,
    rightNeighbor: tile.bottomNeighbor,
    topNeighbor: tile.rightNeighbor,
    left: [...tile.top].reverse(),
    bottom: tile.left,
    right: [...tile.bottom].reverse(),
    top: tile.right,
    grid: rotateGrid(tile.grid),
  }
  return newTile;
}

const flipTile = (tile) => {
  const newTile = {
    id: tile.id,
    index: tile.index,
    leftNeighbor: tile.rightNeighbor,
    bottomNeighbor: tile.bottomNeighbor,
    rightNeighbor: tile.leftNeighbor,
    topNeighbor: tile.topNeighbor,
    left: tile.right,
    bottom: [...tile.bottom].reverse(),
    right: tile.left,
    top: [...tile.top].reverse(),
    grid: flipGrid(tile.grid),
  };
  return newTile;
}

const flipTileHorizontal = (tile) => {
  const newTile = {
    id: tile.id,
    index: tile.index,
    leftNeighbor: tile.leftNeighbor,
    bottomNeighbor: tile.topNeighbor,
    rightNeighbor: tile.rightNeighbor,
    topNeighbor: tile.bottomNeighbor,
    left: [...tile.left].reverse(),
    bottom: tile.top,
    right: [...tile.right].reverse(),
    top: tile.bottom,
    grid: [],
  };
  for (let y = 0; y < tile.grid.length; y++) {
    newTile.grid[y] = [];
    for (let x = 0; x < tile.grid.length; x++) {
      newTile.grid[y][x] = tile.grid[tile.grid.length - 1 - y][x];
    }
  }
  return newTile;
}

const print = tile => {
  const printable = {...tile};
  printable.top = printable.top.join('');
  printable.bottom = printable.bottom.join('');
  printable.right = printable.right.join('');
  printable.left = printable.left.join('');
  printable.grid = printable.grid.map(line => line.join('')).join('\n');

  console.log(printable);
}

const finalTileGrid = [];

let topLeft = tiles.find(t => t.matches.length === 2);

while(topLeft.rightNeighbor === undefined || topLeft.bottomNeighbor === undefined) {
  topLeft = rotate(topLeft);
}

let y = 0;
let x = 0;
finalTileGrid[y] = [];
finalTileGrid[y][x] = topLeft;

while(y === 0 || finalTileGrid[y - 1][x].bottomNeighbor !== undefined) {
  x = 0;
  if (y > 0) {
    finalTileGrid[y] = [];
    let tile = tiles[finalTileGrid[y - 1][x].bottomNeighbor];
    for (let i = 0; i < 4; i++) {
      if (tile.top.join('') === finalTileGrid[y - 1][x].bottom.join('')) {
        break;
      }
      if ([...tile.top].reverse().join('') === finalTileGrid[y - 1][x].bottom.join('')) {
        tile = rotateTile(rotateTile(flipTileHorizontal(tile)));
        break;
      }
      tile = rotateTile(tile);
    }
    finalTileGrid[y][x] = tile;
  }
  while(finalTileGrid[y][x].rightNeighbor !== undefined) {
    let tile = tiles[finalTileGrid[y][x].rightNeighbor];
    for (let i = 0; i < 4; i++) {
      if (tile.left.join('') === finalTileGrid[y][x].right.join('')) {
        break;
      }
      if ([...tile.left].reverse().join('') === finalTileGrid[y][x].right.join('')) {
        tile = rotateTile(rotateTile(flipTile(tile)));
        break;
      }
      tile = rotateTile(tile);
    }
    x++;
    finalTileGrid[y][x] = tile;
  }
  y++;
}

let picture = [];

let outerY = 0;
let outerX = 0;

finalTileGrid.forEach(tileRow => {
  outerX = 0
  tileRow.forEach(tile => {
    for (let y = 1; y < tile.grid.length - 1; y++) {
      if (!picture[outerY + y - 1]) {
        picture[outerY + y - 1] = [];
      }
      for (let x = 1; x < tile.grid.length - 1; x++) {
        picture[outerY + y - 1][outerX + x - 1] = tile.grid[y][x];
      }
    }
    outerX += 8;
  });
  outerY += 8;
});

const findMonsters = (grid) => {
  const finds = [];
  for (let y = 0; y < grid.length - 2; y++) {
    for (let x = 0; x < grid.length - 19; x++) {
      if (
        grid[y + 1][x] === '#' &&
        grid[y + 2][x + 1] === '#' &&
        grid[y + 2][x + 4] === '#' &&
        grid[y + 1][x + 5] === '#' &&
        grid[y + 1][x + 6] === '#' &&
        grid[y + 2][x + 7] === '#' &&
        grid[y + 2][x + 10] === '#' &&
        grid[y + 1][x + 11] === '#' &&
        grid[y + 1][x + 12] === '#' &&
        grid[y + 2][x + 13] === '#' &&
        grid[y + 2][x + 16] === '#' &&
        grid[y + 1][x + 17] === '#' &&
        grid[y + 1][x + 18] === '#' &&
        grid[y + 1][x + 19] === '#' &&
        grid[y][x + 18] === '#'
      ) {
        finds.push(`${y}#${x}`);
      }
    }
  }
  return finds;
}

let finds = [];

['r', 'r', 'r', 'f', 'r', 'r', 'r'].some(action => {
  finds = findMonsters(picture);
  if (finds.length > 0) {
    return true;
  }
  if (action === 'r') {
    picture = rotateGrid(picture);
  } else {
    picture = flipGrid(picture);
  }
});

const fullCount = picture.reduce((sum, line) => sum + line.filter(c => c === '#').length, 0);
console.log(fullCount - finds.length * 15);
