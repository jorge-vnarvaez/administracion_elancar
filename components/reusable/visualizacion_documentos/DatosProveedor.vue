<template>
  <div v-if="proveedor" class="tw-col-span-12 tw-grid tw-grid-cols-12">
    <div class="lg:tw-col-span-6 tw-col-span-12">
      <span class="tw-block tw-font-bold">Proveedor</span>
      <!-- DATOS PROVEEDOR -->
      <div class="tw-flex tw-flex-col">
        <span class="tw-block">{{ proveedor.rut }}</span>
        <span class="tw-block">{{ proveedor.nombre }}</span>
      </div>
      <!-- DATOS PROVEEDOR -->

      <!-- DATOS RECEPTOR -->
      <div>
        <div class="tw-flex tw-flex-col" v-if="receptor">
          <span class="tw-block"
            >{{ receptor.nombre_completo }} O a quien corresponda</span
          >
        </div>
      </div>
      <!-- DATOS RECEPTOR -->
    </div>

    <div class="lg:tw-col-span-6 tw-col-span-12">
      <span class="tw-block tw-font-bold">Dirección</span>
      <div>
        <span>{{ proveedor.casa_matriz.calle }}</span>
        <span>#{{ proveedor.casa_matriz.numero }}</span>
      </div>

      <div>
        <span>{{ proveedor.casa_matriz.region }}</span>
      </div>

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
    },
    receptor: {
      type: [Object],
      default: () => {},
      desc: "Objeto con los datos del receptor",
    },
  },
};
</script>

<style></style>
