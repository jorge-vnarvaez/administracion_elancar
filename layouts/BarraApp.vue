<template>
  <div>
    <div class="bg-yellow-400 px-8 py-2">
      <v-icon v-if="!barra" @click="toggleBarra()">mdi-menu</v-icon>
      <v-icon v-if="barra" @click="toggleBarra()">mdi-close</v-icon>

    </div>

    <BarraLateral v-if="barra" class="absolute"/>
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
  },
};
</script>

<style>
</style>
