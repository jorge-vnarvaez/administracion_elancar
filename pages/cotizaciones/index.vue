<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-48">
    <div class="tw-flex tw-justify-between">
      <!--LOGO, TITULO Y BUSCADOR -->
      <div class="tw-flex align-center tw-space-x-4">
        <!--LOGO-->
        <IconoElancar />
        <!--LOGO-->

        <!--TITULO-->
        <div class="tw-flex tw-flex-col">
          <span class="tw-text-4xl">Historial</span>
          <span class="tw-text-2xl tw-text-gray-800">Cotizaciónes</span>
        </div>
        <!--TITULO-->
      </div>
      <!--LOGO, TITULO Y BUSCADOR -->

      <!--[BUSCADOR]-->
      <div>
        <v-text-field
          class="tw-w-[500px]"
          v-model="buscador"
          placeholder="Buscar cotizacion por código"
          append-icon="mdi-magnify"
          solo
          flat
          clearable
        ></v-text-field>
      </div>
      <!--[BUSCADOR]-->
    </div>
    <div v-if="solicitud_cotizaciones.length > 0">
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
        v-for="(cotizacion, index) in solicitud_cotizaciones.slice(
          itemsPerPage * page - itemsPerPage,
          itemsPerPage * page
        )"
        :key="cotizacion.id"
      >
        <CotizacionesClienteTableItem
          :cotizacion_cliente="cotizacion"
          :index="index"
        />
      </div>

      <!--[TABLE CONTENT]-->

      <!--[PAGINATION]-->
      <div class="tw-my-8">
        <v-pagination
          color="black"
          v-model="page"
          :length="Math.ceil(solicitud_cotizaciones.length / itemsPerPage)"
        ></v-pagination>
      </div>
      <!--[PAGINATION]-->
    </div>

    <!-- NO RESULTADOS -->
    <div v-else class="tw-py-12 tw-text-2xl tw-font-bold">
      <EmptyTable />
    </div>
    <!-- NO RESULTADOS -->
  </div>
</template>

<script>
import qs from "qs";
import IconoElancar from "@/components/reusable/IconoElancar.vue";
import CardNewSolicitud from "@/components/reusable/CardNewSolicitud.vue";
import CotizacionesClienteTableItem from "@/components/utils/table_items/CotizacionesClientesTableItem.vue";
import EmptyTable from "@/components/utils/EmptyTable.vue";

export default {
  components: {
    IconoElancar,
    CardNewSolicitud,
    CotizacionesClienteTableItem,
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
    async filterCotizaciones(queryBuscador) {
      const query = qs.stringify({
        filter: {
          id: {
            _eq: queryBuscador,
          },
        },
        sort: ["fecha_emision", "hora_emision"],
      });

      const query_defecto = qs.stringify({
        sort: ["fecha_emision", "hora_emision"],
      });

      this.solicitud_cotizaciones = await this.$axios
        .$get(
          `${this.$config.apiUrl}/items/cotizaciones_clientes${
            queryBuscador == "" ? `?${query_defecto}` : `?${query}`
          }`
        )
        .then((res) => res.data);
    },
  },
  watch: {
    buscador: function (val) {
      val = val != null ? val : "";
      this.filterCotizaciones(val);
    },
  },
  async asyncData(context) {
    const query = qs.stringify({
      fields: [
        "id",
        "fecha_emision",
        "hora_emision",
        "detalle.*",
        "cliente.*.*",
        "empresa..*.*",
      ],
      sort: ["fecha_emision", "hora_emision"],
    });

    const solicitud_cotizaciones = await context.$axios
      .$get(`${context.$config.apiUrl}/items/cotizaciones_clientes?${query}`)
      .then((res) => res.data);
    return { solicitud_cotizaciones };
  },
};
</script>

<style></style>
