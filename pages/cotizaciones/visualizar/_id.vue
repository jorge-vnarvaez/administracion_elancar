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
        />
        <!-- TABLA PRODUCTOS -->
      </div>
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
      detalleDocumento: [],
      labels: ["Productos", "Cantidad", "Kg", "Precio por unidad", "Total"],
    };
  },
  mounted() {
    this.getDetalle();
  },
  async asyncData(context) {
    const query = qs.stringify({
      fields: ["id", "fecha_emision", "cliente.*.*", "detalle.*", "empresa.*.*"],
    });
    const id = context.params.id;
    const { data } = await context.$axios
      .get(
        `${context.$config.apiUrl}/items/cotizaciones_clientes/${id}?${query}`
      )
      .then((res) => res.data);
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
