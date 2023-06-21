<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-48">
    <!-- INSTRUCTIVO -->
    <div
      v-if="documento_generado == false"
      class="tw-bg-neutral-900 tw-text-white rounded-lg tw-px-8 tw-py-4 tw-w-full tw-mb-8"
    >
      <div class="tw-flex align-center tw-space-x-2">
        <v-icon color="white">mdi-information-outline</v-icon>
        <span class="tw-text-xl tw-font-bold">Atención</span>
      </div>

      <div v-if="!cotizacion_proveedor.convertida">
        <span class="tw-font-bold tw-block tw-mt-2"
          >Si te han aprobado una solicitud de cotización o deseas generar una
          orden de compra teniendo en cuenta la cantidad que has solicitado.
        </span>

        <span class="tw-block tw-mt-4"> Ten en cuenta lo siguiente </span>

        <div class="tw-mt-4">
          <span class="tw-block tw-mb-4">
            1. Si deseas generar una orden de compra, verifica que la cantidad
            de productos que has solicitado estén correctos.
          </span>
          <span class="tw-block">
            2. Si deseas generar una orden de compra, debes asignar a cada uno de los productos los
            precios de la solicitud de cotización enviados por el proveedor.
          </span>

          <v-btn
            v-if="convirtiendo == false"
            class="tw-mt-8 tw-w-full tw-text-xs lg:tw-text-sm lg:tw-w-72"
            color="white"
            small
            @click="convirtiendo = !convirtiendo"
          >
            Convertir a orden de compra
          </v-btn>

          <v-btn
            v-if="convirtiendo"
            class="tw-mt-8 tw-w-full tw-text-xs lg:tw-text-sm lg:tw-w-72"
            color="white"
            small
            :disabled="!prices_setted"
            @click="dialogo_generar = true"
          >
            Generar orden de compra
          </v-btn>

          <v-btn class="tw-mt-8 tw-w-full tw-text-xs lg:tw-text-sm lg:tw-w-40"
          v-if="convirtiendo"
            color="white"
            small
            @click="convirtiendo = false">
            Cancelar
          </v-btn>
        </div>
      </div>

      <div class="tw-mt-2" v-if="cotizacion_proveedor.convertida">
        <span>La solicitud de cotización ya ha sido convertida</span>
      </div>
    </div>
    <!-- INSTRUCTIVO -->

    <!-- ICONO CONVERTIR Y DIALOG -->
    <v-dialog v-model="dialogo_generar" max-width="310">
      <v-card class="tw-py-4 tw-px-2 tw-flex tw-flex-col tw-align-center">
        <v-card-text class="tw-text-center tw-text-2xl">
          ¿Está seguro/a que desea generar la orden de compra?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            depressed
            color="black"
            class="tw-text-white"
            @click="generarOrden"
          >
            Si, Generar
          </v-btn>

          <v-btn
            depressed
            color="yellow darken-1"
            class="tw-text-neutral-900"
            @click="dialogo_generar = false"
          >
            No, Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ICONO CONVERTIR Y DIALOG -->

    <div v-if="documento_generado == false">
      <!-- INFORMACION DE LA SOLICITUD -->
      <div
        v-if="convirtiendo == false"
        class="tw-flex tw-flex-col tw-bg-white tw-p-8 tw-h-full"
      >
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
          <!-- DATOS PROVEEDOR -->
          <DatosProveedor
            v-if="cotizacion_proveedor.proveedor"
            :proveedor="cotizacion_proveedor.proveedor"
            :receptor="cotizacion_proveedor.receptor"
            :metodo_de_pago="cotizacion_proveedor.forma_de_pago"
            class="tw-col-span-12"
          />
          <!-- DATOS PROVEEDOR -->

          <!-- TABLA PRODUCTOS -->
          <TablaProductos
            :labels="labels"
            :productos="detalleDocumento"
            cotizacion_proveedor
            class="tw-col-span-12"
            visualizando
            convirtiendo
            con_detalle
          />
          <!-- TABLA PRODUCTOS -->
        </div>
      </div>
      <!-- INFORMACION DE LA SOLICITUD -->

      <!-- INFORMACION PRE ORDEN DE COMPRA -->
      <div
        v-if="convirtiendo"
        class="tw-flex tw-flex-col tw-bg-white tw-p-8 tw-h-full"
      >
        <MembreteSuperiorPdf
          tipoDocumento="Solicitud de cotización"
          :fecha_emision="cotizacion_proveedor.fecha_emision"
          :infoDocumento="cotizacion_proveedor"
        />

        <!--V-DIVIDER-->
        <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
        <!--V-DIVIDER-->

        <div class="tw-grid tw-grid-cols-12">
          <!-- DATOS PROVEEDOR -->
          <DatosProveedor
            :proveedor="cotizacion_proveedor.proveedor"
            :receptor="cotizacion_proveedor.receptor"
            :metodo_de_pago="cotizacion_proveedor.forma_de_pago"
            class="tw-col-span-12"
          />
          <!-- DATOS PROVEEDOR -->

          <!-- TABLA PRODUCTOS -->
          <div
            class="tw-mt-1 tw-flex tw-flex-col tw-justify-between tw-text-xs tw-col-span-12"
          >
            <span class="tw-block tw-mb-2 tw-font-bold tw-text-2xl"
              >Detalle</span
            >
            <span class="tw-text-lg"
              >Verifica que la cantidad de los productos sea la que has
              solicitado e ingresa el precio de cada producto en la columna de
              precio unitario.</span
            >
            <!-- DESKTOP VIEW -->
            <div>
              <!-- TABLE HEADERS -->
              <v-row v-if="!$vuetify.breakpoint.mobile" class="tw-mt-8 tw-mb-6">
                <v-col cols="5">
                  <span class="tw-font-bold">Nombre</span>
                </v-col>

                <v-col cols="1">
                  <span class="tw-font-bold">Cantidad</span>
                </v-col>

                <v-col cols="6">
                  <v-row>
                    <v-col cols="3">
                      <span class="tw-font-bold">Precio/Unidad</span>
                    </v-col>
                    <v-col class="2">
                      <span class="tw-font-bold">Total</span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <!-- TABLE HEADERS -->

              <!--V-DIVIDER-->
              <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-mt-1 "></div>
              <!--V-DIVIDER-->

              <!-- TABLE BODY -->
              <v-row
                v-for="(producto, index) in detalleDocumento"
                :key="index"
                :class="[index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100', 'tw-flex tw-align-center']"
              >
                <!-- NOMBRE -->
                <v-col cols="5" class="tw-flex tw-align-center">
                  {{ producto.productos_id.nombre }}
                </v-col>
                <!-- NOMBRE -->

                <!-- CANTIDAD -->
                <v-col cols="1" class="tw-flex tw-align-center">
                  {{ producto.cantidad }}
                </v-col>
                <!-- CANTIDAD -->

                <!-- PRECIO UNITARIO -->
                <v-col cols="6">
                  <PrecioUnitario
                    :item="producto"
                    :detalle_documento="detalleDocumento"
                  />
                </v-col>

                <!-- PRECIO UNITARIO -->
              </v-row>
            </div>
            <!-- DESKTOP VIEW -->
          </div>

          <!-- MEMBRETE INFERIOR -->
          <div
            class="tw-flex tw-justify-between align-center tw-mt-12 tw-w-full tw-col-span-12"
          >
            <!-- PLANTILLA PRECIO-->
            <div class="tw-flex tw-justify-end tw-w-full">
              <PlantillaPrecio
                :total_kg="0"
                :sub_total="120"
                :transporte="0"
                :total="total"
                cotizacion_proveedor
              />
            </div>
            <!-- PLANTILLA PRECIO-->
          </div>
          <!-- MEMBRETE INFERIOR -->
        </div>
          <!-- TABLA PRODUCTOS -->
      </div>
      <!-- INFORMACION PRE ORDEN DE COMPRA -->
    </div>

    <!-- ALERTA GUARDADO EXITOSO -->
    <div
      v-if="documento_generado"
      class="tw-flex tw-justify-center tw-w-full tw-h-full align-center tw-flex-col"
    >
      <AlertaExito
        image="/solicitud_emitida.png"
        txt="El documento se ha emitido exitosamente, serás redirigido a la orden
          de compra generada en"
        :contador="contador"
      />
    </div>
    <!-- ALERTA GUARDADO EXITOSO -->
  </div>
