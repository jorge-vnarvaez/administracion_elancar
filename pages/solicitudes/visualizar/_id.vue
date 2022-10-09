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
        <!-- DATOS CLIENTE -->
        <DatosProveedor :proveedor="cotizacion_proveedor.proveedor" class="tw-col-span-5" />
        <!-- DATOS CLIENTE -->

        <!-- DATOS ENVIO :datos_envio="cotizacion_proveedor.datos_envio"-->
       
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
      labels: ["Productos", "Cantidad", "Kg", "Precio por unidad", "Total"],
    };
  },
  mounted() {
    this.getDetalle();
  },
  async asyncData(context) {
    const query = qs.stringify({
      fields: ["id", "fecha_emision", "detalle.*", "proveedor.*", "empresa.*.*"],
    });
    const id = context.params.id;
    const { data } = await context.$axios
      .get(`${context.$config.apiUrl}/items/cotizaciones_proveedor/${id}?${query}`)
      .then((res) => res.data);
    // this.infoDocumento = data;
    return {
      cotizacion_proveedor: data,
    };
  },
  methods: {
    async getDetalle() {
      if (this.cotizacion_proveedor.detalle.length > 0) {
        const query = qs.stringify({
          filter: {
            _and: [
              {
                id: {
                  _in: this.cotizacion_proveedor.detalle.map((item) => item.productos_id),
                },
              },
            ],
          },
        });

        const { data } = await this.$axios
          .get(`${this.$config.apiUrl}/items/productos?${query}`)
          .then((res) => res.data);

        this.detalleDocumento = data.map((item) => {
          const detalle = this.cotizacion_proveedor.detalle.find(
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
