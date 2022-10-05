<template>
  <div class="tw-p-24 tw-px-64 tw-h-full">
    <div class="tw-flex tw-flex-col tw-bg-white tw-p-8">
      <!-- MEMBRETE -->
      <MembreteSuperiorPdf
        tipoDocumento="Cotización"
        :fecha_emision="cotizacion_cliente.fecha_emision"
        grupoBotones
        btnImprimir
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
          :datos_envio="cotizacion_cliente.cliente"
          class="tw-col-span-7"
        />
        <!-- DATOS ENVIO -->

        <!-- TABLA PRODUCTOS -->
        <TablaProductos
          :labels="labels"
          :productos="detalleDocumento"
          class="tw-col-span-12"
        />
        <!-- TABLA PRODUCTOS -->
      </div>

      <!--MEMBRETE INFERIOR-->
      <MembreteInferiorPdf />
      <!--MEMBRETE INFERIOR-->
    </div>
  </div>
</template>

<script>
import qs from "qs";
import MembreteSuperiorPdf from "@/components/reusable/visualizacion_documentos/MembreteSuperiorPdf.vue";
import DatosCliente from "@/components/reusable/visualizacion_documentos/DatosCliente.vue";
import DatosEnvio from "@/components/reusable/visualizacion_documentos/DatosEnvio.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/TablaProductos.vue";
import MembreteInferiorPdf from "@/components/reusable/visualizacion_documentos/MembreteInferiorPdf.vue";
export default {
  components: {
    MembreteSuperiorPdf,
    DatosCliente,
    DatosEnvio,
    TablaProductos,
    MembreteInferiorPdf,
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
      fields: ["*.*"],
    });
    const id = context.params.id;
    const { data } = await context.$axios
      .get(
        `${context.$config.apiUrl}/items/cotizaciones_clientes/${id}?${query}`
      )
      .then((res) => res.data);
    // this.infoDocumento = data;
    return {
      cotizacion_cliente: data,
    };
  },
  methods: {
    async getDetalle() {
      if (this.cotizacion_cliente.detalle.length > 0) {
        const query = qs.stringify({
          filter: {
            _and: [
              {
                id: {
                  _in: this.cotizacion_cliente.detalle.map(
                    (item) => item.productos_id
                  ),
                },
              },
            ],
          },
        });

        const { data } = await this.$axios
          .get(`${this.$config.apiUrl}/items/productos?${query}`)
          .then((res) => res.data);

        this.detalleDocumento = data.map((item) => {
          const detalle = this.cotizacion_cliente.detalle.find(
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
