<template>
  <div class="tw-flex tw-flex-col tw-text-sm" v-if="empresa">
    <span>{{ empresa.nombre }}</span>
    <span>{{ empresa.direccion }}</span>
    <span>{{ empresa.telefono }}</span>
    <span>{{ empresa.correo }}</span>
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