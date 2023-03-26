<template>
  <the-select
    :options="options"
    label="Filter By Status"
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
      options: ['All', 'Completed', 'Uncompleted', 'Favorites'],
    }
  },

  methods: {
    selectHandle(option) {
      this.$emit('change', option)
    },
  },
}
</script>
