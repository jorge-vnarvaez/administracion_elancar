<template>
  <div>
    <span class="tw-block tw-font-bold">Datos del cliente</span>
    <div class="tw-flex tw-flex-col">
      <!--NOMBRE COMPLETO-->
      <span v-if="cliente.nombre_completo">
        {{ cliente.nombre_completo }}
      </span>


      <span v-if="!cliente.nombre_completo">
        {{ cliente.primer_nombre }}
        {{ cliente.segundo_nombre }}
        {{ cliente.apellido_paterno }}
        {{ cliente.apellido_materno }}
      </span>
      <!--NOMBRE COMPLETO-->

      <!--FONO-->
      <span
        >Fono:
        {{
          cliente.fono != null
            ? cliente.fono
            : "No indicado"
        }}</span
      >
      <!--FONO-->

      <!--EMAIL-->
      <span
        >Email:
        {{
          cliente.email != null
            ? cliente.email
            : "No indicado"
        }}</span
      >
      <!--EMAIL-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cliente: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style>
</style>