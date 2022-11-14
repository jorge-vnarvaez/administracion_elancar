<template>
  <div>
    <CotizacionCliente :id="$route.params.id" />
  </div>  
</template>

<script>

import CotizacionCliente from "@/components/api/CotizacionCliente.vue";

export default {
  middleware: ["auth"],
  components: {
    CotizacionCliente,
  }
}
</script>

<style>

</style>