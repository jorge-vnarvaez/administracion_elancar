<template>
  <div class="tw-mt-24">
    <div class="tw-flex align-center tw-space-x-2">
      <IconoArchivoInfo />
      <span class="tw-font-bold">EN CONSIDERACIÓN</span>
    </div>

    <div>
      <span class="tw-block tw-w-[520px] mt-4">
        Este documento tiene una válidez de <strong>3 días</strong> a partir de la fecha de
        emisión, posterior a esta fecha Elancar no está obligado a respetar los
        precios que aquí aparecen.
      </span>

      <span class="tw-block mt-6">
        Este documento <strong>no asegura</strong> disponibilidad de stock.
      </span>
    </div>
  </div>
</template>

<script>
import IconoArchivoInfo from "@/components/iconos/IconoArchivoInfo.vue";

export default {
  components: {
    IconoArchivoInfo,
  },
};
</script>

<style></style>
