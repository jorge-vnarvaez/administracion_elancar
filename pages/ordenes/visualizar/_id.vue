<template>
  <div class="tw-p-24 tw-px-64 tw-h-full">
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

      <div class="tw-grid tw-grid-cols-12">
        <!-- DATOS CLIENTE -->
        <DatosProveedor :proveedor="orden_de_compra.proveedor" class="tw-col-span-5" />
        <!-- DATOS CLIENTE -->

        <!-- DATOS ENVIO :datos_envio="orden_de_compra.datos_envio"-->
        <!-- <DatosEnvio :datos_envio="orden_de_compra.cliente" class="tw-col-span-7" /> -->
        <!-- DATOS ENVIO -->

        <!-- TABLA PRODUCTOS -->
        <TablaProductos
          :labels="labels"
          :productos="detalleDocumento"
          class="tw-col-span-12"
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
      labels: ["Productos", "Cantidad", "Kg", "Precio por unidad", "Total"],
    };
  },
  mounted() {
    this.getDetalle();
  },
  async asyncData(context) {
    const query = qs.stringify({
      fields: ["id", "fecha_emision", "proveedor.*", "detalle.*", "empresa.*.*"],
    });
    const id = context.params.id;
    const { data } = await context.$axios
      .get(`${context.$config.apiUrl}/items/ordenes_de_compra/${id}?${query}`)
      .then((res) => res.data);
    // this.infoDocumento = data;
    return {
      orden_de_compra: data,
    };
  },
  methods: {
    async getDetalle() {
      if (this.orden_de_compra.detalle.length > 0) {
        const query = qs.stringify({
          filter: {
            _and: [
              {
                id: {
                  _in: this.orden_de_compra.detalle.map((item) => item.productos_id),
                },
              },
            ],
          },
        });

        const { data } = await this.$axios
          .get(`${this.$config.apiUrl}/items/productos?${query}`)
          .then((res) => res.data);

        this.detalleDocumento = data.map((item) => {
          const detalle = this.orden_de_compra.detalle.find(
            (detalle) => detalle.productos_id === item.id
          );
          return {
            ...item,
            cantidad: detalle.cantidad,
            // precio_unidad: detalle.precio_unidad,
            // kg: detalle.kg
          };
        });
      }
    },
  },
};
</script>

<style></style>
