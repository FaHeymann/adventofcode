const input = require('fs').readFileSync('inputs/2018/15.txt').toString();

const game = elfAtk => {
  const grid = [];
  const units = [];

  input.split('\n').forEach((line, y) => {
    grid[y] = [];
    line.split('').forEach((c, x) => {
      if (['.', '#'].includes(c)) {
        grid[y][x] = c;
      } else if (c === 'E') {
        units.push({ faction: 'E', atk: elfAtk, hp: 200, y, x });
        grid[y][x] = 'E';
      } else if (c === 'G') {
        units.push({ faction: 'G', atk: 3, hp: 200, y, x });
        grid[y][x] = 'G';
      }
    });
  });

  const sortByPos = (a, b) => a.y === b.y ? a.x - b.x : a.y - b.y;

  let distCache = {};

  const serialize = (p1, p2) => `${p1.y}#${p1.x}->${p2.y}#${p2.x}`;

  const dist = (p1, p2) => {
    if (serialize(p1, p2) in distCache) {
      return distCache[serialize(p1, p2)];
    }
    const queue = [p1];
    const distances = {};
    distances[`${p1.y}#${p1.x}`] = 0;

    while (queue.length > 0) {
      const t = queue.shift();
      const d = distances[`${t.y}#${t.x}`];
      if (t.y === p2.y && t.x === p2.x) {
        distCache[serialize(p1, p2)] = d;
        return d;
      }

      [
        [t.y - 1, t.x],
        [t.y, t.x - 1],
        [t.y, t.x + 1],
        [t.y + 1, t.x],
      ]
        .filter(([y, x]) => !(`${y}#${x}` in distances) && grid[y][x] === '.')
        .forEach(([y, x]) => {
          distances[`${y}#${x}`] = d + 1;
          queue.push({ y, x });
        });
    }
    distCache[serialize(p1, p2)] = -1;
    return -1;
  };

  const reachable = (p1, p2) => dist(p1, p2) > -1;
  const enemies = unit => units.filter(u => !u.dead && u.faction !== unit.faction);
  const enemiesInRange = unit => enemies(unit).filter(u => Math.abs(u.y - unit.y) + Math.abs(u.x - unit.x) === 1);
  const hasEnemyInRange = unit => enemiesInRange(unit).length > 0;

  const move = unit => {
    const tilesInRange = enemies(unit).map(e => [
      { y: e.y - 1, x: e.x },
      { y: e.y + 1, x: e.x },
      { y: e.y, x: e.x + 1 },
      { y: e.y, x: e.x - 1 },
    ].filter(t => grid[t.y][t.x] === '.')).flat();

    const reachableTiles = tilesInRange.filter(t => reachable(unit, t));

    if (reachableTiles.length < 1) {
      return;
    }

    const minDistance = reachableTiles.reduce((min, t) => Math.min(min, dist(unit, t)), Number.MAX_VALUE);
    const nearestTiles = reachableTiles.filter(t => dist(unit, t) === minDistance);
    nearestTiles.sort(sortByPos);
    const target = nearestTiles[0];

    [
      [unit.y - 1, unit.x],
      [unit.y, unit.x - 1],
      [unit.y, unit.x + 1],
      [unit.y + 1, unit.x]
    ]
      .filter(([y, x]) => grid[y][x] === '.' && dist({ y, x }, target) === minDistance - 1)
      .some(([y, x]) => {
        grid[y][x] = unit.faction;
        grid[unit.y][unit.x] = '.';
        unit.y = y;
        unit.x = x;
        return true;
    });
    distCache = {};
  };

  const attack = unit => {
    const targets = enemiesInRange(unit);
    if (targets.length < 1) {
      return;
    }
    targets.sort((a, b) => a.hp === b.hp ? sortByPos(a, b) : a.hp - b.hp);
    const target = targets[0];
    target.hp -= unit.atk;
    if (target.hp <= 0) {
      target.dead = true;
      grid[target.y][target.x] = '.';
    }
  }

  const turn = (unit) => {
    if (unit.dead === true) {
      return false;
    }
    if (units.filter(u => !u.dead && u.faction !== unit.faction).length < 1) {
      return true;
    }
    if (!hasEnemyInRange(unit)) {
      move(unit);
    }
    if (hasEnemyInRange(unit)) {
      attack(unit);
    }
    return false;
  };

  let roundCounter = 0;

  const round = () => {
    units.sort(sortByPos);
    const result = units.some(u => turn(u));
    if (!result) {
      roundCounter++;
    }
    return result;
  };

  while(true) {
    const result = round();
    if (units.filter(u => u.dead && u.faction === 'E').length > 0) {
      return [false, ''];
    }
    if (result) {
      return [true, roundCounter * units.filter(u => !u.dead).reduce((sum, u) => sum + u.hp, 0)];
    }
  }
};

let elfAtk = 4;

while(true) {
  console.log(elfAtk);
  const result = game(elfAtk);
  if (result[0]) {
    console.log(result[1]);
    break;
  }
  elfAtk++;
}
