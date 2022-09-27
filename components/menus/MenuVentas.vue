<template>
  <div
    @mouseover="opciones = true"
    class="tw-relative tw-bg-yellow-500 tw-rounded-lg tw-shadow-md tw-[40px] tw-h-[40px] tw-flex align-center tw-p-2 tw-cursor-pointer"
  >
    <svg
      @mouseleave="opciones = false"
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-report-money"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#000000"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
      />
      <rect x="9" y="3" width="6" height="4" rx="2" />
      <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
      <path d="M12 17v1m0 -8v1" />
    </svg>

    <div
      @mouseleave="opciones = false"
      @mouseover="opciones = true"
      class="tw-absolute tw-z-50 tw-left-14 tw-top-4 tw-transition tw-ease-in-out tw-px-2"
      v-if="opciones"
    >
      <div class="tw-bg-yellow-300 tw-rounded-lg tw-mt-4 tw-shadow-lg">
        <span
          class="tw-block tw-font-bold tw-text-xl tw-px-6 tw-text-neutral-900 tw-py-2 tw-bg-yellow-400"
          >Ventas</span
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
              class="tw-text-neutral-900 tw-px-6 tw-py-2 my-0 hover:tw-bg-neutral-800 hover:tw-text-white"
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
          route_name: "notas_pedido",
          label: "Ver notas de pedido",
        },
        {
          id: 2,
          route_name: "cotizaciones",
          label: "Ver cotizaciones de clientes",
        },
        {
          id: 3,
          route_name: "productos",
          label: "Productos",
        },
      ],
    };
  },
};
</script>

<style></style>
