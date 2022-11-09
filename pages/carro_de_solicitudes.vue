<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-48">
    <div v-if="carro.length > 0">
      {{ metodo_de_pago }}
      <div
        class="tw-w-full tw-align-center tw-flex tw-justify-end tw-space-x-3"
      >
        <!-- ICONO BORRAR Y DIALOG -->
        <!-- <div
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
        </div> -->
        <!-- ICONO BORRAR Y DIALOG -->
        
        <!-- ICONO EMITIR Y DIALOG -->
        <div
          @click="dialog_emitir = true"
        >
          <v-dialog v-model="dialog_emitir" max-width="310">
            <v-card class="tw-py-4 tw-px-2 tw-flex tw-flex-col tw-align-center">
              <v-card-text class="tw-text-center tw-text-2xl">
                ¿Está seguro/a que desea emitir la cotización actual?
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  depressed
                  color="black"
                  class="tw-text-white"
                  @click="guardarDocumento"
                >
                  Si, Emitir
                </v-btn>

                <v-btn
                  depressed
                  color="yellow darken-1"
                  class="tw-text-neutral-900"
                  @click="dialog_emitir = false"
                >
                  No, volver
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <IconoEmitir />
        </div>
        <!-- ICONO EMITIR Y DIALOG -->
      </div>

      <div class="tw-flex tw-flex-col tw-bg-white tw-p-8 tw-mt-8">
        <!-- MEMBRETE -->
        <MembreteSuperiorPdf
          tipoDocumento="Solicitud de cotizacion"
          :fecha_emision="fecha_actual"
          is_creando
          :empresa="empresa"
        />
        <!-- MEMBRETE -->

        <!--V-DIVIDER-->
        <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
        <!--V-DIVIDER-->

        <div
          class="tw-grid tw-grid-cols-12"
          v-if="proveedorActual && receptorActual"
        >
          <!-- DATOS PROVEEDOR -->
          <DatosProveedor
            :proveedor="proveedorActual"
            :receptor="receptorActual"
          />
          <!-- DATOS PROVEEDOR -->

          <!--V-DIVIDER-->
          <div
            class="tw-col-span-12 tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"
          ></div>
          <!--V-DIVIDER-->

          <!-- DIRECCION FACTURACION Y ENVIO -->
          <div v-if="empresa" class="tw-col-span-12 tw-grid tw-grid-cols-12">
            <!-- FACTURACION -->
            <div class="tw-col-span-6">
              <span class="tw-block tw-font-bold"
                >Dirección de facturación</span
              >
              <span class="tw-block"
                >Representante: {{ empresa.representante }}</span
              >
              <span class="tw-block">Teléfono: {{ empresa.telefono }}</span>
              <span class="tw-block">Email: {{ empresa.correo }}</span>
            </div>
            <!-- FACTURACION -->

            <!-- ENVIO -->
            <div class="tw-col-span-6">
              <span class="tw-block tw-font-bold">Dirección de envío</span>
              <span class="tw-block">{{ empresa.nombre }}</span>
              <span class="tw-block">{{ empresa.direccion }}</span>
            </div>
            <!-- ENVIO -->
          </div>
          <!-- DIRECCION FACTURACION Y ENVIO -->

          <!--V-DIVIDER-->
          <div
            class="tw-col-span-12 tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"
          ></div>
          <!--V-DIVIDER-->

          <!-- METODO DE PAGO Y CONDICIONES DE VENTA -->
          <div class="tw-col-span-12 tw-grid tw-grid-cols-12 tw-gap-x-8">
            <div class="tw-col-span-3">
              <span class="tw-block tw-font-bold">Método de pago</span>
              <FormasDePago />
            </div>

            <div class="tw-col-span-3">
              <span class="tw-block tw-font-bold">Condiciones de venta</span>
              <CondicionesDeVenta />
            </div>
          </div>
          <!-- METODO DE PAGO Y CONDICIONES DE VENTA -->

          <!-- DETALLE PRODUCTOS -->
          <div class="tw-col-span-12">
            <TablaProductos
              :labels="labels"
              :productos="carro"
              cotizacion_proveedor
              cart_type="solicitudes"
            />
          </div>
          <!-- DETALLE PRODUCTOS -->
        </div>
      </div>
    </div>

    <!-- ALERTA GUARDADO EXITOSO -->
    <div
      v-if="documento_emitido"
      class="tw-flex tw-justify-center tw-w-full tw-h-full align-center tw-flex-col"
    >
      <v-img
        src="/solicitud_emitida.png"
        width="500"
        height="420"
        contain
      ></v-img>
      <div class="tw-flex tw-flex-col tw-space-x-4 align-center">
        <span class="tw-text-neutral-900 tw-font-bold tw-block tw-my-4"
          >El documento se ha emitido exitosamente, serás redirigido al menu de
          solicitudes en {{ contador }} segundos...</span
        >

        <v-progress-circular indeterminate color="black"></v-progress-circular>
      </div>
    </div>
    <!-- ALERTA GUARDADO EXITOSO -->
  </div>
