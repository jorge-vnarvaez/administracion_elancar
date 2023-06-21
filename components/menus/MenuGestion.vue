<template>
  <div
    v-if="currentRole == 'Administrator'"
    @mouseover="opciones = true"
    @mouseleave="opciones = false"
    class="tw-bg-yellow-500 tw-rounded-lg tw-shadow-md tw-[40px] tw-h-[40px] tw-flex align-center tw-p-2 tw-cursor-pointer"
  >
    <IconoCompras @mouseleave="opciones = false" @mouseover="opciones = true" />
    

    <div
      @mouseleave="opciones = false"
      @mouseover="opciones = true"
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
          >Gestión</span
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

import IconoGestion from "@/components/iconos/menu/IconoGestion.vue";

export default {
  components: {
    IconoGestion,
  },
  data() {
    return {
      opciones: true,
      paginas: [
        {
          id: 1,
          route_name: "proveedores",
          label: "Proveedores",
        },
        {
          id: 2,
          route_name: "precio_materiales",
          label: "Precio materiales",
        },
      ],
    };
  },
};
</script>

<style></style>
