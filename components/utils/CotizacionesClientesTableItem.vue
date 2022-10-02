<template>
  <div class="tw-grid tw-grid-cols-12">
    <!-- CODIGO -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-2 tw-py-4 tw-px-4 '
      "
    >
      {{ cotizacion_cliente.id }}
    </div>
    <!-- CODIGO -->

    <!-- FECHA -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-6 tw-py-4 tw-px-4'
      "
    >
      {{ formatearFecha(cotizacion_cliente.fecha_emision) }}
      <!-- {{ formatearHora(solicitud_de_cotizacion.hora_emision)}} -->
    </div>
    <!-- FECHA -->

    <!-- ARCHIVOS -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 tw-flex lg:tw-col-span-4 tw-py-4 tw-space-x-6 '
      "
    >
      <IconoVer tipoDocumento="Cotización" path="/cotizaciones" />
      <PdfMaker
        tipoDocumento="Cotización"
        :idDocumento="cotizacion_cliente.id"
        item="cotizaciones_clientes"
      />
    </div>
    <!-- ARCHIVOS -->
  </div>
</template>

<script>
import moment from "moment";
import IconoVer from "@/components/iconos/IconoVer.vue";
import PdfMaker from "@/components/pdf_maker/PdfMaker.vue";

export default {
  components: { IconoVer, PdfMaker },
  props: ["cotizacion_cliente", "index"],
  methods: {
    formatearFecha(fecha) {
      return moment(fecha).format("LL");
    },
    // formatearHora(hora){
    //     return moment(hora).format("A")
    // }
  },
};
</script>

<style></style>
