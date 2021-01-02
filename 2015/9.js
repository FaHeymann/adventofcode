const input = `Faerun to Tristram = 65
Faerun to Tambi = 129
Faerun to Norrath = 144
Faerun to Snowdin = 71
Faerun to Straylight = 137
Faerun to AlphaCentauri = 3
Faerun to Arbre = 149
Tristram to Tambi = 63
Tristram to Norrath = 4
Tristram to Snowdin = 105
Tristram to Straylight = 125
Tristram to AlphaCentauri = 55
Tristram to Arbre = 14
Tambi to Norrath = 68
Tambi to Snowdin = 52
Tambi to Straylight = 65
Tambi to AlphaCentauri = 22
Tambi to Arbre = 143
Norrath to Snowdin = 8
Norrath to Straylight = 23
Norrath to AlphaCentauri = 136
Norrath to Arbre = 115
Snowdin to Straylight = 101
Snowdin to AlphaCentauri = 84
Snowdin to Arbre = 96
Straylight to AlphaCentauri = 107
Straylight to Arbre = 14
AlphaCentauri to Arbre = 46`;

const cities = {};

input.split('\n').forEach(line => {
  const [_, c1, c2, dist] = line.match(/^([a-zA-Z]+) to ([a-zA-Z]+) = ([0-9]+)$/);
  if (!cities[c1]) {
    cities[c1] = { distances: {}};
  }
  if (!cities[c2]) {
    cities[c2] = { distances: {}};
  }
  cities[c1].distances[c2] = parseInt(dist, 10);
  cities[c2].distances[c1] = parseInt(dist, 10);
});


const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
     }
   }
 }

 permute(inputArr)
 return result;
}

console.log(permutator(Object.keys(cities)).reduce((min, per) => Math.min(min, per.reduce((sum, cur, i, arr) => i === 0 ? 0 : sum + cities[cur].distances[arr[i - 1]], 0)), Number.MAX_VALUE));
console.log(permutator(Object.keys(cities)).reduce((max, per) => Math.max(max, per.reduce((sum, cur, i, arr) => i === 0 ? 0 : sum + cities[cur].distances[arr[i - 1]], 0)), 0));
