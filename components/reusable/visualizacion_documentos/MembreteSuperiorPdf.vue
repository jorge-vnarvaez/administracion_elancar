<template>
  <!--MEMBRETE-->
  <div class="tw-flex tw-space-x-4 align-center">
    <!--LOGO ELANCAR -->
    <img src="/logo_elancar.png" width="74" height="20" />
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
        <span>{{ fechaFormateada  }}</span>
      </div>
      <!-- FECHA -->
    </div>
  </div>
  <!--MEMBRETE-->
</template>

<script>

import moment from "moment"

export default {
    props: {
        tipoDocumento: {
            type: String,
            default: ""
        },
        fecha_emision: {
            type: String,
            default: ""
        }
    },
    computed: {
        fechaFormateada() {
            return moment(this.fecha_emision).format("LL");
        }
    }
};
</script>

<style>
</style>