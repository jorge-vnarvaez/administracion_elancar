<template>
  <div class="tw-p-24 tw-px-48 tw-h-full">
    <!-- TITLE -->
    <div class="tw-flex tw-space-x-4 align-center">
      <IconoElancar />
      <span
        class="tw-font-bold tw-text-2xl lg:tw-text-4xl tw-uppercase tw-w-[420px]"
        >Nueva Solicitud de Cotización</span
      >
    </div>
    <!-- TITLE -->

    <!-- SELECCIONAR PROVEEDOR -->
    <div v-if="form == 1">
      <FormProveedores />
    </div>
    <!-- SELECCIONAR PROVEEDOR -->

    <div v-if="form == 2">
      <FormReceptores />
    </div>

    <div v-if="form == 3">
      <FormProductos />
    </div>

    <div class="tw-flex tw-w-full tw-justify-between">
      <!--BUTTON ATRAS-->
      <div class="tw-flex tw-justify-end tw-mt-12">
        <v-btn
          v-if="form != 1"
          color="black"
          class="tw-text-white tw-font-bold tw-w-40"
          @click="atras"
          >Atras</v-btn
        >
      </div>
      <!--BUTTON ATRAS-->

      <!--BUTTON CONTINUE-->
      <div class="tw-flex tw-justify-end tw-mt-12">
        <v-btn
          color="black"
          class="tw-text-white tw-font-bold tw-w-40"
          @click="continuar"
          >Continuar</v-btn
        >
      </div>
      <!--BUTTON CONTINUE-->
    </div>
  </div>
</template>

<script>

import IconoElancar from "@/components/reusable/IconoElancar.vue";
import FormProveedores from "@/components/forms/solicitudes/FormProveedores.vue";
import FormReceptores from "@/components/forms/solicitudes/FormReceptores.vue";
import FormProductos from "@/components/forms/solicitudes/FormProductos.vue";

export default {
  middleware: ["auth"],
  components: {
    IconoElancar,
    FormProveedores,
    FormReceptores,
    FormProductos,
  },
  data() {
    return {
      form: 1,
    };
  },
  methods: {
    atras() {
      switch (this.form) {
        case 2:
          this.form = 1;
          break;
        case 3: 
          this.form = 2;
          break;
      }
    },
    continuar() {
      switch (this.form) {
        case 1:
          this.form = 2;
          break;
        case 2:
          this.form = 3;
          break;
      }
    },
  },

  computed: {
    current_proveedor() {
      return this.$store.getters["proveedores/getCurrentProveedor"];
    },
  },
};
</script>

<style></style>
