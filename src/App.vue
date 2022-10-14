<template>
  <main class="main">
    <matrices-list
      :matrices="list"
      :state="state"
      @add-matrix="state = 'create'"
      @select-matrix="selectMatrix"
    />
    <create-matrix
      v-if="state == 'create'"
      @create-matrix="addMatrix"
      @back="state = 'start'"
    />
    <computed-matrices
      v-if="state == 'start'"
      :matrices="list"
      :selected="selected"
      @unselected="selected = ''"
      @used-matrices="highlight"
    />
  </main>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;

  height: 100%;
}
</style>

<script>
import MatricesList from "./components/MatricesList.vue";
import CreateMatrix from "./components/CreateMatrix.vue";
import ComputedMatrices from "./components/ComputedMatrices.vue";
import { Matrix } from "./js/Matrix.js";
import { setList, getList } from "./js/localStorage.js";

export default {
  data() {
    return {
      list: [],
      state: "start",
      selected: "",
    };
  },

  components: {
    MatricesList,
    CreateMatrix,
    ComputedMatrices,
  },

  provide: {
    ALPHABET: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890",
  },

  created() {
    getList().then((data) => {
      if (data?.length) {
        for (let item of data) {
          this.addMatrix(item);
        }
      }
    });
  },

  methods: {
    addMatrix(obj) {
      const newMatrix = {
        name: obj.name + 1,
        source: new Matrix(obj.source),
        used: false,
      };

      this.list = [...this.list, newMatrix];
      this.state = "start";

      setList(this.list);
    },

    selectMatrix(name) {
      this.selected = name;
    },

    highlight(names) {
      for (let item of this.list) {
        if (names.indexOf(item.name) != -1) {
          item.used = true;
        } else {
          item.used = false;
        }
      }
    },
  },
};
</script>
