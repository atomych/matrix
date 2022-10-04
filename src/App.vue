<template>
  <main class="main">
    <matrices-list
      :matrices="list"
      :state="state"
      @add-matrix="state = 'create'"
    />
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
import { setList, getList } from "./localStorage.js";

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
        name: obj.name,
        source: new Matrix(obj.source),
      };

      this.list = [...this.list, newMatrix];
      this.state = "start";

      setList(this.list);
    },
  },
};
</script>
