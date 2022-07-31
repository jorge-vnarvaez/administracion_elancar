<template>
  <div>
    <div class="bg-yellow-400 px-8 py-2 flex justify-between align-center">
      <div>
        <v-icon v-if="!barra" @click="toggleBarra()">mdi-menu</v-icon>
        <v-icon v-if="barra" @click="toggleBarra()">mdi-close</v-icon>
      </div>

      <nuxt-link :to="{ name: 'carro_de_compras'}">
        <div class="flex align-center justify-end">
          <v-icon large color="black">mdi-cart</v-icon>
          <span
            class="block bg-neutral-900 h-6 w-6 rounded-full p-2 text-white font-bold text-center"
            ><div class="h-full flex align-center justify-center">
              {{ numeroProductos }}
            </div></span
          >
        </div>
      </nuxt-link>
    </div>

    <BarraLateral v-if="barra" :barra="barra" class="absolute" />
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
    numeroProductos() {
      return this.$store.getters["carro_compras/lengthCarro"];
    },
  },
};
</script>

<style></style>
