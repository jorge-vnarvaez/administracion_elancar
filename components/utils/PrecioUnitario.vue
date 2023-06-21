<template>
  <v-row>
    <v-col cols="3">
      <v-text-field
        v-model="precio"
        type="number"
        hide-details
        single-line
        dense
        small
        :rules="rules"
        :min="0"
        color="black"
        class="tw-block tw-w-[150px] tw-text-center lg:tw-mt-0 tw-mt-1 tw-px-0 lg:tw-col-span-2 tw-mb-4"
      ></v-text-field>
    </v-col>

    <!-- PRECIO TOTAL -->
    <v-col cols="2">
      <span class=" lg:tw-col-span-2 lg:tw-mt-0 tw-mt-1">{{
        $formatearPrecio(precio * item.cantidad)
      }}</span>
    </v-col>
    <!-- PRECIO TOTAL -->
  
    <v-col cols="1">
      <v-icon @click="guardarPrecioUnitario(item.id)">mdi-content-save</v-icon>
    </v-col>
  </v-row>
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
