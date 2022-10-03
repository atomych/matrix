<template>
  <matrices-list :matrices="list" />
</template>

<style scoped lang="scss">
h1 {
  font-size: 1rem;
}
</style>

<script>
import MatricesList from "./components/MatricesList.vue";

export default {
  data() {
    return {
      list: [
        { name: "abc", content: "nfuudghfpds" },
        { name: "abc", content: "nfuudghfpds" },
        { name: "abc", content: "nfuudghfpds" },
        { name: "abc", content: "nfuudghfpds" },
        { name: "abc", content: "nfuudghfpds" },
        { name: "abc", content: "nfuudghfpds" },
        { name: "abc", content: "nfuudghfpds" },
      ],
    };
  },

  components: {
    MatricesList,
  },
};
</script>
