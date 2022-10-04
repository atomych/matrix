<template>
  <section class="wrapper">
    <div class="sizes">
      <div class="item">Строки: <input type="text" v-model="rows" /></div>
      <div class="item">Столбцы: <input type="text" v-model="cols" /></div>
      <button class="fill" @click="create()">Создать</button>
    </div>
    <div class="matrix" v-if="state == 'fill'">
      <div class="row" v-for="(row, idxR) in list" :key="idxR">
        <input
          type="number"
          v-for="(item, idxC) in row"
          :key="idxC"
          v-model="list[idxR][idxC]"
        />
      </div>
      <button class="add" @click="$emit('create-matrix', list)">
        Добавить
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
</style>

<script>
export default {
  data() {
    return {
      state: "sizes",
      cols: 0,
      rows: 0,
      list: [],
    };
  },

  emits: {
    "create-matrix": (value) => typeof value == "object",
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
