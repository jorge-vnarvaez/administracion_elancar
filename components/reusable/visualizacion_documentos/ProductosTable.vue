<template>
  <div>
    <!-- TABLE HEADERS -->
    <div class="tw-grid tw-grid-cols-12 tw-mt-12">
      <div class="tw-col-span-3">
        <span class="tw-block tw-font-bold">Producto</span>
      </div>
      <div class="tw-col-span-2">
        <span class="tw-block tw-font-bold">Cantidad</span>
      </div>
      <div v-if="!is_cotizacion_to_proveedores" class="tw-col-span-2">
        <span class="tw-block tw-font-bold">Kg</span>
      </div>
      <div class="tw-col-span-3">
        <span class="tw-block tw-font-bold">Precio por unidad</span>
      </div>
      <div class="tw-col-span-2">
        <span class="tw-block tw-font-bold">Precio total</span>
      </div>
    </div>
    <!-- TABLE HEADERS -->

    <!-- V-DIVIDER -->
    <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
    <!-- V-DIVIDER -->
  </div>
</template>

<script>
export default {
  props: {
    labels: {
      type: Array,
      default: [],
      desc: "Describe el nombre de las columnas para la tabla por ejemplo [Productos, Cantidad, Kg, Precio, Etc]",
    },
  },
};
</script>

<style>
</style>