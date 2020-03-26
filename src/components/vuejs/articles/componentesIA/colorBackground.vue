

<template>

  <v-container
    class="fluid px-0"
  >


    <v-layout row>
      <my-component valorPasado = articleID ></my-component>
    </v-layout>

    <v-flex xs10 offset-xs1 class="pb-3">
      <v-layout column>
        <div class="pa-12 v-sheet theme--light elevation-12" style="padding: 3%">
          <v-flex class="pb-3">
            <div class="display-1">Ejemplo práctico</div>
          </v-flex>

          <v-layout row>
            <v-flex class="pb-3">
              <div
                style="font-size: 18px;text-align: justify; text-justify: inter-word;"
              >A continuación puede proceder a entrenar la red neuronal, cargando los datos que crea mejores en el formulario de abajo, seleccionando el color dde fondo y el color de letra que debe tener en ese color. Una vez terminado de cargar la cantidad de datos que crea suficiente puede proceder a dirigirce a la vista inferior de la página; seleccionar un color de fondo y la IA (con base a su entrenamiento) obtará por el color de letra que sea conveniente.</div>
            </v-flex>
          </v-layout>
            <br>
          
            <v-tooltip bottom >
                        <template v-slot:activator="{ on }">
                          <div v-on="on" class="d-inline">
                            <v-btn v-show="idIA == ''" 
                            color="primary" 
                            :loading="loading"
                            :disabled="loading" 
                            @click="loader = 'loading'" 
                            v-on:click="crearRed" >Crear Red</v-btn>
                          </div>
                        </template>
                        
                        <span>Crea una red neuronal para ser entrenada</span>
            </v-tooltip>
          
          <div v-show="idIA != ''"> 
            <v-flex class="pb-3">
              <div class="headline">Entrenamiento</div>
            </v-flex>

            <v-layout row style="width:40%">
              <v-layout column>
                <label for="Color">Color de fondo:</label>

                <input class="jscolor" v-on:change="colorSelectPlus($event)" value="ab2567" style="width:60%; font-size:1px; height:18px" />
              </v-layout>

              <v-layout column>
                <label for="Color">Color de texto:</label>
                <v-layout row>
                  <input type="radio" v-on:change="rWhite($event)" id="Blanco" name="radio1" value="Blanco" style="margin-top:3px" />
                  <label for="Blanco">Blanco</label>
                  <input
                    type="radio"
                    id="Negro"
                    v-on:change="rBlack($event)"
                    name="radio1"
                    value="Negro"
                    style="margin-left:10px;margin-top:3px"
                  />
                  <label for="Negro">Negro</label>
                </v-layout>
              </v-layout>
              <v-layout column>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn v-if="botonPlus"
                    icon v-on="on" 
                    v-on:click="agregarDato" 
                    
                    color="blue" 
                    style="padding:5px">
                      <plus></plus>  
                    </v-btn>
                  </template>
                  <span>Agregar conocimiento a la red neuronal</span>
                </v-tooltip>
              </v-layout>
            </v-layout>
          

          
            
          <div style="width:40%; margin-top:5%; ">

              <v-flex class="pb-3">
            <div class="headline">Datos cargados</div>
              </v-flex>
            
                <v-app style="height:400px">
                    <v-data-table
                    :headers="headers"
                    :items="desserts"
                    class="elevation-1"
                    
                    >
                    <template v-slot:items="props">
                        <td><div style='width:100px; height:15px;' :style="{ 'background-color': props.item.backgroundColor   }"  ></div></td>
                        <td class="text-xs-right">{{ props.item.textColor }}</td>
                    </template>
                    </v-data-table>
                    
                    
                        
                    <div class="text-xs-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                      <v-btn color="error" v-on="on" v-on:click="reinicioIA" dark>Borrar entrenamiento</v-btn>
                      </template>
                      <span>Borra todos los datos y reinicia el conocimiento de la IA</span>
                    </v-tooltip>
                    </div>
                
                </v-app>
            </div>


            <v-flex >
            <div class="headline">Resultado:</div>
            </v-flex>

              <div class="pa-12 v-sheet theme--light elevation-12" style="padding: 2%; height:300px" :style="{ 'background-color': colorPrueba   }">
                  
                  <input   class="jscolor" v-on:change="hh($event)" value="ab2567" style="width:8%; height:30px; font-size:1px; border: solid 2px black" />
                    <div class="text-xs-center"  style="font-size:72px" :style="{ 'color': textColor   }">
                        Hola
                        <br>
                        Mundo
                    </div>
              </div>
              








        </div>

        </div>
      </v-layout>
    </v-flex>
     
  </v-container>
