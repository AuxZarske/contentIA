<template>
<!--
  <div class="page-wrapper login-form">
    <h2 class="login-heading">Login</h2>
    <form action="#" @submit.prevent="login">

      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <div v-if="serverError" class="server-error">{{ serverError }}</div>

      <div class="form-control">
        <label for="email">Username/Email</label>
        <input  name="username" id="username" class="login-input" v-model="username">
      </div>

      <div class="form-control mb-more">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="login-input" v-model="password">
      </div>

      <div class="form-control">
        <button type="submit" class="btn-submit" :disabled="loading">
          <div class="lds-ring-container" v-if="loading">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
          </div>
          Login
        </button>
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
          Iniciar Sesión
        </v-card-title>
        <v-card-text>
          <form action="#" @submit.prevent="login">
            <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
            <div v-if="serverError" class="server-error">{{ serverError }}</div>
            <v-text-field
              label="Nombre de usuario"
              type="text"
              name="username" id="username"
              v-model="username"
              required
            ></v-text-field>
            
            <v-text-field
              label="Contraseña"
              v-model="password"
              name="password" id="password"
              type="password"
              required
            ></v-text-field>
           
            <v-btn type="submit" class="btn-submit" :disabled="loading">
              <div class="lds-ring-container" v-if="loading">
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
              </div>
              Iniciar
            </v-btn>
            No tienes una cuenta?  <router-link to="/auth/register">Registro</router-link>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  </div>

</template>

<script>
export default {
  name: 'login',
  props: {
    dataSuccessMessage: {
      type: String
    }
  },
  data () {
    return {
      username: '',
      password: '',
      serverError: '',
      successMessage: this.dataSuccessMessage,
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password
      })
        .then(response => {
          this.loading = false
          this.$router.push({ name: 'home' })
          location.reload()
        })
        .catch(error => {
          this.loading = false
          this.serverError = error.response.data
          this.password = ''
          this.successMessage = ''
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