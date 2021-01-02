const winsMana = new Set();
const getMinMana = () => Array.from(winsMana).reduce((min, cur) => Math.min(min, cur), Number.MAX_VALUE);

const tickEffects = g => {
  if (g.effects.poison > 0) {
    g.effects.poison--;
    g.boss.hp -= 3;
  }
  if (g.effects.shield > 0) {
    g.effects.shield--;
  }
  if (g.effects.recharge > 0) {
    g.effects.recharge--;
    g.player.mp += 101;
  }
};

manaCosts = {
  missile: 53,
  drain: 73,
  shield: 113,
  poison: 173,
  recharge: 229,
}

const clone = g => ({
  turnsTaken: g.turnsTaken,
  player: { ...g.player },
  boss: { ...g.boss },
  effects: { ...g.effects },
})

const step = (gameIn, action) => {
  const gameOut = clone(gameIn);
  if (gameOut.player.usedMana > getMinMana()) {
    return false;
  }

  gameOut.player.hp -= 1;
  if (gameOut.player.hp <= 0) {
    return false;
  }

  tickEffects(gameOut);
  if (gameOut.boss.hp <= 0) {
    winsMana.add(gameOut.player.usedMana);
    return false;
  }

  if (gameOut.player.mp < manaCosts[action]) {
    return false;
  }

  if (action === 'missile') {
    gameOut.player.mp -= manaCosts[action];
    gameOut.player.usedMana += manaCosts[action];
    gameOut.boss.hp -= 4;
  } else if (action === 'drain') {
    gameOut.player.mp -= manaCosts[action];
    gameOut.player.usedMana += manaCosts[action];
    gameOut.boss.hp -= 2;
    gameOut.player.hp += 2;
  } else if (action === 'shield') {
    gameOut.player.mp -= manaCosts[action];
    gameOut.player.usedMana += manaCosts[action];
    gameOut.effects.shield = 6;
  } else if (action === 'poison') {
    gameOut.player.mp -= manaCosts[action];
    gameOut.player.usedMana += manaCosts[action];
    gameOut.effects.poison = 6;
  } else if (action === 'recharge') {
    gameOut.player.mp -= manaCosts[action];
    gameOut.player.usedMana += manaCosts[action];
    gameOut.effects.recharge = 5;
  }

  tickEffects(gameOut);
  if (gameOut.boss.hp <= 0) {
    winsMana.add(gameOut.player.usedMana);
    return false;
  }

  gameOut.player.hp -= gameOut.effects.shield > 0 ? gameOut.boss.atk - 7 : gameOut.boss.atk;

  if (gameOut.player.hp <= 0) {
    return false;
  }
  return gameOut;
};

const initial = {
  turnsTaken: 0,
  player: {
    hp: 50,
    mp: 500,
    armor: 0,
    usedMana: 0,
  },
  boss: {
    hp: 58,
    atk: 9,
  },
  effects: {
    poison: 0,
    shield: 0,
    recharge: 0,
  },
}

const queue = [initial];

while(queue.length > 0) {
  const cur = queue.pop();
  [
    step(cur, 'recharge'),
    step(cur, 'shield'),
    step(cur, 'poison'),
    step(cur, 'drain'),
    step(cur, 'missile'),
  ].filter(x => x).forEach(x => {
    queue.push(x);
  });
}
console.log(getMinMana());
