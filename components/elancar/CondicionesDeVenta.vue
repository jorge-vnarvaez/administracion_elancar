<template>
  <div>
    <v-select
      v-model="condicionVenta"
      :items="condiciones_de_venta"
      :item-text="(condicionVenta) => condicionVenta.nombre"
      :item-value="(condicionVenta) => condicionVenta.id"
      placeholder="Seleccione una condicion de venta"
      flat
      solo
      outlined
      class="mt-4 w-80"
    ></v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      condiciones_de_venta: [
        { id: 1, nombre: "30 días" },
        { id: 2, nombre: "60 días" },
        { id: 3, nombre: "90 días" },
      ],
      condicionVenta: null,
    };
  },
};
</script>

<style></style>
