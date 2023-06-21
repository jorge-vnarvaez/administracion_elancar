<template>
  <div>
    <div
      v-if="$vuetify.breakpoint.mobile ? false : true"
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
            $formatearPrecio(item.precio_neto * item.cantidad)
          }}</span>
        </div>
        <div @click="eliminarItem(item)" class="tw-cursor-pointer">
          <v-icon>mdi-trash-can-outline</v-icon>
          <span>Eliminar</span>
        </div>
      </div>
    </div>
    <!-- END DESKTOP VIEW -->

    <!-- STAR MOBILE VIEW -->
    <div
      v-if="$vuetify.breakpoint.mobile ? true : false"
      class="tw-col-span-12 tw-py-4 tw-flex tw-justify-between"
    >
      <div class="tw-flex tw-flex-col">
        <div class="tw-bg-white tw-py-4 tw-px-8">
          <!-- NOMBRE -->
          <span class="tw-block tw-text-xl tw-font-bold">{{
            item.nombre
          }}</span>
          <!-- NOMBRE -->
          <!-- CANTIDAD -->
          <div class="tw-flex tw-ml-2 tw-mb-2 tw-mt-2">
            <v-icon @click="disminuirCantidad()">mdi-minus</v-icon>
            <div>
              <v-text-field
                v-model="item.cantidad"
                solo
                disabled
                hide-details
                flat
                :min="0"
                class="tw-w-[50px] tw-mx-4 tw-text-center"
              ></v-text-field>
            </div>
            <v-icon @click="aumentarCantidad()">mdi-plus</v-icon>
          </div>
          <!-- CANTIDAD -->
          <!-- TOTAL -->
          <div class="tw-flex tw-items-center">
            <span class="tw-font-bold tw-text-xl tw-mr-4">Total </span
            ><span class="tw-text-xl">{{
              $formatearPrecio(item.precio_neto * item.cantidad)
            }}</span>
          </div>
          <!-- TOTAL -->
          <!-- ELIMINAR -->
          <div
            @click="eliminarItem(item)"
            class="tw-cursor-pointer tw-flex tw-justify-end"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
            <span>Eliminar</span>
          </div>
          <!-- ELIMINAR -->
        </div>
      </div>
    </div>
    <!-- END MOBILE VIEW -->
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
      if (this.item.cantidad < this.item.stock) {
        this.$store.dispatch("carro_compras/updateProductQuantity", {
          id: this.item.id,
          cantidad: this.item.cantidad + 1,
        });
      }
    },
    disminuirCantidad() {
      if (this.item.cantidad > 1) {
        this.$store.dispatch("carro_compras/updateProductQuantity", {
          id: this.item.id,
          cantidad: this.item.cantidad - 1,
        });
      }
    },
  },
};
</script>

<style></style>
