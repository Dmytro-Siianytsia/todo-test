<template>
  <div class="form-control">
    <input
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';
.form-control {
  input {
    width: 100%;
    padding: 10px;
    border: transparent;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  input::placeholder {
    color: $input-placeholder;
  }
}
</style>
