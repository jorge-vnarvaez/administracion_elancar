<template>
  <div class="tw-flex tw-justify-between">
    <!--MEMBRETE-->
    <div class="tw-flex tw-space-x-4 align-center">
      <!--LOGO ELANCAR -->
      <IconoElancar />
      <!--LOGO ELANCAR -->

      <div class="tw-flex tw-flex-col align-start">
        <!--TIPO DE DOCUMENTO -->
        <div class="tw-text-2xl tw-font-bold">
          {{ tipoDocumento }}
        </div>
        <!--TIPO DE DOCUMENTO -->

        <!--FECHA -->
        <div class="tw-text-lg tw-mt-2">
          <span class="tw-font-bold">Fecha emisión</span>
          <span>{{ fechaFormateada }}</span>
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
import IconoElancar from "@/components/reusable/IconoElancar.vue";
import GrupoBotones from "@/components/reusable/visualizacion_documentos/GrupoBotones.vue";

export default {
  components: {
    IconoElancar,
    GrupoBotones,
  },
  props: {
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
      return moment(this.fecha_emision).format("LL");
    },
  },
};
</script>

<style></style>
