<template>
  <the-form header="Add Todo" btn-text="Add" @submit="submitHandler">
    <the-text-input
      :value="userId"
      placeholder="User ID"
      @input="inputHandler($event, 'userId')"
    ></the-text-input>
    <the-text-input
      :value="title"
      placeholder="Title"
      @input="inputHandler($event, 'title')"
    ></the-text-input>
    <p v-if="hasEmptyField" class="warning">Both fields are required</p>
  </the-form>
</template>

<script>
import TheForm from '../UI/TheForm.vue'
import TheTextInput from '../UI/TheTextInput.vue'
import { API } from '@/api'

export default {
  components: {
    TheForm,
    TheTextInput,
  },

  data() {
    return {
      userId: '',
      title: '',
      hasEmptyField: false,
      todo: null,
    }
  },

  watch: {
    userId() {
      this.hasEmptyField = false
    },

    title() {
      this.hasEmptyField = false
    },
  },

  methods: {
    inputHandler(value, fieldName) {
      this[fieldName] = value
    },

    async submitHandler() {
      this.todo = null

      if (!this.userId || !this.title) {
        this.hasEmptyField = true
        return
      }

      try {
        this.todo = await API.addTodo(this.userId, this.title)
        this.$emit('submit', this.todo)
        this.userId = ''
        this.title = ''
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';

.warning {
  position: absolute;
  bottom: 64px;
  font-size: 11px;
  color: $error;
}
</style>
