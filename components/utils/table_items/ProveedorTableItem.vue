<template>
  <div class="lg:tw-grid lg:tw-grid-cols-11 tw-flex tw-flex-col" >
    <!-- NOMBRE -->
    <div
      v-if="$vuetify.breakpoint.mobile ? true : false "
      class="tw-mb-1 tw-mt-4 tw-px-4 tw-font-bold
      "
    >Nombre
    </div>

    <div
      class="tw-col-span-6 lg:tw-col-span-5 tw-px-4 tw-flex align-center lg:tw-px-4"
    >
      {{ proveedor.nombre_comercial }}
    </div>
    <!-- NOMBRE -->

    <!-- CASA MATRIZ -->
    <div
      v-if="$vuetify.breakpoint.mobile ? true : false "
      class=" tw-mb-1 tw-mt-4 tw-px-4 tw-font-bold"
    >Casa Matriz
    </div>
    <div
      class="tw-col-span-6 lg:tw-col-span-6 tw-mb-4 tw-px-4 lg:tw-py-4"
    >
      <span v-if="proveedor.casa_matriz">
        {{ proveedor.casa_matriz.calle }} #{{ proveedor.casa_matriz.numero }},
        Región {{ proveedor.casa_matriz.region }},
        {{ proveedor.casa_matriz.provincia }},
        {{ proveedor.casa_matriz.comuna }}
      </span>

      <span v-if="!proveedor.casa_matriz">No tiene casa matriz.</span>
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
