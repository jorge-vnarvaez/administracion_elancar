<template>
  <div class="tw-mt-12 lg:tw-mt-0">
    <div class="tw-flex align-center tw-space-x-2 inline-flex">
      <IconoArchivoInfo />
      <span class="tw-font-bold">EN CONSIDERACIÓN</span>
    </div>

    <div>
      <span class="tw-block lg:tw-w-[420px] tw-mt-2 ">
        Este documento tiene una validez de <strong>3 días</strong> a partir de la fecha de
        emisión, posterior a esta fecha Elancar Limitada o cualquiera de sus divisiones no tiene la obligación de respetar los
        precios que aquí aparecen.
      </span>

      <span class="tw-block tw-mt-4">
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
