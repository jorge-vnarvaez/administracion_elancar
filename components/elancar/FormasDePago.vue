<template>
  <div class="col-span-6">
    <span class="text-lg font-bold uppercase">Forma de pago *</span>
    <v-select
      v-model="formaPago"
      :items="formas_de_pago"
      :item-text="(formaPago) => formaPago.nombre"
      :item-value="(formaPago) => formaPago.id"
      placeholder="Seleccione una forma de pago"
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
      formas_de_pago: [
        { id: 1, nombre: "Cheque a 30 días" },
        { id: 2, nombre: "Cheque a 60 días" },
        { id: 3, nombre: "Cheque a 90 días" },
      ],
      formaPago: null,
    };
  },
};
</script>

<style></style>
