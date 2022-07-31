<template>
  <div class="py-12 flex justify-center">
    <div class="w-8/12">
      <span class="font-bold text-4xl">Listado de productos</span>
      <!--[BUSCADOR]-->
      <div>
        <v-text-field
          class="w-[440px] mt-6"
          v-model="buscador"
          placeholder="Buscar producto por nombre, código o descripción"
          append-icon="mdi-magnify"
          solo
          flat
          outlined
          clearable
        ></v-text-field>
      </div>
      <!--[BUSCADOR]-->

      <!--[TABLE HEADERS]-->
      <div class="grid grid-cols-12 mb-4 px-4">
        <div class="col-span-3">
          <span class="font-bold">Nombre</span>
        </div>

        <div class="col-span-2">
          <span class="font-bold">Precio neto</span>
        </div>

        <div class="col-span-2">
          <span class="font-bold">Cantidad</span>
        </div>

        <div class="col-span-3"></div>
      </div>
      <!--[TABLE HEADERS]-->

      <!--[TABLE CONTENT]-->
      <div v-for="(producto, index) in productos" :key="producto.id">
        <producto-table-item
          :producto="producto"
          :index="index"
          :key="producto.id"
        />
      </div>
      <!--[TABLE CONTENT]-->
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
            queryBuscador == '' ? "" : `?${query}`
          }`
        )
        .then((res) => res.data);
    },
  },
  watch: {
    buscador: function (val) {
      val = val != null ? val : '';
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
