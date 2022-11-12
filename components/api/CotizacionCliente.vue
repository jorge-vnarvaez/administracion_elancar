<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-48">
    <div class="tw-flex tw-flex-col tw-bg-white tw-p-8">
      <!-- MEMBRETE -->
      <MembreteSuperiorPdf
        tipoDocumento="Cotización"
        :fecha_emision="cotizacion_cliente.fecha_emision"
        :infoDocumento="cotizacion_cliente"
      />
      <!-- MEMBRETE -->

      <!--V-DIVIDER-->
      <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
      <!--V-DIVIDER-->

      <div class="tw-grid tw-grid-cols-12">
        <!-- DATOS CLIENTE -->
        <DatosCliente
          :cliente="cotizacion_cliente.cliente"
          class="tw-col-span-5"
        />
        <!-- DATOS CLIENTE -->

        <!-- DATOS ENVIO :datos_envio="cotizacion_cliente.datos_envio"-->
        <DatosEnvio
          :cliente="cotizacion_cliente.cliente"
          class="tw-col-span-7"
        />

        <!-- {{ cotizacion_cliente.cliente.direcciones[0].calle }} -->
        <!-- DATOS ENVIO -->

        <!-- TABLA PRODUCTOS -->
        <TablaProductos
          :labels="labels"
          :productos="detalleDocumento"
          cotizacion_cliente
          class="tw-col-span-12"
          con_detalle
        />
        <!-- TABLA PRODUCTOS -->
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import IconoEmitir from "@/components/iconos/blancos/IconoEmitir";
import MembreteSuperiorPdf from "@/components/reusable/visualizacion_documentos/MembreteSuperiorPdf.vue";
import DatosCliente from "@/components/reusable/visualizacion_documentos/DatosCliente.vue";
import DatosEnvio from "@/components/reusable/visualizacion_documentos/DatosEnvio.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/TablaProductos.vue";
import MembreteInferiorPdf from "@/components/reusable/visualizacion_documentos/MembreteInferiorPdf.vue";

export default {
  components: {
    IconoEmitir,
    MembreteSuperiorPdf,
    DatosCliente,
    DatosEnvio,
    TablaProductos,
    MembreteInferiorPdf,
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      cotizacion_cliente: {},
      detalleDocumento: [],
      labels: ["Productos", "Cant", "Precio por unidad", "Total", "Kg"],
    };
  },
  async fetch() {
    const query = qs.stringify({
      fields: [
        "id",
        "fecha_emision",
        "cliente.*.*",
        "detalle.*.*",
        "empresa.*.*",
      ],
    });

    const { data } = await fetch(
      `${this.$config.apiUrl}/items/cotizaciones_clientes/${this.id}?${query}`
    ).then((res) => res.json());

    this.cotizacion_cliente = data;

    this.detalleDocumento = this.cotizacion_cliente.detalle.map((item) => {
      return {
        ...item,
        total: item.cantidad * item.productos_id.precio,
      };
    });
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
};
</script>

<style></style>
