<template>
  <div class="tw-p-24 tw-px-64">
    <div class="tw-flex tw-justify-between">
      <!--LOGO, TITULO Y BUSCADOR -->
      <div class="tw-flex align-center tw-space-x-4">
        <!--LOGO-->
        <div class="tw-w-[74px] tw-h-[100px]">
          <v-img
            src="/logo_elancar.png"
            width="74"
            height="100"
            contain
          ></v-img>
        </div>
        <!--LOGO-->

        <!--TITULO-->
        <div class="tw-flex tw-flex-col">
          <span class="tw-text-4xl">Historial</span>
          <span class="tw-text-2xl tw-text-gray-800"
            >Notas de pedido</span
          >
        </div>
        <!--TITULO-->
      </div>
      <!--LOGO, TITULO Y BUSCADOR -->

      <!--[BUSCADOR]-->
      <div>
        <v-text-field
          class="tw-w-[700px] mt-6"
          v-model="buscador"
          placeholder="Buscar cotizacion por código"
          append-icon="mdi-magnify"
          solo
          flat
          outlined
          clearable
        ></v-text-field>
      </div>
      <!--[BUSCADOR]-->
    </div>
    <div v-if="nota_de_pedido.length > 0">
      <!--TABLE HEADER-->

      <div class="tw-grid tw-grid-cols-12 tw-mt-16 tw-px-4 tw-py-2">
        <div class="tw-col-span-6 lg:tw-col-span-2">
          <span class="tw-font-bold">Codigo</span>
        </div>

        <div class="tw-col-span-6 lg:tw-col-span-6">
          <span class="tw-font-bold">Fecha</span>
        </div>

        <div class="tw-col-span-6 lg:tw-col-span-4">
          <span class="tw-font-bold">Ver o Descargar</span>
        </div>
      </div>
      <!--TABLE HEADER-->

      <!--[TABLE CONTENT]-->

      <div
        v-for="(nota_pedido, index) in nota_de_pedido.slice(
          itemsPerPage * page - itemsPerPage,
          itemsPerPage * page
        )"
        :key="nota_de_pedido.id"
      >
        <NotaDePedidoTableItem
          :nota_de_pedido="nota_pedido"
          :index="index"
        />
      </div>

      <!--[TABLE CONTENT]-->

      <!--[PAGINATION]-->
      <div class="tw-my-8">
        <v-pagination
          v-model="page"
          :length="nota_de_pedido.length / itemsPerPage"
        ></v-pagination>
      </div>
      <!--[PAGINATION]-->
    </div>
    <div v-else class="tw-py-12 tw-text-2xl tw-font-bold">
      No hay resultados
    </div>
  </div>
</template>

<script>
import CardNewSolicitud from "@/components/reusable/CardNewSolicitud.vue";
import NotaDePedidoTableItem from "@/components/utils/NotaDePedidoTableItem.vue";

export default {
  components: {
    CardNewSolicitud,
    NotaDePedidoTableItem,
  },
  data() {
    return {
      buscador: "",
      page: 1,
      itemsPerPage: 7,
    };
  },
  methods: {
    async filterNotasPedidos(queryBuscador) {
      const qs = require("qs");
      const query = qs.stringify({
        filter: {
          id: {
            _eq: queryBuscador,
          },
        },
      });
      this.nota_de_pedido = await this.$axios
        .$get(
          `${this.$config.apiUrl}/items/notas_de_pedido${
            queryBuscador == "" ? "" : `?${query}`
          }`
        )
        .then((res) => res.data);
    },
  },
  watch: {
    buscador: function (val) {
      val = val != null ? val : "";
      this.filterNotasPedidos(val);
    },
  },
  async asyncData(context) {
    const nota_de_pedido = await context.$axios
      .$get(`${context.$config.apiUrl}/items/notas_de_pedido`)
      .then((res) => res.data);
    return { nota_de_pedido };
  },
};
</script>

<style></style>
