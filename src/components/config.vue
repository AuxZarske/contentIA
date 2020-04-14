<template>
  <v-container >
      <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-title primary-title>
                            <h3 class="headline mb-0">Configurar ruta de acceso principal</h3>
                        
                    </v-card-title>
                        <span class="grey--text" style="margin-left:3%">
                            {{PathToday}}
                        </span>
                    <v-card-title>
                       
                        <v-text-field
                        label="Ruta"
                        type="text"
                        v-model="rutaGlobal"
                        ></v-text-field>
                        
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="orange" v-on:click="setPath">Guardar</v-btn>
                    </v-card-actions>
       
                </v-card>
              

          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  created () {
    this.getPath()
  },
  data () {
    return {
      PathToday: '',
      rutaGlobal: ''
    }
  },
  methods: {
    getPath () {
      this.PathToday = axios.defaults.baseURL
    },
    setPath () {
      if (this.rutaGlobal !== '') {
        var payload = this.rutaGlobal
        this.$store.dispatch('setPath', payload)
        this.PathToday = this.$store.getters.changeURL
        swal('Actualizado correctamente', {icon: 'success'})
      } else {
        swal('Primeramente, escriba la nueva ruta.', {icon: 'error'})
      }
    }
  }
}
</script>

<style>

</style>