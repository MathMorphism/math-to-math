import { sqrt, pow, log, sin, cos, tan, derivative } from 'mathjs'

export const terms = {
  "square root": sqrt,
  "sqrt": sqrt,
  "power": pow,
  "log": log,
  "sign": sin,
  "cosine": cos,
  "tangent": tan, 
  "derivative": derivative
}

export const mathWord = {
  // "square root": "sqrt",
  // "sqrt": "sqrt",
  // "power": "power",
  // "log": "log",
  "sign": "sin"
}

export function isValidTerm(word) {
  return !!terms[word];
}

export function format(word) {
  if (!word) return;
  console.log(word)
  const spread = word.split(' ')
  console.log(spread)
  const mathPhrases = Object.keys(mathWord)
  console.log(mathPhrases)
  const check = spread.filter((word) => mathPhrases.includes(word))
  console.log(mathWord[check[0]])
  console.log(check)
  if (mathWord[check[0]]) {
    const replaceWord = word.replace(spread[0],mathWord[check[0]])
    console.log(replaceWord)
    return replaceWord
  } else {
    console.log(word)
    return word
  }
  // if (check.length === 0) return;
  // if (check.length > 0) {
  //   const a = check[0]
  //   const replaceWord = a.replace(a, mathWord[a])
  //   if (replaceWord) {
  //     console.log(replaceWord)
  //     return replaceWord
  //   } else {
  //     console.log(word)
  //     return word
  //   }
  // }
}