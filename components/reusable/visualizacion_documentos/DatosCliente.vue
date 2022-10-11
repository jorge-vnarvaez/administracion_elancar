<template>
  <div v-if="cliente">
    <span class="tw-block tw-font-bold">Datos del cliente</span>
    <div class="tw-flex tw-flex-col">
      <!--NOMBRE COMPLETO-->
      <span v-if="cliente.nombre_completo" class="tw-text-xs">
        {{ cliente.nombre_completo }}
      </span>

      <span v-if="!cliente.nombre_completo" class="tw-text-xs">
        {{ cliente.primer_nombre }}
        {{ cliente.segundo_nombre }}
        {{ cliente.apellido_paterno }}
        {{ cliente.apellido_materno }}
      </span>
      <!--NOMBRE COMPLETO-->

      <!--FONO-->
      <span class="tw-text-xs"
        >Fono: {{ cliente.fono != null ? cliente.fono : "No indicado" }}</span
      >
      <!--FONO-->

      <!--EMAIL-->
      <span class="tw-text-xs"
        >Email:
        {{ cliente.email != null ? cliente.email : "No indicado" }}</span
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
      default: () => {},
      desc: "Datos del cliente como nombre, fono, email, etc.",
    },
  },
};
</script>

<style></style>
