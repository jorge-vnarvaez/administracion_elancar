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
      >
        <section slot="pdf-content">
          <div class="tw-px-12 tw-py-12 tw-h-[1000px]">
            <!--MEMBRETE-->
            <div class="tw-flex tw-space-x-4 align-center">
              <!--LOGO ELANCAR -->
              <img src="/logo_elancar.png" width="74" height="20" />
              <!--LOGO ELANCAR -->

              <div class="tw-flex tw-flex-col align-start">
                <!--TIPO DE DOCUMENTO -->
                <div class=" tw-text-2xl tw-font-bold">
                  {{ tipoDocumento }}
                </div>
                <!--TIPO DE DOCUMENTO -->

                <!--FECHA -->
                <div class="tw-text-lg tw-mt-2">
                  <span class="tw-font-bold">Fecha emisión</span>
                  <span>{{ formatearFecha(infoDocumento.fecha_emision) }}</span>
                </div>
                <!-- FECHA -->
              </div>
            </div>
            <!--MEMBRETE-->

            <!--V-DIVIDER-->
            <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
            <!--V-DIVIDER-->

            <!--DATOS DEL CLIENTE-->
            <div v-if="infoDocumento.cliente">
              <span class="tw-block tw-font-bold">Datos del cliente</span>
              <div class="tw-flex tw-flex-col">
                <!--NOMBRE COMPLETO-->
                <span>
                  {{ infoDocumento.cliente.primer_nombre }}
                  {{ infoDocumento.cliente.segundo_nombre }}
                  {{ infoDocumento.cliente.apellido_paterno }}
                  {{ infoDocumento.cliente.apellido_materno }}
                </span>
                <!--NOMBRE COMPLETO-->

                <!--FONO-->
                <span
                  >Fono:
                  {{
                    infoDocumento.cliente.fono != null
                      ? infoDocumento.cliente.fono
                      : "No indicado"
                  }}</span
                >
                <!--FONO-->

                <!--EMAIL-->
                <span
                  >Email:
                  {{
                    infoDocumento.cliente.email != null
                      ? infoDocumento.cliente.email
                      : "No indicado"
                  }}</span
                >
                <!--EMAIL-->
              </div>
            </div>
            <!--DATOS DEL CLIENTE-->

            <!-- TABLE HEADERS -->
            <div class="tw-grid tw-grid-cols-12 tw-mt-12">
              <div class="tw-col-span-3">
                <span class="tw-block tw-font-bold">Producto</span>
              </div>
              <div class="tw-col-span-2">
                <span class="tw-block tw-font-bold">Cantidad</span>
              </div>
              <div class="tw-col-span-3">
                <span class="tw-block tw-font-bold">Precio por unidad</span>
              </div>
              <div class="tw-col-span-2">
                <span class="tw-block tw-font-bold">Precio total</span>
              </div>
            </div>
            <!-- TABLE HEADERS -->

            <!-- V-DIVIDER -->
            <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
            <!-- V-DIVIDER -->

            <!-- TABLE BODY -->
            <div class="tw-grid tw-grid-cols-12 tw-mt-4" v-for="(producto) in detalleDocumento" :key="producto.id">
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

import qs from 'qs';
import moment from "moment";
import IconoDescarga from "@/components/iconos/IconoDescarga.vue";

export default {
  components: { IconoDescarga },
  props: {
    idDocumento: {
      type: Number,
      default: () => {},
    },
    tipoDocumento: {
      type: String,
      default: "",
    },
    item: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      infoDocumento: {},
      detalleDocumento: [],
    };
  },

  watch: {
    infoDocumento(newValue) {
      this.getDetalle()
    }
  },
  async fetch() {
    const  query = qs.stringify({
      fields: ['*.*']
    })

    const { data } = await this.$axios
      .get(
        `${this.$config.apiUrl}/items/${this.item}/${this.idDocumento}?${query}`
      )
      .then((res) => res.data);

    this.infoDocumento = data;
  },
  methods: {
    async getDetalle() {
      if(this.infoDocumento.detalle.length > 0) {

        const query = qs.stringify({
          filter: {
            _and: [
              {
                id: {
                  _in: this.infoDocumento.detalle.map((item) => item.productos_id),
                },
              },
            ]
          }
        })


        const { data } = await this.$axios
          .get(
            `${this.$config.apiUrl}/items/productos?${query}`
          )
          .then((res) => res.data);


        this.detalleDocumento = data.map((item) => {
          const detalle = this.infoDocumento.detalle.find((detalle) => detalle.productos_id === item.id)
          return {
            ...item,
            cantidad: detalle.cantidad,
            // precio_unidad: detalle.precio_unidad,
            // kg: detalle.kg
          }
        })
      }
    },
    generatePdf() {
      this.$refs.pdf.generatePdf();
    },
    formatearFecha(fecha) {
      return moment(fecha).format("LL");
    },
  },
};
</script>

<style></style>
