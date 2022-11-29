<template>
  <div>
    <div v-if="$vuetify.breakpoint.mobile ? false : true">
      <div
        class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-48"
        v-if="carro.length > 0"
      >
        <div class="tw-grid tw-grid-cols-12 tw-gap-x-8 tw-gap-y-4">
          <!-- CANTIDAD PRODUCTOS -->
          <div class="tw-col-span-8 tw-bg-white tw-p-6 tw-row-span-2">
            <div class="tw-flex tw-space-x-2">
              <v-icon>mdi-cart-outline</v-icon
              ><span
                >Tu carro de compras con {{ numeroProductos }} productos</span
              >
            </div>
          </div>
          <!-- CANTIDAD PRODUCTOS -->

          <!-- RESUMEN COMPRA -->
          <div class="tw-col-span-4 tw-bg-white tw-p-6 tw-row-span-4">
            <span class="tw-block tw-font-bold tw-text-xl"
              >Resumen de compra</span
            >
            <!-- TOTAL NETO -->
            <div class="tw-w-full tw-flex tw-justify-between tw-mt-4">
              <span>Neto: </span>
              <span class="tw-text-2xl">{{
                $formatearPrecio(totalPrecio)
              }}</span>
            </div>
            <!-- TOTAL NETO -->

            <!-- IVA -->
            <div class="tw-w-full tw-flex tw-justify-between tw-mt-4">
              <span>IVA (19%): </span>
              <span class="tw-text-2xl">{{ $formatearPrecio(iva) }}</span>
            </div>
            <!-- IVA -->

            <!--BUTTON COTIZAR-->
            <div class="tw-mt-8">
              <nuxt-link
                :to="{
                  name: 'formulario_despacho',
                  params: { documento_a_emitir: 'cotización' },
                }"
              >
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
              <nuxt-link
                :to="{
                  name: 'formulario_despacho',
                  params: { documento_a_emitir: 'nota de pedido' },
                }"
              >
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

      <div
        v-else
        class="tw-flex tw-flex-col tw-w-full tw-justify-center align-center tw-h-screen"
      >
        <div>
          <v-img src="/empty_cart.png" width="500" height="420" contain></v-img>
        </div>
        <span class="tw-block tw-mb-8 tw-text-3xl tw-w-96 tw-text-center"
          >El carro está vacío.</span
        >
      </div>
    </div>

    <div v-if="$vuetify.breakpoint.mobile ? true : false">
      <div
        class="tw-py-10 tw-px-8 tw-flex"
        v-if="carro.length > 0"
      >
        <div class="tw-grid tw-grid-cols-12 tw-gap-y-4">
          <!-- CANTIDAD PRODUCTOS -->
          <div class="tw-col-span-12 tw-p-6 tw-bg-white">
            <div class="tw-flex tw-space-x-2">
              <v-icon>mdi-cart-outline</v-icon
              ><span
                >Tu carro de compras con {{ numeroProductos }} productos</span
              >
            </div>
          </div>
          <!-- CANTIDAD PRODUCTOS -->

          <!-- RESUMEN COMPRA -->
          <div class="tw-col-span-12 tw-p-6 tw-row-span-4 tw-bg-white">
            <span class="tw-block tw-font-bold tw-text-xl"
              >Resumen de compra</span
            >
            <!-- TOTAL NETO -->
            <div class="tw-w-full tw-flex tw-justify-between tw-mt-4">
              <span>Neto: </span>
              <span class="tw-text-2xl">{{
                $formatearPrecio(totalPrecio)
              }}</span>
            </div>
            <!-- TOTAL NETO -->

            <!-- IVA -->
            <div class="tw-w-full tw-flex tw-justify-between tw-mt-4">
              <span>IVA (19%): </span>
              <span class="tw-text-2xl">{{ $formatearPrecio(iva) }}</span>
            </div>
            <!-- IVA -->

            <!--BUTTON COTIZAR-->
            <div class="tw-mt-8">
              <nuxt-link
                :to="{
                  name: 'formulario_despacho',
                  params: { documento_a_emitir: 'cotización' },
                }"
              >
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
              <nuxt-link
                :to="{
                  name: 'formulario_despacho',
                  params: { documento_a_emitir: 'nota de pedido' },
                }"
              >
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
          <div v-for="item in carro" :key="item.id" class="tw-col-span-12">
            <ProductoCartItem :item="item" :key="item.id" />
          </div>
          <!-- PRODUCTOS -->
        </div>
      </div>

      <div
        v-else
        class="tw-flex tw-flex-col tw-w-full tw-justify-center align-center tw-h-full"
      >
        <div>
          <v-img src="/empty_cart.png" width="500" height="420" contain></v-img>
        </div>
        <span class="tw-block tw-mb-8 tw-text-3xl tw-w-96 tw-text-center"
          >El carro está vacío.</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import ProductoCartItem from "@/components/utils/ProductoCartItem.vue";

export default {
  middleware: ["auth"],
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
    iva() {
      return this.totalPrecio * 0.19;
    },
  },
};
</script>

<style></style>
