<template>
  <div v-if="proveedor">
    <span class="tw-block tw-font-bold">Proveedor</span>
    <div class="tw-flex tw-flex-col">
        <span class="tw-block">{{ proveedor.nombre }}</span>
        <span class="tw-block">{{ proveedor.rut }}</span>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        proveedor: {
            type: Object,
            default: () => {},
            required: true,
            desc: "Objeto con los datos del proveedor",
        }
    }
}
</script>

<style>

</style>