<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-48">
    <div v-if="info_despacho">
      <div
        class="tw-w-full tw-align-center tw-flex tw-justify-end tw-space-x-3"
      >
        <!-- ICONO BORRAR Y DIALOG -->
        <div
          @click="dialog_borrar = true"
        >
          <v-dialog v-model="dialog_borrar" max-width="290">
            <v-card class="tw-py-4 tw-px-2 tw-flex tw-flex-col tw-align-center">
              <v-card-text class="tw-text-center tw-text-2xl">
                ¿Está seguro/a que desea borrar la cotización actual?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  depressed
                  color="black"
                  class="tw-text-white"
                  @click="borrarDocumento"
                >
                  Si, borrar
                </v-btn>

                <v-btn
                  depressed
                  color="yellow darken-1"
                  class="tw-text-neutral-900"
                  @click="dialog_borrar = false"
                >
                  No, cancelar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <IconoBorrar />
        </div>
        <!-- ICONO BORRAR Y DIALOG -->

        <!-- ICONO GUARDAR Y DIALOG -->
        <div
          @click="dialog_guardar = true"
        >
          <v-dialog v-model="dialog_guardar" max-width="290">
            <v-card class="tw-py-4 tw-px-2 tw-flex tw-flex-col tw-align-center">
              <v-card-text class="tw-text-center tw-text-2xl">
                ¿Está seguro/a que desea guardar la cotización actual?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  depressed
                  color="black"
                  class="tw-text-white"
                  @click="guardarDocumento"
                >
                  Si, guardar
                </v-btn>

                <v-btn
                  depressed
                  color="yellow darken-1"
                  class="tw-text-neutral-900"
                  @click="dialog_guardar = false"
                >
                  No, volver
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <IconoGuardar />
        </div>
        <!-- ICONO GUARDAR Y DIALOG -->
      </div>
      <div class="tw-flex tw-flex-col tw-bg-white tw-p-8 tw-mt-8">
        <!-- MEMBRETE -->
        <MembreteSuperiorPdf
          tipoDocumento="Cotización"
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
        <TablaProductos
          :labels="labels"
          :productos="carro_de_compra"
          cotizacion_cliente
          cart_type="compras"
        />
        <!-- TABLA PRODUCTOS -->
      </div>
    </div>

    <!-- ALERTA BORRADO EXITOSO -->
    <div v-if="documento_borrado" class="tw-flex tw-justify-center tw-w-full tw-h-full align-center tw-flex-col">
      <v-img src="/deleting_document.png" width="500" height="420" contain></v-img>
      <div class="tw-flex tw-flex-col tw-space-x-4 align-center">
        <span class="tw-text-neutral-900 tw-font-bold tw-block tw-my-4"
          >El documento se ha borrado exitosamente, serás redirigido al listado
          de productos en {{ contador }} segundos...</span
        >

        <v-progress-circular indeterminate color="black"></v-progress-circular>
      </div>
    </div>
    <!-- ALERTA BORRADO EXITOSO -->

    <!-- ALERTA GUARDADO EXITOSO -->
    <div v-if="documento_guardado" class="tw-flex tw-justify-center tw-w-full tw-h-full align-center tw-flex-col">
      <v-img src="/saving_document.png" width="500" height="420" contain></v-img>
      <div class="tw-flex tw-flex-col tw-space-x-4 align-center">
        <span class="tw-text-neutral-900 tw-font-bold tw-block tw-my-4"
          >El documento se ha guardado exitosamente, serás redirigido al listado
          de productos en {{ contador }} segundos...</span
        >

        <v-progress-circular indeterminate color="black"></v-progress-circular>
      </div>
    </div>
    <!-- ALERTA GUARDADO EXITOSO -->
  </div>
</template>
<script>

import moment from "moment";
import IconoGuardar from "@/components/iconos/blancos/IconoGuardar.vue";
import IconoBorrar from "@/components/iconos/blancos/IconoBorrar.vue";
import MembreteSuperiorPdf from "@/components/reusable/visualizacion_documentos/MembreteSuperiorPdf.vue";
import DatosCliente from "@/components/reusable/visualizacion_documentos/DatosCliente.vue";
import DatosEnvio from "@/components/reusable/visualizacion_documentos/DatosEnvio.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/TablaProductos.vue";
import MembreteInferiorPdf from "@/components/reusable/visualizacion_documentos/MembreteInferiorPdf.vue";
import DialogAccion from "@/components/reusable/DialogAccion.vue";

export default {
  middleware: ["auth"],
  components: {
    IconoGuardar,
    IconoBorrar,
    MembreteSuperiorPdf,
    DatosCliente,
    DatosEnvio,
    TablaProductos,
    MembreteInferiorPdf,
    DialogAccion,
  },
  data() {
    return {
      labels: ["Productos", "Cantidad", "Precio por unidad", "Total", "Kg"],
      dialog_borrar: false,
      dialog_guardar: false,
      documento_borrado: false,
      documento_guardado: false,
      timeout_borrado: 9000,
      timeout_guardado: 9000,
      contador: 7,
    };
  },
  computed: {
    carro_de_compra() {
      return this.$store.getters["carro_compras/getCarroCompras"];
    },
    info_despacho() {
      return this.$store.getters["info_despacho/getInfoDespachoCotizacion"];
    },
    fecha_actual() {
      return moment();
    },
    hora_actual() {
      return moment().format("HH:mm");
    },
    empresa() {
      return this.$store.getters["sucursal/getSucursal"];
    },
  },
  methods: {
    borrarDocumento() {
      this.documento_borrado = true;
      this.dialog_borrar = false;
      this.$store.dispatch("info_despacho/borrarInfoDespachoCotizacion");
      this.$store.dispatch("carro_compras/borrarCarro");
      setInterval(() => {
        this.contador--;
        if (this.contador === 0) {
          this.documento_borrado = false;
          this.contador = 7;
        }
      }, 1000);

      setTimeout(() => {
        this.$router.push("/productos");
      }, 7000);
    },
    async guardarDocumento() {
      this.documento_guardado = true;
      this.dialog_guardar = false;
      await this.$axios.post(
        `${this.$config.apiUrl}/items/cotizaciones_clientes`,
        {
          usuario_emisor: this.$cookies.get('user_id'),
          fecha_emision: this.fecha_actual,
          hora_emision: this.hora_actual,
          cliente: this.info_despacho.datos_cliente.id,
          empresa: this.empresa.id,
          detalle: this.carro_de_compra.map((producto) => {
            return {
              productos_id: producto.id,
              cantidad: producto.cantidad,
            };
          }),
          monto_total: this.$store.getters["carro_compras/getTotalPrice"] + this.$store.getters['carro_compras/getTotalPrice'] * 0.19, // 19% de iva
        }
      );

      this.$store.dispatch("info_despacho/borrarInfoDespachoCotizacion");
      this.$store.dispatch("carro_compras/borrarCarro");

      setInterval(() => {
        this.contador--;
        if (this.contador === 0) {
          this.documento_guardado = false;
          this.contador = 7;
        }
      }, 1000);

      setTimeout(() => {
        this.$router.push("/productos");
      }, 7000);
    },
  },
};
</script>
