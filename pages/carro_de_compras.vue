<template>
  <div class="w-full tw-p-24">
    <div class="container my-20 grid grid-cols-12 grid-rows-12 gap-x-8 gap-y-4">
      <div class="col-span-8 bg-white p-6 row-span-1">
        <div class="flex space-x-2">
          <v-icon>mdi-cart-outline</v-icon
          ><span>Tu carro de compras con {{ numeroProductos }} productos</span>
        </div>
      </div>

      <div class="col-span-4 bg-white p-6 row-span-2">
        <span class="block font-bold">Resumen de compra</span>
        <div class="w-full flex justify-between mt-4">
          <span>Costo de los productos </span>
          <span class="text-2xl">$ {{ totalPrecio }}</span>
        </div>
      </div>

      <div v-for="item in carro" :key="item.producto.id" class="col-span-8">
        <producto-cart-item :item="item" :key="item.producto.id" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductoCartItem from "../components/utils/ProductoCartItem.vue";

export default {
  components: {
    ProductoCartItem,
  },
  computed: {
    carro() {
      return this.$store.getters["carro_compras/getCarroCompras"];
    },
    numeroProductos() {
      return this.$store.getters["carro_compras/getTotalQuantity"];
    },
    totalPrecio() {
      return this.$store.getters["carro_compras/getTotalPrice"];
    },
  },
};
</script>

<style></style>
