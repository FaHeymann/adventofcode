let boost = 0;

class Group {
  constructor(id, faction, unitCount, hp, atkDmg, atkType, init, weak, immu, boost = 0) {
    this.id = id;
    this.faction = faction;
    this.unitCount = parseInt(unitCount, 10);
    this.hp = parseInt(hp);
    this.atkDmg = parseInt(atkDmg);
    this.atkType = atkType;
    this.init = parseInt(init);
    this.weak = weak;
    this.immu = immu;
    this.defeated = false;
    this.boost = boost;
  }

  reset() {
    this.attacks = undefined;
    this.attackedBy = undefined;
  }

  getPower() {
    return this.unitCount * (this.atkDmg + this.boost);
  }

  getDmgTotal(dmg, type) {
    // console.log(type, this.weak);
    if (this.immu.includes(type)) {
      return 0;
    }
    return this.weak.includes(type) ? 2 * dmg : dmg;
  }

  takeAttack(dmg, type) {
    this.unitCount -= Math.floor(this.getDmgTotal(dmg, type) / this.hp);
    if (this.unitCount <= 0) {
      this.defeated = true;
    }
  }
};

const immuneSystemInput = `1432 units each with 7061 hit points (immune to cold; weak to bludgeoning) with an attack that does 41 slashing damage at initiative 17
3387 units each with 9488 hit points (weak to bludgeoning) with an attack that does 27 slashing damage at initiative 20
254 units each with 3249 hit points (immune to fire) with an attack that does 89 cold damage at initiative 1
1950 units each with 8201 hit points with an attack that does 39 fire damage at initiative 15
8137 units each with 3973 hit points (weak to slashing; immune to radiation) with an attack that does 4 radiation damage at initiative 6
4519 units each with 7585 hit points (weak to fire) with an attack that does 15 radiation damage at initiative 8
763 units each with 7834 hit points (immune to radiation, slashing, cold; weak to fire) with an attack that does 91 radiation damage at initiative 18
935 units each with 10231 hit points (immune to slashing, cold) with an attack that does 103 bludgeoning damage at initiative 12
4557 units each with 7860 hit points (immune to slashing) with an attack that does 15 slashing damage at initiative 11
510 units each with 7363 hit points (weak to fire, radiation) with an attack that does 143 fire damage at initiative 5`;

const infectionInput = `290 units each with 29776 hit points (weak to cold, radiation) with an attack that does 204 bludgeoning damage at initiative 16
7268 units each with 14114 hit points (immune to radiation; weak to bludgeoning) with an attack that does 3 bludgeoning damage at initiative 19
801 units each with 5393 hit points with an attack that does 13 slashing damage at initiative 13
700 units each with 12182 hit points with an attack that does 29 cold damage at initiative 4
531 units each with 16607 hit points (immune to slashing) with an attack that does 53 bludgeoning damage at initiative 10
23 units each with 24482 hit points (weak to cold, fire) with an attack that does 2095 bludgeoning damage at initiative 7
8025 units each with 43789 hit points (weak to cold; immune to radiation) with an attack that does 8 radiation damage at initiative 9
1405 units each with 53896 hit points with an attack that does 70 slashing damage at initiative 14
566 units each with 7820 hit points (immune to cold) with an attack that does 26 cold damage at initiative 2
1641 units each with 7807 hit points (weak to fire; immune to slashing, bludgeoning) with an attack that does 7 radiation damage at initiative 3`;

let units = [];

const initUnits = () => {
  units = [];
  immuneSystemInput.split('\n').forEach((line, i) => {
    let [_, unitCount, hp, specials, atkDmg, atkType, init] = line.match(/([0-9]+) units each with ([0-9]+) hit points(.*)with an attack that does ([0-9]+) ([a-z]+) damage at initiative ([0-9]+)/);
    specials = specials.trim();
    specials = specials.substr(1, specials.length - 2);
    let weak = [];
    let immu = [];
    specials.split('; ').forEach(special => {
      if (special.startsWith('weak to')) {
        weak = special.substr(8).split(', ');
      } else if (special.startsWith('immune to')) {
        immu = special.substr(10).split(', ');
      }
    });
    units.push(new Group(i, 'immunesystem', unitCount, hp, atkDmg, atkType, init, weak, immu, boost));
  });

  infectionInput.split('\n').forEach((line, i) => {
    let [_, unitCount, hp, specials, atkDmg, atkType, init] = line.match(/([0-9]+) units each with ([0-9]+) hit points(.*)with an attack that does ([0-9]+) ([a-z]+) damage at initiative ([0-9]+)/);
    specials = specials.trim();
    specials = specials.substr(1, specials.length - 2);
    let weak = [];
    let immu = [];
    specials.split('; ').forEach(special => {
      if (special.startsWith('weak to')) {
        weak = special.substr(8).split(', ');
      } else if (special.startsWith('immune to')) {
        immu = special.substr(10).split(', ');
      }
    });
    units.push(new Group(i + immuneSystemInput.split('\n').length, 'infection', unitCount, hp, atkDmg, atkType, init, weak, immu, 0));
  });
};

const findAttackTarget = attacker => {
  const targets = units.filter(u => u.faction !== attacker.faction && u.attackedBy === undefined && !u.defeated);
  targets.sort((a, b) => {
    if (b.getDmgTotal(attacker.getPower(), attacker.atkType) === a.getDmgTotal(attacker.getPower(), attacker.atkType) && b.getPower() === a.getPower()) {
      return b.init - a.init;
    }
    if (b.getDmgTotal(attacker.getPower(), attacker.atkType) === a.getDmgTotal(attacker.getPower(), attacker.atkType)) {
      return b.getPower() - a.getPower();
    }
    return b.getDmgTotal(attacker.getPower(), attacker.atkType) - a.getDmgTotal(attacker.getPower(), attacker.atkType);
  });

  if (targets.length > 0 && targets[0].getDmgTotal(attacker.getPower(), attacker.atkType) > 0) {
    targets[0].attackedBy = attacker.id;
    attacker.attacks = targets[0].id;
  }
};

const game = () => {
  initUnits();
  const turn = () => {
    units.sort((a, b) => a.getPower() === b.getPower() ? b.init - a.init : b.getPower() - a.getPower());
    units.forEach(u => {
      findAttackTarget(u);
    });
    units.sort((a, b) => b.init - a.init);
    units.forEach(u => {
      if (!u.defeated && u.attacks !== undefined) {
        units.find(t => t.id === u.attacks).takeAttack(u.getPower(), u.atkType);
      }
    });
    units.forEach(u => {
      u.reset();
    });
  }

  let turnCount = 0;

  while (units.filter(u => u.faction === 'immunesystem' && !u.defeated).length > 0 && units.filter(u => u.faction === 'infection' && !u.defeated).length > 0 && turnCount < 10000) {
    turn();
    turnCount++;
  }
  return [units.filter(u => u.faction === 'infection' && !u.defeated).length === 0, units.filter(u => !u.defeated).reduce((sum, cur) => sum + cur.unitCount, 0)]; // [reindeerWon, unitCountLeft]
};

for (let i = 0; true; i++) {
  boost = i;
  console.log('calculating', i);
  const result = game();
  if (result[0]) {
    console.log(result[1]);
    break;
  }
}
