<template>
  <div>
    <!-- DESKTOP VIEW-->
    <div
      v-if="$vuetify.breakpoint.mobile ? false : true"
      class="tw-grid tw-grid-cols-12"
    >
      <!-- NOMBRE -->
      <div
        class="tw-col-span-6 lg:tw-col-span-6 tw-py-4 tw-px-4"
      >
        {{ producto.nombre }}
      </div>
      <!-- NOMBRE -->

      <!-- STOCK ACTUAL -->
      <div
        class="tw-col-span-6 lg:tw-col-span-2 tw-py-4"
      >
        <v-icon v-if="stock == 0" color="red darken-2"
          >mdi-package-variant</v-icon
        >

        <v-icon v-if="stock != 0" color="green darken-1"
          >mdi-package-variant-closed</v-icon
        >

        <span>
          {{ producto.stock == 0 ? "Sin stock" : producto.stock }}
        </span>
      </div>
      <!-- STOCK ACTUAL  -->

      <!-- CANTIDAD -->
      <div
        class="tw-col-span-6 lg:tw-col-span-2 tw-py-1 tw-px-4"
      >
        <div class="tw-flex">
          <v-icon @click="disminuirCantidad()">mdi-minus</v-icon>
          <div>
            <v-text-field
              v-model="cantidad"
              solo
              hide-details
              flat
              :min="0"
              class="tw-w-[140px] tw-mx-4 tw-text-center"
            ></v-text-field>
          </div>
          <v-icon @click="aumentarCantidad(producto.stock)">mdi-plus</v-icon>
        </div>
      </div>
      <!-- CANTIDAD -->

      <!-- AGREGAR -->
      <div
        class="tw-col-span-2 tw-py-3 tw-px-4"
      >
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
          <!-- <font-awesome-icon icon="fa-solid fa-cart-plus" color="white" /> -->
        </v-btn>
      </div>
      <!-- AGREGAR -->

      <v-snackbar
        type="success"
        v-model="producto_agregado"
        :timeout="timeout"
        color="green darken-1"
      >
        <v-icon color="white">mdi-check-circle</v-icon>
        <span>Producto agregado con exito!</span>
      </v-snackbar>
    </div>
    <!-- DESKTOP VIEW-->

    <!-- MOBILE VIEW-->
    <div v-if="$vuetify.breakpoint.mobile ? true : false">
      <!-- NOMBRE -->
      <div class="tw-flex tw-flex-col tw-mb-1">
        <div class="tw-font-bold tw-mb-1">Nombre</div>
        <div>
          {{ producto.nombre }}
        </div>
      </div>
      <!-- NOMBRE -->

      <!-- STOCK ACTUAL -->
      <div class="tw-flex tw-flex-row tw-justify-between tw-mb-1">
        <div class="tw-font-bold tw-mb-1">Stock</div>
        <div>
          <v-icon v-if="stock == 0" color="red darken-2"
            >mdi-package-variant</v-icon
          >

          <v-icon v-if="stock != 0" color="green darken-1"
            >mdi-package-variant-closed</v-icon
          >

          <span>
            {{ producto.stock == 0 ? "Sin stock" : producto.stock }}
          </span>
        </div>
      </div>
      <!-- STOCK ACTUAL  -->

      <!-- CANTIDAD -->
      <div class="tw-flex tw-flex-row tw-justify-between tw-mb-1">
        <div class="tw-font-bold tw-mb-1 tw-flex align-center">Cantidad</div>
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
      </div>
      <!-- CANTIDAD -->

      <!-- AGREGAR -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-2 tw-py-3 '
        "
      >
        <v-btn
          :disabled="cantidad == 0"
          class="tw-uppercase tw-bg-neutral-900 tw-w-full tw-text-white tw-font-bold"
          @click="agregarAlCarrito(producto, cantidad)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-shopping-cart-plus"
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
          <!-- <font-awesome-icon icon="fa-solid fa-cart-plus" color="white" /> -->
        </v-btn>
      </div>
      <!-- AGREGAR -->

      <v-snackbar
        type="success"
        v-model="producto_agregado"
        :timeout="timeout"
        color="green darken-1"
      >
        <v-icon color="white">mdi-check-circle</v-icon>
        <span>Producto agregado con exito!</span>
      </v-snackbar>
    </div>
    <!-- MOBILE VIEW-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      cantidad: 0,
      producto_agregado: false,
      timeout: 2000,
    };
  },
  props: {
    producto: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  watch: {
    cantidad(val) {
      this.cantidad = typeof val == "string" ? parseInt(val) : val;
    },
  },
  methods: {
    aumentarCantidad() {
      this.cantidad++;
    },
    disminuirCantidad() {
      if (this.cantidad > 0) {
        this.cantidad--;
      }
    },
    agregarAlCarrito(producto, cantidad) {
      this.producto_agregado = true;
      this.$store.dispatch("carro_solicitudes/addProductToCart", {
        producto,
        cantidad,
      });
    },
  },
  computed: {
    stock() {
      return this.producto.stock;
    },
  },
};
</script>

<style></style>
