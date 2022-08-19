<template>
  <div
    v-if="$vuetify.breakpoint.mobile ? false : true"
    @mouseover="opciones = true"
    @mouseleave="opciones = false"
    class="text-gray-500 cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-device-analytics"
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
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <line x1="7" y1="20" x2="17" y2="20" />
      <line x1="9" y1="16" x2="9" y2="20" />
      <line x1="15" y1="16" x2="15" y2="20" />
      <path d="M8 12l3 -3l2 2l3 -3" />
    </svg>

    <div
      @mouseleave="opciones = false"
      @mouseover="opciones = true"
      class="absolute z-50 left-10 top-40 transition ease-in-out px-2"
      v-bind:class="{ hidden: !opciones, flex: opciones }"
    >
      <div class="bg-yellow-300 rounded-lg mt-4 shadow-lg">
        <span
          class="block font-bold text-xl px-6 text-neutral-900 py-2 bg-yellow-400"
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
