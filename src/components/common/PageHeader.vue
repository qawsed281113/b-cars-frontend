<template>
  <b-navbar type="dark" variant="dark">
    <b-container>
      <b-navbar-nav>
        <b-nav-item href="/">Автомобілі</b-nav-item>
        <b-nav-item v-if="!isAuthorized">
          <b-button class="btn-sm" variant="primary" v-b-modal.login>Увійти</b-button>
          <b-button style="margin-left: 10px;" class="btn-sm" variant="primary" v-b-modal.register>Зареєструватися
          </b-button>
        </b-nav-item>
        <b-nav-item-dropdown v-if="isAuthorized" :text="`Користувач: ${userName}`" class="user">
          <b-dropdown-item v-if="isAuthorized" href="/my-cars">Мої автомобілі</b-dropdown-item>
          <b-dropdown-item v-if="isAuthorized" href="#" @click="this.logout">Вийти</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-container>

    <!--    Логин-->
    <b-modal id="login" title="Вхід" hide-footer centered>
      <b-form-group
          label="Логін"
          label-for="form-login"
      >
        <b-form-input
            id="form-login"
            v-model="loginForm.login"
            type="text"
            placeholder="Електронна пошта"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Пароль"
          label-for="password"
      >
        <b-form-input
            id="password"
            v-model="loginForm.password"
            type="password"
            placeholder="Пароль"
            required
        ></b-form-input>

      </b-form-group>
      <p class="text-danger" v-for="(error, index) in loginForm.errors" :key="`err-${index}`">
        {{ error }}
      </p>
      <b-button class="mt-5" variant="primary" v-on:click="this.login">Увійти</b-button>
    </b-modal>

    <!--    Реестрація-->
    <b-modal id="register" title="Реєстрація" hide-footer centered>
      <b-form-group
          label="Логін"
          label-for="login"
      >
        <b-form-input
            id="reg-email"
            v-model="registerForm.login"
            type="email"
            placeholder="Електронна пошта"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Телефон"
          label-for="reg-phone"
      >
        <b-form-input
            id="reg-phone"
            v-model="registerForm.phone"
            type="text"
            placeholder="Телефон (+38000000000)"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          label="Пароль"
          label-for="reg-password"
      >
        <b-form-input
            id="reg-password"
            v-model="registerForm.password"
            type="password"
            placeholder="Пароль"
            required
        ></b-form-input>

      </b-form-group>
      <b-form-group
          label="Підтвердження паролю"
          label-for="reg-confirm-password"
      >
        <b-form-input
            id="reg-confirm-password"
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="Пароль"
            required
        ></b-form-input>

      </b-form-group>
      <p class="text-danger" v-for="(error, index) in loginForm.errors" :key="`err-${index}`">
        {{ error }}
      </p>
      <b-button :disabled="!registerButtonEnable" class="mt-5" variant="primary" v-on:click="this.register">
        Зареєструватися
      </b-button>
    </b-modal>
  </b-navbar>
</template>

<script>

export default {
  name: "PageHeader",

  data: function () {
    return {
      test: 1,
      isAuthorized: false,
      userName: null,
      loginForm: {
        login: null,
        password: null,
        errors: []
      },
      registerForm: {
        login: null,
        phone: null,
        password: null,
        confirmPassword: null,
        errors: []
      }
    }
  },
  mounted() {
    this.isAuthorized = this.$authService.isAuthorized()
    this.userName = this.$authService.getUserName()
  },
  computed: {
    registerButtonEnable: function () {
      if (this.isEmpty(this.registerForm.login)) {
        return false
      }
      if (this.isEmpty(this.registerForm.phone)) {
        return false
      }
      if (this.isEmpty(this.registerForm.password)) {
        return false
      }
      if (this.isEmpty(this.registerForm.confirmPassword)) {
        return false
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        return false
      }

      return true
    }

  },
  methods: {
    isEmpty(str) {
      return (!str || str.length === 0)
    },
    logout() {
      this.$authService.logout()
      this.isAuthorized = this.$authService.isAuthorized()
      this.userName = this.$authService.getUserName()
    },
    async login() {
      await this.$authService.login(this.loginForm.login, this.loginForm.password)
      this.loginForm.errors = this.$authService.errors
      this.isAuthorized = this.$authService.isAuthorized()
      if (this.isAuthorized) {
        this.$router.go()
        this.$swal({
          title: 'Успіх',
          text: "Ви авторизовані як " + this.$authService.getUserName(),
          icon: 'success',
          button: "Ok"
        })
      }
      this.userName = this.$authService.getUserName()
    },
    async register() {
      await this.$authService.register(this.registerForm.login, this.registerForm.password, this.registerForm.phone)
      this.loginForm.errors = this.$authService.errors
      this.isAuthorized = this.$authService.isAuthorized()
      if (this.isAuthorized) {
        this.$router.go()
        this.$swal({
          title: 'Успіх',
          text: "Ви авторизовані як " + this.$authService.getUserName(),
          icon: 'success',
          button: "Ok"
        })
      }
      this.userName = this.$authService.getUserName()
    },

  }

}
</script>

<style scoped>
ul.navbar-nav {
  width: 100%;
}

.user {
  margin-left: auto;
}
</style>