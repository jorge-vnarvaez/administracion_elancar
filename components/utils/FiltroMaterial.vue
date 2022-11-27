<template>
  <div class="tw-flex tw-flex-col">
    <!-- FILTROS -->
    <div class="tw-flex tw-flex-col lg:tw-flex-row lg:tw-space-x-4">
      <!-- TIPO MATERIAL -->
      <v-select
        :items="materiales"
        v-model="material_seleccionado"
        label="Material"
        :item-text="(item) => item.nombre"
        :item-value="(item) => item"
      ></v-select>
      <!-- TIPO MATERIAL -->
    </div>
    <!-- FILTROS -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      material_seleccionado: "",
      materiales: [],
    };
  },
  async fetch() {
    const { data } = await fetch(
      `${this.$config.apiUrl}/items/materiales`
    ).then((res) => res.json());
    this.materiales = data;
  },
  watch: {
    material_seleccionado: function (val) {
      this.filtrar(val);
    },
  },
  methods: {
    filtrar(material) {
      this.$store.dispatch("productos/filterByMaterial", material);
    },
  },
};
</script>

<style></style>
