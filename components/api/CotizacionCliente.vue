<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-48">
    <!-- INSTRUCTIVO -->
    <div
      v-if="!documento_convertido"
      class="tw-bg-neutral-900 tw-text-white rounded-lg tw-px-8 tw-py-4 tw-w-full tw-mb-8"
    >
      <div class="tw-flex align-center tw-space-x-2">
        <v-icon color="white">mdi-information-outline</v-icon>
        <span class="tw-text-xl tw-font-bold">Atención</span>
      </div>

      <div v-if="cotizacion_cliente.convertida">
        <p class="tw-text-sm tw-mt-2">
          Esta cotización ya fue convertida a una nota de pedido
        </p>
      </div>

      <div v-else>
        <div v-if="!stockSuficiente">
          <span class="tw-block tw-mt-2">
            No hay stock suficiente de
            <span
              class="tw-font-bold"
              v-for="productoStockNegativo in productosConStockNegativo"
              :key="productoStockNegativo.id"
              >{{ productoStockNegativo.productos_id.nombre }},
            </span>
            para realizar la compra.
          </span>
          <span class="tw-block">
            Si el cliente aún así desea realizar la compra con los productos que
            tienen stock, deberá emitir una nueva nota de pedido
          </span>
        </div>

        <div v-if="stockSuficiente && !fechaEmisionPasada">
          <span class="tw-block tw-mt-2">
            Estas a punto de emitir una nota de pedido.
          </span>

          <span class="tw-block">
            Informa al cliente el monto total de la nota de pedido y el tiempo
            de entrega además del coste de transporte (en caso de aplicar).
          </span>

          <v-btn
            class="tw-mt-2"
            color="white"
            small
            @click="dialog_convertir = true"
          >
            Convertir a nota de pedido
          </v-btn>
        </div>
      </div>

      <div v-if="fechaEmisionPasada">
        <span class="tw-block"
          >La cotización ha sido emitida hace más de
          <span class="tw-font-bold">3 días hábiles.</span></span
        >
        <v-btn class="tw-mt-2" color="white" small to="/productos">
          Volver a cotizar
        </v-btn>
      </div>
    </div>
    <!-- INSTRUCTIVO -->

    <!-- ICONO GUARDAR Y DIALOG -->
    <v-dialog v-model="dialog_convertir" max-width="290">
      <v-card class="tw-py-4 tw-px-2 tw-flex tw-flex-col tw-align-center">
        <v-card-text class="tw-text-center tw-text-2xl">
          ¿Está seguro/a que desea convertir a nota de pedido?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            depressed
            color="black"
            class="tw-text-white"
            @click="convertirDocumento()"
          >
            Si, convertir
          </v-btn>

          <v-btn
            depressed
            color="yellow darken-1"
            class="tw-text-neutral-900"
            @click="dialog_convertir = false"
          >
            No, volver
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ICONO GUARDAR Y DIALOG -->

    <div
      v-if="!documento_convertido"
      class="tw-flex tw-flex-col tw-bg-white tw-p-8"
    >
      <!-- MEMBRETE -->
      <MembreteSuperiorPdf
        tipoDocumento="Cotización"
        :fecha_emision="cotizacion_cliente.fecha_emision"
        :infoDocumento="cotizacion_cliente"
      />
      <!-- MEMBRETE -->

      <!--V-DIVIDER-->
      <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-1"></div>
      <!--V-DIVIDER-->

      <div class="tw-grid tw-grid-cols-12">
        <!-- DATOS CLIENTE -->
        <DatosCliente
          :cliente="cotizacion_cliente.cliente"
          class="tw-col-span-12"
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
          :productos="productosActualizados"
          cotizacion_cliente
          class="tw-col-span-12"
          visualizando
          con_detalle
          verificar_stock
        />
        <!-- TABLA PRODUCTOS -->
      </div>
    </div>

    <!-- ALERTA GUARDADO EXITOSO -->
    <div
      v-if="documento_convertido"
      class="tw-flex tw-justify-center tw-w-full tw-h-full align-center tw-flex-col"
    >
      <AlertaExito
        image="/solicitud_emitida.png"
        txt="El documento se ha emitido exitosamente, serás redirigido a la nota de pedido generada en"
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
import DatosCliente from "@/components/reusable/visualizacion_documentos/DatosCliente.vue";
import DatosEnvio from "@/components/reusable/visualizacion_documentos/DatosEnvio.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/TablaProductos.vue";
import MembreteInferiorPdf from "@/components/reusable/visualizacion_documentos/MembreteInferiorPdf.vue";
import AlertaExito from "@/components/reusable/AlertaExito.vue";

