<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-64">
    <div class="tw-flex tw-flex-col tw-bg-white tw-p-8 tw-text-sm">
      <!-- MEMBRETE -->
      <MembreteSuperiorPdf
        tipoDocumento="Nota de pedido"
        :fecha_emision="nota_pedido.fecha_emision"
        :infoDocumento="nota_pedido"
      />
      <!-- MEMBRETE -->

      <!--V-DIVIDER-->
      <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
      <!--V-DIVIDER-->

      <div class="tw-grid tw-grid-cols-12 tw-gap-y-4 lg:tw-gap-y-0">
        <!-- DATOS CLIENTE -->
        <DatosCliente
          :cliente="nota_pedido.cliente"
          class="tw-col-span-12 lg:tw-col-span-5"
        />
        <!-- DATOS CLIENTE -->

        <!-- TABLA PRODUCTOS -->
        <TablaProductos
          :labels="labels"
          :productos="detalleDocumento"
          nota_de_pedido
          class="tw-col-span-12"
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
import MembreteSuperiorPdf from "@/components/reusable/visualizacion_documentos/MembreteSuperiorPdf.vue";
import DatosCliente from "@/components/reusable/visualizacion_documentos/DatosCliente.vue";
import DatosEnvio from "@/components/reusable/visualizacion_documentos/DatosEnvio.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/TablaProductos.vue";
export default {
  middleware: ["auth"],
  components: {
    MembreteSuperiorPdf,
    DatosCliente,
    DatosEnvio,
    TablaProductos,
  },
  data() {
    return {
      infoDocumento: {},
      detalleDocumento: [],
      labels: ["Productos", "Cant", "Precio Uni", "Total"],
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
        "cliente.*.*",
        "detalle.*.*",
        "sucursal.*.*",
      ],
    });
    const id = context.params.id;
    const nota_pedido = await context.$axios
      .get(`${context.$config.apiUrl}/items/notas_de_pedido/${id}?${query}`)
      .then((res) => res.data.data);

    return { nota_pedido };
  },
  methods: {
    getDetalle() {
      this.detalleDocumento = this.nota_pedido.detalle.map((item) => {
        return {
          ...item,
          total: item.cantidad * item.productos_id.precio,
        };
      });
    },
  }
};
</script>

<style></style>
