export class Matrix {
  constructor(entryArr) {
    this._entryArr = entryArr;
    if (entryArr.length) {
      this._rows = entryArr.length;

      if (entryArr[0].length) {
        this._cols = entryArr[0].length;
      }
    }

    this._type = this.computedTypes();

    this._isSquare = this._type.indexOf("square") != -1;
    this._isSingle = this._type.indexOf("single") != -1;
    this._isZero = this._type.indexOf("zero") != -1;
  }

  static sum(item1, item2) {
    const [mtrx1, mtrx2] = [item1.matrixData, item2.matrixData];

    if (item1._cols == item2._cols && item1._rows == item2._rows) {
      const result = [];
      const [maxRows, maxCols] = [item1._rows, item1._cols];

      for (let row = 0; row < maxRows; row++) {
        let temp = [];
        for (let col = 0; col < maxCols; col++) {
          temp.push(mtrx1[row][col] + mtrx2[row][col]);
        }
        result.push(temp);
      }

      return new Matrix(result);
    } else {
      return { text: "Sizes of matriсes are not equal", code: 1001 };
    }
  }

  static residual(item1, item2) {
    const [mtrx1, mtrx2] = [item1.matrixData, item2.matrixData];

    if (item1._cols == item2._cols && item1._rows == item2._rows) {
      const result = [];
      const [maxRows, maxCols] = [item1._rows, item1._cols];

      for (let row = 0; row < maxRows; row++) {
        let temp = [];
        for (let col = 0; col < maxCols; col++) {
          temp.push(mtrx1[row][col] - mtrx2[row][col]);
        }
        result.push(temp);
      }

      return new Matrix(result);
    } else {
      return { text: "Sizes of matriсes are not equal", code: 1001 };
    }
  }

  static multiNumber(item, number) {
    const result = [];
    const [maxRows, maxCols] = [item._rows, item._cols];

    for (let row = 0; row < maxRows; row++) {
      const temp = [];

      for (let col = 0; col < maxCols; col++) {
        temp.push(item.matrixData[row][col] * number);
      }

      result.push(temp);
    }

    return new Matrix(result);
  }

  static transpilation(item) {
    const mtrx = item.matrixData;
    const result = [];
    const [maxRows, maxCols] = [item._rows, item._cols];

    for (let col = 0; col < maxCols; col++) {
      let temp = [];

      for (let row = 0; row < maxRows; row++) {
        temp.push(mtrx[row][col]);
      }

      result.push(temp);
    }

    return new Matrix(result);
  }

  static multi(item1, item2) {
    if (item1._cols == item2._rows) {
      const [mtrx1, mtrx2] = [item1.matrixData, item2.matrixData];
      const maxCnt = item1._cols;
      const result = [];

      for (let cnt1 = 0; cnt1 < maxCnt; cnt1++) {
        let temp = [];

        for (let cnt2 = 0; cnt2 < maxCnt; cnt2++) {
          let value = 0;

          for (let cnt3 = 0; cnt3 < maxCnt; cnt3++) {
            value += mtrx1[cnt1][cnt3] * mtrx2[cnt3][cnt2];
          }

          temp.push(value);
        }

        result.push(temp);
      }

      return new Matrix(result);
    } else {
      return {
        text: "Amount of first matrixs cols is not equal amount of second matrixs rows",
        code: 1002,
      };
    }
  }

  static determinant(item) {
    if (item._type.indexOf("square") != -1) {
      const mtrx = item.matrixData;
      const size = mtrx.length;

      if (size == 1) return mtrx[0][0];

      if (size == 2) return mtrx[0][0] * mtrx[1][1] - mtrx[0][1] * mtrx[1][0];

      let value = 0;

      for (let col = 0; col < item._cols; col++) {
        const cutedMtrx = new Matrix(item.cut(0, col));
        value += Math.pow(-1, col + 2) * Matrix.determinant(cutedMtrx);
      }

      return value;
    }
  }

  static reverse(item) {
    if (item._type.indexOf("square") != -1) {
      const transpMtrx = Matrix.transpilation(item);
      const determinant = Matrix.determinant(item);
      let allianceMtrx = [];

      for (let row = 0; row < transpMtrx._rows; row++) {
        const temp = [];

        for (let col = 0; col < transpMtrx._cols; col++) {
          temp.push(transpMtrx.alAdd(row, col));
        }

        allianceMtrx.push(temp);
      }

      allianceMtrx = new Matrix(allianceMtrx);

      return Matrix.multiNumber(allianceMtrx, 1 / determinant);
    } else {
      return "This matrix are not square";
    }
  }

  get matrixView() {
    let result = "";
    const arr = this._entryArr;

    for (let row = 0; row < arr.length; row++) {
      for (let col = 0; col < arr[row].length; col++) {
        result += `${arr[row][col]} `;
        if (col == arr[row].length - 1 && row != arr.length - 1) {
          result += `\n`;
        }
      }
    }

    return result;
  }

  get matrixData() {
    return this._entryArr;
  }

  get sizes() {
    return `rows: ${this._rows}\ncols: ${this._cols}`;
  }

  get info() {
    if (this._type.length) {
      return `Info Log:\nis Square: ${this._isSquare}\nis Single: ${this._isSingle}\nis Zero: ${this._isZero}\n`;
    } else {
      return "This matrix have not any features";
    }
  }

  computedTypes() {
    const result = [];

    if (this._cols == this._rows) {
      result.push("square");
    }

    const zero = this.matrixView.split("0").length - 1;
    const one = this.matrixView.split("1").length - 1;

    if (zero == this._rows * this._cols) {
      result.push("zero");
    }

    if (one == this._cols && zero == this._cols * this._rows - one) {
      result.push("single");
    }

    return result;
  }

  changeItems(arr) {
    for (let item of arr) {
      const [row, col, value] = [...item];

      this._entryArr[row][col] = value;
    }
  }

  cut(notRow, notCol) {
    const result = [];
    const mtrx = this.matrixData;

    for (let row = 0; row < this._rows; row++) {
      if (row != notRow) {
        const temp = [];

        for (let col = 0; col < this._cols; col++) {
          if (col != notCol) {
            temp.push(mtrx[row][col]);
          }
        }

        if (temp.length) {
          result.push(temp);
        }
      }
    }

    return result;
  }

  minor(row, col) {
    return Matrix.determinant(new Matrix(this.cut(row, col)));
  }

  alAdd(row, col) {
    return Math.pow(-1, row + col + 2) * this.minor(row, col);
  }
}
