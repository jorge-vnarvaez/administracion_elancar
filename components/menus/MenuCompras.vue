<template>
  <div
    v-if="currentRole == 'Administrator'"
    @mouseover="opciones = true"
    @mouseleave="opciones = false"
    class="tw-bg-yellow-500 tw-rounded-lg tw-shadow-md tw-[40px] tw-h-[40px] tw-flex align-center tw-p-2 tw-cursor-pointer"
  >
    <IconoCompras @mouseleave="opciones = false" @mouseover="opciones = true" />

    <div
      class="tw-absolute tw-left-12 tw-top-32 transition ease-in-out tw-px-2"
      v-bind:class="{
        'tw-hidden': !opciones,
        'tw-flex': opciones,
        'tw-opacity-100': opciones,
        'tw-opacity-0': !opciones,
      }"
    >
      <div class="tw-bg-yellow-300 tw-rounded-lg tw-mt-4 tw-ml-4 tw-shadow-lg">
        <span
          class="tw-block tw-font-bold tw-text-xl tw-px-6 tw-text-neutral-900 tw-py-2 tw-bg-yellow-400"
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

import IconoCompras from "@/components/iconos/menu/IconoCompras.vue";

export default {
  components: {
    IconoCompras ,
  },
  data() {
    return {
      opciones: false,
      paginas: [
        {
          id: 1,
          route_name: "solicitudes-crear",
          label: "Emitir Solicitud de Cotización",
        },
        {
          id: 2,
          route_name: "solicitudes",
          label: "Solicitudes de Cotización",
        },
        // {
        //   id: 3,
        //   route_name: "ordenes-crear",
        //   label: "Emitir órden de compra",
        // },
        {
          id: 4,
          route_name: "ordenes",
          label: "Órdenes de compra",
        },
      ],
    };
  },
  mounted() {
    const rol = this.$cookies.get('user_role') || "";
    this.$store.dispatch("session/setCurrentRole", rol);
  },
  computed: {
    usuario() {
      return this.$store.getters["session/getUser"];
    },
    currentRole() {
      return this.$store.getters["session/getCurrentRole"];
    }
  }
};
</script>

<style></style>
