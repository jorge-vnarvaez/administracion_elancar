<template>
  <div>
    <div
      class="tw-bg-yellow-400 tw-h-10 tw-flex justify-end align-center tw-px-4"
    >
      <v-icon @click="toggleDrawer">mdi-menu</v-icon>
    </div>

    <div
      v-if="drawer"
      class="tw-bg-neutral-900 tw-text-white tw-px-4 tw-flex tw-flex-col tw-align-end tw-justify-end tw-text-xl"
    >
      <!-- LIST OF OPTIONS -->
      <div v-if="opcion_visible == false">
        <div
          v-for="opcion in opciones"
          :key="opcion.id"
          class="tw-my-2 tw-text-right"
        >
          <nuxt-link v-if="opcion.list.length <= 0" :to="opcion.ruta">
            <span class="tw-text-white">{{ opcion.nombre }}</span></nuxt-link
          >
          <span
            v-if="opcion.list.length > 0"
            @click="optionSelected(opcion.id)"
            >{{ opcion.nombre }}</span
          >
        </div>

        <!-- <div class="tw-w-full tw-bg-yellow-400">
            <span class="tw-text-neutral-900 tw-text-right" @click="desconectar">Cerrar sesión</span>
        </div> -->
      </div>
      <!-- LIST OF OPTIONS -->

      <!-- TEST -->
      <div v-if="opcion_visible">
        <div class="tw-flex tw-justify-between tw-w-full tw-mt-2">
          <v-icon @click="opcion_visible = false" color="white">mdi-arrow-left-thick</v-icon>
          <span>{{ opcion_visible.nombre }}</span>
        </div>

        <div class="tw-w-full tw-h-[1px] tw-my-2 tw-bg-white"></div>

        <div class="tw-w-full">
          <div
            v-for="inner_opcion in opcion_visible.list"
            :key="inner_opcion.id"
          >
            <nuxt-link :to="inner_opcion.ruta" >
              <span class="tw-text-white tw-block tw-text-right tw-my-4" @click="drawer = false">
                {{ inner_opcion.nombre }}
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
      <!-- TEST -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      opcion_visible: false,
      opciones: [
        {
          id: 1,
          nombre: "Inicio",
          list: [],
          ruta: "/home",
        },
        {
          id: 2,
          nombre: "Ventas",
          list: [
            {
              id: 1,
              nombre: "Notas de Pedido",
              ruta: "/notas_pedido",
            },
            {
              id: 2,
              nombre: "Cotizaciones Clientes",
              ruta: "/cotizaciones",
            },
            {
              id: 3,
              nombre: "Listado de Productos",
              ruta: "/productos",
            },
          ],
        },
        {
          id: 3,
          nombre: "Compras",
          list: [
            {
              id: 1,
              nombre: "Emitir Solicitud de Cotización",
              ruta: "/solicitudes/crear",
            },
            {
              id: 2,
              nombre: "Solicitudes de Cotización",
              ruta: "/solicitudes",
            },
            {
              id: 3,
              nombre: "Ordenes de Compra",
              ruta: "/ordenes",
            },
          ],
        },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    optionSelected(id) {
      this.opcion_visible = this.opciones.find((opcion) => opcion.id == id);
    },
     cerrarSesion() {
      this.$store.dispatch("session/desconectar");
    },
  },
};
</script>

<style></style>
