<template>
  <v-responsive max-width="1800">
    <!-- DESKTOP VIEW -->
    <v-row :class="[index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100', 'tw-py-4 tw-px-4']">
      <!-- NOMBRE -->
      <v-col cols="12" lg="5">
        <span v-if="$vuetify.breakpoint.mobile" class="tw-font-bold">Nombre</span>
        <span class="tw-flex align-center">{{ producto.nombre }}</span>
      </v-col>
      <!-- NOMBRE -->

      <!-- PRECIO NETO -->
      <v-col cols="6" lg="2">
        <span v-if="$vuetify.breakpoint.mobile" class="tw-font-bold">Precio neto</span>
        <span>{{ $formatearPrecio(producto.precio_neto) }}</span>
      </v-col>
      <!-- PRECIO NETO -->

      <!-- STOCK -->
      <v-col cols="3" lg="1">
        <span v-if="$vuetify.breakpoint.mobile" class="tw-font-bold">Stock</span>
        <span>{{ producto.stock || 0 }}</span>
      </v-col>
      <!-- STOCK -->

      <!-- CANTIDAD -->
      <v-col cols="10" lg="2">
        <div class="tw-flex">
          <v-icon @click="disminuirCantidad()">mdi-minus</v-icon>
          <div>
            <v-text-field
              v-model="cantidad"
              solo
              hide-details
              flat
              :min="0"
              class="tw-w-[80px] tw-mx-4 tw-text-center"
            ></v-text-field>
          </div>
          <v-icon @click="aumentarCantidad(producto.stock)">mdi-plus</v-icon>
        </div>
      </v-col>
      <!-- CANTIDAD -->

      <!-- AGREGAR -->
      <v-col coln="2">
        <v-btn
          :disabled="cantidad == 0"
          class="tw-uppercase tw-bg-neutral-900 tw-text-white tw-font-bold tw-px-4 tw-py-2"
          @click="agregarAlCarrito(producto, cantidad)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-shopping-cart-plus"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="6" cy="19" r="2" />
            <circle cx="17" cy="19" r="2" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
            <path d="M15 6h6m-3 -3v6" />
          </svg>
        </v-btn>
      </v-col>
      <!-- AGREGAR -->

      <!-- PRODUCTO AGREGADO ALERT -->
      <v-snackbar
        type="success"
        v-model="producto_agregado"
        :timeout="timeout"
        color="green darken-1"
      >
        <v-icon color="white">mdi-check-circle</v-icon>
        <span>Producto agregado con exito!</span>
      </v-snackbar>
      <!-- PRODUCTO AGREGADO ALERT -->
    </v-row>
    <!-- DESKTOP VIEW -->
  </v-responsive>
</template>

<script>
export default {
  props: ["producto", "index"],
  data() {
    return {
      cantidad: 0,
      producto_agregado: false,
      timeout: 2000,
    };
  },
  watch: {
    cantidad(val) {
      this.cantidad = typeof val == "string" ? parseInt(val) : val;

      if (this.cantidad > this.producto.stock) {
        this.cantidad = this.producto.stock;
      }

      if (this.cantidad <= 0) {
        this.cantidad = 0;
      }
    },
  },
  methods: {
    aumentarCantidad(stock) {
      if (this.cantidad < stock) {
        this.cantidad++;
      }
    },
    disminuirCantidad() {
      if (this.cantidad > 0) {
        this.cantidad--;
      }
    },
    agregarAlCarrito(producto, cantidad) {
      this.producto_agregado = true;
      this.$store.dispatch("carro_compras/addProductToCart", {
        producto,
        cantidad,
      });
    },
  },
};
</script>

<style></style>
