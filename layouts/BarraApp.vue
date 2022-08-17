<template>
  <div
    class="bg-yellow-400 h-screen w-14 flex flex-col align-center space-y-4 relative"
  >
    <!-- HOME -->
    <nuxt-link to="home">
      <font-awesome-icon
        icon="fa-solid fa-house"
        size="2xl"
        class="text-black"
      />
    </nuxt-link>
    <!-- HOME -->

    <!-- MENU VENTAS -->
    <menu-ventas />
    <!-- MENU VENTAS -->

    <!-- MENU COMPRAS -->
    <!-- <menu-compras /> -->
    <!-- MENU COMPRAS -->

    <!-- CARRO COMPRAS -->
    <nuxt-link to="carro_de_compras">
      <font-awesome-icon icon="fa-solid fa-cart-shopping" size="2xl" color="black" />
    </nuxt-link>
    <!-- CARRO COMPRAS -->

  </div>
</template>

<script>
import MenuCompras from "@/components/menus/MenuCompras.vue";
import MenuVentas from "@/components/menus/MenuVentas.vue";

export default {
  components: {
    MenuCompras,
    MenuVentas,
  },
};
</script>

<style></style>