</template>

<script>
import moment from "moment";
import IconoBorrar from "@/components/iconos/blancos/IconoBorrar";
import IconoEmitir from "@/components/iconos/blancos/IconoEmitir.vue";
import FormasDePago from "@/components/elancar/FormasDePago.vue";
import CondicionesDeVenta from "@/components/elancar/CondicionesDeVenta.vue";
import MembreteSuperiorPdf from "@/components/reusable/visualizacion_documentos/MembreteSuperiorPdf.vue";
import DatosProveedor from "@/components/reusable/visualizacion_documentos/DatosProveedor.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/TablaProductos.vue";

export default {
  components: {
    IconoBorrar,
    IconoEmitir,
    FormasDePago,
    CondicionesDeVenta,
    MembreteSuperiorPdf,
    DatosProveedor,
    TablaProductos,
  },
  data() {
    return {
      labels: ["Productos", "Cantidad", "Precio unidad", "Total"],
      dialog_emitir: false,
      documento_emitido: false,
      contador: 7,
      dialog_borrar: false,
      documento_borrado: false,
    };
  },
  methods: {
    async guardarDocumento() {
      this.documento_emitido = true;
      this.dialog_emitir = false;

      await this.$axios.post(
        `${this.$config.apiUrl}/items/cotizaciones_proveedor`,
        {
          usuario_emisor: this.$cookies.get("user_id"),
          fecha_emision: this.fecha_actual,
          hora_emision: this.hora_actual,
          forma_de_pago: this.$store.getters['carro_solicitudes/getMetodoDePago'],
          proveedor: this.proveedorActual.id,
          receptor: this.receptorActual.id,
          empresa: this.empresa.id,
          detalle: this.carro.map((producto) => {
            return {
              productos_id: producto.id,
              cantidad: producto.cantidad,
            };
          }),
        }
      );

      this.$store.dispatch('carro_solicitudes/borrarCarro');

      setInterval(() => {
        this.contador--;
        if (this.contador === 0) {
          this.documento_guardado = false;
          this.contador = 7;
        }
      }, 1000);

      setTimeout(() => {
        this.$router.push("/solicitudes/crear");
      }, 7000);
    },
  },
  computed: {
    carro() {
      return this.$store.getters["carro_solicitudes/getCarroSolicitudes"];
    },
    numeroProductos() {
      return this.$store.getters["carro_solicitudes/getCarroSolicitudesLength"];
    },
    proveedorActual() {
      return this.$store.getters["carro_solicitudes/getCurrentProveedor"];
    },
    receptorActual() {
      return this.$store.getters["carro_solicitudes/getCurrentReceptor"] || {};
    },
    fecha_actual() {
      return moment();
    },
    hora_actual() {
      return moment().format("HH:mm");
    },
    metodo_de_pago() {
      return this.$store.getters["carro_solicitudes/getMetodoDePago"];
    },  
    empresa() {
      return this.$store.getters["sucursal/getSucursal"];
    },
  },
};
</script>

<style></style>
