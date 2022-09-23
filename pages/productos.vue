tw-<template>
  <div class="tw-px-4 lg:tw-px-24 tw-py-10 tw-h-full" v-if="productos.length > 0">
    <div class="lg:tw-w-10/12">
      <div class="tw-flex tw-flex-col lg:tw-flex-row tw-justify-between">
        <span class="tw-font-bold tw-text-2xl lg:tw-text-4xl">Listado de productos</span>
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
          ></v-text-field>
        </div>
        <!--[BUSCADOR]-->
      </div>

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
          :producto="producto"
          :index="index"
          :key="producto.id"
        />
      </div>
      <!--[TABLE CONTENT]-->

      <!--[PAGINATION]-->
      <div class="tw-my-8">
        <v-pagination v-model="page" :length="productos.length / itemsPerPage"></v-pagination>
      </div>
      <!--[PAGINATION]-->
    </div>
  </div>
</template>

<script>
import Buscador from "../components/filtros/Buscador.vue";
import ProductoTableItem from "../components/utils/ProductoTableItem.vue";
export default {
  middleware: "auth",
  components: { Buscador, ProductoTableItem },
  data() {
    return {
      buscador: "",
      cantidad: 0,
      page: 1,
      itemsPerPage: 10,
    };
  },
  methods: {
    async filterProductos(queryBuscador) {
      const qs = require("qs");
      const query = qs.stringify({
        filter: {
          _or: [
            {
              nombre: {
                _contains: queryBuscador,
              },
            },
            {
              descripcion: {
                _contains: queryBuscador,
              },
            },
          ],
        },
        fields: ["*,marca.*"],
      });
      this.productos = await this.$axios
        .$get(
          `${this.$config.apiUrl}/items/productos${
            queryBuscador == "" ? "" : `?${query}`
          }`
        )
        .then((res) => res.data);
    },
  },
  watch: {
    buscador: function (val) {
      val = val != null ? val : "";
      this.filterProductos(val);
    },
  },
  async asyncData(context) {
    const qs = require("qs");
    const query = qs.stringify({
      fields: ["*,marca.*"],
    });
    const productos = await context.$axios
      .$get(`${context.$config.apiUrl}/items/productos?${query}`)
      .then((res) => res.data);
    return { productos };
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