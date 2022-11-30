<template>
  <div
    class="tw-grid tw-grid-cols-12 tw-w-full tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-48 tw-h-full align-center"
  >
    <!-- BIENVENIDO -->
    <div
      class="tw-col-span-12 tw-bg-white tw-p-10 tw-shadow-md tw-rounded-lg lg:tw-h-40 tw-flex tw-flex-col lg:tw-flex-row lg:align-center tw-space-y-8 lg:tw-space-y-0 tw-justify-between"
      v-if="usuario"
    >
      <div class="tw-flex tw-flex-col">
        <span class="block tw-font-semibold tw-text-2xl">Bienvenido/a</span>
        <span>{{ usuario.first_name }} {{ usuario.last_name }}</span>
      </div>
      <div class="tw-flex tw-flex-col text-right">
        <span class="block">{{ fecha_actual }}</span>
        <span class="flex">{{ hora_actual }}</span>
      </div>

      <!-- <div>
        {{ sucursal }}
      </div> -->
    </div>
    <!-- BIENVENIDO -->

    <!-- ACCESOS DIRECTOS -->
    <div
      class="tw-col-span-12 tw-grid tw-grid-cols-12 lg:tw-gap-x-20 tw-gap-y-4 lg:tw-gap-y-12"
    >
      <div class="tw-col-span-12 tw-mt-14">
        <p class="tw-text-4xl tw-font-semibold">Accesos directos</p>
      </div>

      <!-- PRODUCTOS -->
      <div
        class="tw-col-span-12 lg:tw-col-span-6 tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 lg:tw-p-10"
      >
        <card-direct-access
          label="Listado de productos"
          text="Revisa el listado de productos"
          icon="lista"
          route_name="productos"
        />
      </div>
      <!-- PRODUCTOS -->

      <!-- ORDENES DE COMPRA -->
      <div
        class="tw-col-span-12 lg:tw-col-span-6 tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 lg:tw-p-10"
      >
        <card-direct-access
          label="Orden de compra"
          text="Revisa las órdenes de compra realizadas"
          icon="file-search"
          route_name="ordenes"
        />
      </div>
      <!-- ORDENES DE COMPRA -->

      <!-- COTIZACIONES -->
      <div
        class="tw-col-span-12 lg:tw-col-span-6 tw-col-start-1 tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 lg:tw-p-10"
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
        class="tw-col-span-12 lg:tw-col-span-6 tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 lg:tw-p-10"
      >
        <card-direct-access
          label="Notas de pedido"
          text="Revisa las notas de pedido realizadas"
          icon="file"
          route_name="notas_pedido"
        />
      </div>
      <!-- NOTAS DE PEDIDO -->

      <!-- PRECIO MATERIALES -->
      <div
        class="tw-col-span-12 lg:tw-col-span-6 tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 lg:tw-p-10"
      >
        <card-direct-access
          label="Precio material"
          text="Actualiza el precio de los productos en base a un material especifico"
          icon="materials"
          route_name="precio_materiales"
        />
      </div>
      <!-- PRECIO MATERIALES -->
    </div>

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
    sucursal() {
      return this.$store.getters["sucursal/getSucursal"];
    },
  },
};
</script>

<style></style>
