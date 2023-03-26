<template>
  <div class="container">
    <div v-if="isLoading" class="spinner-container">
      <the-spinner></the-spinner>
    </div>
    <div v-else class="todo-container">
      <header>
        <section class="controls">
          <div class="control-item">
            <label class="label" for="search">Search By Title</label>
            <input id="search" type="text" v-model="searchString" />
            <img class="search-icon" src="../assets/icons/search.png" alt="" />
          </div>
          <div class="filters">
            <div class="control-item">
              <filter-by-status @change="filterByStatus"></filter-by-status>
            </div>
            <div class="control-item">
              <filter-by-user @change="filterByUser"></filter-by-user>
            </div>
          </div>
        </section>
        <div class="add-todo-container">
          <add-todo @submit="addTodo"></add-todo>
        </div>
      </header>
      <div v-if="filteredTodos.length">
        <todo-items-list
          :filtered-todos="filteredTodos"
          @click="setFavorite"
        ></todo-items-list>
      </div>
      <h3 v-else>Todos not found</h3>
    </div>
  </div>
</template>

<script>
import FilterByStatus from '@/components/filters/FilterByStatus.vue'
import FilterByUser from '@/components/filters/FilterByUser.vue'
import TheSpinner from '@/components/UI/TheSpinner.vue'
import TodoItemsList from '@/components/todo/TodoItemsList.vue'
import AddTodo from '@/components/todo/AddTodo.vue'
import { API } from '@/api'

export default {
  components: {
    FilterByStatus,
    FilterByUser,
    TheSpinner,
    TodoItemsList,
    AddTodo,
  },

  data() {
    return {
      todos: [],
      statusFilter: 'All',
      userIdFilter: 'All',
      favoriteTodosIds: [],
      searchString: '',
      isLoading: false,
    }
  },

  computed: {
    filteredTodos() {
      let todos = []

      switch (this.statusFilter) {
        case 'Completed':
          todos = this.todos.filter((todo) => todo.completed)
          break
        case 'Uncompleted':
          todos = this.todos.filter((todo) => !todo.completed)
          break
        case 'Favorites':
          todos = this.todos.filter((todo) => todo.isFavorite)
          break
        default:
          todos = this.todos
      }

      todos =
        this.userIdFilter === 'All'
          ? todos
          : todos.filter((todo) => todo.userId === this.userIdFilter)

      todos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(this.searchString.toLowerCase())
      )

      return todos
    },
  },

  async created() {
    if (!localStorage.getItem('user')) {
      this.$router.replace('/')
    }

    await this.fetchTodos()
    this.todos = this.todos.map((todo) => {
      const todoId = +localStorage.getItem(todo.id)

      return todoId
        ? { ...todo, isFavorite: true }
        : { ...todo, isFavorite: false }
    })
  },

  methods: {
    addTodo(todo) {
      this.todos.unshift(todo)
    },

    async fetchTodos() {
      this.isLoading = true
      this.todos = (await API.getTodos()) || []
      this.isLoading = false
    },

    filterByStatus(status) {
      this.statusFilter = status
    },

    filterByUser(id) {
      this.userIdFilter = id
    },

    setFavorite(id) {
      if (localStorage.getItem(id)) {
        localStorage.removeItem(id)

        this.todos = this.todos.map((todo) =>
          todo.id === id ? { ...todo, isFavorite: false } : todo
        )
      } else {
        localStorage.setItem(id, id)

        this.todos = this.todos.map((todo) =>
          todo.id === id ? { ...todo, isFavorite: true } : todo
        )
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';
@import '@/assets/styles/fonts.scss';

.container {
  max-width: 1200px;
  width: 100%;
  text-align: center;
}

.spinner-container {
  margin-top: 30%;
  text-align: center;
}

.todo-container {
  margin: 20px auto;
  padding: 20px;
  width: 100%;
  background-color: #f5eaea;
  border-radius: 5px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .filters {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 16px;

    .control-item {
      width: 49%;
      margin: 0;
    }
  }

  .controls {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 50%;
    margin-bottom: 20px;
  }

  .control-item {
    position: relative;
    width: 100%;
    text-align: start;
  }

  .label {
    display: inline-block;
    margin-bottom: 3px;
    font-size: $font-size-label;
  }

  .control-item input {
    width: 100%;
    padding: 8px 40px 8px 8px;
    border: transparent;
    border-radius: 5px;
    font-size: $font-size-main;
  }

  .search-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    width: 20px;
    height: 20px;
    margin-left: 20px;
  }

  .add-todo-container {
    margin-bottom: 30px;
    width: 48%;
  }

  @media (max-width: 768px) {
    .controls {
      width: 100%;
    }

    header {
      flex-wrap: wrap-reverse;
    }
    .add-todo-container {
      width: 100%;
    }
  }

  @media (max-width: 520px) {
    .control-item {
      width: 100%;
    }
  }
}
</style>
