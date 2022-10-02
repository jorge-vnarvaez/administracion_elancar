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
        <IconoVer tipoDocumento="Cotización" path="/cotizaciones" :idDocumento="cotizacion_cliente.id"  />
        <IconoDescarga />
      </div>
      <!-- ARCHIVOS -->
    </div>
  </template>
  
  <script>
  import moment from "moment";
  import IconoDescarga from "@/components/iconos/IconoDescarga.vue";
  import IconoVer from "@/components/iconos/IconoVer.vue";
  
  export default {
    components: { IconoDescarga, IconoVer },
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
  