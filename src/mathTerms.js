import { evaluate, sqrt, pow, log } from 'mathjs'

export const terms = {
  "square root": sqrt,
  "sqrt": sqrt
}

export function isValidTerm(word) {
  return !!terms[word];
}