<template>
  <div>
    <!-- DESKTOP VIEW -->
    <v-row :class="[index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100', 'tw-py-4 tw-px-4']">
      <!-- CODIGO -->
      <v-col cols="12" lg="1">
        <span v-if="$vuetify.breakpoint.mobile" class="tw-font-bold">Código</span>
        {{ cotizacion_cliente.id }}
      </v-col>
      <!-- CODIGO -->

      <!-- FECHA -->
      <v-col cols="6" lg="4">
        <span v-if="$vuetify.breakpoint.mobile" class="tw-font-bold">Fecha</span>
        {{ formatearFecha(cotizacion_cliente.fecha_emision) }}
      </v-col>
      <!-- FECHA -->

      <!-- HORA -->
      <v-col cols="6" lg="2">
        <span v-if="$vuetify.breakpoint.mobile" class="tw-font-bold">Hora</span>
        {{ cotizacion_cliente.hora_emision }}
      </v-col>
      <!-- HORA -->

      <!-- CONVERTIDA -->
      <v-col cols="6" lg="2">
        <span v-if="$vuetify.breakpoint.mobile" class="tw-font-bold">Convertida</span>
        <v-icon v-if="cotizacion_cliente.convertida" color="green darken-1">mdi-check-bold</v-icon>
        <v-icon v-if="!cotizacion_cliente.convertida" color="red darken-1">mdi-close-thick</v-icon>
      </v-col>
      <!-- CONVERTIDA -->

      <!-- ARCHIVOS -->
      <v-col cols="6" lg="3" class="tw-flex tw-space-x-4">
        <IconoVer
          tipoDocumento="Cotizacion"
          path="/cotizaciones"
          :idDocumento="cotizacion_cliente.id"
        />
        <PdfMaker
          v-if="!$vuetify.breakpoint.mobile"
          tipoDocumento="Cotizacion"
          :idDocumento="cotizacion_cliente.id"
          item="cotizaciones_clientes"
          :labels="labels"
        />
      </v-col>
      <!-- ARCHIVOS -->
    </v-row>
    <!--DESKTOP VIEW -->
  </div>
</template>

<script>
import moment from "moment";
import IconoVer from "@/components/iconos/IconoVer.vue";
import PdfMaker from "@/components/pdf_maker/PdfMaker.vue";

export default {
  components: { IconoVer, PdfMaker },
  props: ["cotizacion_cliente", "index"],
  data() {
    return {
      labels: ["Productos", "Cant", "Precio/Uni", "Total"],
    };
  },
  methods: {
    formatearFecha(fecha) {
      return moment(fecha).format("LL");
    },
    formatearHora(hora) {
      return moment(hora).format("HH:mm:ss");
    },
  },
};
</script>

<style></style>
