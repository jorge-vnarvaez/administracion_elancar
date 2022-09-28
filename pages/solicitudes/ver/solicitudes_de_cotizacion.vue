<template>
  <div class="tw-p-24 tw-px-64" v-if="solicitud_cotizaciones != null">
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
            >Solicitudes de cotización</span
          >
        </div>
        <!--TITULO-->
      </div>
      <!--LOGO, TITULO Y BUSCADOR -->

      <!--[BUSCADOR]-->
      <div>
        <v-text-field
          class="tw-w-[500px] mt-6"
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
    <div v-if="solicitud_cotizaciones != null">
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
          :length="Math.round(pages)"
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
import qs from "qs";
import CardNewSolicitud from "@/components/reusable/CardNewSolicitud.vue";
import SolicitudDeCotizacionTableItem from "@/components/utils/SolicitudCotizacionTableItem.vue";

export default {
  components: {
    CardNewSolicitud,
    SolicitudDeCotizacionTableItem,
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
        fields: ["*.*"],
      });

      this.solicitud_cotizaciones = await this.$axios
        .$get(
          `${this.$config.apiUrl}/items/solicitudes_de_cotizacion${
            queryBuscador == "" ? "" : `?${query}`
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
    const solicitud_cotizaciones = await context.$axios
      .$get(`${context.$config.apiUrl}/items/cotizaciones_proveedor`)
      .then((res) => res.data);
    return { solicitud_cotizaciones };
  },
  computed: {
    pages() {
      return this.solicitud_cotizaciones.length / this.itemsPerPage;
    }
  }
};
</script>

<style></style>
