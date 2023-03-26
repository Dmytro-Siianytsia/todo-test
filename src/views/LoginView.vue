<template>
  <div class="login-form">
    <the-form header="description" btn-text="Login" @submit="submitHandler">
      <p>description</p>
      <div class="form-control">
        <input type="text" placeholder="Username" v-model.trim="userName" />
      </div>
      <div class="form-control">
        <input type="text" placeholder="Phone Number" v-model="phone" />
      </div>
      <p v-if="hasEptyField" class="warning">Both fields are required</p>
      <p v-if="loginError" class="warning">User not found</p>
    </the-form>
  </div>
</template>

<script>
import TheForm from '@/components/UI/TheForm.vue'
import { API } from '@/api'

export default {
  name: 'login-form',
  components: {
    TheForm,
  },

  data() {
    return {
      userName: 'Clementine Bauch',
      phone: '1-463-123-4447',
      hasEptyField: false,
      loginError: false,
    }
  },

  watch: {
    userName(value) {
      const regExp = /^[a-zA-Zа-яА-Я\s]+$/

      this.clearErrors()
      this.validateInput('userName', value, regExp)
    },

    phone(value) {
      const regExp = /^[0-9!@#$%^&*()_+\-={}[\]|\\:;"'<,>.?/]*$/

      this.clearErrors()
      this.validateInput('phone', value, regExp)
    },
  },

  methods: {
    async submitHandler() {
      this.clearErrors()

      if (this.userName && this.phone) {
        const user = await API.getUser(this.userName, this.phone)

        if (user) {
          localStorage.setItem('user', JSON.stringify(user))

          this.$emit('login', user)
          this.$router.replace('/todo')
        } else {
          this.loginError = true
        }
      } else {
        this.hasEptyField = true
      }
    },

    validateInput(inputName, value, regExp) {
      if (!regExp.test(value)) {
        this[inputName] = this[inputName].slice(0, -1)
      }
    },

    clearErrors() {
      this.hasEptyField = false
      this.loginError = false
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';
@import '@/assets/styles/fonts.scss';

.login-form {
  width: 447px;
}

p {
  margin: 0;
  font-size: $font-size-main;
  font-weight: 400;
  letter-spacing: -0.025em;
  color: $form-header-color;
  font-size: $font-size-small;
  margin-bottom: 14px;
}

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

.warning {
  position: absolute;
  bottom: 64px;
  font-size: 11px;
  color: $error;
}

@media (max-width: 480px) {
  .login-form {
    width: 340px;
  }
}
</style>
