<template>
  <v-app class="app">
    <BarraApp />
    <Nuxt class="bg-neutral-100" />
  </v-app>
</template>

<script>
import BarraApp from "../layouts/BarraApp.vue";

export default {
  components: { BarraApp },
  mounted() {
    const carro = this.$cookies.get("carroCompras");

    this.$store.dispatch("carro_compras/setCarro", carro);
  },
};
</script>

<style>
.v-application {
  font-family: "Poppins", sans-serif;
}
.text-5xl {
  font-family: "Montserrat", sans-serif;
}
</style>