</template>

<script>
import qs from "qs";
import moment from "moment";
import IconoEmitir from "@/components/iconos/blancos/IconoEmitir";
import MembreteSuperiorPdf from "@/components/reusable/visualizacion_documentos/MembreteSuperiorPdf.vue";
import DatosProveedor from "@/components/reusable/visualizacion_documentos/DatosProveedor.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/TablaProductos.vue";
import PrecioUnitario from "@/components/utils/PrecioUnitario.vue";
import PlantillaPrecio from "@/components/reusable/visualizacion_documentos/PlantillaPrecio.vue";
import AlertaExito from "@/components/reusable/AlertaExito.vue";

export default {
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  components: {
    IconoEmitir,
    MembreteSuperiorPdf,
    DatosProveedor,
    TablaProductos,
    PrecioUnitario,
    PlantillaPrecio,
    AlertaExito,
  },
  data() {
    return {
      cotizacion_proveedor: {},
      detalleDocumento: [],
      labels: ["Productos", "Cant", "Precio/Unidad", "Total"],
      dialogo_generar: false,
      documento_generado: false,
      convirtiendo: false,
      contador: 7,
    };
  },
  async fetch() {
    const query = qs.stringify({
      fields: [
        "id",
        "fecha_emision",
        "hora_emision",
        "forma_de_pago",
        "detalle.*.*",
        "proveedor.*.*",
        "receptor.*",
        "sucursal.*.*",
        "convertida",
      ],
    });

    const { data } = await fetch(
      `${this.$config.apiUrl}/items/cotizaciones_proveedor/${this.id}?${query}`
    ).then((res) => res.json());

    this.cotizacion_proveedor = data;

    this.getDetalle();
  },
  methods: {
    getDetalle() {
      this.detalleDocumento = this.cotizacion_proveedor.detalle.map((item) => {
        return {
          ...item,
          cantidad: item.cantidad,
        };
      });

      this.$store.dispatch(
        "ordenes_de_compra/setDetalle",
        this.detalleDocumento
      );
    },
    async generarOrden() {
      this.documento_generado = true;
      this.dialogo_generar = false;

      const data = await this.$axios
        .post(`${this.$config.apiUrl}/items/ordenes_de_compra`, {
          fecha_emision: this.fecha_actual,
          hora_emision: this.hora_actual,
          sucursal: this.sucursal.id,
          proveedor: this.cotizacion_proveedor.proveedor.id,
          forma_de_pago: this.cotizacion_proveedor.forma_de_pago,
          detalle: this.$store.getters["ordenes_de_compra/getDetalle"],
          monto_total: this.total,
        })
        .then((res) => res.data.data);

        await this.$axios.patch(`${this.$config.apiUrl}/items/cotizaciones_proveedor/${this.id}`, {
          convertida: true
        })

      setInterval(() => {
        this.contador--;
        if (this.contador === 0) {
          this.documento_generado = false;
          this.contador = 7;
        }
      }, 1000);

      setTimeout(() => {
        this.$router.push(`/ordenes/visualizar/${data.id}`);
      }, 7000);
    },
  },
  computed: {
    fecha_actual() {
      return moment();
    },
    proveedorActual() {
      return this.$store.getters["carro_solicitudes/getCurrentProveedor"];
    },
    hora_actual() {
      return moment().format("HH:mm");
    },
    sucursal() {
      return this.$store.getters["sucursal/getSucursal"];
    },
    prices_setted() {
      return this.$store.getters["ordenes_de_compra/getPricesSetted"];
    },
    total() {
      return this.prices_setted
        ? this.$store.getters["ordenes_de_compra/getTotal"]
        : 0;
    },
  },
};
</script>

<style></style>
