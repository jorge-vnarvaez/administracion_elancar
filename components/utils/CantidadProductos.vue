<template>
  <div class="tw-flex">
    <v-icon @click="disminuirCantidad()" small>mdi-minus</v-icon>
    <div>
      <v-text-field
        v-model="item.cantidad"
        solo
        hide-details
        flat
        dense
        disabled
        :min="0"
        :class="`${$vuetify.breakpoint.mobile ? 'tw-w-[10px]' : 'tw-w-[50px]'}` + ' tw-mx-4 tw-text-center'"
      ></v-text-field>
    </div>
    <v-icon @click="aumentarCantidad(item.stock)" small>mdi-plus</v-icon>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    cart_type: {
      type: String,
      required: true,
    },
  },
  methods: {
    aumentarCantidad() {
       this.$store.dispatch(`carro_${this.cart_type}/updateProductQuantity`, {
        id: this.item.id,
        cantidad: this.item.cantidad + 1
      })
    },
    disminuirCantidad() {
      if (this.item.cantidad > 1) {
        this.$store.dispatch(`carro_${this.cart_type}/updateProductQuantity`, {
          id: this.item.id,
          cantidad: this.item.cantidad - 1,
        });
      }
    },
  },
};
</script>

<style></style>
