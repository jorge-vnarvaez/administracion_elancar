<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-48">
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
      <FormProveedores
        :proveedores="proveedores"
        :page="page"
        :itemsPerPage="itemsPerPage"
      />
    </div>
    <!-- SELECCIONAR PROVEEDOR -->

    <div v-if="form == 2">
      <FormReceptores
        :receptores="receptores"
        :page="page"
        :itemsPerPage="itemsPerPage"
      />
    </div>

    <div v-if="form == 3">
      <FormProductos
        :class="`${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` + ' '"
        :page="page"
        :itemsPerPage="itemsPerPage"
      />
    </div>

    <div class="tw-flex tw-w-full tw-justify-between">
      <!--BUTTON ATRAS-->
      <div class="tw-flex tw-justify-end tw-mt-12">
        <v-btn
          v-if="form != 1"
          color="black"
          class="tw-text-white tw-font-bold tw-w-[130px] lg:tw-w-40"
          @click="atras"
          >Volver</v-btn
        >
      </div>
      <!--BUTTON ATRAS-->

      <!--BUTTON CONTINUE-->
      <div class="tw-flex tw-justify-end tw-mt-12">
        <v-btn
          color="black"
          class="tw-text-white tw-font-bold tw-w-[130px] lg:tw-w-40"
          :disabled="form == 3 && carro_solicitudes"
          @click="continuar"
          >Continuar</v-btn
        >
      </div>
      <!--BUTTON CONTINUE-->
    </div>
  </div>
</template>

<script>
import IconoElancar from "@/components/iconos/IconoElancar.vue";
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
      itemsPerPage: 5,
      page: 1,
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
        case 3:
          this.$router.push("/carro_de_solicitudes");
          break;
      }
    },
  },
  computed: {
    current_proveedor() {
      return this.$store.getters["carro_solicitudes/getCurrentProveedor"];
    },
    current_receptor() {
      return this.$store.getters["carro_solicitudes/getCurrentReceptor"];
    },
    proveedores() {
      return this.$store.getters["carro_solicitudes/getProveedores"];
    },
    receptores() {
      return this.$store.getters[
        "carro_solicitudes/getReceptoresCurrentProveedor"
      ];
    },
    carro_solicitudes() {
      return this.$store.getters[
        "carro_solicitudes/getCarroSolicitudesIsEmpty"
      ];
    },
    length_items() {
      // create an switch based on the form
      // return the length of the items from store proveedores
      // if form == 1, return the length of the proveedores
      // if form == 2, return the length of the receptores
      // if form == 3, return the length of the productos
      switch (this.form) {
        case 1:
          return this.$store.getters["carro_solicitudes/getProveedores"].length;
        case 2:
          return this.$store.getters[
            "carro_solicitudes/getReceptoresCurrentProveedor"
          ];
        case 3:
          return this.$store.getters[
            "carro_solicitudes/getProductosCurrentProveedor"
          ];
      }
    },
  },
};
</script>

<style></style>
