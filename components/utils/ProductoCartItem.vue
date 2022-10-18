<template>
  <div
    class="tw-col-span-8 tw-bg-white tw-py-4 tw-px-8 tw-flex tw-justify-between"
  >
    <span v-if="item.marca" class="tw-block tw-font-light">{{
      item.marca.nombre
    }}</span>
    <span class="tw-block tw-text-xl tw-font-bold">{{ item.nombre }}</span>
    <!-- <span class="tw-block tw-text-sm">Código: {{ item.id }}</span> -->

    <div class="tw-flex tw-flex-col align-end tw-space-y-2">
      <div>
        <span class="tw-font-bold tw-text-xl tw-mr-4">Total</span
        ><span class="tw-text-xl">{{
          $formatearPrecio(item.precio * item.cantidad)
        }}</span>
      </div>
      <div @click="eliminarItem(item)" class="tw-cursor-pointer">
        <v-icon>mdi-trash-can-outline</v-icon>
        <span>Eliminar</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    eliminarItem(item) {
      this.$store.dispatch("carro_compras/removeProductFromCart", {
        producto: item,
      });
    },
  },
};
</script>

<style></style>
