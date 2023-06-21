<template>
  <v-responsive >
    <!-- START DESKTOP VIEW -->
    <div
      class="tw-grid tw-grid-cols-12"
      v-if="$vuetify.breakpoint.mobile ? false : true"
    >
      <!-- NOMBRE -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 lg:tw-col-span-7 tw-py-4 tw-px-4'
        "
      >
        {{ producto.nombre }}
      </div>
      <!-- NOMBRE -->

      <!-- KG -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-3 lg:tw-col-span-2 tw-py-4 '
        "
      >
        {{ producto.kg}}
      </div>
      <!-- KG -->

      <!-- PRECIO NETO -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 lg:tw-col-span-2 tw-py-4 '
        "
      >
        {{ $formatearPrecio(producto.precio_neto) }}
      </div>
      <!-- PRECIO NETO -->
    </div>
    <!-- END DESKTOP VIEW -->

    <!-- START MOBILE VIEW -->
    <div v-if="$vuetify.breakpoint.mobile ? true : false">
      <!--[TABLE HEADERS]-->
      <div class="tw-bg-white tw-my-4 tw-px-4 tw-py-2 tw-text-sm">
        <!-- PRECIO NETO -->
        <div class="tw-flex tw-justify-between tw-mt-2 tw-items-center">
          <span class="tw-block tw-text-right">{{
            producto.nombre
          }}</span>
        </div>
        <!-- PRECIO NETO -->

        <!-- KG -->
        <div class="tw-flex tw-justify-between tw-mt-2 tw-items-center">
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-bold">KG</span>
          </div>
          <span class="tw-block tw-text-right">{{ producto.kg}}</span>
        </div>
        <!-- KG -->

        <!-- STOCK -->
        <div class="tw-flex tw-justify-between tw-mt-2 tw-items-center">
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-bold">Precio neto</span>
          </div>
          <span class="tw-block tw-text-right">{{ $formatearPrecio(producto.precio_neto) }}</span>
        </div>
        <!-- STOCK -->
      </div>
      <!--[TABLE HEADERS]-->
    </div>
    <!-- END MOBILE VIEW -->
  </v-responsive>
</template>

<script>
export default {
  props: ["producto", "index"],
  data() {
    return {
      cantidad: 0,
      producto_agregado: false,
      timeout: 2000,
    };
  },
  watch: {
    cantidad(val) {
      this.cantidad = typeof val == "string" ? parseInt(val) : val;

      if (this.cantidad > this.producto.stock) {
        this.cantidad = this.producto.stock;
      }

      if (this.cantidad <= 0) {
        this.cantidad = 0;
      }
    },
  },
};
</script>

<style></style>
