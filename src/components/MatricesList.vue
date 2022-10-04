<template>
  <section class="wrapper">
    <ul class="list">
      <li class="matrix" v-for="(item, idx) in paginatedList" :key="idx">
        <header class="title">
          {{ item.name }}
        </header>
        <main class="content">
          <pre v-text="item.source.matrixView"></pre>
        </main>
      </li>
    </ul>
    <section class="empty" v-if="matrices.length == 0">No matrices</section>
    <hr class="line" />
    <section class="control" v-if="matrices.length">
      <button class="btn" @click="currentPage--" :disabled="currentPage == 1">
        Назад
      </button>
      <div class="counter">
        <span v-text="currentPage"></span>
        <span> из </span>
        <span v-text="maxPage"></span>
      </div>
      <button
        class="btn"
        @click="currentPage++"
        :disabled="currentPage == maxPage"
      >
        Вперед
      </button>
    </section>
    <section class="add">
      <button
        class="btn"
        @click="$emit('add-matrix')"
        :disabled="state == 'create'"
      >
        Добавить
      </button>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  background-color: rgb(243, 243, 243);

  width: 100%;

  padding: 1rem 0.5rem;

  border-bottom: 2px solid rgb(152, 0, 144);
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
      box-shadow: 0 0 0.5rem #000;
    }

    &:first-child {
      margin-left: 0;
    }

    .title {
      text-align: center;
      padding: 0.2rem 0;

      font-size: 2rem;

      border-bottom: 1px solid #000;
    }

    .content {
      flex-grow: 1;

      font-size: 1.2rem;
      padding: 0 0.5rem;

      overflow: hidden;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.line {
  background-color: #000;
  height: 3px;

  width: 100%;

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
  font-weight: 700;

  margin-bottom: 1rem;
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

.counter {
  span {
    font-size: 1.2rem;
  }
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
      default: () => [],
    },
    state: {
      type: String,
      require: true,
      default: () => "start",
    },
  },

  emits: {
    "add-matrix": null,
  },

  watch: {
    currentPage() {
      if (this.currentPage == 0) this.currentPage++;
      if (this.currentPage > this.maxPage) this.currentPage--;
    },

    matrices() {
      this.maxPage = Math.ceil(this.matrices.length / 4);
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
