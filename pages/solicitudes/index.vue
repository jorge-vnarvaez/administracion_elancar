<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-48">
    <div class="tw-flex tw-flex-col lg:tw-flex-row tw-justify-between">
      <!--LOGO, TITULO Y BUSCADOR -->
      <div class="tw-flex align-center tw-space-x-4">
        <!--LOGO-->
        <IconoElancar />
        <!--LOGO-->

        <!--TITULO-->
        <div class="tw-flex tw-flex-col">
          <span class="tw-text-4xl">Historial</span>
          <span class="tw-text-2xl tw-text-gray-800"
            >Solicitudes de cotización</span
          >
        </div>
        <!--TITULO-->
      </div>
      <!--LOGO, TITULO Y BUSCADOR -->

      <!--[BUSCADOR]-->
      <div>
        <v-text-field
          class="tw-w-[400px] tw-mt-4 lg:mt-0"
          v-model="buscador"
          placeholder="Buscar cotización por código"
          append-icon="mdi-magnify"
          solo
          flat
          clearable
        ></v-text-field>
      </div>
      <!--[BUSCADOR]-->
    </div>

    <div v-if="solicitud_cotizaciones.length > 0">
      <!-- DESKTOP VIEW -->
      <div v-if="$vuetify.breakpoint.mobile ? false : true">
        <!--TABLE HEADER-->
        <div class="tw-grid tw-grid-cols-12 tw-mt-16 tw-px-4 tw-py-2">
          <div class="tw-col-span-6 lg:tw-col-span-2">
            <span class="tw-font-bold">Código</span>
          </div>

          <div class="tw-col-span-6 lg:tw-col-span-4">
            <span class="tw-font-bold">Fecha</span>
          </div>

          <div class="tw-col-span-6 lg:tw-col-span-2">
            <span class="tw-font-bold">Hora</span>
          </div>

          <div class="tw-col-span-6 lg:tw-col-span-2">
            <span class="tw-font-bold">Convertida</span>
          </div>

          <div class="tw-col-span-6 lg:tw-col-span-2">
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
          <SolicitudDeCotizacionTableItem
            :solicitud_de_cotizacion="cotizacion"
            :index="index"
          />
        </div>
        <!--[TABLE CONTENT]-->

        <!--[PAGINATION]-->
        <div class="tw-my-8" v-if="solicitud_cotizaciones.length > 0">
          <v-pagination
            v-model="page"
            color="black"
            :length="Math.ceil(pages)"
          ></v-pagination>
        </div>
        <!--[PAGINATION]-->
      </div>
      <!-- DESKTOP VIEW -->

      <!-- MOBILE VIEW -->
      <div v-if="$vuetify.breakpoint.mobile ? true : false">
        <!--[TABLE CONTENT]-->
        <div
          v-for="(solicitud_cotizacion, index) in solicitud_cotizaciones.slice(
            itemsPerPage * page - itemsPerPage,
            itemsPerPage * page
          )"
          :key="solicitud_cotizacion.id"
        >
          <SolicitudDeCotizacionTableItem
            :solicitud_de_cotizacion="solicitud_cotizacion"
            :index="index"
          />
        </div>
        <!--[TABLE CONTENT]-->

        <!--[PAGINATION]-->
        <div class="tw-my-8" v-if="solicitud_cotizaciones.length > 0">
          <v-pagination
            v-model="page"
            color="black"
            :length="Math.round(pages)"
          ></v-pagination>
        </div>
        <!--[PAGINATION]-->
      </div>
    </div>
    <div v-else class="tw-py-12 tw-text-2xl tw-font-bold">
      <EmptyTable />
    </div>
  </div>
</template>

<script>
import qs from "qs";
import IconoElancar from "@/components/iconos/IconoElancar.vue";
import CardNewSolicitud from "@/components/reusable/CardNewSolicitud.vue";
import SolicitudDeCotizacionTableItem from "@/components/utils/table_items/SolicitudCotizacionTableItem.vue";
import EmptyTable from "@/components/utils/EmptyTable.vue";

export default {
  middleware: ["auth"],
  components: {
    IconoElancar,
    CardNewSolicitud,
    SolicitudDeCotizacionTableItem,
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
    async filterCotizaciones(queryBuscador) {
      const query = qs.stringify({
        filter: {
          id: {
            _eq: queryBuscador,
          },
        },
        sort: ["-fecha_emision", "-hora_emision"],
        fields: ["*.*.*"],
      });

      const query_defecto = qs.stringify({
        sort: ["-fecha_emision", "-hora_emision"],
        fields: ["*.*.*"],
      });

      this.solicitud_cotizaciones = await this.$axios
        .$get(
          `${this.$config.apiUrl}/items/cotizaciones_proveedor${
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
      sort: ["-fecha_emision", "-hora_emision"],
      fields: ["*.*.*"],
    });

    const solicitud_cotizaciones = await context.$axios
      .$get(`${context.$config.apiUrl}/items/cotizaciones_proveedor?${query}`)
      .then((res) => res.data);
    return { solicitud_cotizaciones };
  },
  computed: {
    pages() {
      return this.solicitud_cotizaciones.length / this.itemsPerPage;
    },
  },
};
</script>

<style></style>
