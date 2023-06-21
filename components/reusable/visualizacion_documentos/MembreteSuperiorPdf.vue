<template>
  <div class="tw-flex lg:tw-justify-between">
    <!--MEMBRETE-->
    <div class="lg:tw-flex xs:tw-flex-col-reverse lg:tw-space-x-4 lg:align-center lg:tw-justify-between tw-w-full">
      <!--LOGO ELANCAR -->
      <div class="tw-flex tw-flex-col lg:tw-flex-row lg:align-center lg:tw-space-x-4">
        <IconoElancar />
        <DatosEmpresa v-if="infoDocumento" :empresa="infoDocumento.sucursal"  />
        <DatosEmpresa v-if="is_creando" :empresa="empresa"  />
      </div>


      <!--LOGO ELANCAR -->

      <div class="tw-flex tw-flex-col align-start"  v-if="infoDocumento">
        <!--TIPO DE DOCUMENTO -->
        <div class="tw-text-sm lg:tw-text-xl tw-font-bold" v-if="infoDocumento.id">
          <span>{{ tipoDocumento }}</span> <span>#{{ infoDocumento.id }}</span>
        </div>
        <!--TIPO DE DOCUMENTO -->

        <!--FECHA -->
        <div class="tw-text-lg">
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
import IconoElancar from "@/components/iconos/IconoElancar.vue";
import GrupoBotones from "@/components/reusable/visualizacion_documentos/GrupoBotones.vue";

export default {
  components: {
    DatosEmpresa,
    IconoElancar,
    GrupoBotones,
  },
  props: {
    empresa: {
      type: Object,
      default: () => {},
      desc: "Objeto con los datos de la empresa",
    },
    is_creando: {
      type: Boolean,
      default: false,
      desc: "Indica si se está creando un documento o se está visualizando uno ya creado",
    },
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
