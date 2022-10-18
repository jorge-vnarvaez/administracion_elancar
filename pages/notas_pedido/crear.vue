<template>
  <div class="tw-p-24 tw-px-64 tw-h-full">
    <div v-if="info_despacho">
      <div class="tw-mt-8 tw-w-full tw-align-center tw-flex tw-justify-end tw">
          <div class="tw-bg-black tw-p-3" @click="guardarDocumento">
            <IconoGuardar />
          </div>
      </div>
      <div class="tw-flex tw-flex-col tw-bg-white tw-p-8 tw-mt-8">
        <!-- MEMBRETE -->
        <MembreteSuperiorPdf
          tipoDocumento="Nota de pedido"
          :fecha_emision="fecha_actual"
          is_creando
          :empresa="empresa"
        />
        <!-- MEMBRETE -->

        <!--V-DIVIDER-->
        <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
        <!--V-DIVIDER-->

        <div class="tw-grid tw-grid-cols-12">
          <!-- DATOS CLIENTE -->
          <DatosCliente
            :cliente="info_despacho.datos_cliente"
            class="tw-col-span-5"
          />
          <!-- DATOS CLIENTE -->

          <!-- DATOS ENVIO -->
          <DatosEnvio
            :datos_envio="info_despacho.datos_envio"
            class="tw-col-span-7"
          />
          <!-- DATOS ENVIO -->
        </div>

        <!-- TABLA PRODUCTOS -->
        <TablaProductos :labels="labels" :productos="carro_de_compra" />
        <!-- TABLA PRODUCTOS -->
      </div>
    </div>

    <!-- <div v-if="!info_despacho" class="tw-flex tw-flex-col align-center tw-justify-center">
        <v-img src="/empty-box.png" width="320" height="400" contain></v-img>
        <span class="tw-block tw-mb-8 tw-text-3xl tw-w-96 tw-text-center">Al parecer no existe una cotización en proceso.</span>
        <nuxt-link to="/home">
          <div class="tw-bg-neutral-900 tw-px-4 tw-py-2">
            <span class="tw-text-white">Volver al inicio</span>
          </div>
        </nuxt-link>                                   
      </div> -->
  </div>
</template>
<script>
import moment from "moment";
import MembreteSuperiorPdf from "@/components/reusable/visualizacion_documentos/MembreteSuperiorPdf.vue";
import DatosCliente from "@/components/reusable/visualizacion_documentos/DatosCliente.vue";
import DatosEnvio from "@/components/reusable/visualizacion_documentos/DatosEnvio.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/TablaProductos.vue";
import IconoGuardar from "@/components/iconos/IconoGuardar.vue";

export default {
  components: {
    MembreteSuperiorPdf,
    DatosCliente,
    DatosEnvio,
    TablaProductos,
    IconoGuardar,
  },
  data() {
    return {
      labels: ["Productos", "Cantidad", "Kg", "Precio por unidad", "Total"],
    };
  },
  methods: {
    async guardarDocumento() {
      await this.$axios.post(`${this.$config.apiUrl}/items/notas_de_pedido`, {
        fecha_emision: this.fecha_actual,
        hora_emision: this.hora_actual,
        cliente: this.info_despacho.datos_cliente.id,
        empresa: this.empresa.id,
        detalle: this.carro_de_compra,
      });
    }
  },
  computed: {
    carro_de_compra() {
      return this.$store.getters["carro_compras/getCarroCompras"];
    },
    info_despacho() {
      return this.$store.getters["info_despacho/getInfoDespachoNotaPedido"];
    },
    fecha_actual() {
      return moment();
    },
    hora_actual() {
      return moment().format("HH:mm");
    },
    empresa() {
      return this.$store.getters["sucursal/getSucursal"];
    }
  },
};
</script>
