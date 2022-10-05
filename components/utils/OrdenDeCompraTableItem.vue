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
          ' tw-col-span-6 tw-flex lg:tw-col-span-4 tw-py-4 tw-space-x-6 '
        "
      >
        <IconoVer tipoDocumento="orden_de_compra" path="ordenes" :idDocumento="orden_de_compra.id" />
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
    props: ["orden_de_compra", "index"],
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
  