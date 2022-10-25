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
      <div class="tw-col-span-1"></div>

      <div class="tw-col-span-6 lg:tw-col-span-5">
        <span class="tw-font-bold">Nombre</span>
      </div>

      <div class="tw-col-span-6 lg:tw-col-span-2">
        <span class="tw-font-bold">Stock Actual</span>
      </div>

      <div class="tw-col-span-6 lg:tw-col-span-4">
        <span class="tw-font-bold">Cantidad</span>
      </div>
    </div>
    <!-- TABLE HEADERS -->

    <!-- TABLE CONTENT -->
    <div
      v-for="(producto, index) in productos.slice(
        itemsPerPage * page - itemsPerPage,
        itemsPerPage * page
      )"
      :key="producto.id"
      class="tw-grid tw-grid-cols-12"
    >
      <!-- RADIO BUTTON -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 lg:tw-col-span-1 tw-px-4'
        "
      >
        <v-radio-group v-model="radioGroup" class="tw-py-0" hide-details>
          <v-radio
            :key="producto.id"
            :value="producto.id"
            @click="productoSeleccionado(producto)"
          >
          </v-radio>
        </v-radio-group>
      </div>
      <!-- RADIO BUTTON -->

      <!-- NOMBRE Y CASA MATRIZ -->
      <ProductoTableItemMin
        class="tw-flex align-center tw-col-span-11"
        :producto="producto.productos_id"
        :index="index"
        :key="producto.id"
      />
      <!-- NOMBRE Y CASA MATRIZ -->
    </div>
    <!-- TABLE CONTENT -->

    <!--[PAGINATION]-->
    <div>
      <v-pagination
        v-model="page"
        color="black"
        :length="Math.round(productos.length / itemsPerPage)"
      ></v-pagination>
    </div>
    <!--[PAGINATION]-->
  </div>
</template>

<script>
import ProductoTableItemMin from "@/components/utils/table_items/ProductoTableItemMin.vue";

export default {
  components: {
    ProductoTableItemMin,
  },
  data() {
    return {
      radioGroup: 1,
      itemsPerPage: 10,
      page: 1,
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
