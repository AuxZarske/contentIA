<template>

</template>

<script>
export default {
  created () {
    // this.$store.dispatch('clearTodos')
    this.$store.dispatch('destroyToken')
      .then(response => {
        this.$router.push({ name: 'home' })
        location.reload()
      })
      .catch(errior => {
        this.$router.push({ name: 'home' })
        location.reload()
      })
  }
}
</script>