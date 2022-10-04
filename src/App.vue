<template>
  <main class="main">
    <matrices-list :matrices="list" @add-matrix="state = 'create'" />
    <create-matrix v-if="state == 'create'" @create-matrix="addMatrix" />
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
import { Matrix } from "./Matrix.js";

export default {
  data() {
    return {
      list: [],
      state: "start",
    };
  },

  components: {
    MatricesList,
    CreateMatrix,
  },

  methods: {
    addMatrix(array) {
      this.list = [...this.list, new Matrix(array)];
      this.state = "start";
    },
  },
};
</script>
