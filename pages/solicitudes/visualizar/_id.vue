<template>
  <SolicitudProveedor :id="$route.params.id" />
</template>

<script>

import SolicitudProveedor from '@/components/api/SolicitudProveedor.vue'

export default {
  middleware: ["auth"],
  components: {
    SolicitudProveedor,
  }
};
</script>

<style></style>
