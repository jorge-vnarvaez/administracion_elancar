<template>
  <div class="tw-flex tw-flex-col tw-text-sm tw-mb-2" v-if="empresa">
    <span>{{ empresa.nombre }}</span>
    <span v-if="empresa.representante">{{ empresa.representante.nombre }}</span>
    <span>{{ empresa.representante.rut }}</span>
    <span>{{ empresa.direccion }}</span>
    <span>{{ empresa.telefono }} - {{ empresa.correo }}</span>
  </div>
</template>

<script>
export default {
  props: {
    empresa: {
      type: Object,
      default: () => {},
      desc: "Define la empresa desde la cual se ha emitido el documento",
    }
  }
}
</script>

<style>

</style>