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
          <div class="tw-px-12 tw-py-12 tw-h-[1000px]">
            <!-- MEMBRE SUPERIOR -->
            <MembreteSuperiorPdf
              :tipoDocumento="tipoDocumento"
              :fecha_emision="infoDocumento.fecha_emision"
            />
            <!-- MEMBRE SUPERIOR -->

            <!--V-DIVIDER-->
            <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
            <!--V-DIVIDER-->

            <!--DATOS DEL CLIENTE-->
            <div v-if="infoDocumento.cliente">
                <!-- TODO: LLAMAR AL COMPONENTE DATOSCLIENTE -->
            </div>
            <!--DATOS DEL CLIENTE-->

            <!-- DATOS DE ENVIO -->
            
            <!-- DATOS DE ENVIO -->


            <!-- TABLE BODY -->
            <div
              class="tw-grid tw-grid-cols-12 tw-mt-4"
              v-for="producto in detalleDocumento"
              :key="producto.id"
            >
              <div class="tw-col-span-3">
                <span class="tw-block">{{ producto.nombre }}</span>
              </div>
              <div class="tw-col-span-2">
                <span class="tw-block">{{ producto.cantidad }}</span>
              </div>

              <div class="tw-col-span-3">
                <span class="tw-block">$.-</span>
              </div>
              <div class="tw-col-span-2">
                <span class="tw-block">$.-</span>
              </div>
            </div>
            <!-- TABLE BODY -->
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
import DatosCliente from "@/components/reusable/visualizacion_documentos/DatosCliente.vue"
import IconoDescarga from "@/components/iconos/IconoDescarga.vue";

export default {
  components: { MembreteSuperiorPdf, DatosCliente, IconoDescarga },
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
  },
  data() {
    return {
      infoDocumento: {},
      detalleDocumento: [],
    };
  },

  watch: {
    infoDocumento(newValue) {
      this.getDetalle();
    },
  },
  async fetch() {
    const query = qs.stringify({
      fields: ["*.*"],
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
    is_cotizacion_to_proveedores() {
      return this.item == "cotizaciones_proveedor" ? true : false;
    },
  },
};
</script>

<style></style>
