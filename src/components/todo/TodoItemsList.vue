<template>
  <ul class="todos">
    <li
      v-for="todo in filteredTodos"
      class="todo-item"
      :key="todo.id"
      @click="$emit('click', todo.id)"
    >
      <span :class="{ 'todo-title': todo.completed }">
        {{ todo.title }}
      </span>
      <img
        class="icon"
        v-if="todo.isFavorite"
        src="@/assets/icons/favorite-active.png"
        alt=""
      />
      <img class="icon" v-else src="@/assets/icons/favorite.png" alt="" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    filteredTodos: Array,
  },
}
</script>

<style scoped lang="scss">
  @import '@/assets/styles/colors.scss';
  .todos {
    padding: 0;
    margin: 0;
    gap: 6px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .todo-item {
    display: flex;
    width: 200px;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5px;
    margin-bottom: 5px;
    border: 1px solid black;
    border-radius: 5px;
    cursor: pointer;
    list-style: none;
    background-color: white;
  }

  .todo-title {
    text-decoration: line-through 2px $success;
  }

  .icon {
    width: 24px;
    height: 24px;
    margin-left: 20px;
  }

  @media (max-width: 520px) {
    .todo-item {
      width: 100%;
    }
  }
</style>
