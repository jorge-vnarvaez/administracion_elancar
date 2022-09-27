<template>
  <div class="tw-p-24 tw-px-64">{{ info }} {{ carro_de_compra }}</div>
</template>
<script>
export default {
  data() {
    return { info: null, carro_de_compra: null };
  },
  mounted() {
    this.info = this.$store.getters["info_despacho/getInfoDespacho"];
    this.carro_de_compra = this.$store.getters["carro_de_compra/getCarroDeCompra"];
  },
};
</script>
