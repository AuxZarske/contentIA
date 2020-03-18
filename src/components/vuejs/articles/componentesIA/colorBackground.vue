

<template>
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
      <v-flex class="pb-3">
        <div class="headline">Entrenamiento</div>
      </v-flex>

      <v-layout row style="width:40%">
        <v-layout column>
          <label for="Color">Color de fondo:</label>

          <input class="jscolor" value="ab2567" style="width:60%; font-size:1px; height:18px" />
        </v-layout>

        <v-layout column>
          <label for="Color">Color de texto:</label>
          <v-layout row>
            <input type="radio" id="Blanco" name="radio1" value="Blanco" style="margin-top:3px" />
            <label for="Blanco">Blanco</label>
            <input
              type="radio"
              id="Negro"
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
              <v-btn icon v-on="on" v-on:click="agregarDato" color="blue" style="padding:5px">
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
                    <td><div style='width:100px; height:15px;' :style="{ 'background-color': props.item.name   }"  ></div></td>
                    <td class="text-xs-right">{{ props.item.iron }}</td>
                </template>
                </v-data-table>
                 
                 
                    
                <div class="text-xs-center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                   <v-btn color="error" v-on="on" v-on:click="reinicioIA" dark>Reiniciar entrenamiento</v-btn>
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
  </v-layout>
     
    
</template>

<script>
import Plus from 'vue-material-design-icons/Plus.vue'
import swal from 'sweetalert'
import axios from 'axios'

export default {
  name: 'colorBackground',
  components: {
    Plus
  },
  methods: {
    hh (e) {
      this.colorPrueba = '#' + e.target.value
      this.colorPruebaNotHash = e.target.value
      this.getTextColorIA()
    },
    getTextColorIA () {
      console.log(this.colorPrueba)
      const path = 'http://localhost:8000/api/v1.0/compColorBack/consult/' + this.idIA + '/' + this.colorPruebaNotHash
      axios.get(path).then((response) => {
        if (response.data === 1) {
          this.textColor = response.data.color
        } else {
          this.textColor = response.data.color
        }
      })
        .catch((erro3r) => {
          console.log('error')
        })
    },
    agregarDato () {
      swal('mas dato')
    },
    reinicioIA () {
      swal('reinicio')
    }
  },
  created () {
  },
  data () {
    return {
      colorPrueba: '#A073AB',
      colorPruebaNotHash: 'A073AB',
      idIA: '0',
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
        {
          name: '#e6e6e6',
          iron: 'Blanco'
        },
        {
          name: '#e6e6e6',
          iron: 'Negro'
        }
      ]
    }
  }
}
</script>
