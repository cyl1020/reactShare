//给定一个非负整数，判断是否存在两个整数a，b，使得a² + b² = c

/* 
  理解：
    1. a或者b肯定是比c小的数
    2. a或者b肯定小于c开方
*/

const SumOfSquares1 = (number) => {
  let sqrtNumber = Math.floor(Math.sqrt(number));
  for (let i = 0; i <= sqrtNumber; i++) {
    for (let j = 0; j <= sqrtNumber; j++) {
      if (i * i + j * j == number) {
        return true;
      }
    }
  }
  return false;
};

// console.log(SumOfSquares1(3));

const SumOfSquares2 = (number) => {
  let sqrtNumber1 = Math.sqrt(number / 2);
  let sqrtNumber2 = Math.floor(Math.sqrt(number));
  if (sqrtNumber1 % 1 == 0) return true;
  for (let i = 0; i <= Math.floor(sqrtNumber1); i++) {
    for (let j = Math.ceil(sqrtNumber1); j <= sqrtNumber2; j++) {
      if (i * i + j * j == number) {
        return true;
      }
    }
  }
  return false;
};

// console.log(SumOfSquares2(32));

const SumOfSquares3 = (number) => {
  let sqrtNumber = Math.sqrt(number / 2);
  if (sqrtNumber % 1 == 0) return true;
  for (let i = 0; i <= Math.floor(sqrtNumber); i++) {
    if (Math.sqrt(number - i * i) % 1 == 0) {
      return true;
    }
  }
  return false;
};

console.log(SumOfSquares3(44456465165));
