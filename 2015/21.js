const simulate = (boss, player) => {
  while (boss.hp > 0 && player.hp > 0) {
    boss.hp -= Math.max(1, player.dmg - boss.arm);
    player.hp -= Math.max(1, boss.dmg - player.arm);
  }

  return boss.hp <= 0;
}

const weapons = [
  { cost: 8, dmg: 4, arm: 0 },
  { cost: 10, dmg: 5, arm: 0 },
  { cost: 25, dmg: 6, arm: 0 },
  { cost: 40, dmg: 7, arm: 0 },
  { cost: 74, dmg: 8, arm: 0 },
];

const armor = [
  { cost: 0, dmg: 0, arm: 0 },
  { cost: 13, dmg: 0, arm: 1 },
  { cost: 31, dmg: 0, arm: 2 },
  { cost: 53, dmg: 0, arm: 3 },
  { cost: 75, dmg: 0, arm: 4 },
  { cost: 102, dmg: 0, arm: 5 },
]

const rings = [
  { cost: 0, dmg: 0, arm: 0 },
  { cost: 25, dmg: 1, arm: 0 },
  { cost: 50, dmg: 2, arm: 0 },
  { cost: 100, dmg: 3, arm: 0 },
  { cost: 20, dmg: 0, arm: 1 },
  { cost: 40, dmg: 0, arm: 2 },
  { cost: 80, dmg: 0, arm: 3 },
]

let min = Number.MAX_VALUE;

weapons.forEach(weapon => {
  armor.forEach(armor => {
    rings.forEach((ring1, i1) => {
      rings.forEach((ring2, i2) => {
        if (i1 !== 0 && i1 === i2) {
          return;
        }
        const player = {
          hp: 100,
          dmg: weapon.dmg + ring1.dmg + ring2.dmg,
          arm: armor.arm + ring1.arm + ring2.arm,
        };

        const boss = {
          hp: 100,
          dmg: 8,
          arm: 2,
        };

        if (weapon.cost + armor.cost + ring1.cost + ring2.cost < min && simulate(boss, player)) {
          min = weapon.cost + armor.cost + ring1.cost + ring2.cost;
        }
      });
    });
  });
});

console.log(min);

let max = 0;

weapons.forEach(weapon => {
  armor.forEach(armor => {
    rings.forEach((ring1, i1) => {
      rings.forEach((ring2, i2) => {
        if (i1 !== 0 && i1 === i2) {
          return;
        }
        const player = {
          hp: 100,
          dmg: weapon.dmg + ring1.dmg + ring2.dmg,
          arm: armor.arm + ring1.arm + ring2.arm,
        };

        const boss = {
          hp: 100,
          dmg: 8,
          arm: 2,
        };

        if (weapon.cost + armor.cost + ring1.cost + ring2.cost > max && !simulate(boss, player)) {
          max = weapon.cost + armor.cost + ring1.cost + ring2.cost;
        }
      });
    });
  });
});

console.log(max);
