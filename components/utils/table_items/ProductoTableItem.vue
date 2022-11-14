<template>
  <v-responsive max-width="1800">
    <!-- START DESKTOP VIEW -->
    <div
      class="tw-grid tw-grid-cols-12"
      v-if="$vuetify.breakpoint.mobile ? false : true"
    >
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
        {{ $formatearPrecio(producto.precio) }}
      </div>
      <!-- PRECIO NETO -->

      <!-- STOCK -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-3 lg:tw-col-span-1 tw-py-4 tw-px-4'
        "
      >
        {{ producto.stock || 0 }}
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
          ' tw-col-span-2 tw-py-3 tw-px-4'
        "
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
    <!-- END DESKTOP VIEW -->

    <!-- START MOBILE VIEW -->
    <div v-if="$vuetify.breakpoint.mobile ? true : false">
      <!--[TABLE HEADERS]-->
      <div class="tw-bg-white tw-my-4 tw-px-4 tw-py-2 tw-text-sm">
        <!-- NOMBRE -->
        <div class="tw-flex tw-justify-between tw-items-center tw-mt-2">
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-bold">Nombre</span>
          </div>
          <span class="tw-block tw-w-[220px] tw-text-right">{{
            producto.nombre
          }}</span>
        </div>
        <!-- NOMBRE -->


        <!-- PRECIO NETO -->
        <div class="tw-flex tw-justify-between tw-mt-2 tw-items-center">
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-bold">Precio neto</span>
          </div>
          <span class="tw-block tw-text-right">{{
            $formatearPrecio(producto.precio)
          }}</span>
        </div>
        <!-- PRECIO NETO -->

        <!-- STOCK -->
        <div class="tw-flex tw-justify-between tw-mt-2 tw-items-center">
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-bold">Stock</span>
          </div>
          <span class="tw-block tw-text-right">{{ producto.stock || 0 }}</span>
        </div>
        <!-- STOCK -->

        <!-- CANTIDAD -->
        <div class="tw-flex tw-justify-between tw-mt-2 tw-items-center">
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-bold">Cantidad</span>
          </div>
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
        <div class="tw-flex tw-mt-2 tw-items-center">
          <v-btn
            :disabled="cantidad == 0"
            class="tw-uppercase tw-bg-neutral-900 tw-text-white tw-w-full tw-font-bold tw-px-4 tw-py-2"
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
        </div>
        <!-- AGREGAR -->
      </div>
      <!--[TABLE HEADERS]-->

      
      <div class="tw-grid tw-grid-cols-12">
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
    </div>
    <!-- END MOBILE VIEW -->
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
