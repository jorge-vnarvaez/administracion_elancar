<template>
  <div v-if="datos_envio != null">
    <span class="tw-block tw-font-bold">Datos de envío</span>
    <div class="tw-flex tw-flex-col">
      <!--CALLE -->
      <span>
        {{ datos_envio.calle }}
      </span>
      <!--CALLE -->

      <!--NRO CALLE  -->
     <span>
        {{ datos_envio.nro }}
      </span>
      <!--NRO CALLE  -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datos_envio: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style>
</style>