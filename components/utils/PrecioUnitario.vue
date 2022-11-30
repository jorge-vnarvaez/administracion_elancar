<template>
  <div class="lg:tw-grid lg:tw-grid-cols-5 tw-flex tw-flex-col lg:tw-justify-center">
    <v-text-field
      v-model="precio"
      type="number"
      solo
      hide-details
      flat
      outlined
      dense
      small
      :rules="rules"
      :min="0"
      color="black"
      class="tw-block tw-w-[150px] tw-text-center lg:tw-mt-0 tw-mt-1 tw-px-0 lg:tw-col-span-2 tw-mb-4"
    ></v-text-field>

    <!-- PRECIO TOTAL -->
    <div class="" v-if="$vuetify.breakpoint.mobile ? true : false">
      <div class="tw-flex tw-font-bold "
        >Precio total</div
      >
    </div>
    <span class=" lg:tw-col-span-1 lg:tw-mt-0 tw-mt-1">{{
      $formatearPrecio(precio * item.cantidad)
    }}</span>
    <!-- PRECIO TOTAL -->

    <v-btn
      class="lg:tw-col-span-1 lg:tw-mt-0 tw-mt-4 tw-uppercase tw-w-full lg:tw-w-0 tw-bg-neutral-900 tw-text-white tw-font-bold tw-px-4 tw-py-2"
      @click="guardarPrecioUnitario(item.id)"
    >
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
      this.$store.dispatch("ordenes_de_compra/updateProductPrice", {
        id: id,
        precio_compra: precio,
      });
    },
  },
};
</script>

<style></style>
