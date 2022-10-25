<template>
  <div class="tw-grid tw-grid-cols-11">
    <!-- NOMBRE -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-5 tw-py-4 tw-px-4'
      "
    >
      {{ producto.nombre }}
    </div>
    <!-- NOMBRE -->

    <!-- STOCK ACTUAL -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-2 tw-py-4'
      "
    >
      <v-icon v-if="stock == 0" color="red darken-2"
        >mdi-package-variant</v-icon
      >

      <v-icon v-if="stock != 0" color="green darken-1"
        >mdi-package-variant-closed</v-icon
      >

      <span>
        {{ producto.stock == 0 ? "Sin stock" : producto.stock }}
      </span>
    </div>
    <!-- STOCK ACTUAL  -->

    <!-- CANTIDAD -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-4 tw-py-1 tw-px-4'
      "
    >
      <div class="tw-flex">
        <v-icon @click="disminuirCantidad()">mdi-minus</v-icon>
        <div>
          <v-text-field
            v-model="cantidad"
            solo
            hide-details
            flat
            :min="0"
            class="tw-w-[140px] tw-mx-4 tw-text-center"
          ></v-text-field>
        </div>
        <v-icon @click="aumentarCantidad(producto.stock)">mdi-plus</v-icon>
      </div>
    </div>
    <!-- CANTIDAD -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      cantidad: 0,
    };
  },
  props: {
    producto: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    aumentarCantidad(stock) {
      if (this.cantidad < stock) {
        this.cantidad++;
      }
    },
    disminuirCantidad() {
      if (this.cantidad > 0) {
        this.cantidad--;
      }
    },
  },
  computed: {
    stock() {
      return this.producto.stock;
    },
  },
};
</script>

<style></style>
