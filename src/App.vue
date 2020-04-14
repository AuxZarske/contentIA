  
  <template>
  <v-app
    id="inspire"
    style="background-color: #ffffff !important;"
  >
    <v-navigation-drawer  v-if="loggedIn"
    dark
    app
    floating
    v-model="drawer"
    >
    <v-container grid-list-sm >
      <v-layout row justify-center align-center >
        <v-flex xs12>
          <v-card flat>
            <v-card-title flat>
              <v-container grid-list-sm >
                <v-layout row wrap>
                  <v-flex xs12
                    align-center justify-center text-xs-center
                  >
                    
                      <img src="@/assets/redes.png" width="90px" >
                    
                  </v-flex>
                  <v-flex xs12
                    align-center justify-center text-xs-center
                    headline
                  >
                      <div @click.stop="toRoute('home')">
                        InfoIA.csv
                      </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-list>
    <template  >
      <v-list-tile v-for="(item, i) in items" :key="i"  >
        <v-list-tile-action @click="drawer = !drawer" @click.stop="toRoute(item.link)" >
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content @click="drawer = !drawer" @click.stop="toRoute(item.link)">
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="item.add">
            <v-tooltip right>
              <v-icon dark color="primary" @click="drawer = !drawer" @click.stop="toRoute(item.add)" slot="activator">add</v-icon>
               <span>{{item.ttip}}</span>
            </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
    </template>
    <v-spacer></v-spacer>
  </v-list>
  <div style="position:absolute; bottom:0; color:white" class="ma-3">
    <v-list-tile >
      <v-list-tile-action>
        <v-icon>copyright</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          Copyright {{ year }}
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </div>
    
  </v-navigation-drawer>

  <v-toolbar app fixed dark class="primary" >
    <v-toolbar-side-icon v-if="loggedIn" dark @click.stop="drawer = !drawer" ></v-toolbar-side-icon>
    <v-toolbar-title class="mr-5 align-center">
      <span @click.stop="toRoute('home')">InfoIA.csv</span>
    </v-toolbar-title>
    <v-layout row justify-center>
      <v-flex xs12 sm10 style="max-width: 750px">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb="() => {}"
          dark
          hide-details
        ></v-text-field>
      </v-flex>
    </v-layout>



    <div v-if="!loggedIn">
      <v-btn class="ma-2" round  tile color="indigo" dark :to="{name:'login'}">Login</v-btn>
      <v-btn class="ma-2"  round tile   color="success" :to="{name:'register'}">Register</v-btn>
    </div>
    <div v-else>
      <label class="headline">{{nombreUser}}</label>
      <v-btn class="ma-2"  round tile   color="success" :to="{name:'logout'}">Log Out</v-btn>
    </div>

    
    
  </v-toolbar>

  <v-content class="px-0">
    <v-container fluid fill-height class="px-0" style="padding:0px">
      <v-layout row wrap>
        <v-flex xs12 >
          <router-view>

          </router-view>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout row>
     <v-flex xs10 offset-xs1 class="pb-3">
        <my-componentT></my-componentT>
        </v-flex>
  </v-layout>
  </v-content>

  </v-app>
  
</template>

<script>
import scripts from './scripts'

export default {
  components: {
    'my-componentT': scripts
  },
  created () {
    this.$store.dispatch('checkAuth')
    if (this.$store.getters.user.fname) {
      this.nombreUser = this.$store.getters.user.fname
    }
  },
  data: () => ({
    fav: true,
    menu: true,
    message: false,
    hints: true,
    fixed: true,
    drawer: false,
    nombreUser: '',
    theme: false
  }),
  props: {
    source: String
  },
  computed: {
    loggedIn () {
      return this.$store.getters.isUserAuthenticated
    },
    items () {
      var rol = this.$store.getters.user.role
      console.log('rol:')
      console.log(this.$store.getters.user.role)
      // 4 if
      let menu = [
        { icon: 'dashboard', text: 'Inicio', link: 'home' }
      ]
      if (rol === 'admin' || rol === 'gestor') {
        menu.push({ icon: 'book', text: 'Artículos', link: 'vuejs_topics', add: 'vuejs_create_article', ttip: 'Añadir artículo' })
      } else {
        menu.push({ icon: 'book', text: 'Artículos', link: 'vuejs_topics' })
      }
      if (rol === 'admin') {
        menu.push({ icon: 'person', text: 'Administración', link: 'usuarios' })
        menu.push({ icon: 'mdi-wrench', text: 'Configuración', link: 'config' })
      }
      return menu
    },
    year () {
      return new Date().getFullYear()
    }
  },
  methods: {
    toRoute (rname, rparams = {}, query = {}) {
      this.dialog = true
      this.$router.push({name: rname, params: rparams, query: query})
    }
  }
}
</script>

<style>
.article-content {
  font-size: 21px !important;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.80px;
  line-height: 35px;
}
.markdown {
  box-sizing: border-box;
  margin: 15px 0px;
  outline: none;
  font-family: inherit;
  font-size: 18px;
  white-space: normal;
  word-wrap: break-word;
}
.markdown code {
  width: 100% !important;
  padding: 15px;
  /*background: #272822 !important; // monokai */
  /*background: #f8f8f8 !important; // github */
  background: #23241f !important; /* monokai-sublime */
}
.code {
  width: 100% !important;
  padding: 15px;
  /*background: #272822 !important; // monokai */
  /*background: #f8f8f8 !important; // github */
  background: #23241f !important; /* monokai-sublime */
}
</style>
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