</template>

<script>
import view from '@/components/vuejs/articles/view.vue'
import Plus from 'vue-material-design-icons/Plus.vue'
import swal from 'sweetalert'
import axios from 'axios'

export default {
  name: 'colorBackground',
  components: {
    'my-component': view,
    Plus
  },
  methods: {
    rWhite (e) {
      this.dataTextSelect = e.target.value
    },
    rBlack (e) {
      this.dataTextSelect = e.target.value
    },
    colorSelectPlus (e) {
      this.dataColorSelect = e.target.value
    },
    hh (e) {
      this.colorPrueba = '#' + e.target.value
      this.colorPruebaNotHash = e.target.value
      this.getTextColorIA()
    },
    getTextColorIA () {
      axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
      const path = 'http://localhost:8000/api/v1.0/compColorBack/consult/' + this.idIA + '/' + this.colorPruebaNotHash
      axios.get(path).then((response) => {
        this.textColor = response.data.TextColor
      })
        .catch((erro3r) => {
          console.log('error')
        })
    },
    agregarDato () {
      if (this.dataTextSelect !== '') {
        if (this.dataColorSelect !== '') {
          this.datosRed.red = this.idIA
          this.datosRed.backgroundColor = this.dataColorSelect
          this.datosRed.textColor = this.dataTextSelect
          const path = 'http://localhost:8000/api/v1.0/compColorBack/train/'
          console.log(this.datosRed)
          this.botonPlus = false
          axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
          axios.post(path, this.datosRed).then((response) => {
            swal('Dato agregado como entrenamiento a la red', '', 'success')
            this.botonPlus = true
            // agregar tabla
            console.log(response.data)
            var dict = {
              backgroundColor: '#' + response.data.backgroundColor,
              textColor: response.data.textColor
            }
            console.log(dict)
            this.desserts.push(dict)
          })
            .catch((errogr) => {
              swal('El dato cargado no se agregó a la red', '', 'error')
              this.botonPlus = true
            })
        } else {
          alert('Seleccione el color de fondo a tener')
        }
      } else {
        alert('Seleccione el color de letra a tener')
      }
    },
    crearRed () {
      // disable button
      axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
      const path = 'http://localhost:8000/api/v1.0/compColorBack/redColors/'
      axios.post(path).then((response) => {
        swal('Nuevo articulo creado correctamente', '', 'success')
        this.idIA = response.data.id
      })
        .catch((errogr) => {
          swal('El artículo no ha sido creado', '', 'error')
        })
    },
    reinicioIA () {
      axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
      const path = 'http://localhost:8000/api/v1.0/compColorBack/redColors/' + this.idIA + '/'
      axios.delete(path).then((response) => {
        console.log(response)
        swal('Borrado de entrenamiento exitoso', '', 'success')
        this.idIA = ''
      })
        .catch((erro3r) => {
          swal('Falla con el intento de borrado de datos', '', 'error')
        })
    },
    getTrainData () {
      axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
      const path = 'http://localhost:8000/api/v1.0/compColorBack/train/?red=' + this.idIA
      axios.get(path).then((response) => {
        // this.desserts = response.data
        var diccion = {}
        this.desserts = []
        for (var i = 0; i < response.data.length; i++) {
          diccion = {
            backgroundColor: '#' + response.data[i].backgroundColor,
            textColor: response.data[i].textColor
          }
          this.desserts.push(diccion)
        }
      })
        .catch((erujror) => {
          console.log('falla')
        })
    }
  },
  created () {
    if (this.idIA !== '') {
      this.getTrainData()
    }
  },
  data () {
    return {
      articleID: this.$route.params.id,
      loader: null,
      loading: false,
      loading5: false,
      botonPlus: true,
      datosRed: {
        red: '',
        backgroundColor: '',
        textColor: ''
      },
      dataTextSelect: '',
      dataColorSelect: '',
      colorPrueba: '#A073AB',
      colorPruebaNotHash: 'A073AB',
      idIA: '',
      textColor: '',
      headers: [
        {
          text: 'Color de fondo',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Color de texto',
          sortable: false,
          align: 'right',
          value: 'iron'
        }
      ],
      desserts: [
      ]
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3600)
      this.loader = null
    }
  }
}
</script>


<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>