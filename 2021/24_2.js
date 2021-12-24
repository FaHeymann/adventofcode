let [w, x, y, z] = [0, 0, 0, 0];

// const num = "9" + "9" + "9" + "99" + "7" + "9" + "59" + "1" + "94"+ "5" + "6"
const num = "4" + "5" + "3" + "11" + "1" + "9" + "15" + "1" + "61"+ "1" + "1"

// index pairs: [0, 13], [1, 12], [2, 5], [3, 4], [6, 9], [7, 8], [10, 11]
// diff between values in the pairs: Math.abs(summand1[ idxpair[1] ]) - summand2[ idxpair[0] ]

for (let i = 0; i < num.length; i++) {
  w = parseInt(num.charAt(i), 10);

  const summand1 = [10, 11, 14, 13, -6, -14, 14, 13, -8, -15, 10, -11, -13, -4][i]

  if (summand1 < 0) {
    console.log(z % 26, w, summand1)
  }
  
  const helper = z % 26 !== w - summand1

  if (summand1 < 0) {
    z = Math.floor(z / 26)
  }
  

  if (helper) {
    z *= 26
  }

  const summand2 = [1, 9, 12, 6, 9, 15, 7, 12, 15, 3, 6, 2, 10, 12][i]
  if (helper) {
    z += (w + summand2)
  }

  console.log(i + 1, w, z.toString(26).split("").map(n => parseInt(n, 26)))
}

console.log(num)
