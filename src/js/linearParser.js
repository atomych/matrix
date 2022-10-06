export function operandsList(string, symbols) {
  const result = [];
  let temp = "";

  for (let index = 0; index < string.length; index++) {
    if (symbols.includes(string[index])) {
      temp += string[index];
      continue;
    }

    if (temp != "") {
      result.push(temp);
      temp = "";
    }
  }

  if (temp != "") result.push(temp);

  return result;
}

export function actionsList(string, symbols) {
  const result = [];

  // алгоритм парсинга

  return result, string, symbols;
}
