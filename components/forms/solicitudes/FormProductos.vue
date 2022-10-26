<template>
  <div v-if="productos.length > 0">
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

    <!-- TABLE HEADERS -->
    <div class="tw-grid tw-grid-cols-12 tw-mt-20 tw-mb-4 tw-px-4">
      <div class="tw-col-span-6 lg:tw-col-span-5">
        <span class="tw-font-bold">Nombre</span>
      </div>

      <div class="tw-col-span-6 lg:tw-col-span-2">
        <span class="tw-font-bold">Stock Actual</span>
      </div>

      <div class="tw-col-span-6 lg:tw-col-span-3">
        <span class="tw-font-bold">Cantidad</span>
      </div>

      <div class="tw-col-span-6 lg:tw-col-span-2">

      </div>
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
        class="tw-flex align-center tw-col-span-12"
        :producto="producto.productos_id"
        :index="index"
        :key="producto.id"
      />
      <!-- NOMBRE Y CASA MATRIZ -->
    </div>
    <!-- TABLE CONTENT -->
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
      return this.$store.getters["proveedores/getProductosCurrentProveedor"];
    },
  },
};
</script>

<style></style>
