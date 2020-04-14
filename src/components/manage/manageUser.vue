<template>
  <v-container
    class="fluid px-0"
  >
    <v-layout justify-cente>
      <v-flex xs10 offset-xs1 >
          <v-card>
      <v-card-title>
        Usuarios registrados
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Buscar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
      >
        <template v-slot:items="props">
          <td>{{ props.item.email }}</td>
          <td class="text-xs-center">{{ props.item.username }}</td>
          <td class="text-xs-center">{{ props.item.years }}</td>
          <td class="text-xs-center">{{ props.item.dateregister }}</td>
          <td class="text-xs-center">{{ props.item.country }}</td>
          <td class="text-xs-center">{{ props.item.rol }}</td>
          <td class="text-xs-center">

              
                   <v-btn dark icon @click.stop="dialog = true" color="blue" @click="updateSelection({id: props.item.id, username: props.item.username, email: props.item.email, rol: props.item.rol})">
                          <v-icon dark>build</v-icon>
                        </v-btn>
                  
              
          </td>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            La busqueda para "{{ search }}" no dio resultados.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
      </v-flex>
    </v-layout>

      <v-dialog v-model="dialog" persistent max-width="690">
                      <template  >
                        
                        
                      </template>
                      <v-card>
                        <v-card-title class="headline">Cambio de Rol:</v-card-title>
                       
                        <div class="text-center" style="margin-left:10%">
                         
                         <v-layout row>
                                <v-flex xs4>
                                <v-subheader>Usuario:</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                
                                <v-layout align-center row fill-height>
                                        {{formRol.username}}
                                    </v-layout>
                                </v-flex>
                         </v-layout>
                         <v-layout row>
                                <v-flex xs4>
                                <v-subheader>Email:</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                               
                                <v-layout align-center row fill-height>
                                         {{formRol.email}}
                                    </v-layout>
                                </v-flex>
                         </v-layout>
                         <v-layout row>
                                <v-flex xs4>
                                <v-subheader>Rol actual:</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-layout align-center row fill-height>
                                        {{formRol.groups}}
                                    </v-layout>
            
                                </v-flex>
                         </v-layout>
                         
                        <v-layout row style="margin-left:2%">
                            
                            <v-flex xs12 sm6 d-flex>
                                <v-select v-model="selectRol"
                                    :items="items"
                                    label="Nuevo Rol"
                                ></v-select>

                                <v-btn color="success" v-on:click="updateRol" >Guardar</v-btn>

                                </v-flex>
                         </v-layout>

                        </div>
                        
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          
                          <v-btn  text @click="dialog = false">Cerrar</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogLoad"  persistent max-width="690" >
                      <template  >
                        
                        
                      </template>
                      <v-card class="text-xs-right" color="rgb(0, 0, 0, 0.1)" style="padding:17%">

                        
                        <v-progress-circular
                            :size="70"
                            :width="7"
                            color="purple"
                            indeterminate
                        ></v-progress-circular>
                       
                        
                      </v-card>
                    </v-dialog>
      

      
  </v-container>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  created () {
    this.getUsersData()
  },
  data () {
    return {
      selectRol: '',
      search: '',
      formRol: {
        id: 5,
        username: 'carlos',
        groups: 2,
        email: 'carlos@gmail.com'
      },
      dialog: false,
      dialogLoad: false,
      items: ['admin', 'gestor', 'registeredVIP', 'registered', 'anonymous'],
      headers: [
        {
          text: 'Email',
          align: 'left',
          value: 'email'
        },
        { text: 'Nombre de usuario', align: 'center', value: 'username' },
        { text: 'Edad', align: 'center', value: 'years' },
        { text: 'Fecha de registro', align: 'center', value: 'dateregister' },
        { text: 'País', align: 'center', value: 'country' },
        { text: 'Rol', align: 'center', value: 'rol' },
        { text: 'Acciones', align: 'center', value: 'button' }
      ],
      desserts: [
      ]
    }
  },
  methods: {
    updateSelection (element) {
      this.formRol.id = element.id
      this.formRol.email = element.email
      this.formRol.username = element.username
      this.formRol.groups = element.rol
      this.selectRol = ''
    },
    updateRol () {
      if (this.selectRol !== '') {
        axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
        var aux = Object.assign({}, this.formRol)
        if (this.selectRol === 'admin') {
          aux.groups = 1
        }
        if (this.selectRol === 'gestor') {
          aux.groups = 2
        }
        if (this.selectRol === 'registeredVIP') {
          aux.groups = 3
        }
        if (this.selectRol === 'registered') {
          aux.groups = 4
        }
        if (this.selectRol === 'anonymous') {
          aux.groups = 5
        }
        // tapar
        this.dialogLoad = true
        var path = axios.defaults.baseURL + '/api/v1.0/manageUsers/' + this.formRol.id + '/'
        axios.put(path, aux).then((response) => {
          this.formRol.groups = this.selectRol
          this.getUsersData()
          // destapar
          this.dialogLoad = false
          swal('Actualizado correctamente', {icon: 'success'})
        })
          .catch((error) => {
            console.log(error)
            // destapar
            this.dialogLoad = false
            swal('Error en actualizar el Rol', {icon: 'error'})
          })
      } else {
        swal('Primeramente seleccione un rol de la lista.')
      }
    },
    getUsersData () {
      console.log('ruta')
      console.log(axios.defaults.baseURL)
      axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
      var path = axios.defaults.baseURL + '/api/v1.0/manageUsers/'
      axios.get(path).then((response) => {
        // this.desserts = response.data
        var diccion = {}
        var grupo = 0
        var textgroup = 'ninguno'
        this.desserts = []
        console.log(response.data)
        for (var i = 0; i < response.data.length; i++) {
          grupo = response.data[i].groups
          if (grupo === 1) {
            textgroup = 'admin'
          }
          if (grupo === 2) {
            textgroup = 'gestor'
          }
          if (grupo === 3) {
            textgroup = 'registeredVIP'
          }
          if (grupo === 4) {
            textgroup = 'registered'
          }
          if (grupo === 5) {
            textgroup = 'anonymous'
          }
          diccion = {
            id: response.data[i].id,
            email: response.data[i].email,
            username: response.data[i].username,
            years: response.data[i].edad,
            dateregister: response.data[i].fechaReg,
            country: response.data[i].pais,
            rol: textgroup
          }
          this.desserts.push(diccion)
        }
      })
        .catch((erujror) => {
          console.log('falladatos')
        })
    }
  }
}
</script>

<style>
.v-progress-circular {
  margin: 1rem
}
</style>