<template>
  <div class="tw-grid tw-grid-cols-12">
    <!-- CODIGO -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-2 tw-py-4 tw-px-4 '
      "
    >
      {{ nota_de_pedido.id }}
    </div>
    <!-- CODIGO -->

    <!-- FECHA -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-6 tw-py-4 tw-px-4'
      "
    >
      {{ formatearFecha(nota_de_pedido.fecha_emision) }}
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
      <IconoVer tipoDocumento="Nota de pedido" path="/notas_pedido" />
      <PdfMaker tipoDocumento="Nota de pedido" item="notas_de_pedido" :idDocumento="nota_de_pedido.id" />
    </div>
    <!-- ARCHIVOS -->
  </div>
</template>

<script>
import moment from "moment";
import PdfMaker from "@/components/pdf_maker/PdfMaker.vue";
import IconoVer from "@/components/iconos/IconoVer.vue";

export default {
  components: { PdfMaker, IconoVer },
  props: ["nota_de_pedido", "index"],
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
