<template>
  <div>
    <nuxt-link :to="`${path}/visualizar/${idDocumento}`">
      <v-icon right x-large>mdi-file-eye</v-icon>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    idDocumento: {
      type:[Number, String],
      required: true,
    },
    tipoDocumento: {
      type: String,
      default: null,
    },
    path: {
      type: String,
      default: null,
    },
  },
};
</script>

<style></style>
