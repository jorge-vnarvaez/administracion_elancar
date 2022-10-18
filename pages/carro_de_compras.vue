<template>
  <div class="tw-w-full tw-p-24 tw-px-64" v-if="carro">
    <div
      class="tw-container tw-my-20 tw-grid tw-grid-cols-12 tw-gap-x-8 tw-gap-y-4"
    >
      <!-- CANTIDAD PRODUCTOS -->
      <div class="tw-col-span-8 tw-bg-white tw-p-6 tw-row-span-1">
        <div class="tw-flex tw-space-x-2">
          <v-icon>mdi-cart-outline</v-icon
          ><span>Tu carro de compras con {{ numeroProductos }} productos</span>
        </div>
      </div>
      <!-- CANTIDAD PRODUCTOS -->

      <!-- RESUMEN COMPRA -->
      <div class="tw-col-span-4 tw-bg-white tw-p-6 ">
        <span class="tw-block tw-font-bold tw-text-xl">Resumen de compra</span>
        <!-- TOTAL NETO -->
        <div class="tw-w-full tw-flex tw-justify-between tw-mt-4">
          <span>Neto: </span>
          <span class="tw-text-2xl">{{ $formatearPrecio(totalPrecio) }}</span>
        </div>
        <!-- TOTAL NETO -->

        <!-- IVA -->
         <div class="tw-w-full tw-flex tw-justify-between tw-mt-4">
          <span>IVA (19%): </span>
          <span class="tw-text-2xl">{{ $formatearPrecio(totalPrecio) }}</span>
        </div>
        <!-- IVA -->

        <!--BUTTON COTIZAR-->
        <div class="tw-mt-8">
          <nuxt-link :to="{ name: 'formulario_despacho', params: { documento_a_emitir: 'cotizacion'} }">
            <div class="tw-bg-yellow-400">
              <span
                class="tw-block tw-text-center tw-text-neutral-900 tw-py-4 tw-font-bold"
                >Cotizar</span
              >
            </div>
          </nuxt-link>
        </div>
        <!--BUTTON COTIZAR-->

        <!--BUTTON HACER PEDIDO-->
        <div class="tw-mt-8">
          <nuxt-link :to="{ name: 'formulario_despacho', params: { documento_a_emitir: 'nota de pedido'} }">
            <div class="tw-bg-black">
              <span
                class="tw-block tw-text-center tw-text-white tw-py-4 tw-font-bold"
                >Hacer pedido</span
              >
            </div>
          </nuxt-link>
        </div>
        <!--BUTTON HACER PEDIDO-->
      </div>
      <!-- RESUMEN COMPRA -->

      <!-- PRODUCTOS -->
      <div v-for="item in carro" :key="item.id" class="tw-col-span-8">
        <ProductoCartItem :item="item" :key="item.id" />
      </div>
      <!-- PRODUCTOS -->
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
      return this.$store.getters["carro_compras/getCarroComprasLength"];
    },
    totalPrecio() {
      return this.$store.getters["carro_compras/getTotalPrice"];
    },
  },
};
</script>

<style></style>
