<template>
  <v-app class="app">
    <BarraAppMobile v-if="$vuetify.breakpoint.mobile" />
    <BarraApp v-else class="tw-z-50" />
    <Nuxt class="bg-neutral-100 tw-z-20" />
  </v-app>
</template>

<script>

import BarraAppMobile from "@/layouts/BarraAppMobile.vue";
import BarraApp from "../layouts/BarraApp.vue";

export default {
  components: { BarraAppMobile, BarraApp },
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
