<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-64">
    <!-- INSTRUCTIVO -->
    <div
      v-if="documento_validado == false"
      class="tw-bg-neutral-900 tw-text-white rounded-lg tw-px-8 tw-py-4 tw-w-full tw-mb-8"
    >
      <div class="tw-flex align-center tw-space-x-2">
        <v-icon color="white" large>mdi-information-outline</v-icon>
        <span class="tw-text-xl tw-uppercase tw-font-bold">Atención</span>
      </div>

      <div v-if="!orden_de_compra.validada">
        <span class="tw-font-bold tw-block tw-mt-4"
          >Si el proveedor te ha informado que los productos están en camino, no
          validez la orden hasta que recibas todos los productos y estés seguro
          de que todo está en perfecto estado.
        </span>

        <span class="tw-block tw-mt-4"> Ten en cuenta lo siguiente </span>

        <div class="tw-mt-4">
          <span class="tw-block">
            1. Si validas la orden sin tener los productos en tu bodega/local y
            el proveedor no te los envía o no llegaron, no podrás descontar el
            stock de los productos que no recibiste.
          </span>
          <span class="tw-block">
            2. Si validas la orden sin tener los productos en tu bodega/local y
            el proveedor no te los envía o no llegaron, generarás un desfase en
            tu stock y podrás tener problemas con tus clientes.
          </span>
          <span class="tw-block">
            3. Si acaban de llegar los productos en tu bodega/local, debes
            comprobar que todo está en perfecto estado y que los productos son
            los que esperabas.
          </span>
          <span>
          </span>
          <v-btn class="tw-mt-8" color="white" outlined @click="validarOrden()">
            Validar orden de compra
          </v-btn>
        </div>
      </div>

      <div class="tw-mt-4" v-if="orden_de_compra.validada">
        <span>La orden de compra se encuentra validada</span>
      </div>
    </div>
    <!-- INSTRUCTIVO -->

    <div
      v-if="documento_validado == false"
      class="tw-flex tw-flex-col tw-bg-white tw-p-8"
    >
      <!-- MEMBRETE -->
      <MembreteSuperiorPdf
        tipoDocumento="Orden de compra"
        :fecha_emision="orden_de_compra.fecha_emision"
        :infoDocumento="orden_de_compra"
      />
      <!-- MEMBRETE -->

      <!--V-DIVIDER-->
      <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
      <!--V-DIVIDER-->

      <div class="lg:tw-grid lg:tw-grid-cols-12">
        <!-- DATOS CLIENTE -->
        <DatosProveedor
          :proveedor="orden_de_compra.proveedor"
          :metodo_de_pago="orden_de_compra.forma_de_pago"
          class="tw-col-span-12"
        />
        <!-- DATOS CLIENTE -->

        <!-- TABLA PRODUCTOS -->
        <TablaProductos
          :labels="labels"
          :productos="detalleDocumento"
          class="tw-col-span-12"
          orden_de_compra
          con_detalle
          visualizando
        />
        <!-- TABLA PRODUCTOS -->
      </div>
    </div>

    <!-- ALERTA GUARDADO EXITOSO -->
    <div
      v-if="documento_validado"
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
          >El documento se ha validado exitosamente, serás redirigido al listado
          de productos en {{ contador }} segundos...</span
        >

        <v-progress-circular indeterminate color="black"></v-progress-circular>
      </div>
    </div>
    <!-- ALERTA GUARDADO EXITOSO -->
  </div>
</template>

<script>
import qs from "qs";
import DatosProveedor from "@/components/reusable/visualizacion_documentos/DatosProveedor.vue";
import MembreteSuperiorPdf from "@/components/reusable/visualizacion_documentos/MembreteSuperiorPdf.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/TablaProductos.vue";

export default {
  components: {
    DatosProveedor,
    MembreteSuperiorPdf,
    TablaProductos,
  },
  data() {
    return {
      infoDocumento: {},
      detalleDocumento: [],
      labels: ["Productos", "Cant", "Precio / Uni", "Total"],
      validando: false,
      documento_validado: false,
      contador: 7,
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
        "forma_de_pago",
        "proveedor.*.*",
        "detalle.*.*",
        "empresa.*.*",
        "validada"
      ],
    });
    const id = context.params.id;
    const { data } = await context.$axios
      .get(`${context.$config.apiUrl}/items/ordenes_de_compra/${id}?${query}`)
      .then((res) => res.data);
    return {
      orden_de_compra: data,
    };
  },
  methods: {
    getDetalle() {
      this.detalleDocumento = this.orden_de_compra.detalle.map((item) => {
        return {
          ...item,
          cantidad: item.cantidad,
        };
      });
    },
    async validarOrden() {
      this.validando = true;
      this.documento_validado = true;

      this.detalleDocumento.map(async (item) => {
        await this.$axios.patch(
          `${this.$config.apiUrl}/items/productos/${item.productos_id.id}`,
          {
            stock: item.productos_id.stock + item.cantidad,
          }
        );
      });

      await this.$axios.patch(
        `${this.$config.apiUrl}/items/ordenes_de_compra/${this.orden_de_compra.id}`,
        {
          validada: true,
        }
      );

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
  },
};
</script>

<style></style>
