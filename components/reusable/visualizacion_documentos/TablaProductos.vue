<template>
  <div class="tw-mt-12 tw-flex tw-flex-col tw-h-full tw-justify-between">
    <div>
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
        <span :class="col_span_table(0)">{{ item.nombre }}</span>
        <span :class="col_span_table(1) + ' tw-font-bold'">{{
          item.cantidad
        }}</span>
        <span
          v-if="!cotizacion_proveedor"
          :class="col_span_table(2) + ' tw-font-bold'"
          >{{ item.cantidad * item.kg }}</span
        >
        <span :class="col_span_table(3)">{{
          cotizacion_proveedor ? "$.-" : formatearPrecio(item.precio)
        }}</span>
        <span :class="col_span_table(4)">{{
          cotizacion_proveedor
            ? "$.-"
            : formatearPrecio(item.cantidad * item.precio)
        }}</span>
      </div>
      <!-- TABLE BODY -->
    </div>

    <div :class="'tw-flex' + cotizacion_cliente ? ' tw-justify-between tw-align-center' : ''">
      <!-- MEMBRETE INFERIOR -->
      <MembreteInferiorPdf v-if="cotizacion_cliente" />
      <!-- MEMBRETE INFERIOR -->

      <!-- PLANTILLA PRECIO-->
      <PlantillaPrecio
        :sub_total="sub_total"
        :transporte="0"
        :total="total"
        :cotizacion_proveedor="cotizacion_proveedor"
        class="tw-justify-end"
      />
      <!-- PLANTILLA PRECIO-->
    </div>
  </div>
</template>

<script>
import MembreteInferiorPdf from "@/components/reusable/visualizacion_documentos/MembreteInferiorPdf.vue";
import PlantillaPrecio from "@/components/reusable/visualizacion_documentos/PlantillaPrecio.vue";

export default {
  components: {
    MembreteInferiorPdf,
    PlantillaPrecio,
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
    }
  },
  methods: {
    formatearPrecio(precio) {
      return precio.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
      });
    },
    col_span_table(index) {
      switch (index) {
        case 0:
          return "tw-col-span-3";
        case 1:
          return "tw-col-span-2";
        case 2:
          return this.cotizacion_proveedor ? "tw-col-span-3" : "tw-col-span-1";
        case 3:
          return "tw-col-span-3";
        case 4:
          return "tw-col-span-2";
        case 5:
          return "tw-col-span-1";
      }
    },
  },
  computed: {
    sub_total() {
      let total = 0;
      this.productos.forEach((item) => {
        total += item.cantidad * item.precio;
      });
      return this.cotizacion_proveedor ? 0 : total;
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
