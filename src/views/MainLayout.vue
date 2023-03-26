<template>
  <div class="container">
    <header>
      <div v-if="user" class="user">
        <span>{{ user.name }}</span>
        <img src="../assets/icons/logout.png" alt="" @click="logout"/>
      </div>
    </header>
    <main>
      <router-view @login="setUser"/>
    </main>
    <footer></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    }
  },

  created() {
    this.user = JSON.parse(localStorage.getItem('user'))
  },

  methods: {
    setUser(user) {
      this.user = user
    },

    logout() {
      localStorage.removeItem('user')
      this.user = null
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background-color: $header-bg;

  .user {
    margin-left: auto;
    display: flex;
    align-items: center;
  }

  img {
    margin-left: 20px;
    cursor: pointer;
  }
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $main-bg;
  flex-grow: 1;
}

footer {
  width: 100%;
  height: 270px;
  background-color: $footer-bg;
}
</style>
