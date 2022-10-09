<template>
  <div class="tw-flex tw-justify-between">
    <!--MEMBRETE-->
    <div class="tw-flex tw-space-x-4 align-center tw-justify-between tw-w-full">
      <!--LOGO ELANCAR -->
      <div class="tw-flex align-center tw-space-x-2">
        <IconoElancar />
        <DatosEmpresa v-if="infoDocumento" :empresa="infoDocumento.empresa" />
      </div>


      <!--LOGO ELANCAR -->

      <div class="tw-flex tw-flex-col align-start">
        <!--TIPO DE DOCUMENTO -->
        <div class="tw-text-xl tw-font-bold">
          <span>{{ tipoDocumento }}</span> <span v-if="infoDocumento">#{{ infoDocumento.id }}</span>
        </div>
        <!--TIPO DE DOCUMENTO -->

        <!--FECHA -->
        <div class="tw-text-lg tw-mt-2">
          <span class="tw-text-sm">Fecha emisión {{ fechaFormateada }}</span>
        </div>
        <!-- FECHA -->
      </div>
    </div>
    <!--MEMBRETE-->

    <!-- GRUPO BOTONES -->
    <GrupoBotones
      v-if="grupoBotones"
      :tipoDocumento="tipoDocumento"
      :btnRealizarPedido="btnRealizarPedido"
      :btnImprimir="btnImprimir"
      :btnBorrar="btnBorrar"
    />
    <!-- GRUPO BOTONES -->
  </div>
</template>

<script>
import moment from "moment";
import DatosEmpresa from '@/components/reusable/visualizacion_documentos/DatosEmpresa.vue';
import IconoElancar from "@/components/reusable/IconoElancar.vue";
import GrupoBotones from "@/components/reusable/visualizacion_documentos/GrupoBotones.vue";

export default {
  components: {
    DatosEmpresa,
    IconoElancar,
    GrupoBotones,
  },
  props: {
    infoDocumento: {
      type: Object,
      default: () => {},
      desc: "Define la información del documento",
    },
    tipoDocumento: {
      type: String,
      default: "",
      desc: "Define el tipo de documento que se esta visualizando",
    },
    fecha_emision: {
      type: [String, Date, Object],
      default: "",
      desc: "Define la fecha de emision del documento",
    },
    grupoBotones: {
      type: Boolean,
      default: false,
      desc: "Define si se muestra o no el grupo de botones",
    },
    btnRealizarPedido: {
      type: Boolean,
      default: false,
      desc: "Define si se muestra o no el boton de realizar pedido",
    },
    btnImprimir: {
      type: Boolean,
      default: false,
      desc: "Define si se muestra o no el boton de imprimir",
    },
    btnBorrar: {
      type: Boolean,
      default: false,
      desc: "Define si se muestra o no el boton de borrar",
    },
  },
  computed: {
    fechaFormateada() {
      return moment(this.fecha_emision).format("DD/MM/YYYY");
    },
  },
};
</script>

<style></style>
