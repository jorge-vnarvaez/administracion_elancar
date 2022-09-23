<template>
  <div class="tw-grid tw-grid-cols-12">
    <!-- CODIGO -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-2 tw-py-4 tw-px-4 '
      "
    >
      {{ solicitud_de_cotizacion.id }}
    </div>
    <!-- CODIGO -->

    <!-- FECHA -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-6 tw-py-4 tw-px-4'
      "
    >
      {{ formatearFecha(solicitud_de_cotizacion.fecha_emision) }}
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
      <IconoVer />
      <IconoDescarga />
    </div>
    <!-- ARCHIVOS -->
  </div>
</template>

<script>
import IconoDescarga from "@/components/iconos/IconoDescarga.vue";
import IconoVer from "@/components/iconos/IconoVer.vue";
import moment from "moment";
export default {
  components: { IconoDescarga, IconoVer },
  props: ["solicitud_de_cotizacion", "index"],
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
