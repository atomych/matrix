<template>
  <section class="wrapper">
    <div class="settings" v-if="state == 'settings'">
      <div class="item">
        <span class="text">Строки: </span><input type="number" v-model="rows" />
      </div>
      <div class="item">
        <span class="text">Столбцы: </span
        ><input type="number" v-model="cols" />
      </div>
      <div class="item">
        <span class="text">Имя: </span><input type="text" v-model="name" />
      </div>
      <div class="control">
        <button class="btn" @click="$emit('back')">Назад</button>
        <button
          class="btn"
          @click="create()"
          :disabled="rows == 0 || cols == 0 || name == ''"
        >
          Далее
        </button>
      </div>
    </div>
    <div class="matrix" v-if="state == 'fill'">
      <div class="row" v-for="(row, idxR) in list" :key="idxR">
        <input
          class="col"
          type="number"
          v-for="(item, idxC) in row"
          :key="idxC"
          v-model="list[idxR][idxC]"
        />
      </div>
      <button
        class="btn"
        @click="$emit('create-matrix', { source: list, name: name })"
      >
        Создать
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  flex-grow: 1;

  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
}

.settings {
  min-width: 500px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .item {
    display: flex;
    justify-content: space-between;

    margin-bottom: 1rem;

    .text {
      font-size: 1.5rem;
    }

    input {
      font-size: 1.3rem;
      font-weight: 500;

      padding: 0.3rem 0.5rem;

      border: 2px solid rgb(152, 0, 144);
      border-radius: 0.2rem;

      transition: all 0.2s linear;

      &[type="number"] {
        width: 50px;
        text-align: center;
      }

      &:focus {
        outline: none;
      }
    }
  }
}

.control {
  display: flex;
  justify-content: center;

  margin-top: 2rem;

  .btn {
    margin-right: 2rem;

    &:last-child {
      margin-right: 0;
    }
  }
}

.matrix {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .row {
    margin-bottom: 1rem;

    .col {
      margin-right: 1rem;
      padding: 0.5rem;

      font-size: 1.2rem;
      text-align: center;

      width: 50px;
      height: 50px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.btn {
  width: max-content;

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
</style>

<script>
export default {
  data() {
    return {
      state: "settings",
      cols: 0,
      rows: 0,
      name: "",
      list: [],
    };
  },

  emits: {
    "create-matrix": (value) => typeof value == "object",
    back: null,
  },

  methods: {
    create() {
      if (this.rows == 0 || this.cols == 0) return;

      for (let row = 0; row < this.rows; row++) {
        const temp = [];

        for (let col = 0; col < this.cols; col++) {
          temp.push("");
        }

        this.list.push(temp);
      }

      this.state = "fill";
    },
  },
};
</script>
