<template>
  <div class="tw-col-span-8 tw-bg-white tw-py-4 tw-px-8">
    <span v-if="item.marca" class="tw-block tw-font-light">{{
      item.marca.nombre
    }}</span>
    <span class="tw-block tw-text-xl tw-font-bold">{{ item.nombre }}</span>
    <span class="tw-block tw-text-sm">Código: {{ item.id }}</span>

    <div class="tw-flex tw-mt-4">
      <!-- <div class="tw-flex tw-space-x-4">
        <div>
          <v-img
            :src="$config.apiUrl + '/assets/' + item.imagen_referencia"
            width="250"
            height="250"
            contain
          ></v-img>
        </div>
      </div> -->

      <div class="tw-w-full tw-flex tw-flex-col tw-justify-between  align-end">
        <div>
          <span class="tw-font-bold tw-text-xl tw-mr-4">Total</span
          ><span class="tw-text-xl"
            >{{ formatearPrecio(item.precio * item.cantidad) }}</span
          >
        </div>
        <div @click="eliminarItem(item)" class="tw-cursor-pointer">
          <v-icon>mdi-trash-can-outline</v-icon>
          <span>Eliminar</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    formatearPrecio(precio) {
      return precio.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
      });
    },
    eliminarItem(item) {
        this.$store.dispatch("carro_compras/removeProductFromCart", { producto: item });
    },
  },
};
</script>

<style></style>
