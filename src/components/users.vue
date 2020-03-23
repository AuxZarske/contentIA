<template>
  <v-container
    class="fluid px-0"
  >
    <v-layout column>
      
        hello world

    </v-layout>
  </v-container>
</template>
<script>

export default {
  name: 'usuarios',
  created () {
  },
  mounted () {
  },
  data: () => ({
  }),
  methods: {
    toRoute (rname, rparams = {}, query = {}) {
      this.dialog = true
      this.$router.push({name: rname, params: rparams, query: query})
    }
  }
}
</script>