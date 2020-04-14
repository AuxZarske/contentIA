<template>
    <v-container>
        <v-layout>
        <v-flex>
            

                <div>
                    <v-layout justify-cente>
      <v-flex xs10 offset-xs1 >
          <v-card>
      <v-card-title>
        Aplicaciones registradas
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
          <td>{{ props.item.id }}</td>
          <td class="text-xs-center">{{ props.item.nombreApp }}</td>
          <td class="text-xs-center">{{ props.item.rol }}</td>
          <td class="text-xs-center">

              
                   <v-btn dark icon @click.stop="dialog = true" color="blue" @click="updateSelection({id: props.item.id, nombreApp: props.item.nombreApp, rol: props.item.rol})">
                          <v-icon dark>build</v-icon>
                        </v-btn>

                    <v-btn dark icon  color="red" @click="deleteQuestion(props.item.id)">
                          <v-icon dark>clear</v-icon>
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
                                <v-subheader>Nombre de aplicacion:</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                
                                <v-layout align-center row fill-height>
                                        {{formRol.nombreApp}}
                                    </v-layout>
                                </v-flex>
                         </v-layout>
                         
                         <v-layout row>
                                <v-flex xs4>
                                <v-subheader>Rol actual:</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-layout align-center row fill-height>
                                        {{formRol.rol}}
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
                </div>
                    <div style="margin-top:10%">
                        <v-flex xs10 offset-xs1>
                        <v-toolbar card color="blue" dark >
                                    <v-toolbar-title>Crear nueva</v-toolbar-title>
                             </v-toolbar>
                             </v-flex>
                        <v-layout justify-center>
                            
                            

                        <v-flex xs9 >
                            <v-text-field
                            label="Nombre de aplicación"
                            v-model="nameAppNew"
                            ></v-text-field>
                        

                        <v-select v-model="selectRol2"
                                    :items="items"
                                    label="Rol de acceso"
                                ></v-select>

                                <v-btn @click="createNew">crear</v-btn>
                                <v-btn @click="clear">limpiar</v-btn>
                       </v-flex>
                    </v-layout>

                    </div>

        </v-flex>

    </v-layout>


    <v-dialog v-model="dialogLoad2"  persistent max-width="auto" >
                      <template  >
                        
                        
                      </template>
                      <v-card class="text-xs-center" color="rgb(0, 0, 0, 0.1)" style="padding:17%">

                        
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
    this.getAppsData()
  },
  data () {
    return {
      selectRol: '',
      nameAppNew: '',
      selectRol2: '',
      search: '',
      formRol: {
        id: 5,
        nombreApp: 'carlos',
        rol: 2
      },
      dialog: false,
      dialogLoad: false,
      dialogLoad2: false,
      items: ['admin', 'gestor', 'registeredVIP', 'registered', 'anonymous'],
      headers: [
        {
          id: 'id',
          text: '#',
          align: 'left',
          value: 'id'
        },
        { text: 'Aplicación', align: 'center', value: 'nombreApp' },
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
      this.formRol.nombreApp = element.nombreApp
      this.formRol.rol = element.rol
      this.selectRol = ''
    },
    clear () {
      this.nameAppNew = ''
      this.selectRol2 = ''
    },
    deleteQuestion (numiyo) {
      swal({
        title: '¿Está seguro de Eliminarlo?',
        text: 'Una vez borrado, no puede ser recuperado',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.eliminarApp(numiyo)
          }
        })
    },
    eliminarApp (num) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
      var path = axios.defaults.baseURL + '/api/v1.0/AppsDj/' + num + '/'
      this.dialogLoad2 = true
      axios.delete(path).then((response) => {
        this.dialogLoad2 = false
        swal('Borrado correctamente', {icon: 'success'})
        this.getAppsData()
      })
        .catch((erhror) => {
          this.dialogLoad2 = false
          swal('No es posible eliminarlo', '', 'error')
        })
    },
    createNew () {
      if (this.nameAppNew !== '') {
        if (this.selectRol2 !== '') {
          var dicti = {
            nombreApp: this.nameAppNew,
            rol: this.selectRol2
          }
          axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
          var path = axios.defaults.baseURL + '/api/v1.0/AppsDj/'
          this.dialogLoad2 = true
          axios.post(path, dicti).then((response) => {
            // creado bien
            this.dialogLoad2 = false
            swal('Creado correctamente', {icon: 'success'})
            this.getAppsData()
            this.clear()
          })
            .catch((errogr) => {
              // error
              this.dialogLoad2 = false
              swal('No es posible crearlo', '', 'error')
            })
        } else {
          alert('vacio2')
        }
      } else {
        alert('vacio1')
      }
    },
    updateRol () {
      if (this.selectRol !== '') {
        axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
        var aux = Object.assign({}, this.formRol)
        aux.rol = this.selectRol
        // tapar
        this.dialogLoad = true
        var path = axios.defaults.baseURL + '/api/v1.0/AppsDj/' + this.formRol.id + '/'
        console.log(aux)
        axios.put(path, aux).then((response) => {
          this.formRol.rol = this.selectRol
          this.getAppsData()
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
    getAppsData () {
      axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
      var path = axios.defaults.baseURL + '/api/v1.0/AppsDj/'
      axios.get(path).then((response) => {
        // this.desserts = response.data
        var diccion = {}
        this.desserts = []
        console.log(response.data)
        for (var i = 0; i < response.data.length; i++) {
          diccion = {
            id: response.data[i].id,
            nombreApp: response.data[i].nombreApp,
            rol: response.data[i].rol
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

</style>