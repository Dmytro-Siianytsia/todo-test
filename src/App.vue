<template>
  <div id="app">
    <main-layout/>
  </div>
</template>

<script>
  import MainLayout from './views/MainLayout.vue';

  export default {
    components: {
      MainLayout
    }
  }
</script>

<style>
  @import '@/assets/styles/main.scss';
</style>
