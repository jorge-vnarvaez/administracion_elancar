<template>
  <div class="tw-p-24 tw-px-64 tw-h-full">
    <div v-if="info_despacho">
      <div
        class="tw-w-full tw-align-center tw-flex tw-justify-end tw-space-x-3"
      >
        <!-- ICONO BORRAR Y DIALOG -->
        <div
          class="tw-bg-black tw-p-3 tw-cursor-pointer tw-rounded-md"
          @click="dialog_borrar = true"
        >
          <v-dialog v-model="dialog_borrar" max-width="290">
            <v-card class="tw-py-4 tw-px-2 tw-flex tw-flex-col tw-align-center">
              <v-card-text class="tw-text-center tw-text-2xl">
                ¿Está seguro/a que desea borrar la nota de pedido actual?
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
          class="tw-bg-black tw-p-3 tw-cursor-pointer tw-rounded-md"
          @click="dialog_guardar = true"
        >
          <v-dialog v-model="dialog_guardar" max-width="290">
            <v-card class="tw-py-4 tw-px-2 tw-flex tw-flex-col tw-align-center">
              <v-card-text class="tw-text-center tw-text-2xl">
                ¿Está seguro/a que desea guardar la nota de pedido actual?
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
import IconoBorrar from "@/components/iconos/blancos/IconoBorrar.vue";

export default {
  components: {
    MembreteSuperiorPdf,
    DatosCliente,
    DatosEnvio,
    TablaProductos,
    IconoGuardar,
    IconoBorrar,
  },
  data() {
    return {
      labels: ["Productos", "Cantidad", "Kg", "Precio por unidad", "Total"],
      dialog_borrar: false,
      dialog_guardar: false,
      documento_borrado: false,
      documento_guardado: false,
      timeout_borrado: 9000,
      timeout_guardado: 9000,
      contador: 7,
    };
  },
  methods: {
    borrarDocumento() {
      this.documento_borrado = true;
      this.dialog_borrar = false;
      this.$store.dispatch("info_despacho/borrarInfoDespachoNotaPedido");
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
      await this.$axios.post(`${this.$config.apiUrl}/items/notas_de_pedido`, {
        fecha_emision: this.fecha_actual,
        hora_emision: this.hora_actual,
        cliente: this.info_despacho.datos_cliente.id,
        empresa: this.empresa.id,
        detalle: this.carro_de_compra,
      });
    },
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
    },
  },
};
</script>
