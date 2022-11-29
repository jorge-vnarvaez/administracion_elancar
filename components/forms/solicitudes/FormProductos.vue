<template>
  <div>
    <!-- SUBTITLE, DESCRIPTION AND SEARCH -->
    <div class="tw-flex align-center tw-mt-12">
      <div>
        <span class="tw-font-bold tw-uppercase lg:tw-text-2xl">Productos</span>
        <span class="tw-block lg:tw-text-xl">
          Seleccione el o los productos que desea solicitar cotización, a
          continuación indique la cantidad de cada uno.
        </span>
      </div>
    </div>
    <!-- SUBTITLE, DESCRIPTION AND SEARCH -->

    <div v-if="productos.length > 0">
      <!-- TABLE HEADERS -->
      <div
        v-if="$vuetify.breakpoint.mobile ? false : true"
        class="tw-grid tw-grid-cols-12 tw-mt-8 tw-mb-4 tw-px-4"
      >
        <div class="tw-col-span-6 lg:tw-col-span-5">
          <span class="tw-font-bold">Nombre</span>
        </div>

        <div class="tw-col-span-6 lg:tw-col-span-2">
          <span class="tw-font-bold">Stock Actual</span>
        </div>

        <div class="tw-col-span-6 lg:tw-col-span-3">
          <span class="tw-font-bold">Cantidad</span>
        </div>

        <div class="tw-col-span-6 lg:tw-col-span-2"></div>
      </div>
      <!-- TABLE HEADERS -->

      <!-- TABLE CONTENT -->
      <div
        v-for="(producto, index) in productos"
        :key="producto.id"
        class="tw-grid tw-grid-cols-12"
      >
        <!-- NOMBRE Y CASA MATRIZ -->
        <ProductoTableItemMin
          :class="
            `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
            ' tw-py-4 tw-px-4 '
          "
          class="tw-flex align-center tw-col-span-12"
          :producto="producto.productos_id"
          :index="index"
          :key="producto.id"
        />
        <!-- NOMBRE Y CASA MATRIZ -->
      </div>
      <!-- TABLE CONTENT -->
    </div>

    <!-- NO RESULTS -->
    <div class="tw-mt-8 tw-w-full tw-flex tw-flex-col align-center" v-else>
      <v-img
        src="/no_proveedor_products.png"
        width="320"
        height="270"
        contain
      ></v-img>
      <span class="tw-font-bold tw-text-xl"
        >El proveedor no posee productos asociados</span
      >
    </div>
    <!-- NO RESULTS -->
  </div>
</template>

<script>
import ProductoTableItemMin from "@/components/utils/table_items/ProductoTableItemMin.vue";

export default {
  props: {
    page: {
      type: Number,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
  },
  components: {
    ProductoTableItemMin,
  },
  data() {
    return {
      radioGroup: 1,
      productosSeleccionados: [],
    };
  },
  computed: {
    productos() {
      return this.$store.getters[
        "carro_solicitudes/getProductosCurrentProveedor"
      ];
    },
  },
};
</script>

<style></style>
