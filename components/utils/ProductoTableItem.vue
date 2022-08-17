<template>
  <div class="grid grid-cols-12">
    <!-- NOMBRE -->
    <div
      :class="
        `${index % 2 == 0 ? 'bg-white' : 'bg-neutral-100'}` +
        ' col-span-4 py-4 px-4'
      "
    >
      {{ producto.nombre }}
    </div>
    <!-- NOMBRE -->

    <!-- PRECIO NETO -->
    <div
      :class="
        `${index % 2 == 0 ? 'bg-white' : 'bg-neutral-100'}` +
        ' col-span-2 py-4 px-4'
      "
    >
      $ {{ producto.precio_actual }}
    </div>
    <!-- PRECIO NETO -->

    <!-- STOCK -->
    <div
      :class="
        `${index % 2 == 0 ? 'bg-white' : 'bg-neutral-100'}` +
        ' col-span-2 py-4 px-4'
      "
    >
      {{ producto.stock || 0}}
    </div>
    <!-- STOCK -->

    <!-- CANTIDAD -->
    <div
      :class="
        `${index % 2 == 0 ? 'bg-white' : 'bg-neutral-100'}` +
        ' col-span-2 py-4 px-4'
      "
    >
      <div class="flex">
        <v-icon @click="disminuirCantidad()">mdi-minus</v-icon>
        <v-text-field
          v-model="cantidad"
          solo
          hide-details
          flat
          class="w-[200px] mx-4 text-center"
        ></v-text-field>
        <v-icon @click="aumentarCantidad()">mdi-plus</v-icon>
      </div>
    </div>
    <!-- CANTIDAD -->

    <!-- AGREGAR -->
    <div
      :class="
        `${index % 2 == 0 ? 'bg-white' : 'bg-neutral-100'}` +
        ' col-span-2 py-4 px-4'
      "
    >
      <button
        class="uppercase bg-neutral-900 text-white font-bold px-4 py-2"
        @click="agregarAlCarrito(producto, cantidad)"
      >
        <!-- <font-awesome-icon icon="fa-solid fa-cart-plus" color="white" /> -->
      </button>
    </div>
    <!-- AGREGAR -->

  </div>
</template>

<script>
export default {
  props: ["producto", "index"],
  data() {
    return {
      cantidad: 0,
    };
  },
  methods: {
    aumentarCantidad() {
      this.cantidad++;
    },
    disminuirCantidad() {
      this.cantidad--;
    },
    agregarAlCarrito(producto, cantidad) {
      this.$store.dispatch("carro_compras/addProductToCart", {
        producto: producto,
        cantidad: parseInt(cantidad),
      });
    },
  },
};
</script>

<style></style>
