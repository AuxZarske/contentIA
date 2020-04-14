<template>
  <v-container fluid grid-list-md>
    
   
    
    <v-layout row wrap>
      
      <v-flex d-flex
        v-for="(card, idx) in cards"
        v-bind="{ [`xs${flex}`]: true }"
        :key="idx"
      >
        <v-card>
          <v-card-media
            class="white--text"
            height="200px"
            :src="card.src"
            v-if="card.src != ''"
          >
         
          
            <v-layout
              column class="media"
              @click.stop="compareRoute(card.componentApp,{id: card.id})"
              style="cursor: pointer"
            >
              <v-card-title>

                <v-tooltip bottom >
                  <template v-slot:activator="{ on }" v-if="visibleManage">
                    
                   <v-btn dark icon v-on="on"  @click.stop="dialog = true" v-on:click="changeSelection({id: card.id, title: card.title})">
                          <menu-icon ></menu-icon>
                        </v-btn>
                    
                  </template>
                  <span>Menú de opciones</span>
                </v-tooltip>

                
                
                      
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on"  @click.stop="dialog2 = true" v-on:click="changeSelection({id: card.id, title: card.title})">
                          <star-Face></star-Face>
                        </v-btn>
                  </template>
                  <span>Calificar</span>
                </v-tooltip>
                 
               
              </v-card-title>
              <v-spacer></v-spacer>
              <v-card-title class="white--text pt-5">
                <div class="body-2 pl-7 pt-5">Contenido disponible</div>
                 
              </v-card-title>
              
            </v-layout>
          </v-card-media>
          <v-card-title>
            <div>
              <v-flex class="title"
                @click.stop="compareRoute(card.componentApp,{id: card.id})"
                style="cursor: pointer"
              >{{card.title}}</v-flex>
              <v-flex class="body-1">
                <span v-if="card.description.length > 140" class="grey--text">
                  {{card.description.substring(0, 140)}}... &nbsp;&nbsp;
                  <a href="#">read more</a>
                </span>
                <span v-else class="grey--text">
                  {{card.description}} &nbsp;&nbsp;
                </span>
              </v-flex>
            </div>
            <!--
              <v-layout row wrap>
                <v-flex
                  v-for="(topic, index) in card.topics"
                  :key="index"
                >
                  <a href="">{{topic}}</a>
                </v-flex>
              </v-layout>
              -->
          </v-card-title>
        </v-card>
        
        
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="690">
                      <template  >
                        
                        
                      </template>
                      <v-card>
                        <v-card-title class="headline">Opciones disponibles de " {{articleChangeTitle}} ":</v-card-title>
                       
                        <div class="text-center" style="margin-left:10%">
                          <v-btn
                            class="ma-2"
                            :loading="loading"
                            :disabled="loading"
                            color="error"
                            @click="loader = 'loading'"
                            v-on:click="deleteQuestion()"
                          >
                            Eliminar
                          </v-btn>
                          <v-btn
                            
                            :loading="loading2"
                            :disabled="loading2"
                            color="blue-grey"
                            class="ma-2 white--text"
                            @click="loader = 'loading2'"
                          >
                            Deshabilitar acceso
                          </v-btn>
                          <v-btn
                            class="ma-2"
                            :loading="loading3"
                            :disabled="loading3"
                            color="info"
                            @click="loader = 'loading3'"
                          >
                            Editar
                          </v-btn>
                        </div>
                        
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          
                          <v-btn  text @click="dialog = false">Cancelar</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>


                    <v-dialog v-model="dialog2" persistent max-width="305" >
                      <template >
                        
                        
                      </template>
                      <v-card
    class="elevation-16 mx-auto"
    width="300"
  >
    <v-card-title
      class="headline"
      primary-title
    >
      Califica el Artículo "{{articleChangeTitle}}"
    </v-card-title>
    <v-card-text>
      Si te fue de ayuda o crees que merece ser valorado. ¡Puntúa! otorgando las estrellas que creas correspondiente.

      <div class="text-center mt-12">
        
        <v-rating
        v-model="rating"
        background-color="orange lighten-3"
        color="orange"
        medium
      ></v-rating>

      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between">
      <v-btn text @click="dialog2 = false">En otro momento</v-btn>
      <v-btn
        color="primary"
        text @click="dialog2 = false"
      >
        Calificar
      </v-btn>
    </v-card-actions>
  </v-card>


                      
                    </v-dialog>



     <div class="my-2" style="display:scroll;
        position:fixed;
        top:65px;
        right:5px;">
          <v-btn color="primary" fab  dark v-if="isList" @click.stop="listView()">
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn color="primary" fab  dark v-else @click.stop="listView()">
          <v-icon>view_list</v-icon>
         </v-btn>
    </div>
    
  </v-container>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import StarFace from 'vue-material-design-icons/StarFace.vue'
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'GridCards',
  data () {
    return {
      cards: [],
      appsSaves: [],
      rating: 4,
      isList: false,
      dialog: false,
      dialog2: false,
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      visibleManage: false,
      articleChange: 0,
      articleChangeTitle: ''
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 1000)
      this.loader = null
    }
  },
  components: {
    MenuIcon,
    StarFace
  },
  computed: {
    flex () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 12
        case 'sm': return 6
        case 'md': return 4
        case 'lg': return 3
        case 'xl': return 2
      }
    }
  },
  methods: {
    toRoute (rname, rparams = {}, query = {}) {
      this.dialog = true
      this.$router.push({name: rname, params: rparams, query: query})
    },
    listView () {
      this.isList = !this.isList
      var eventName = 'emitListView'
      window.bus.$emit(eventName, {
        isList: this.isList
      })
    },
    numRolThis (rol) {
      var listaRoles = ['anonymous', 'registered', 'registeredVIP', 'gestor', 'admin']
      return listaRoles.indexOf(rol)
    },
    getRolNameApp () {
      axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
      var path = axios.defaults.baseURL + '/api/v1.0/AppsDj/'
      axios.get(path).then((response) => {
        this.appsSaves = response.data
      })
        .catch((erujror) => {
          console.log('falladatos')
        })
    },
    compareRoute (rname, rparams = {}) {
      if (rname === '') {
        this.toRoute('vuejs_view_article', rparams)
      } else {
        var numRolUser = this.numRolThis(this.$store.getters.user.role)
        var numRolApp = -1
        for (var i = 0; i < this.appsSaves.length; i++) {
          if (this.appsSaves[i].nombreApp === rname) {
            var rol = this.appsSaves[i].rol
            numRolApp = this.numRolThis(rol)
          }
        }
        if (numRolApp <= numRolUser && numRolUser !== -1 && numRolApp !== -1) {
          this.toRoute(rname, rparams)
        } else {
          this.toRoute('vuejs_view_article', rparams)
        }
      }
    },
    getTipoIAs () {
      axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
      const path = '/api/v1.0/tipoIAs/'
      axios.get(path).then((response) => {
        this.cards = response.data
      })
        .catch((error) => {
          console.log(error)
        })
    },
    changeSelection (element) {
      this.articleChange = element.id
      this.articleChangeTitle = element.title
    },
    deleteTipoIA () {
      axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.tokenData
      var numeroID = this.articleChange
      const path = '/api/v1.0/tipoIAs/' + numeroID + '/'
      axios.delete(path).then((response) => {
        // location.href = '/vuejs/topics'
        // this.$router.push({ path: '/vuejs/topics' })
        this.getTipoIAs()
        this.dialog = false
      })
        .catch((erroyr) => {
          swal('Error en el intento de eliminar')
        })
    },
    deleteQuestion () {
      swal({
        title: '¿Está seguro de Eliminarlo?',
        text: 'Una vez borrado, no puede ser recuperado el artículo.',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            this.deleteTipoIA()
            swal('El artículo ha sido eliminado completamente', {
              icon: 'success'
            })
          }
        })
    }
  },
  created () {
    this.getRolNameApp()
    this.getTipoIAs()
    var rol = this.$store.getters.user.role
    if (rol === 'admin' || rol === 'gestor') {
      this.visibleManage = true
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
