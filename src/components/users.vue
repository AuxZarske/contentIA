<template>
  <v-container
    class="fluid px-0"
  >
    <v-layout justify-cente>
      <v-flex xs10 offset-xs1 >


        <div>
      <v-toolbar
        color="green"
        dark
        tabs
      >
        
  
        
          <v-tabs
            v-model="tabs"
            
            color="transparent"
            slider-color="white"
          >
            <v-tab :key="1" ripple>
              Usuarios
            </v-tab>

            <v-tab :key="2" >
              Aplicaciones
            </v-tab>

            <v-tab :key="3" >
              tres
            </v-tab>

          </v-tabs>
        
      </v-toolbar>
  
      <v-tabs-items v-model="tabs">
        
        <v-tab-item :key="1">
          <v-card>
            <v-card-text>
              
              <v-layout row>
                <my-componentOne  ></my-componentOne>
              </v-layout>


            </v-card-text>
          </v-card>

        </v-tab-item>

        <v-tab-item :key="2">
          <v-card>
            <v-card-text>
              <v-layout row>
                <my-componentTwo  ></my-componentTwo>
              </v-layout>
            </v-card-text>
          </v-card>

        </v-tab-item>

        <v-tab-item :key="3">
          <v-card>
            <v-card-text>
              njnjnj j j j jj j3
            </v-card-text>
          </v-card>

        </v-tab-item>
        


      </v-tabs-items>
    </div>



        </v-flex>

    </v-layout>
  </v-container>
</template>
<script>
import manageUser from '@/components/manage/manageUser.vue'
import manageApps from '@/components/manage/manageApps.vue'

export default {
  name: 'usuarios',
  components: {
    'my-componentOne': manageUser,
    'my-componentTwo': manageApps
  },
  created () {
  },
  mounted () {
  },
  data () {
    return {
      tabs: null
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