<template>
  <div class="tw-p-24 tw-px-48 tw-h-full">
    <div>
      <div class="tw-flex tw-flex-col lg:tw-flex-row tw-justify-between">
        <span class="tw-font-bold tw-text-2xl lg:tw-text-4xl"
          >Listado de productos</span
        >

        {{ buscador }}
        <!--[BUSCADOR]-->
        <div>
          <v-text-field
            class="tw-w-[440px]"
            v-model="buscador"
            placeholder="Buscar producto por nombre, código o descripción"
            append-icon="mdi-magnify"
            solo
            flat
            clearable
            @click:clear="buscador = []"
          ></v-text-field>
        </div>
        <!--[BUSCADOR]-->
      </div>

      <div v-if="!loading_productos">
        <!-- FILTRO PRODUCTOS -->
        <FiltroProductos />
        <!-- FILTRO PRODUCTOS -->
        <div v-if="productos.length > 0">
          <!--[TABLE HEADERS]-->
          <div class="tw-grid tw-grid-cols-12 tw-mb-4 tw-px-4">
            <div class="tw-col-span-6 lg:tw-col-span-5">
              <span class="tw-font-bold">Nombre</span>
            </div>

            <div class="tw-col-span-6 lg:tw-col-span-2">
              <span class="tw-font-bold">Precio neto</span>
            </div>

            <div class="tw-col-span-6 lg:tw-col-span-1">
              <span class="tw-font-bold">Stock</span>
            </div>

            <div class="tw-col-span-2">
              <span class="tw-font-bold">Cantidad</span>
            </div>

            <div class="tw-col-span-2"></div>
          </div>
          <!--[TABLE HEADERS]-->

          <!--[TABLE CONTENT]-->
          <div
            v-for="(producto, index) in productos.slice(
              itemsPerPage * page - itemsPerPage,
              itemsPerPage * page
            )"
            :key="producto.id"
          >
            <producto-table-item
              class="tw-flex align-center"
              :producto="producto"
              :index="index"
              :key="producto.id"
            />
          </div>
          <!--[TABLE CONTENT]-->

          <!--[PAGINATION]-->
          <div class="tw-my-8">
            <v-pagination
              v-model="page"
              color="black"
              :length="Math.ceil(productos.length / itemsPerPage)"
            ></v-pagination>
          </div>
          <!--[PAGINATION]-->
        </div>
      </div>

      <div v-if="loading_productos">
        <ProductosListSkeleton />
      </div>

      <!-- NO HAY PRODUCTOS -->
      <div
        v-if="productos.length == 0 && !loading_productos"
        class="tw-py-12 tw-text-2xl tw-font-bold"
      >
        <EmptyTable />
      </div>
      <!-- NO HAY PRODUCTOS -->
    </div>
  </div>
</template>

<script>
import Buscador from "@/components/filtros/Buscador.vue";
import FiltroProductos from "@/components/utils/FiltroProductos.vue";
import ProductoTableItem from "@/components/utils/table_items/ProductoTableItem.vue";
import ProductosListSkeleton from "@/components/utils/ProductosListSkeleton.vue";
import EmptyTable from "@/components/utils/EmptyTable.vue";

export default {
  middleware: "auth",
  components: {
    Buscador,
    FiltroProductos,
    ProductoTableItem,
    ProductosListSkeleton,
    EmptyTable,
  },
  data() {
    return {
      buscador: null,
      cantidad: 0,
      page: 1,
      itemsPerPage: 6,
    };
  },
  async mounted() {
    await this.$store.dispatch("productos/loadProductos");
  },
  methods: {
    filterProductos(queryBuscador) {
      this.$store.dispatch("productos/applyFilters", queryBuscador);
    },
  },
  watch: {
    buscador: function (val) {
      let query =
        val != ""
          ? [
              {
                title: "Buscador",
                parent: "query_buscador",
                query: val,
              },
            ]
          : [];

      this.$cookies.set("query_buscador", query);

      if(query.length > 0) {
        this.filterProductos(query);
      } else {
        this.$store.dispatch('productos/loadProductos');
      }
     

    },
  },
  computed: {
    productos() {
      return this.$store.getters["productos/getFilteredProductos"];
    },
    loading_productos() {
      return this.$store.getters["productos/getLoadingProductos"];
    },
  },
};
</script>

<style scoped>
.behind {
  position: relative;
  top: 120px;
  z-index: -1;
}
</style>
