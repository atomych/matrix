// value - что надо проверить
// settings - объект
//  {
//    type - string, number
//    len - максимальная длина
//    max - маскимальное значение (для number)
//    symbols - алфавит допустимых символов
//  }
//
//
export function validator(value, settings) {
  const result = { res: true };

  if (settings.type == "string") {
    if (settings.len && value.length > settings.len) {
      result.res = false;
      result.mes = `Введенное значение по длине превышает норму в ${settings.len} символов!`;
    }

    if (settings.symbols) {
      if ("0123456789".includes(value[0])) {
        result.res = false;
        result.mes = `Введенное значение начинается с цифры: ${value[0]}!`;
      }

      for (let index = 0; index < value.length; index++) {
        if (!settings.symbols.includes(value[index])) {
          result.res = false;
          result.mes = `В вашей записи есть недопустимый символ: ${value[index]}!`;
        }
      }
    }
  }

  if (settings.type == "number") {
    if (settings.max && value > settings.max) {
      result.res = false;
      result.mes = `Введенное значение превышает допустимое: ${settings.len}!`;
    }
  }

  return result;
}
