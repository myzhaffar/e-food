import React from "react";
import {
  maxRedigit,
  createNewValue,
  productArray,
  alternateCase,
  currency,
  solution,
  toNearestFibonacci,
  findBetween,
  reverseText,
} from "./utils";

export default function Logic() {
  const sorted = maxRedigit(984);

  const peserta = [{ name: "fazufi" }, { name: "daus" }, { name: "afiq" }];
  const oldArr = [3, 6, 9];
  const newArr = productArray(oldArr);

  const newPeserta = createNewValue(peserta);

  const text = "akU adalaH fazufi";
  const alternated = alternateCase(text);
  const number = 10000;
  const cursed = currency(number);
  const solutedNumber = solution(20);
  const str = "akU adalaH fazufi"
  const dibalik = reverseText(str)
  const alphabetween = findBetween("B", "F")
  console.log("alphabetween", alphabetween);
  console.log("nearest fibonacci", toNearestFibonacci([15, 6]));
 

  return <div>Logic</div>;
} 
