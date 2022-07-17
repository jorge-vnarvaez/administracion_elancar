<template>
    <v-app class="app">
      <BarraApp />
      <Nuxt />
    </v-app>
</template>

<script>

import BarraApp from '../layouts/BarraApp.vue'

export default {
    components: { BarraApp },
}

</script>

<style>
  .v-application {  
    font-family: 'Poppins', sans-serif;
  }
  .text-5xl {
    font-family: 'Montserrat', sans-serif;
  }
</style>