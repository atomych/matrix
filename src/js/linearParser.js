import { Matrix } from "./Matrix";

const ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

const NUMBERS = "1234567890";

export function operandsList(string) {
  const result = [];
  let temp = "";

  for (let index = 0; index < string.length; index++) {
    if (ALPHABET.includes(string[index])) {
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

function getTemplate(sign, index) {
  return `/${sign}/${index < 10 ? `0${index}` : index}/`;
}

function getMarkupString(string) {
  const counter = {
    m: 0,
    n: 0,
  };

  const operands = operandsList(string);

  const markupData = {};
  let markupString = string;
  let startIndex = 0;

  for (let item of operands) {
    let sign = "";

    if ("1234567890".includes(item[0])) {
      sign = "n";
    } else {
      sign = "m";
    }

    const findIndex = markupString.indexOf(item, startIndex);

    const template = getTemplate(sign, counter[sign]++);

    markupData[template] = item;
    markupString =
      markupString.slice(0, findIndex) +
      markupString.slice(findIndex).replace(item, template);

    startIndex = findIndex + template.length;
  }

  return { string: markupString, data: markupData };
}

function linearParser(string) {
  let localString = string;
  const actions = [];

  while (localString.indexOf("|") != -1) {
    const openIndex = localString.indexOf("|");
    const closeIndex = localString.indexOf("|", openIndex + 1);

    actions.push({
      operand: localString.slice(openIndex + 1, closeIndex),
      sign: "|",
      type: 1,
    });

    const template = getTemplate("a", actions.length - 1);

    localString =
      localString.slice(0, openIndex) +
      template +
      localString.slice(closeIndex + 1);
  }

  while (localString.indexOf("*") != -1) {
    const findIndex = localString.indexOf("*");

    actions.push({
      operand1: localString.slice(findIndex - 6, findIndex),
      operand2: localString.slice(findIndex + 1, findIndex + 7),
      sign: "*",
      type: 2,
    });

    const template = getTemplate("a", actions.length - 1);

    localString =
      localString.slice(0, findIndex - 6) +
      template +
      localString.slice(findIndex + 7);
  }

  while (localString.indexOf("+") != -1 || localString.indexOf("-") != -1) {
    const findIndexPlus = localString.indexOf("+");
    const findIndexMinus = localString.indexOf("-");
    let currentIndex = "";

    if (findIndexPlus == -1) currentIndex = findIndexMinus;
    if (findIndexMinus == -1) currentIndex = findIndexPlus;

    if (currentIndex == "")
      currentIndex =
        findIndexMinus < findIndexPlus ? findIndexMinus : findIndexPlus;

    actions.push({
      operand1: localString.slice(currentIndex - 6, currentIndex),
      operand2: localString.slice(currentIndex + 1, currentIndex + 7),
      sign: localString[currentIndex],
      type: 2,
    });

    const template = getTemplate("a", actions.length - 1);

    localString =
      localString.slice(0, currentIndex - 6) +
      template +
      localString.slice(currentIndex + 7);
  }

  return actions;
}

function getParserData(string) {
  const actions = [];
  const markup = getMarkupString(string);
  markup.string = markup.string.replaceAll(" ", "");

  actions.push(...linearParser(markup.string));

  return { actions: actions, data: markup.data };
}

export function calculate(string, matrices) {
  const parserData = getParserData(string);
  const actions = parserData.actions;
  const templates = parserData.data;

  function getMatrixByName(name) {
    return matrices.filter((el) => el.name == name)[0].source;
  }

  function getItems(action) {
    if (action.type == 1) {
      const operand = getMatrixByName(templates[action.operand]);
      return { operand: operand, type: action.sign };
    }

    if (action.type == 2) {
      const isNumber = (name) => NUMBERS.includes(name[0]);
      const isAction = (template) => template[1] == "a";
      const items = {};

      if (isAction(action.operand1)) {
        const string = action.operand1.slice(3, 5);
        const index = string[0] == "0" ? Number(string[1]) : Number(string);
        items[1] = actions[index].res;
      }

      if (isAction(action.operand2)) {
        const string = action.operand2.slice(3, 5);
        const index = string[0] == "0" ? Number(string[1]) : Number(string);
        items[2] = actions[index].res;
      }

      if (!items[1]) {
        if (isNumber(templates[action.operand1])) {
          items.number = templates[action.operand1];
        } else {
          items[1] = templates[action.operand1];
        }
      }

      if (!items[2]) {
        if (isNumber(templates[action.operand2])) {
          items.number = templates[action.operand2];
        } else {
          items[2] = templates[action.operand2];
        }
      }

      if (typeof items[1] == "string") items[1] = getMatrixByName(items[1]);
      if (typeof items[2] == "string") items[2] = getMatrixByName(items[2]);

      if (items.number) {
        if (items[1])
          return {
            operands: [items[1], items.number],
            type: "*n",
          };
        if (items[2])
          return {
            operands: [items[2], items.number],
            type: "*n",
          };
      } else {
        return {
          operands: [items[1], items[2]],
          type: action.sign,
        };
      }
    }
  }

  for (let index = 0; index < actions.length; index++) {
    const data = getItems(actions[index]);
    let result;

    if (data.type == "|") result = `${Matrix.determinant(data.operand)}`;
    if (data.type == "+") result = Matrix.sum(...data.operands);
    if (data.type == "-") result = Matrix.residual(...data.operands);
    if (data.type == "*") result = Matrix.multi(...data.operands);
    if (data.type == "*n") result = Matrix.multiNumber(...data.operands);

    if (index == actions.length - 1) return result;
    else actions[index].res = result;
  }
}
