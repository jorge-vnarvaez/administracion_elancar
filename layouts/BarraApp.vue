<template>
  <div>
    <div class="bg-yellow-400 px-8 py-2 flex justify-between">
      <div>
        <v-icon v-if="!barra" @click="toggleBarra()">mdi-menu</v-icon>
        <v-icon v-if="barra" @click="toggleBarra()">mdi-close</v-icon>
      </div>

      <div>
        <v-icon>mdi-cart</v-icon>
        <span>{{ numeroProductos }}</span>
      </div>
  </div>

    <BarraLateral v-if="barra" class="absolute" />
  </div>
</template>

<script>
import BarraLateral from "./BarraLateral.vue";

export default {
  components: { BarraLateral },
  methods: {
    toggleBarra() {
      this.$store.dispatch("ui/toggleBarra");
    },
  },
  computed: {
    barra() {
      return this.$store.getters["ui/getStatusBarra"];
    },
    // use this computed property to get the number of products in the cart
    // and display it in the header
    numeroProductos() {
      return this.$store.getters["carro_compras/getNumeroDeProductos"];
    },
  },
};
</script>

<style>
</style>
