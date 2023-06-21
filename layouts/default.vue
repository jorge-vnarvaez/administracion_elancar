<template>
  <v-app class="app">
    <BarraAppMobile v-if="$vuetify.breakpoint.mobile" />
    <BarraApp v-else class="tw-z-50" />
    <Nuxt class="tw-z-20 tw-w-full tw-h-screen tw-bg-neutral-100 tw-overflow-auto" />
  </v-app>
</template>

<script>
import BarraAppMobile from "@/layouts/BarraAppMobile.vue";
import BarraApp from "@/layouts/BarraApp.vue";

export default {
  components: { BarraAppMobile, BarraApp },
  middleware: ["refresh"],
  mounted() {

    this.$store.dispatch('session/current')

    // Obtiene el rol del usuario actual de las cookies y lo guarda en el store
    const rol = this.$cookies.get("user_role") || "";
    this.$store.dispatch("session/setCurrentRole", rol);

    // Obtiene el carro de compras actual de las cookies y lo guarda en el store
    const carro = this.$cookies.get("carroCompras") || [];
    this.$store.dispatch("carro_compras/setCarro", carro);

    // Obtiene el carro de solicitudes actual de las cookies y lo guarda en el store
    const carro_solicitudes = this.$cookies.get("carroSolicitudes") || [];
    this.$store.dispatch("carro_solicitudes/setCarro", carro_solicitudes);

    // Obtiene los datos de la empresa actual de las cookies y lo guarda en el store
    const sucursal = this.$cookies.get("datosSucursal") || {};
    this.$store.dispatch("sucursal/setSucursal", sucursal);

    // Obtiene la info de la cotizacion en proceso
    const info_despacho = this.$cookies.get("infoDespachoCotizacion") || false;

    // Obtiene la info del pedido en proceso
    const info_pedido = this.$cookies.get("infoDespachoNotaPedido") || false;

    // Si hay info de la cotizacion en proceso, la guarda en el store
    this.$store.dispatch("info_despacho/setInfoDespachoCotizacion", info_despacho);

    // Si hay info del pedido en proceso, la guarda en el store
    this.$store.dispatch("info_despacho/setInfoDespachoNotaPedido", info_pedido);

    // Obtiene la info del proveedor actual de las cookies y lo guarda en el store
    const proveedor = this.$cookies.get("currentProveedor") || {};
    this.$store.dispatch("carro_solicitudes/setCurrentProveedor", proveedor);

    // Obtiene la info del receptor del proveedor actual de las cookies y lo guarda en el store
    const receptor = this.$cookies.get("currentReceptor") || {};
    this.$store.dispatch("carro_solicitudes/setReceptorCurrentProveedor", receptor);
  },
  computed: {
    usuario() {
      return this.$store.getters["session/getUser"];
    },
  }
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
