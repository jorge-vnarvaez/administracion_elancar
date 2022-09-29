<template>
  <div
    class="tw-grid tw-grid-cols-12 tw-w-full tw-py-24 tw-px-64 tw-gap-x-40 tw-h-full align-center"
  >
    <!-- BIENVENIDO -->
    <div
      class="tw-col-span-8 tw-bg-white tw-p-10 tw-shadow-md tw-rounded-lg tw-h-40 tw-flex align-center tw-justify-between"
      v-if="usuario">

      <div class="tw-flex tw-flex-col">
        <span class="block tw-font-semibold tw-text-2xl">Bienvenido/a</span>
        <span>{{ usuario.first_name }} {{ usuario.last_name }}</span>
      </div>
      <div class="tw-flex tw-flex-col text-right">
        <span class="block">{{ fecha_actual }}</span>
        <span class="flex">{{ hora_actual }}</span>
      </div>
    </div>
    <!-- BIENVENIDO -->

    <!-- ACCESOS DIRECTOS -->
    <div class="tw-col-span-12 tw-mt-14">
      <p class="tw-text-3xl tw-font-semibold">Accesos directos</p>
    </div>

    <!-- PRODUCTOS -->
    <div class=" tw-col-span-4 tw-bg-white tw-rounded-lg tw-shadow-md tw-p-10">
      <card-direct-access
        label="Listado de productos"
        text="Revisa el listado de productos"
        icon="lista"
        route_name="productos"
      />
    </div>
    <!-- PRODUCTOS -->

    <!-- ORDENES DE COMPRA -->
    <div class="tw-col-span-4 tw-bg-white tw-rounded-lg tw-shadow-md tw-p-10">
      <card-direct-access
        label="Orden de compra"
        text="Revisa las ordenes de compra realizadas"
        icon="file-search"
        route_name="ordenes-ver-ordenes_de_compra"
      />
    </div>
    <!-- ORDENES DE COMPRA -->

    <!-- COTIZACIONES -->
    <div
      class="tw-col-span-4 tw-col-start-1 tw-bg-white tw-rounded-lg tw-shadow-md tw-p-10"
    >
      <card-direct-access
        label="Cotizaciones de venta"
        text="Revisa las cotizaciones de ventas realizadas"
        icon="file-search"
        route_name="cotizaciones"
      />
    </div>
    <!-- COTIZACIONES -->

    <!-- NOTAS DE PEDIDO -->
    <div
      class="tw-col-span-4  tw-bg-white tw-rounded-lg tw-shadow-md tw-p-10"
    >
      <card-direct-access
        label="Notas de pedido"
        text="Revisa las notas de pedido realizadas"
        icon="file"
        route_name="notas_pedido"
      />
    </div>
    <!-- NOTAS DE PEDIDO -->

    <!-- ACCESOS DIRECTOS -->
  </div>
</template>

<script>
import MacroCategorias from "@/components/categorias/MacroCategorias.vue";
import CardDirectAccess from "@/components/reusable/CardDirectAccess.vue";

export default {
  middleware: ["auth"],
  components: { MacroCategorias, CardDirectAccess },
  mounted() {
    this.getCurrentUsuario();
  },
  methods: {
    getCurrentUsuario() {
      this.$store.dispatch("session/current");
    },
    desconectar() {
      this.$store.dispatch("session/desconectar");
    },
  },
  computed: {
    usuario() {
      return this.$store.getters["session/getUser"];
    },
    fecha_actual() {
      return this.$store.getters["ui/getFechaActual"];
    },
    hora_actual() {
      return this.$store.getters["ui/getHoraActual"];
    },
  },
};
</script>

<style></style>
