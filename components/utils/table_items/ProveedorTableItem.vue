<template>
  <div class="tw-grid tw-grid-cols-11">
    <!-- NOMBRE -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-5 tw-py-4 tw-px-4'
      "
    >
      {{ proveedor.nombre }}
    </div>
    <!-- NOMBRE -->

    <!-- CASA MATRIZ -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-6 tw-py-4'
      "
    >
      <span v-if="proveedor.casa_matriz">
        {{ proveedor.casa_matriz.calle }} #{{ proveedor.casa_matriz.numero }},
        Región {{ proveedor.casa_matriz.region }},
        {{ proveedor.casa_matriz.provincia }},
        {{ proveedor.casa_matriz.comuna }}
      </span>

      <span v-if="!proveedor.casa_matriz"> No tiene casa matriz </span>
    </div>
    <!-- CASA MATRIZ -->
  </div>
</template>

<script>
export default {
  props: {
    proveedor: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      radioGroup: 1,
    };
  },
};
</script>

<style></style>
