<template>
  <div>
    <client-only>
      <vue-html2pdf
        ref="pdf"
        :manual-pagination="false"
        :show-layout="false"
        :float-layout="true"
        :paginate-elements-by-height="1400"
        pdf-format="letter"
        :filename="tipoDocumento + '-' + idDocumento"
      >
        <section slot="pdf-content">
          <div class="tw-px-12 tw-py-12 tw-h-[1000px] tw-flex tw-flex-col">
            <!-- MEMBRE SUPERIOR -->
            <MembreteSuperiorPdf
              :tipoDocumento="tipoDocumento"
              :fecha_emision="infoDocumento.fecha_emision"
              :infoDocumento="infoDocumento"
            />
            <!-- MEMBRE SUPERIOR -->

            <!--V-DIVIDER-->
            <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
            <!--V-DIVIDER-->

            <!-- DATOS DEL PROVEEDOR -->
            <div v-if="infoDocumento.proveedor">
              <DatosProveedor :proveedor="infoDocumento.proveedor" />
            </div>
            <!-- DATOS DEL PROVEEDOR -->

            <div class="tw-flex tw-space-x-14">
              <!--DATOS DEL CLIENTE-->
              <div v-if="infoDocumento.cliente">
                <DatosCliente :cliente="infoDocumento.cliente" />
              </div>
              <!--DATOS DEL CLIENTE-->

              <!-- DATOS DE ENVIO -->
              <div v-if="infoDocumento.cliente">
                <DatosEnvio :cliente="infoDocumento.cliente" />
              </div>
              <!-- DATOS DE ENVIO -->
            </div>

            <!-- TABLE PRODUCTOS  -->
            <TablaProductos
              :labels="labels"
              :productos="detalleDocumento"
              :cotizacion_proveedor="is_cotizacion_to_proveedor"
              :cotizacion_cliente="is_cotizacion_to_cliente"
              :orden_de_compra="is_orden_de_compra"
            />
            <!-- TABLE PRODUCTOS  -->
          </div>
        </section>
      </vue-html2pdf>
    </client-only>

    <div @click="generatePdf" class="tw-cursor-pointer">
      <IconoDescarga />
    </div>
  </div>
</template>

<script>
import qs from "qs";
import MembreteSuperiorPdf from "@/components/reusable/visualizacion_documentos/MembreteSuperiorPdf.vue";
import DatosCliente from "@/components/reusable/visualizacion_documentos/DatosCliente.vue";
import DatosEnvio from "@/components/reusable/visualizacion_documentos/DatosEnvio.vue";
import IconoDescarga from "@/components/iconos/IconoDescarga.vue";
import DatosProveedor from "@/components/reusable/visualizacion_documentos/DatosProveedor.vue";
import TablaProductos from "@/components/reusable/visualizacion_documentos/TablaProductos.vue";

export default {
  components: {
    MembreteSuperiorPdf,
    DatosCliente,
    DatosEnvio,
    IconoDescarga,
    DatosProveedor,
    TablaProductos,
  },
  props: {
    idDocumento: {
      type: Number,
      required: true,
    },
    tipoDocumento: {
      type: String,
      default: "",
      required: true,
      desc: "Tipo de documento a generar (cotización, orden de compra, etc)",
    },
    item: {
      type: String,
      default: "",
      required: true,
      desc: "Item a usado para consultar la api (cotización, ordenes_de_compra, etc)",
    },
    labels: {
      type: Array,
      default: () => [],
      required: true,
      desc: "Labels de la tabla de productos",
    },
  },
  data() {
    return {
      infoDocumento: {},
      detalleDocumento: [],
      DatosEnvio: {},
    };
  },

  watch: {
    infoDocumento(newValue) {
      this.getDetalle();
    },
  },
  async fetch() {
    const query = qs.stringify({
      fields: ["id", "fecha_emision", "detalle.*", "proveedor.*", "cliente.*", "empresa.*.*"],
    });

    const { data } = await this.$axios
      .get(
        `${this.$config.apiUrl}/items/${this.item}/${this.idDocumento}?${query}`
      )
      .then((res) => res.data);

    this.infoDocumento = data;
  },
  methods: {
    async getDetalle() {
      if (this.infoDocumento.detalle.length > 0) {
        const query = qs.stringify({
          filter: {
            _and: [
              {
                id: {
                  _in: this.infoDocumento.detalle.map(
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
          const detalle = this.infoDocumento.detalle.find(
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
    generatePdf() {
      this.$refs.pdf.generatePdf();
    },
  },
  computed: {
    is_cotizacion_to_proveedor() {
      return this.item == "cotizaciones_proveedor" ? true : false;
    },
    is_cotizacion_to_cliente() {
      return this.item == "cotizaciones_clientes" ? true : false;
    },
    is_orden_de_compra() {
      return this.item == "ordenes_de_compra" ? true : false;
    }
  },
};
</script>

<style></style>
