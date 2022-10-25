<template>
  <v-app class="app">
    <BarraAppMobile v-if="$vuetify.breakpoint.mobile" />
    <BarraApp v-else class="tw-z-50" />
    <Nuxt class="tw-bg-neutral-100 tw-h-full tw-z-20 tw-w-full" />
  </v-app>
</template>

<script>
import BarraAppMobile from "@/layouts/BarraAppMobile.vue";
import BarraApp from "../layouts/BarraApp.vue";

export default {
  components: { BarraAppMobile, BarraApp },
  mounted() {
    const carro = this.$cookies.get("carroCompras") || [];
    this.$store.dispatch("carro_compras/setCarro", carro);

    const sucursal = this.$cookies.get("datosSucursal") || {};
    this.$store.dispatch("sucursal/setSucursal", sucursal);

    const info_despacho = this.$cookies.get("infoDespachoCotizacion") || false;
    const info_pedido = this.$cookies.get("infoDespachoNotaPedido") || false;

    this.$store.dispatch(
      "info_despacho/setInfoDespachoCotizacion",
      info_despacho
    );

    this.$store.dispatch("info_despacho/setInfoDespachoNotaPedido", info_pedido);
  },
};
</script>

<style>
.v-application {
  font-family: "Inter", sans-serif;
}
/* .text-5xl {
  font-family: "Montserrat", sans-serif;
} */
</style>
