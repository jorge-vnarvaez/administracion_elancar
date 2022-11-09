<template>
  <div class="tw-mt-8 tw-flex tw-flex-col tw-justify-between tw-text-xs">
    <!-- DESKTOP VIEW -->
    <div v-if="$vuetify.breakpoint.mobile ? false : true">
      <span class="tw-block tw-mb-4 tw-font-bold tw-text-2xl">Detalle</span>

      <!-- TABLE HEADERS -->
      <div class="tw-grid tw-grid-cols-12">
        <div
          v-for="(item, index) in labels"
          :key="index"
          :class="col_span_table(index)"
        >
          <span class="tw-block tw-font-bold">{{ item }}</span>
        </div>
      </div>
      <!-- TABLE HEADERS -->

      <!-- V-DIVIDER -->
      <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
      <!-- V-DIVIDER -->

      <!-- TABLE BODY -->
      <div
        v-for="(item, index) in productos"
        :key="index"
        class="tw-grid tw-grid-cols-12 tw-my-4"
      >
        <!-- NOMBRE PRODUCTO -->
        <span :class="col_span_table(0) + ' tw-flex align-center'">{{ item.nombre }}</span>
        <!-- NOMBRE PRODUCTO -->

        <!-- CANTIDAD -->
        <span
          v-if="visualizando"
          :class="col_span_table(1) + ' tw-font-bold'"
          >{{ item.cantidad }}</span
        >

        <div v-if="visualizando == false" :class="col_span_table(1)">
          <CantidadProductos :item="item" :cart_type="cart_type" />
        </div>

        <!-- CANTIDAD -->

        <!-- TOTAL KG -->
        <span
          v-if="!cotizacion_proveedor"
          :class="col_span_table(2) + ' tw-font-bold tw-flex align-center'"
          >{{ (item.cantidad * item.kg).toFixed(2) }}</span
        >
        <!-- TOTAL KG -->

        <!-- PRECIO UNITARIO -->
        <span :class="col_span_table(3) + ' tw-flex align-center'">{{
          cotizacion_proveedor ? "$.-" : $formatearPrecio(item.precio)
        }}</span>
        <!-- PRECIO UNITARIO -->

        <!-- PRECIO TOTAL -->
        <span :class="col_span_table(4) + ' tw-flex align-center'">{{
          cotizacion_proveedor
            ? "$.-"
            : $formatearPrecio(item.cantidad * item.precio)
        }}</span>
        <!-- PRECIO TOTAL -->
      </div>
      <!-- TABLE BODY -->
    </div>
    <!-- DESKTOP VIEW -->

    <!-- MOBILE VIEW -->
    <div v-if="$vuetify.breakpoint.mobile ? true : false">
      <div
        v-for="(item, index) in productos"
        :key="index"
        class="tw-grid tw-grid-cols-12 tw-my-4 tw-gap-x-8"
      >
        {{ item }}
      </div>
    </div>

    <!-- MOBILE VIEW -->

    <!-- MEMBRETE INFERIOR -->
    <div class="tw-flex tw-justify-between align-center tw-mt-12">
      <div v-if="cotizacion_cliente"><MembreteInferiorPdf /></div>
      <!-- PLANTILLA PRECIO-->
      <div class="tw-flex tw-justify-end tw-w-full">
        <PlantillaPrecio
          :total_kg="total_kg"
          :sub_total="sub_total"
          :transporte="0"
          :total="total"
          :cotizacion_proveedor="cotizacion_proveedor"
        />
      </div>
      <!-- PLANTILLA PRECIO-->
    </div>
    <!-- MEMBRETE INFERIOR -->
  </div>
</template>

<script>

import MembreteInferiorPdf from "@/components/reusable/visualizacion_documentos/MembreteInferiorPdf.vue";
import PlantillaPrecio from "@/components/reusable/visualizacion_documentos/PlantillaPrecio.vue";
import CantidadProductos from "@/components/utils/CantidadProductos.vue";

export default {
  components: {
    MembreteInferiorPdf,
    PlantillaPrecio,
    CantidadProductos,
  },
  props: {
    labels: {
      type: Array,
      default: () => [],
      desc: "Describe el nombre de las columnas para la tabla por ejemplo [Productos, Cantidad, Kg, Precio, Etc]",
    },
    productos: {
      type: [Array, String],
      default: () => [],
      desc: "Describe los productos que se van a mostrar en la tabla",
    },
    cotizacion_proveedor: {
      type: Boolean,
      default: false,
      desc: "Define si la cotización va dirigida a proveedor lo que retira los precios de la tabla",
    },
    cotizacion_cliente: {
      type: Boolean,
      default: false,
      desc: "Define si la cotización va dirigida a cliente lo que permite agregar el precio de transporte y el membrete inferior",
    },
    orden_de_compra: {
      type: Boolean,
      default: false,
      desc: "Define si el documento donde se inyecta la tabla es una orden de compra",
    },
    nota_de_pedido: {
      type: Boolean,
      default: false,
      desc: "Define si el documento donde se inyecta la tabla es una nota de pedido",
    },
    visualizando: {
      type: Boolean,
      default: false,
      desc: "Define si el documento donde se inyecta la tabla es una visualizacion del documento",
    },
    cart_type: {
      type: String,
      default: "compras",
      desc: "Define el tipo de carrito que se va a mostrar en la tabla",
    }
  },
  methods: {
    col_span_table(index) {
      switch (index) {
        case 0:
          return "tw-col-span-3";
        case 1:
          return "tw-col-span-3";
        case 2:
          return "tw-col-span-2";
        case 3:
          return "tw-col-span-2";
        case 4:
          return "tw-col-span-2";
        default:
          return "tw-col-span-2";
      }
    },
    colors(index) {
      switch (index) {
        case 0:
          return "tw-bg-red-100";
        case 1:
          return "tw-bg-green-200";
        case 2:
          return "tw-bg-blue-100";
        case 3:
          return "tw-bg-yellow-200";
        case 4:
          return "tw-bg-orange-100";
        case 5:
          return "tw-bg-gray-200";
      }
    }
  },
  computed: {
    sub_total() {
      let total = 0;
      this.productos.forEach((item) => {
        total += item.cantidad * item.precio;
      });
      return this.cotizacion_proveedor ? 0 : total;
    },
    total_kg() {
      return this.$total_kg(this.productos.map((item) => (item.cantidad * item.kg))).toFixed(2);
    },
    transporte() {
      return 0;
    },
    total() {
      return this.sub_total + this.transporte + this.sub_total * 0.19;
    },
  },
};
</script>

<style></style>
