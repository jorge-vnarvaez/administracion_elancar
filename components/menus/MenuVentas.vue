<template>
  <div
    @mouseover="opciones = true"
    @mouseleave="opciones = false"
    class="tw-bg-yellow-500 tw-rounded-lg tw-shadow-md tw-[40px] tw-h-[40px] tw-flex align-center tw-p-2 tw-cursor-pointer"
  >
    <IconoVentas @mouseleave="opciones = false" @mouseover="opciones = true" />

    <div
      class="tw-absolute tw-left-12 tw-top-20 transition ease-in-out tw-px-2"
      v-bind:class="{ 'tw-hidden': !opciones, 'tw-flex': opciones, 'tw-opacity-100': opciones, 'tw-opacity-0': !opciones }"
    >
      <div class="tw-bg-yellow-300 tw-rounded-lg tw-mt-4 tw-ml-4 tw-shadow-lg">
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
            :to="`${pagina.route_name}`"
            ><p
              class="tw-text-neutral-900 tw-px-6 tw-py-2 tw-my-0 hover:tw-bg-neutral-800 hover:tw-text-white"
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
// import IconoVentas
import IconoVentas from "@/components/iconos/menu/IconoVentas.vue";

export default {
  components: {
    IconoVentas,
  },
  data() {
    return {
      opciones: false,
      paginas: [
        {
          id: 1,
          route_name: "notas_pedido",
          label: "Ver Notas de Pedido",
        },
        {
          id: 2,
          route_name: "cotizaciones",
          label: "Ver Cotizaciones a Clientes",
        },
        // {
        //   id: 3,
        //   route_name: "ordenes-emitir-orden_de_compra",
        //   label: "Emitir orden de compra",
        // },
        {
          id: 4,
          route_name: "productos",
          label: "Listado Productos",
        },
    
      ],
    };
  },
};
</script>

<style></style>
