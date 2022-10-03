<template>
  <section class="wrapper">
    <ul class="list">
      <li class="matrix" v-for="(item, idx) in paginatedList" :key="idx">
        <header class="title">
          {{ item.name }}
        </header>
        <main class="content">
          {{ item.content }}
        </main>
      </li>
    </ul>
    <section class="empty" v-if="matrices.length == 0">No matrices</section>
    <hr class="line" />
    <section class="control" v-if="matrices.length">
      <button class="btn" @click="currentPage--">Назад</button>
      <div class="counter">
        <span class="current">{{ currentPage }}</span>
        из
        <span class="all">{{ maxPage }}</span>
      </div>
      <button class="btn" @click="currentPage++">Вперед</button>
    </section>
    <section class="add">
      <button class="btn">Добавить</button>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  background-color: rgb(230, 230, 230);

  width: 100%;

  padding: 1rem 0.5rem;
}

.list {
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  list-style: none;

  .matrix {
    display: flex;
    flex-direction: column;

    width: 200px;
    height: 200px;

    border: 3px solid rgb(152, 0, 144);
    border-radius: 0.5rem;

    margin-left: 1rem;
    margin-bottom: 1rem;

    cursor: pointer;

    background-color: #fff;

    transition: all 0.2s linear;

    &:hover {
      transform: translateY(-0.5rem);
    }

    &:first-child {
      margin-left: 0;
    }

    .title {
      margin-bottom: 0.5rem;
      text-align: center;
      padding: 0.2rem 0;

      font-size: 2rem;

      border-bottom: 1px solid #000;
    }

    .content {
      flex-grow: 1;

      font-size: 1.2rem;
      padding: 0 0.5rem;
    }
  }
}

.line {
  background-color: #000;
  height: 3px;

  width: 100%;
  max-width: 1100px;

  margin: 0 auto;
  margin-bottom: 1rem;
}

.control {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 1rem;

  .counter {
    margin: 0 1rem;
  }
}

.add {
  display: flex;
  justify-content: center;
}

.empty {
  text-align: center;

  font-size: 2rem;

  margin-bottom: 1rem;
}
</style>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      maxPage: null,
    };
  },

  props: {
    matrices: {
      type: Array,
      require: true,
    },
  },

  created() {
    this.maxPage = Math.ceil(this.matrices.length / 4);
  },

  watch: {
    currentPage() {
      if (this.currentPage == 0) this.currentPage++;
      if (this.currentPage > this.maxPage) this.currentPage--;
    },
  },

  computed: {
    paginatedList() {
      const startIndex = (this.currentPage - 1) * 4;
      const endIndex = this.currentPage * 4 - 1;

      return this.matrices.slice(startIndex, endIndex + 1);
    },
  },
};
</script>
