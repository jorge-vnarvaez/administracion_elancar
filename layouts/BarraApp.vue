<template>
  <div class="relative left-0">
    <div class="tw-bg-yellow-400 tw-h-screen tw-fixed tw-w-[60px] tw-flex tw-flex-col tw-space-y-4 tw-px-2 tw-py-8">
      <!-- HOME -->
      <nuxt-link :to="{ name: 'home' }" class="tw-bg-yellow-500 tw-rounded-lg tw-shadow-md tw-[40px] tw-h-[40px] tw-flex align-center tw-p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-home"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#000000"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="5 12 3 12 12 3 21 12 19 12" />
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
        </svg>
      </nuxt-link>
      <!-- HOME -->

      <!-- MENU VENTAS -->
      <menu-ventas />
      <!-- MENU VENTAS -->

      <!-- MENU COMPRAS -->
      <menu-compras />
      <!-- MENU COMPRAS -->

       <!-- MENU GESTION -->
      <!-- <menu-gestion /> -->
      <!-- MENU GESTION -->


      <!-- CARRO COMPRAS -->
      <nuxt-link to="carro_de_compras">
        <!-- <font-awesome-icon icon="fa-solid fa-cart-shopping" size="2xl" color="black" /> -->
      </nuxt-link>
      <!-- CARRO COMPRAS -->
    </div>
  </div>
</template>

<script>
import MenuVentas from "@/components/menus/MenuVentas.vue";
import MenuCompras from "@/components/menus/MenuCompras.vue";
import MenuGestion from "@/components/menus/MenuGestion.vue";

export default {
  components: {
    MenuVentas,
    MenuCompras,
    MenuGestion
  },
};
</script>

<style scoped>

</style>
