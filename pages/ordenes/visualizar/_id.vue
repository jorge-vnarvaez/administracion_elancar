<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-64">
    <div class="tw-flex tw-flex-col tw-bg-white tw-p-8 tw-h-full">
      <!-- MEMBRETE -->
      <MembreteSuperiorPdf
        tipoDocumento="Orden de compra"
        :fecha_emision="orden_de_compra.fecha_emision"
        :infoDocumento="orden_de_compra"
      />
      <!-- MEMBRETE -->

      <!--V-DIVIDER-->
      <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
      <!--V-DIVIDER-->

      <div class="lg:tw-grid lg:tw-grid-cols-12">
        <!-- DATOS CLIENTE -->
        <DatosProveedor
          :proveedor="orden_de_compra.proveedor"
          :metodo_de_pago="orden_de_compra.forma_de_pago"
          class="tw-col-span-12"
        />
        <!-- DATOS CLIENTE -->

        <!-- DATOS ENVIO :datos_envio="orden_de_compra.datos_envio"-->
        <!-- <DatosEnvio :datos_envio="orden_de_compra.cliente" class="tw-col-span-7" /> -->
        <!-- DATOS ENVIO -->

        <!-- TABLA PRODUCTOS -->
        <TablaProductos
          :labels="labels"
          :productos="detalleDocumento"
          class="tw-col-span-12"
          orden_de_compra
          con_detalle
          visualizando
        />
        <!-- TABLA PRODUCTOS -->
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import DatosProveedor from "@/components/reusable/visualizacion_documentos/DatosProveedor.vue";
import MembreteSuperiorPdf from "@/components/reusable/visualizacion_documentos/MembreteSuperiorPdf.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/TablaProductos.vue";

export default {
  components: {
    DatosProveedor,
    MembreteSuperiorPdf,
    TablaProductos,
  },
  data() {
    return {
      infoDocumento: {},
      detalleDocumento: [],
      labels: ["Productos", "Cant",  "Precio / Uni", "Total"],
    };
  },
  mounted() {
    this.getDetalle();
  },
  async asyncData(context) {
    const query = qs.stringify({
      fields: [
        "id",
        "fecha_emision",
        "forma_de_pago",
        "proveedor.*.*",
        "detalle.*.*",
        "empresa.*.*",
      ],
    });
    const id = context.params.id;
    const { data } = await context.$axios
      .get(`${context.$config.apiUrl}/items/ordenes_de_compra/${id}?${query}`)
      .then((res) => res.data);
    return {
      orden_de_compra: data,
    };
  },
  methods: {
    getDetalle() {
      this.detalleDocumento = this.orden_de_compra.detalle.map((item) => {
        return {
          ...item,
          cantidad: item.cantidad,
        };
      });
    },
  },
};
</script>

<style></style>
