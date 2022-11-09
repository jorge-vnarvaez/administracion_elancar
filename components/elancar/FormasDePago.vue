<template>
  <div>
    <v-select
      v-model="formaPago"
      :items="formas_de_pago"
      :item-text="(formaPago) => formaPago.nombre"
      :item-value="(formaPago) => formaPago"
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
        {
          id: 1,
          nombre: "Efectivo",
        },
        {
          id: 2,
          nombre: "Transferencia",
        },
        {
          id: 3,
          nombre: "Tarjeta de crédito",
        },
        {
          id: 4,
          nombre: "Tarjeta de débito",
        },
        {
          id: 5,
          nombre: "Depósito",
        },
        {
          id: 6,
          nombre: "Crédito",
        },
        { id: 7, nombre: "Cheque a 30 días" },
        { id: 8, nombre: "Cheque a 60 días" },
        { id: 9, nombre: "Cheque a 90 días" },
      ],
      formaPago: null,
    };
  },
  watch: {
    formaPago: function (val) {
      this.$store.dispatch('carro_solicitudes/setMetodoDePago', val);
    },
  }
};
</script>

<style></style>
