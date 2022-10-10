<template>
  <div>
    <div v-if="!cotizacion_proveedor" class="tw-flex tw-flex-col tw-space-y-4">
      <!--SUBTOTAL-->
      <div>
        <span class="tw-font-bold">Subtotal: </span
        ><span> {{ sub_total == 0 ? "$.-" : formatearPrecio(sub_total) }}</span>
      </div>
      <!--SUBTOTAL-->

      <!--IVA-->
      <div>
        <span class="tw-font-bold">IVA (19%): </span
        ><span> {{ iva == 0 ? "$.-" : formatearPrecio(iva) }}</span>
      </div>
      <!--IVA-->

      <!-- TRANSPORTE -->
      <div>
        <span class="tw-font-bold">Transporte: </span
        ><span>
          {{ transporte == 0 ? "$.-" : formatearPrecio(transporte) }}</span
        >
      </div>
      <!-- TRANSPORTE -->

      <!-- TOTAL -->
      <div>
        <span class="tw-font-bold">Total: </span
        ><span> {{ total == 0 ? "$.-" : formatearPrecio(total) }}</span>
      </div>
      <!-- TOTAL -->
    </div>

    <div v-else>
      <!-- TOTAL -->
      <div>
        <span class="tw-font-bold">Total: </span
        ><span> {{ total == 0 ? "$.-" : formatearPrecio(total) }}</span>
      </div>
      <!-- TOTAL -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sub_total: {
      type: Number,
      default: 0,
      desc: "Define el sub total del documento",
    },
    transporte: {
      type: Number,
      default: 0,
      desc: "Define el valor del transporte del documento",
    },
    total: {
      type: Number,
      default: 0,
      desc: "Define el total del documento",
    },
    cotizacion_proveedor: {
      type: Boolean,
      default: false,
      desc: "Define si el documento es una cotización a proveedor",
    },
  },
  methods: {
    formatearPrecio(precio) {
      return precio.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
      });
    },
  },
  computed: {
    iva() {
      return this.sub_total * 0.19;
    },
  },
};
</script>

<style></style>
