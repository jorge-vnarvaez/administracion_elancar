<template>
  <div
    v-if="$vuetify.breakpoint.mobile ? false : true"
    @mouseover="opciones = true"
    @mouseleave="opciones = false"
    class="text-gray-500 cursor-pointer z-50"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-building-store" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <line x1="3" y1="21" x2="21" y2="21" />
      <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
      <line x1="5" y1="21" x2="5" y2="10.85" />
      <line x1="19" y1="21" x2="19" y2="10.85" />
      <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
    </svg>

    <div
      @mouseleave="opciones = false"
      @mouseover="opciones = true"
      class="absolute z-50 left-10 top-24 transition ease-in-out px-2"
      v-bind:class="{ hidden: !opciones, flex: opciones }"
    >
      <div class="bg-yellow-300 rounded-lg mt-4 shadow-lg">
        <span
          class="block font-bold text-xl px-6 text-neutral-900 py-2 bg-yellow-400"
          >Compras</span
        >
        <v-list-item-title
          v-for="pagina in paginas"
          :key="pagina.id"
          class="my-0"
          ><nuxt-link
            class="text-decoration-none"
            :to="{ name: `${pagina.route_name}` }"
            ><p
              @click="opciones = false"
              class="text-neutral-900 px-6 py-2 my-0 hover:bg-neutral-800 hover:text-white"
            >
              {{ pagina.label }}
            </p></nuxt-link
          ></v-list-item-title
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opciones: false,
      paginas: [
        {
          id: 1,
          route_name: "solicitudes-emitir-solicitud_de_cotizacion",
          label: "Emitir solicitud de cotización",
        },
         {
          id: 2,
          route_name: "solicitudes-ver-solicitudes_de_cotizacion",
          label: "Ver solicitudes de cotización",
        },
        {
          id: 3,
          route_name: "ordenes-emitir-orden_de_compra",
          label: "Emitir orden de compra",
        },
        {
          id: 4,
          route_name: "ordenes-ver-ordenes_de_compra",
          label: "Ver ordenes de compra",
        },
        // {
        //   id: 2,
        //   path: "ordenes-de-compra",
        //   label: "Ver de clientes",
        // },
      ],
    };
  },
};
</script>

<style></style>
