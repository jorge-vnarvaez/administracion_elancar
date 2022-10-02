<template>
  <div class="tw-grid tw-grid-cols-12">
    <!-- NOMBRE -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-5 tw-py-4 tw-px-4'
      "
    >
      {{ producto.nombre }}
    </div>
    <!-- NOMBRE -->

    <!-- PRECIO NETO -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-2 tw-py-4 tw-px-4'
      "
    >
      {{ formatearPrecio(producto.precio) }}
    </div>
    <!-- PRECIO NETO -->

    <!-- STOCK -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-3 lg:tw-col-span-1 tw-py-4 tw-px-4'
      "
    >
      {{ producto.stock || 0}}
    </div>
    <!-- STOCK -->

    <!-- CANTIDAD -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-6 lg:tw-col-span-2 tw-py-1 tw-px-4'
      "
    >
      <div class="tw-flex">
        <v-icon @click="disminuirCantidad()">mdi-minus</v-icon>
        <v-text-field
          v-model="cantidad"
          solo
          hide-details
          flat
          :min="0"
          class="tw-w-[200px] tw-mx-4 tw-text-center"
        ></v-text-field>
        <v-icon @click="aumentarCantidad(producto.stock)">mdi-plus</v-icon>
      </div>
    </div>
    <!-- CANTIDAD -->

    <!-- AGREGAR -->
    <div
      :class="
        `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
        ' tw-col-span-2 tw-py-3 tw-px-4'
      "
    >
      <button
        class="tw-uppercase tw-bg-neutral-900 tw-text-white tw-font-bold tw-px-4 tw-py-2"
        @click="agregarAlCarrito(producto, cantidad)"
      >
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <circle cx="6" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
      <path d="M17 17h-11v-14h-2" />
      <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
      <path d="M15 6h6m-3 -3v6" />
      </svg>
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
    formatearPrecio(precio) {
      return precio.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
      });
    },
    aumentarCantidad(stock) {
      if(this.cantidad < stock) {
        this.cantidad++;
      }
    },
    disminuirCantidad() {
      if (this.cantidad > 0) {
        this.cantidad--;
      }
    },
    agregarAlCarrito(producto, cantidad) {
      this.$store.dispatch("carro_compras/addProductToCart", {
        producto,
        cantidad
      });
    },
  },
};
</script>

<style></style>
