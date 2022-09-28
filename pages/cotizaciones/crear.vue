<template>
  <div class="tw-p-24 tw-px-64">
    <div class="tw-flex tw-flex-col">
      <!-- MEMBRETE -->
      <MembreteSuperiorPdf
        tipoDocumento="Cotización"
        :fecha_emision="fecha_actual"
      />
      <!-- MEMBRETE -->

      <!--V-DIVIDER-->
      <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
      <!--V-DIVIDER-->

      <div class="tw-grid tw-grid-cols-12">
        <!-- DATOS CLIENTE -->
        <DatosCliente :cliente="info_despacho.datos_cliente" class="tw-col-span-5" />
        <!-- DATOS CLIENTE -->

        <!-- DATOS ENVIO -->
        <DatosEnvio :datos_envio="info_despacho.datos_envio" class="tw-col-span-7" />
        <!-- DATOS ENVIO -->
      </div>


      <!-- TABLA PRODUCTOS -->

      <!-- TABLA PRODUCTOS -->
    </div>
  </div>
</template>
<script>
import moment from "moment";
import MembreteSuperiorPdf from "@/components/reusable/visualizacion_documentos/MembreteSuperiorPdf.vue";
import DatosCliente from "@/components/reusable/visualizacion_documentos/DatosCliente.vue";
import DatosEnvio from "@/components/reusable/visualizacion_documentos/DatosEnvio.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/ProductosTable.vue";

export default {
  components: {
    MembreteSuperiorPdf,
    DatosCliente,
    DatosEnvio,
  },
  data() {
    return {
      labels: [
        {
          titulo: "Productos",
          col_span: "tw-col-span-3"
        },
        {
          titulo: "Cantidad",
          col_span: "tw-col-span-2"
        }
      ]
    }
  },
  computed: {
    carro_de_compra() {
      return this.$store.getters["carro_compras/getCarroCompras"];
    },
    info_despacho() {
      return this.$store.getters["info_despacho/getInfoDespacho"];
    },
    fecha_actual() {
      return moment();
    },
  },
};
</script>
