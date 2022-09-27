<template>
  <div class="tw-w-full tw-p-24 tw-px-64" v-if="carro">
    <div class="tw-container tw-my-20 tw-grid tw-grid-cols-12 tw-grid-rows-12 tw-gap-x-8 tw-gap-y-4">
      <div class="tw-col-span-8 tw-bg-white tw-p-6 tw-row-span-1">
        <div class="tw-flex tw-space-x-2">
          <v-icon>mdi-cart-outline</v-icon
          ><span>Tu carro de compras con {{ numeroProductos }} productos</span>
        </div>
      </div>

      <div class="tw-col-span-4 tw-bg-white tw-p-6 tw-row-span-2">
        <span class="tw-block tw-font-bold tw-text-xl">Resumen de compra</span>
        <div class="tw-w-full tw-flex tw-justify-between tw-mt-4">
          <span>Costo de los productos </span>
          <span class="tw-text-2xl">$ {{ totalPrecio }}</span>
        </div>

        <div class="tw-mt-8">
          <nuxt-link to="/formulario_despacho">
            <div class="tw-bg-yellow-400">
              <span class="tw-block tw-text-center tw-text-neutral-900 tw-py-4 tw-font-bold"
                >Cotizar</span
              >
            </div>
          </nuxt-link>
        </div>
      </div>

      <div v-for="item in carro" :key="item.producto.id" class="tw-col-span-8">
        <producto-cart-item :item="item" :key="item.producto.id" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductoCartItem from "@/components/utils/ProductoCartItem.vue";

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
