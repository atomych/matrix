const KEY = "MATRICES_LIST";

export function setList(list) {
  const result = [];

  for (let item of list) {
    result.push({ name: item.name, source: item.source.matrixData });
  }

  localStorage.setItem(KEY, JSON.stringify(result));
}

export function getList() {
  return new Promise((resolve) => {
    const rawData = localStorage.getItem(KEY);
    const data = JSON.parse(rawData);

    resolve(data);
  });
}
