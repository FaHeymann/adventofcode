// let a = 1;
// let b = 0;
// let c = 0;
// let d = 0;
// // let e = 0;
// let f = 0;
// let g = 0;
// let h = 0;

// b = 108100;
// c = 125100;

// while (true) {
//   f = false;
//   d = 2;
//   e = 2;
//   do {
//     do {
//       if (d * e === b) {
//         f = true;
//       }
//       e++;
//     } while (e - b !== 0);
//     d++;
//   } while (d - b !== 0);

//   if (f) {
//     h++;
//   }

//   g = b;
//   g -= c;

//   if (b - c === 0) {
//     // TERMINATE
//   }

//   b += 17;
// }


let count = 0;
for (let i = 108100; i <= 125100; i += 17) {
  for (let j = 2; j <= Math.sqrt(i); j++) {
    if (i % j === 0) {

      count++;
      break;
    }
  }
}

console.log(count);
