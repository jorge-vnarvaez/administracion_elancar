<template>
  <div class="tw-grid tw-grid-cols-12">
    <!-- CODIGO -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-2 tw-py-4 tw-px-4 '
      "
    >
      {{ orden_de_compra.id }}
    </div>
    <!-- CODIGO -->

    <!-- FECHA -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-6 tw-py-4 tw-px-4'
      "
    >
      {{ formatearFecha(orden_de_compra.fecha_emision) }}
      <!-- {{ formatearHora(orden_de_compra.hora_emision)}} -->
    </div>
    <!-- FECHA -->

    <!-- ARCHIVOS -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 tw-flex lg:tw-col-span-4 tw-py-4 tw-space-x-2'
      "
    >
      <IconoVer
        tipoDocumento="orden_de_compra"
        path="ordenes"
        :idDocumento="orden_de_compra.id"
      />
      <PdfMaker
        tipoDocumento="Orden de compra"
        item="ordenes_de_compra"
        :idDocumento="orden_de_compra.id"
        :labels="labels"
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
  components: { PdfMaker, IconoVer },
  props: ["orden_de_compra", "index"],
  data() {
    return {
      labels: ["Productos", "Cantidad", "Precio unitario", "Precio total"],
    };
  },
  methods: {
    formatearFecha(fecha) {
      return moment(fecha).format("LL");
    },
  },
};
</script>

<style></style>
