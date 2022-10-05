<template>
  <section class="wrapper">
    <div class="control">
      <input
        type="text"
        class="expression"
        placeholder="Напишите выражение..."
        v-model="expression"
        ref="input"
        @keydown.enter="calculate()"
      />
      <button class="btn" @click="calculate()">Вычислить</button>
    </div>
    <hr class="line" />
    <div class="output">
      <pre v-text="answer"></pre>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
}

.control {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 4rem 1rem;

  .expression {
    margin-bottom: 1rem;

    padding: 1rem 2rem;

    width: 100%;
    max-width: 1000px;

    font-size: 2rem;
    font-weight: 500;

    border: none;
    border-bottom: 2px solid rgb(152, 0, 144);
    border-radius: 0.2rem;

    &:focus {
      outline: none;
    }
  }
}

.output {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgb(243, 243, 243);

  pre {
    font-size: 2rem;
    font-weight: 500;
  }
}

.btn {
  font-size: 1.2rem;
  letter-spacing: 1.3;

  padding: 0.3rem 1.2rem;

  cursor: pointer;
  transition: all 0.2s linear;

  background-color: rgb(125, 196, 255);

  border: none;
  border-radius: 0.2rem;

  box-shadow: 0 0 0.2rem #000;

  &:hover {
    background-color: rgb(0, 140, 255);
    color: #fff;
  }

  &:disabled {
    color: rgba(0, 0, 0, 0.4);
    background-color: rgb(185, 223, 255);
  }
}

.line {
  background-color: #000;
  height: 3px;

  width: 100%;

  margin: 0 auto;
}
</style>

<script>
import { Matrix } from "../Matrix";

export default {
  data() {
    return {
      expression: "",
      names: [],
      answer: "Результат вычислений...",
      ALPHABET:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
    };
  },

  props: {
    matrices: {
      require: true,
      default: [],
    },
    selected: {
      type: String,
      require: false,
      default: "",
    },
  },

  watch: {
    matrices() {
      for (let item of this.matrices) {
        this.names.push(item.name);
      }
    },
    selected() {
      this.expression += this.selected;
      this.$refs.input.focus();
    },
  },

  methods: {
    calculate() {
      let temp1 = "";
      let temp2 = "";
      let sign = "";
      let current = 1;
      let complete = false;

      for (let index = 0; index < this.expression.length; index++) {
        if (this.ALPHABET.includes(this.expression[index])) {
          if (current == 1) temp1 += this.expression[index];
          if (current == 2) temp2 += this.expression[index];
        }

        if ("+-*".includes(this.expression[index])) {
          sign = this.expression[index];
          current = 2;
        }

        let mtrx1 = this.names.indexOf(temp1) != -1;
        let mtrx2 = this.names.indexOf(temp2) != -1;

        if (mtrx1 && mtrx2) {
          complete = true;
        }

        if (mtrx1 && !mtrx2) {
          if (
            temp2 ==
              temp2
                .split("")
                .filter((i) => "1234567890".includes(i))
                .join("") &&
            temp2 != ""
          ) {
            complete = true;
            sign = "*n";
          }
        }

        if (mtrx2 && !mtrx1) {
          if (
            temp1 ==
              temp1
                .split("")
                .filter((i) => "1234567890".includes(i))
                .join("") &&
            temp2 != ""
          ) {
            complete = true;
            sign = "*n";
            let temp = temp1;
            temp1 = temp2;
            temp2 = temp;
          }
        }

        if (complete) {
          let item1 = this.matrices.filter((i) => i.name == temp1)[0].source;
          let item2;
          if (!isNaN(temp2)) {
            item2 = temp2;
          } else {
            item2 = this.matrices.filter((i) => i.name == temp2)[0].source;
          }

          if (sign == "+") temp1 = Matrix.sum(item1, item2);
          if (sign == "-") temp1 = Matrix.residual(item1, item2);
          if (sign == "*") temp1 = Matrix.multi(item1, item2);
          if (sign == "*n") temp1 = Matrix.multiNumber(item1, item2);

          if (!(temp1 instanceof Matrix)) {
            this.log("Ошибка!", false);
            break;
          }

          temp2 = "";
          sign = "";
          complete = false;
        }
      }

      this.log(temp1, true);
    },

    log(data, type) {
      if (type) this.answer = data.matrixView;
      if (!type) this.answer = data;
    },
  },
};
</script>
