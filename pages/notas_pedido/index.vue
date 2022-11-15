<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-48">
    <div class="tw-flex tw-flex-col lg:tw-flex-row tw-justify-between">
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
          <span class="tw-text-2xl tw-text-gray-800">Notas de pedido</span>
        </div>
        <!--TITULO-->
      </div>
      <!--LOGO, TITULO Y BUSCADOR -->

      <!--[BUSCADOR]-->
      <div>
        <v-text-field
          class="tw-w-[500px] tw-mt-4 lg:mt-0"
          v-model="buscador"
          placeholder="Buscar nota de pedido por código"
          append-icon="mdi-magnify"
          solo
          flat
          clearable
        ></v-text-field>
      </div>
      <!--[BUSCADOR]-->
    </div>

    <div v-if="notas_de_pedido.length > 0">
      <!-- DESKTOP VIEW -->
      <div v-if="$vuetify.breakpoint.mobile ? false : true">
        <!--TABLE HEADER-->
        <div class="tw-grid tw-grid-cols-12 tw-mt-16 tw-px-4 tw-py-2">
          <div class="tw-col-span-6 lg:tw-col-span-2">
            <span class="tw-font-bold">Codigo</span>
          </div>

          <div class="tw-col-span-6 lg:tw-col-span-4">
            <span class="tw-font-bold">Fecha</span>
          </div>

          <div class="tw-col-span-6 lg:tw-col-span-2">
            <span class="tw-font-bold">Hora</span>
          </div>

          <div class="tw-col-span-6 lg:tw-col-span-4">
            <span class="tw-font-bold">Ver o Descargar</span>
          </div>
        </div>
        <!--TABLE HEADER-->

        <!--[TABLE CONTENT]-->
        <div
          v-for="(nota_pedido, index) in notas_de_pedido.slice(
            itemsPerPage * page - itemsPerPage,
            itemsPerPage * page
          )"
          :key="nota_pedido.id"
        >
          <NotaDePedidoTableItem :nota_de_pedido="nota_pedido" :index="index" />
        </div>
        <!--[TABLE CONTENT]-->

        <!--[PAGINATION]-->
        <div class="tw-my-8">
          <v-pagination
            v-model="page"
            color="black"
            :length="Math.ceil(notas_de_pedido.length / itemsPerPage)"
          ></v-pagination>
        </div>
        <!--[PAGINATION]-->
      </div>
      <!-- DESKTOP VIEW -->

      <!-- MOBILE VIEW -->
      <div v-if="$vuetify.breakpoint.mobile ? true : false">
        <!--[TABLE CONTENT]-->
        <div
          v-for="(nota_pedido, index) in notas_de_pedido.slice(
            itemsPerPage * page - itemsPerPage,
            itemsPerPage * page
          )"
          :key="nota_pedido.id"
        >
          <NotaDePedidoTableItem :nota_de_pedido="nota_pedido" :index="index" />
        </div>
        <!--[TABLE CONTENT]-->
        
        <!--[PAGINATION]-->
        <div class="tw-my-8">
          <v-pagination
            v-model="page"
            color="black"
            :length="Math.ceil(notas_de_pedido.length / itemsPerPage)"
          ></v-pagination>
        </div>
        <!--[PAGINATION]-->
      </div>
      <!-- MOBILE VIEW -->
    </div>

    <div v-else class="tw-py-12 tw-text-2xl tw-font-bold">
      <EmptyTable />
    </div>
  </div>
</template>

<script>
import qs from "qs";
import CardNewSolicitud from "@/components/reusable/CardNewSolicitud.vue";
import NotaDePedidoTableItem from "@/components/utils/table_items/NotaDePedidoTableItem.vue";
import EmptyTable from "@/components/utils/EmptyTable.vue";

export default {
  middleware: ["auth"],
  components: {
    CardNewSolicitud,
    NotaDePedidoTableItem,
    EmptyTable,
  },
  data() {
    return {
      buscador: "",
      page: 1,
      itemsPerPage: 6,
    };
  },
  methods: {
    async filterNotasPedidos(queryBuscador) {
      const query = qs.stringify({
        filter: {
          id: {
            _eq: queryBuscador,
          },
        },
        sort: "fecha_emision",
      });

      const query_defecto = qs.stringify({
        sort: "fecha_emision",
      });

      this.notas_de_pedido = await this.$axios
        .$get(
          `${this.$config.apiUrl}/items/notas_de_pedido${
            queryBuscador == "" ? `?${query_defecto}` : `?${query}`
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
    const query = qs.stringify({
      fields: [
        "id",
        "fecha_emision",
        "hora_emision",
        "cliente.*",
        "detalle.*",
        "empresa.*.*",
      ],
      sort: "fecha_emision",
    });

    const notas_de_pedido = await context.$axios
      .$get(`${context.$config.apiUrl}/items/notas_de_pedido?${query}`)
      .then((res) => res.data);
    return { notas_de_pedido };
  },
};
</script>

<style></style>
