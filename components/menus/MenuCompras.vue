<template>
  <div
    @mouseover="opciones = true"
    class="
      tw-relative
      tw-bg-yellow-500
      tw-rounded-lg
      tw-shadow-md
      tw-[40px]
      tw-h-[40px]
      tw-flex
      align-center
      tw-p-2 tw-cursor-pointer
    "
  >
    <svg
      @mouseleave="opciones = false"
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-building-store"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#000000"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="3" y1="21" x2="21" y2="21" />
      <path
        d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"
      />
      <line x1="5" y1="21" x2="5" y2="10.85" />
      <line x1="19" y1="21" x2="19" y2="10.85" />
      <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
    </svg>

    <div
      @mouseleave="opciones = false"
      @mouseover="opciones = true"
      class="
        tw-absolute tw-left-14 tw-top-0 tw-transition tw-ease-in-out tw-px-2
      "
      v-if="opciones"
    >
      <div class="tw-bg-yellow-300 tw-rounded-lg tw-mt-4 tw-shadow-lg">
        <span
          class="
            tw-block
            tw-font-bold
            tw-text-xl
            tw-px-6
            tw-text-neutral-900
            tw-py-2
            tw-bg-yellow-400
          "
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
              @click="testPerformance"
              class="
                tw-text-neutral-900 tw-px-6 tw-py-2 tw-my-0
                hover:tw-bg-neutral-800 hover:tw-text-white
              "
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
          route_name: "solicitudes",
          label: "Ver solicitudes de cotización",
        },
        {
          id: 3,
          route_name: "ordenes-emitir-orden_de_compra",
          label: "Emitir orden de compra",
        },
        {
          id: 4,
          route_name: "ordenes",
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
  methods: {
    testPerformance() {
      console.log("checking performance...")
      const now = window.performance.now()
      this.$store.dispatch("performance/instanceTime", now);
    },
  },
};
</script>

<style></style>
