<template>
  
  <!--
  <div class="login-form">
    <h2 class="login-heading">Register</h2>
    <form action="#" @submit.prevent="register">

      <div class="form-control">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" class="login-input" v-model="name">
      </div>

      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" class="login-input" v-model="email">
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
      </div>

      <div class="form-control mb-more">
        <label for="password">Repit Password</label>
        <input type="password" name="password2" id="password2" class="login-input" v-model="password2">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit">Create Account</button>
      </div>

    </form>
  </div>
  -->
  <div id="principal">
    <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-xs-center" >
        <img src="@/assets/redes.png" width="250px" >
      </div>
      <v-card>
        <v-card-title class="headline">
          Registrar cuenta
        </v-card-title>
        <v-card-text>
          <form action="#" @submit.prevent="register">
            <v-text-field
              label="Nombre de usuario"
              type="text"
              name="name" id="name"
              v-model="name"
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              type="email"
              name="email" id="email"
              v-model="email"
              required
            ></v-text-field>
            <v-text-field
              label="Contraseña"
              v-model="password"
              name="password" id="password"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              label="Confirmar contraseña"
              v-model="password2"
              name="password2" id="password2"
              type="password"
              required
            ></v-text-field>
            <v-btn type="submit">
              Crear cuenta
            </v-btn>
            Ya tienes una cuenta?  <router-link to="/auth/login">Login</router-link>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  </div>




</template>

<script>

export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password1: this.password,
        password2: this.password2
      })
        .then(response => {
          this.$router.push({ name: 'login' })
        })
    }
  }
}
</script>
<style>
div#principal{
  background-image: url(../../assets/fondoOp.jpeg);
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 110%;
}
</style>