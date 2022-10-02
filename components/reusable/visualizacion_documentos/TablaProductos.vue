<template>
  <div>
    <!-- TABLE HEADERS -->
    <div class="tw-grid tw-grid-cols-12 tw-mt-12">
      <div v-for="(item, index) in labels" :key="index" :class="col_span_table(index)">
        <span class="tw-block tw-font-bold">{{ item.titulo }}</span>
      </div>
    </div>
    <!-- TABLE HEADERS -->

    <!-- V-DIVIDER -->
    <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-4"></div>
    <!-- V-DIVIDER -->

    <!-- TABLE BODY -->
    <div v-for="(item, index) in productos" :key="index" class="tw-grid tw-grid-cols-12 my-8">
        <span :class="col_span_table(0)">{{ item.nombre }}</span>
        <span :class="col_span_table(1)">{{ item.cantidad }}</span>
        <span :class="col_span_table(2)">{{ item.cantidad * item.kg }}</span>
        <span :class="col_span_table(3)">{{ item.precio }}</span>
        <span :class="col_span_table(4)">{{ item.cantidad * item.precio }}</span>
    </div>
    <!-- TABLE BODY -->
  </div>
</template>

<script>

export default {
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
  },
  methods: {
    col_span_table(index) {
      switch(index) {
        case 0:
          return "tw-col-span-3";
        case 1:
          return "tw-col-span-2";
        case 2:
          return "tw-col-span-2";
        case 3:
          return "tw-col-span-2";
        case 4:
          return "tw-col-span-2";
        case 5:
          return "tw-col-span-1";
      }
    }
  },
};
</script>

<style>
</style>