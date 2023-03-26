<template>
  <form class="the-form" @submit.prevent="$emit('submit')">
    <header>
      <h2>{{ header }}</h2>
    </header>
    <div class="form-controls">
      <slot></slot>
      <div class="form-control">
        <button>{{ btnText }}</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'the-form',

  props: {
    header: {
      type: String,
    },
    btnText: {
      type: String,
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';
@import '@/assets/styles/fonts.scss';

.the-form {
  width: 100%;
  border-radius: 5px;
  overflow: hidden;

  header {
    width: 100%;
    height: 51px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $form-header-bg;
  }

  h2 {
    margin: 0;
    font-size: $font-size-main;
    font-weight: 400;
    letter-spacing: -0.025em;
    color: $form-header-color;
  }

  .form-controls {
    position: relative;
    padding: 15px 25px 30px;
    background-color: $form-bg;

    .form-control {
      button {
        width: 100%;
        padding: 10px;
        border: transparent;
        border-radius: 5px;
        margin-top: 5px;
        margin-bottom: 0;
        font-size: $font-size-main;
        font-weight: 500;
        background-color: $success;
        color: white;
        cursor: pointer;

        &:hover {
          background-color: $success-hover;
        }
      }
    }
  }
}
</style>
