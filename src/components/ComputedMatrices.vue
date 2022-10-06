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
// import { Matrix } from "../js/Matrix";
import { operandsList, actionsList } from "../js/linearParser";

export default {
  data() {
    return {
      expression: "",
      names: [],
      answer: "Результат вычислений...",
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

  emits: {
    unselected: null,
    "used-matrices": null,
  },

  inject: ["ALPHABET"],

  watch: {
    matrices() {
      for (let item of this.matrices) {
        this.names.push(item.name);
      }
    },
    selected() {
      this.expression += this.selected;
      this.$refs.input.focus();
      this.$emit("unselected");
    },
    expression() {
      if (this.expression == "") this.answer = "Результат вычислений...";

      const used = operandsList(this.expression, this.ALPHABET);
      this.$emit("used-matrices", used);
    },
  },

  methods: {
    calculate() {
      const actions = actionsList(this.expression, this.ALPHABET);

      console.log(actions);
    },

    log(data, type) {
      if (type) this.answer = data.matrixView;
      if (!type) this.answer = data;
    },
  },
};
</script>