export default {
  components: {
    IconoEmitir,
    MembreteSuperiorPdf,
    DatosCliente,
    DatosEnvio,
    TablaProductos,
    MembreteInferiorPdf,
    AlertaExito,
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      cotizacion_cliente: {},
      detalleDocumento: [],
      labels: ["Productos", "Cant", "Precio/Unidad", "Total"],
      documento_convertido: false,
      dialog_convertir: false,
      contador: 7,
    };
  },
  async fetch() {
    const query = qs.stringify({
      fields: [
        "id",
        "fecha_emision",
        "cliente.*.*",
        "detalle.*.*",
        "empresa.*.*",
        "convertida"
      ],
    });

    const { data } = await fetch(
      `${this.$config.apiUrl}/items/cotizaciones_clientes/${this.id}?${query}`
    ).then((res) => res.json());

    this.cotizacion_cliente = data;

    this.detalleDocumento = this.cotizacion_cliente.detalle.map((item) => {
      return {
        ...item,
        total: item.cantidad * item.productos_id.precio,
      };
    });

    this.$store.dispatch("cotizaciones/setDetalle", this.detalleDocumento);
  },
  methods: {
    async convertirDocumento() {
      this.documento_convertido = true;
      this.dialog_convertir = false;

      const data = await this.$axios
        .post(`${this.$config.apiUrl}/items/notas_de_pedido`, {
          fecha_emision: this.fecha_actual,
          hora_emision: this.hora_actual,
          empresa: this.cotizacion_cliente.empresa.id,
          cliente: this.cotizacion_cliente.cliente.id,
          forma_de_pago: this.cotizacion_cliente.forma_de_pago,
          detalle: this.$store.getters["cotizaciones/getDetalle"],
          monto_total: this.total,
        })
        .then((res) => res.data.data);

      this.detalleDocumento.forEach(async (producto) => {
        await this.$axios.patch(
          `${this.$config.apiUrl}/items/productos/${producto.productos_id.id}`,
          {
            stock: producto.productos_id.stock - producto.cantidad,
          }
        );
      });

      await this.$axios.patch(
        `${this.$config.apiUrl}/items/cotizaciones_clientes/${this.id}`,
        {
          convertida: true,
        }
      );

      setInterval(() => {
        this.contador--;
        if (this.contador === 0) {
          this.documento_convertido = false;
          this.contador = 7;
        }
      }, 1000);

      setTimeout(() => {
        this.$router.push(`/notas_pedido/visualizar/${data.id}`);
      }, 7000);
    },
  },
  computed: {
    fecha_actual() {
      return moment();
    },
    hora_actual() {
      return moment().format("HH:mm");
    },
    // check if fecha de emision has passed three days
    fechaEmisionPasada() {
      const fechaEmision = new Date(this.cotizacion_cliente.fecha_emision);
      const fechaActual = new Date();

      const diffTime = Math.abs(fechaActual - fechaEmision);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays > 3;
    },
    // using state productos to check if stock is enough
    stockSuficiente() {
      return this.detalleDocumento.every((item) => {
        return item.cantidad <= item.productos_id.stock;
      });
    },
    // get new list of products with updated stock
    productosActualizados() {
      return this.detalleDocumento.map((item) => {
        return {
          ...item,
          productos_id: {
            ...item.productos_id,
            stock: item.productos_id.stock - item.cantidad,
          },
        };
      });
    },
    // get new list of all products with negative stock
    productosConStockNegativo() {
      return this.detalleDocumento.filter((item) => {
        return item.cantidad > item.productos_id.stock;
      });
    },
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
};
</script>

<style></style>
