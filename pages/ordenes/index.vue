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
          <span class="tw-text-4xl tw-text-left">Historial</span>
          <span class="tw-text-2xl tw-text-gray-800">Ordenes de compra</span>
        </div>
        <!--TITULO-->
      </div>
      <!--LOGO, TITULO Y BUSCADOR -->

      <!--[BUSCADOR]-->
      <div>
        <v-text-field
          class="tw-w-[700px] mt-6"
          v-model="buscador"
          placeholder="Buscar orden de compra por código"
          append-icon="mdi-magnify"
          solo
          flat
          outlined
          clearable
        ></v-text-field>
      </div>
      <!--[BUSCADOR]-->
    </div>
    <div v-if="ordenes_de_compra.length > 0">
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
        v-for="(OrdenDeCompra, index) in ordenes_de_compra.slice(
          itemsPerPage * page - itemsPerPage,
          itemsPerPage * page
        )"
        :key="OrdenDeCompra.id"
      >
        <OrdenDeCompraTableItem
          :orden_de_compra="OrdenDeCompra"
          :index="index"
        />
      </div>

      <!--[TABLE CONTENT]-->

      <!--[PAGINATION]-->
      <div class="tw-my-8">
        <v-pagination
          v-model="page"
          :length="Math.round(ordenes_de_compra.length / itemsPerPage)"
        ></v-pagination>
      </div>
      <!--[PAGINATION]-->
    </div>
    <div v-else class="tw-py-12 tw-text-2xl tw-font-bold">
      <EmptyTable />
    </div>
  </div>
</template>

<script>

import qs from "qs";
import CardNewSolicitud from "@/components/reusable/CardNewSolicitud.vue";
import OrdenDeCompraTableItem from "@/components/utils/OrdenDeCompraTableItem.vue";
import EmptyTable from "@/components/utils/EmptyTable.vue";

export default {
  components: {
    CardNewSolicitud,
    OrdenDeCompraTableItem,
    EmptyTable,
  },
  data() {
    return {
      buscador: "",
      page: 1,
      itemsPerPage: 7,
    };
  },
  methods: {
    async filterOrdenDeCompraes(queryBuscador) {
      const query = qs.stringify({
        filter: {
          id: {
            _eq: queryBuscador,
          },
        },
      });
      this.ordenes_de_compra = await this.$axios
        .$get(
          `${this.$config.apiUrl}/items/ordenes_de_compra${
            queryBuscador == "" ? "" : `?${query}`
          }`
        )
        .then((res) => res.data);
    },
  },
  watch: {
    buscador: function (val) {
      val = val != null ? val : "";
      this.filterOrdenDeCompraes(val);
    },
  },
  async asyncData(context) {
    const query = qs.stringify({
      sort: "fecha_emision"
    });

    const ordenes_de_compra = await context.$axios
      .$get(`${context.$config.apiUrl}/items/ordenes_de_compra?${query}`)
      .then((res) => res.data);
    return { ordenes_de_compra };
  },
};
</script>

<style></style>
