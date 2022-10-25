<template>
  <div class="tw-grid tw-grid-cols-11">
    <!-- NOMBRE -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-4 tw-py-4 tw-px-4'
      "
    >
      {{ receptor.nombre_completo }}
    </div>
    <!-- NOMBRE -->

    <!-- TELEFONO -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-3 tw-py-4'
      "
    >
      <span v-if="receptor.telefono">
        {{ receptor.telefono }}
      </span>

      <span v-if="!receptor.telefono"> No tiene teléfono </span>
    </div>
    <!-- TELEFONO -->

    <!-- CORREO -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-4 tw-py-4'
      "
    >
      <span v-if="receptor.correo">
        {{ receptor.correo }}
      </span>

      <span v-if="!receptor.correo"> No tiene correo </span>
    </div>
    <!-- CORREO -->
  </div>
</template>

<script>
export default {
  props: {
    receptor: {
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
