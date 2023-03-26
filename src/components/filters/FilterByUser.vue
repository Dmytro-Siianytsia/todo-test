<template>
  <the-select
    :options="usersIds"
    label="Filter By User"
    @selected="selectHandle"
  ></the-select>
</template>

<script>
import TheSelect from '../UI/TheSelect.vue'

export default {
  components: {
    TheSelect,
  },

  data() {
    return {
      usersIds: ['All'],
    }
  },

  async created() {
    await this.getUsersIds()
  },

  methods: {
    async getUsersIds() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await response.json()

      this.usersIds = ['All', ...users.map((user) => user.id)]
    },

    selectHandle(option) {
      this.$emit('change', option)
    },
  },
}
</script>
