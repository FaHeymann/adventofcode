const input = `Rudolph can fly 22 km/s for 8 seconds, but then must rest for 165 seconds.
Cupid can fly 8 km/s for 17 seconds, but then must rest for 114 seconds.
Prancer can fly 18 km/s for 6 seconds, but then must rest for 103 seconds.
Donner can fly 25 km/s for 6 seconds, but then must rest for 145 seconds.
Dasher can fly 11 km/s for 12 seconds, but then must rest for 125 seconds.
Comet can fly 21 km/s for 6 seconds, but then must rest for 121 seconds.
Blitzen can fly 18 km/s for 3 seconds, but then must rest for 50 seconds.
Vixen can fly 20 km/s for 4 seconds, but then must rest for 75 seconds.
Dancer can fly 7 km/s for 20 seconds, but then must rest for 119 seconds.`;

const raceDuration = 2503;

console.log(input.split('\n').reduce((max, line) => {
  const [_, speed, flightTime, restTime] = line.match(/^[A-Za-z]+ can fly ([0-9]+) km\/s for ([0-9]+) seconds, but then must rest for ([0-9]+) seconds\.$/).map(x => parseInt(x, 10));

  const period = flightTime + restTime;
  const distancePerPeriod = speed * flightTime;
  const fullPeriods = Math.floor(raceDuration / period);

  return Math.max(max, fullPeriods * distancePerPeriod + Math.min(raceDuration % period, flightTime) * speed);
}, 0));

const reindeers = [];

input.split('\n').forEach(line => {
  const [_, speed, flightTime, restTime] = line.match(/^[A-Za-z]+ can fly ([0-9]+) km\/s for ([0-9]+) seconds, but then must rest for ([0-9]+) seconds\.$/).map(x => parseInt(x, 10));

  reindeers.push({
    speed,
    flightTime,
    restTime,
    period: flightTime + restTime,
    distance: 0,
    points: 0,
  });
});

const isResting = (reindeer, t) => t % reindeer.period > reindeer.flightTime || t % reindeer.period === 0;
const tick = (reindeer, t) => {
  if (!isResting(reindeer, t)) {
    reindeer.distance += reindeer.speed;
  }
}

for(let t = 1; t <= raceDuration; t++) {
  reindeers.forEach(d => {
    tick(d, t);
  });
  let leaders = []
  let maxDistance = 0;
  reindeers.forEach((d, i) => {
    if (d.distance > maxDistance) {
      leaders = [i];
      maxDistance = d.distance;
    } else if (d.distance === maxDistance) {
      leaders.push(i);
    }
  });
  leaders.forEach(i => {
    reindeers[i].points++;
  })
}

console.log(reindeers.reduce((max, cur) => Math.max(max, cur.points), 0));
