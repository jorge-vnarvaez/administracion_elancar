<template>
  <div v-if="proveedores.length > 0">
    <!-- SUBTITLE, DESCRIPTION AND SEARCH -->
    <div class="tw-flex align-center tw-mt-12">
      <div>
        <span class="tw-font-bold tw-uppercase lg:tw-text-2xl">Proveedor</span>
        <span class="tw-block lg:tw-text-xl">
          Seleccione el proveedor al cuál desea extender la solicitud de cotización
        </span>
      </div>
    </div>
    <!-- SUBTITLE, DESCRIPTION AND SEARCH -->

    <!-- TABLE HEADERS -->
    <div
      v-if="$vuetify.breakpoint.mobile ? false : true"
      class="tw-grid tw-grid-cols-12 tw-mt-8 tw-mb-4 tw-px-4"
    >
      <div class="tw-col-span-1"></div>

      <div class="tw-col-span-6 lg:tw-col-span-5">
        <span class="tw-font-bold">Nombre</span>
      </div>

      <div class="tw-col-span-6 lg:tw-col-span-5">
        <span class="tw-font-bold">Casa Matriz</span>
      </div>
    </div>
    <!-- TABLE HEADERS -->

    <!-- TABLE CONTENT -->
    <div
      v-for="(proveedor, index) in proveedores.slice(
        itemsPerPage * page - itemsPerPage,
        itemsPerPage * page
      )"
      :key="proveedor.id"
      class="tw-grid tw-grid-cols-12"
      :class="`${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` + ' '"
    >
      <!-- RADIO BUTTON -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-12 lg:tw-col-span-1 tw-px-4 '
        "
      >
        <v-radio-group v-model="radioGroup" class="tw-py-0" hide-details>
          <v-radio
            :key="proveedor.id"
            :value="proveedor.id"
            @click="proveedorSeleccionado(proveedor)"
            hide-details
          >
          </v-radio>
        </v-radio-group>
      </div>
      <!-- RADIO BUTTON -->

      <!-- NOMBRE Y CASA MATRIZ -->
      <ProveedorTableItem
        class="tw-flex lg:align-center tw-col-span-11"
        :proveedor="proveedor"
        :index="index"
        :key="proveedor.id"
      />
      <!-- NOMBRE Y CASA MATRIZ -->
    </div>
    <!-- TABLE CONTENT -->
    
    <!--[PAGINATION]-->
    <div class="tw-my-8">
      <v-pagination
        v-model="page"
        color="black"
        :length="Math.ceil(proveedores.length / itemsPerPage)"
        total-visible="7"
      ></v-pagination>
    </div>
    <!--[PAGINATION]-->
  </div>
</template>

<script>
import ProveedorTableItem from "@/components/utils/table_items/ProveedorTableItem.vue";

export default {
  props: {

    proveedores: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ProveedorTableItem,
  },
  data() {
    return {
      radioGroup: 1,
      page: 1,
      itemsPerPage: 6,
    };
  },
  async fetch() {
    this.$store.dispatch("carro_solicitudes/fetchProveedores");
    this.$store.commit("carro_solicitudes/setCarro", []);
    this.$cookies.remove("carroSolicitudes");
  },
  methods: {
    proveedorSeleccionado(proveedor) {
      this.$store.dispatch("carro_solicitudes/setCurrentProveedor", proveedor);
    },
  },
};
</script>

<style></style>
