<template>
  <div class="tw-flex-col">
    <span class="tw-font-bold">Subtotal</span><span> {{ formatearPrecio(sub_total) }}</span>
  </div>
</template>

<script>
export default {
  props: {
    sub_total: {
      type: Number,
      default: 0,
      desc: "Define el sub total del documento",
    },
    transporte: {
      type: Number,
      default: 0,
      desc: "Define el valor del transporte del documento",
    },
  },
  methods: {
    formatearPrecio(precio) {
      return precio.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
      });
    },
  },
};
</script>

<style></style>
