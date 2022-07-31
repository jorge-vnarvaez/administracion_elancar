<template>
  <div>
    <v-text-field
      class="w-[440px] mt-6"
      v-model="buscador"
      placeholder="Buscar producto por nombre, código o descripción"
      append-icon="mdi-magnify"
      solo
      flat
      outlined
    ></v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buscador: "",
    };
  },
};
</script>

<style></style>
