<template>
  <div
    class="tw-col-span-8 tw-bg-white tw-py-4 tw-px-8 tw-flex tw-justify-between"
  >
    <!-- <span v-if="item.marca" class="tw-block tw-font-light">{{
      item.marca.nombre
    }}</span> -->

    <div class="tw-flex tw-flex-col">
      <!-- NOMBRE -->
      <span class="tw-block tw-text-xl tw-font-bold">{{ item.nombre }}</span>
      <!-- NOMBRE -->

      <!-- CANTIDAD -->
      <div class="tw-bg-white tw-col-span-6 lg:tw-col-span-2 tw-py-1 tw-px-4">
        <div class="tw-flex">
          <v-icon @click="disminuirCantidad()">mdi-minus</v-icon>
          <div>
            <v-text-field
              v-model="item.cantidad"
              solo
              disabled
              hide-details
              flat
              :min="0"
              class="tw-w-[50px] tw-mx-4 tw-text-center tw-bg-red-900"
            ></v-text-field>
          </div>
          <v-icon @click="aumentarCantidad()">mdi-plus</v-icon>
        </div>
      </div>
      <!-- CANTIDAD -->
    </div>

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
    aumentarCantidad() {
      this.$store.dispatch('carro_compras/updateProductQuantity', {
        id: this.item.id,
        cantidad: this.item.cantidad + 1
      })
    },
    disminuirCantidad() {
      if (this.item.cantidad > 1) {
        this.$store.dispatch('carro_compras/updateProductQuantity', {
        id: this.item.id,
        cantidad: this.item.cantidad - 1
      })
      }
    },
  },
};
</script>

<style></style>
