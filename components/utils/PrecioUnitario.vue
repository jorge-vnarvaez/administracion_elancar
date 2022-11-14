<template>
  <div class="tw-grid tw-grid-cols-5">
    <v-text-field
      v-model="precio"
      type="number"
      solo
      hide-details
      flat
      outlined
      dense
      :rules="rules"
      :min="0"
      color="black"
      class="tw-w-[150px] tw-text-center tw-px-0 tw-col-span-2"
    ></v-text-field>

    <!-- PRECIO TOTAL -->
    <span class="tw-flex align-center tw-col-span-1">{{
      $formatearPrecio(precio * item.cantidad)
    }}</span>
    <!-- PRECIO TOTAL -->

    <v-btn
      icon
       class="tw-col-span-1 tw-uppercase tw-bg-neutral-900 tw-text-white tw-font-bold tw-px-4 tw-py-2"
      @click="guardarPrecioUnitario(item.id)">
      <v-icon color="white">mdi-content-save</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      precio: 0,
      // create a rule that use regex to validate the input doesnt have dots and letters
      rules: [(v) => !/[^0-9]/.test(v) || "Solo números"],
    };
  },
  watch: {
    precio(val) {
      this.$formatearPrecio(val);
    },
  },
  methods: {
    guardarPrecioUnitario(id) {
      const precio = this.precio;
      this.$store.dispatch('ordenes_de_compra/updateProductPrice', { id: id, precio_compra: precio });
    },
  }
};
</script>

<style></style>
