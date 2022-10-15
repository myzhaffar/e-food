// Description:
// Create a function that takes one positive three digit integer and rearranges its digits to get the maximum possible number. Assume that the argument is an integer.

// Returm null if the argument is invalid.

// maxRedigit(123) --> 321
// maxRedigit(231) --> 321
// maxRedigit(321) --> 321

// maxRedigit(-1)  --> null
// maxRedigit(0)   --> null
// maxRedigit(99)  --> null
// maxRedigit(number00) --> null

export const maxRedigit = (number) => {
  const isInteger = Number.isInteger(number);
  const isPossitive = number > 0;
  const length = number.toString().length;

  if (isPossitive && isInteger && length === 3) {
    return parseInt(number.toString().split("").sort().reverse().join(""));
  } else {
    return null;
  }
};

export const createNewValue = (array) => {
  //   const newValue = array.map((x) => ({ ...x, class: 5 }));
  const newValue = array.map((x) => {
    return { ...x, class: 5 };
  });
  return newValue;
};
export const productArray = (array) => {
  const newArr = array.map((item) => {
    const allMultipled = array.reduce(
      (accumulator, value) => accumulator * value
    );
    const newItem = allMultipled / item;
    console.log("newItem", newItem);
    return newItem;
  });

  return newArr;
};

export const alternateCase = (text) => {
  const newText = text
    .split("")
    .map((item) => {
      const isUpper = item === item.toUpperCase();
      return isUpper ? item.toLowerCase() : item.toUpperCase();
    })
    .join("");
  return newText;
};

export const currency = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const solution = (number) => {
  const collectedNumber = [];

  for (let index = 1; index <= number; index++) {
    const multipled3 = index * 3;
    const multipled5 = index * 5;

    multipled3 < number && collectedNumber.push(multipled3);
    multipled5 < number && collectedNumber.push(multipled5);
  }
  const uniqCollected = [...new Set(collectedNumber)];
  const reduced = uniqCollected.reduce(
    (accumulator, number) => accumulator + number,
    0
  );
  return reduced;
};

export const toNearestFibonacci = (param) => {
  const number = param.reduce((accumulator, value) => accumulator + value);
  // let fibo = [];
  // for (
  //   let fib = [0, 1];
  //   fib[fib.length - 1] < number;
  //   fib = [...fib, fib[fib.length - 1] + fib[fib.length - 2]]
  // ) {
  //   fibo = [...fib, fib[fib.length - 1] + fib[fib.length - 2]];
  // }
  // const before = fibo[fibo.length - 2];
  // const after = fibo[fibo.length - 1];
  // return Math.abs(before - number) < after - number ? before : after;

  let fib = [0, 1];
  do {
    fib = [...fib, fib[fib.length - 1] + fib[fib.length - 2]];
  } while (fib[fib.length - 1] < number);

  const before = fib[fib.length - 2];
  const after = fib[fib.length - 1];
  return Math.abs(before - number) < after - number
    ? before - number
    : after - number;
};

export const reverseText = (text) => {
  const words = text.split(" ");
  const reversedText = words.map((w) => {
    const basedCharacters = w.split("");
    let characters = w.split("");
    characters.reverse();

    basedCharacters.forEach((c, i) => {
      const isUpper = c === c.toUpperCase();
      characters[i] = isUpper
        ? characters[i].toUpperCase()
        : characters[i].toLowerCase();
    });
    const resultWord = characters.join("");
    return resultWord;
  });
  const resultText = reversedText.join(" ");
  return resultText;
};

export const findBetween = (first, last) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const splited = alphabet.split("");
  const firstIdx = splited.findIndex((char) => char == first);
  const lastIdx = splited.findIndex((char) => char == last);
  const result = [];
  splited.forEach((char, i) => {
    i > firstIdx && i < lastIdx && result.push(char);
  });
  return result.join("");
};
