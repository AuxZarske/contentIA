<template>
  <v-container
    class="fluid px-0"
  >
    <v-layout column>
      <v-flex xs12>
        <v-flex xs10 offset-xs1 class="pb-3">
          <div id="editor">
          </div>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-tabs
          slot="extension"
          v-model="tab"
          color="white"
          grow
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-flex>
      <v-flex xs12>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <v-flex xs10 offset-xs1>
              <v-card flat v-if="item === 'Escribir'">
                <v-container grid-list-sm>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-card-text>
                        <autosize-text
                          i="60"
                          name="title"
                          id="title"
                          style="float: left; width: 100%;"
                          :value="article.title"
                          placeholder="Título"
                          @updated="autosizeTextUpdate"
                        ></autosize-text>
                        <autosize-text
                          i="60"
                          name="description"
                          id="description"
                          style="float: left; width: 100%;"
                          :value="article.description"
                          placeholder="Descripción"
                          @updated="autosizeTextUpdate"
                        ></autosize-text>
                        <autosize-text 
                          i="60"
                          name="tags"
                          id="tags"
                          style="float: left; width: 100%; display: none"
                          :value="article.tags"
                          placeholder="Etiquetas"
                          @updated="autosizeTextUpdate"
                        ></autosize-text>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs12 v-for="(section, idx) in article.sections" :key="idx">
                      <v-card-text>
                        <autosize-text
                          i="`${idx}`"
                          name="body"
                          id="body"
                          style="float: left; width: 100%;"
                          :value="section.template"
                          :placeholder="`section ${idx}`"
                          rows="60"
                          @updated="sectionUpdate($event, `${idx}`)"
                        ></autosize-text>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs12>
                      <v-card-text>

                        <!--   Poner nueva seccion a un articulo                     
                        <v-container grid-list-sm>
                          <v-layout row>
                            <v-flex xs12 my-3>
                              <div class="text-xs-center" my-5 py-6 > 
                                <v-btn block outline color="primary" @click="addSection">
                                  <v-icon dark color="primary">add</v-icon>
                                  Añadir Sección
                                </v-btn> 
                              </div>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        -->
                      </v-card-text>
                      <v-card-text>
                        <div class="text-xs-center">
                          <v-btn color="ascent" @click.stop="onCancel()">Cancelar</v-btn>
                          <v-btn color="primary" @click.stop="onSubmit()">Crear</v-btn>
                        </div>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
            <v-flex xs12 v-if="item === 'Vista Previa'">
              <v-layout column>
                <v-flex xs12>
                  <v-flex xs10 offset-xs1 class="pb-3">
                    <div class="display-2" v-html="markdown(article.title)"> </div>
                  </v-flex>
                </v-flex>
              </v-layout>
              <v-layout row wrap v-for="(section, idx) in article.sections" :key="idx" my-3>
                <v-flex
                  v-bind="{ [`xs${section.flex}`]: true, [`offset-xs${section.offset}`]: true }"
                  v-html="markdown(section.template)"
                  class="markdown"
                >
                </v-flex>
              </v-layout>
            </v-flex>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
      <v-flex>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'Article',
  created () {
  },
  mounted () {
    // console.log(this.$route.params)
  },
  data: () => ({
    show: false,
    article: {
      title: '',
      description: '',
      tags: '',
      sections: []
    },
    formattedArticle: '',
    tab: null,
    items: [
      'Escribir', 'Vista Previa'
    ]
  }),
  computed: {

  },
  methods: {
    toRoute (rname, rparams = {}, query = {}) {
      this.dialog = true
      this.$router.push({name: rname, params: rparams, query: query})
    },
    update: window._.debounce(function (e) {
      this.input = e.target.value
    }, 300),
    autosizeTextUpdate (event) {
      if (event.name === 'body') {
        this.article.body = event.value
      }
      if (event.name === 'title') {
        this.article.title = event.value
      }
      if (event.name === 'description') {
        this.article.description = event.value
      }
      if (event.name === 'tags') {
        this.article.tags = event.value
      }
    },
    sectionUpdate (event, idx) {
      this.article.sections[idx].template = event.value
    },
    addSection () {
      var section = {
        template: '',
        flex: 10,
        offset: 1
      }
      this.article.sections.push(section)
    },
    markdown (data, sanitize = true) {
      return window.marked(data, { sanitize: sanitize })
    },
    onSubmit () {
      const path = 'http://localhost:8000/api/v1.0/tipoIAs/'
      axios.post(path, this.article).then((response) => {
        swal('Nuevo articulo creado correctamente', '', 'success')
      })
        .catch((errogr) => {
          swal('El artículo no ha sido creado', '', 'error')
        })
    },
    onCancel () {
      var title = ''
      var description = ''
      var tags = ''
      var sections = []
      this.article.title = title
      this.article.description = description
      this.article.tags = tags
      this.article.sections = sections
      location.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.autosize {
  padding: 15px;
}



</style>