<template>
  <div class="tw-p-24 tw-px-64 tw-h-full">
    <div class="tw-flex tw-flex-col tw-bg-white tw-p-8 tw-h-full">
      <!-- MEMBRETE -->
      <MembreteSuperiorPdf
        tipoDocumento="Solicitud de cotización"
        :fecha_emision="cotizacion_proveedor.fecha_emision"
        :infoDocumento="cotizacion_proveedor"
      />
      <!-- MEMBRETE -->

      <!--V-DIVIDER-->
      <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
      <!--V-DIVIDER-->

      <div class="tw-grid tw-grid-cols-12">
        <!-- DATOS PROVEEDOR -->
        <DatosProveedor :proveedor="cotizacion_proveedor.proveedor" :receptor="cotizacion_proveedor.receptor" class="tw-col-span-12" />
          <!-- DATOS PROVEEDOR -->

        <!-- TABLA PRODUCTOS -->
        <TablaProductos
          :labels="labels"
          :productos="detalleDocumento"
          cotizacion_proveedor
          class="tw-col-span-12"
          visualizando
          con_detalle
        />
        <!-- TABLA PRODUCTOS -->
      </div>
    </div>
  </div>
</template>

<script>

import qs from "qs";
import MembreteSuperiorPdf from "@/components/reusable/visualizacion_documentos/MembreteSuperiorPdf.vue";
import DatosProveedor from "@/components/reusable/visualizacion_documentos/DatosProveedor.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/TablaProductos.vue";

export default {
  components: {
    MembreteSuperiorPdf,
    DatosProveedor,
    TablaProductos,
  },
  data() {
    return {
      infoDocumento: {},
      detalleDocumento: [],
      labels: ["Productos", "Cantidad", "Precio por unidad", "Total"],
    };
  },
  mounted() {
    this.getDetalle();
  },
  async asyncData(context) {
    const query = qs.stringify({
      fields: ["id", "fecha_emision", "detalle.*.*", "proveedor.*.*", "receptor.*", "empresa.*.*"],
    });
    const id = context.params.id;
    const { data } = await context.$axios
      .get(`${context.$config.apiUrl}/items/cotizaciones_proveedor/${id}?${query}`)
      .then((res) => res.data);

    return {
      cotizacion_proveedor: data,
    };
  },
  methods: {
    getDetalle() {
        this.detalleDocumento = this.cotizacion_proveedor.detalle.map((item) => {
          return {
            ...item,
            cantidad: item.cantidad,
          };
        });
      }
  },
};
</script>

<style></style>
