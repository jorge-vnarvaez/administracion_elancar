<template>
  <div>
    <div
      class="tw-bg-yellow-400 tw-h-10 tw-flex justify-end align-center tw-px-4"
    >
      <v-icon @click="toggleDrawer">mdi-menu</v-icon>
    </div>

    <!-- <div
      v-if="drawer && !opcion_visible"
      class="tw-bg-neutral-900 tw-text-white tw-px-4 tw-flex tw-flex-col align-end"
    >
      <div class="tw-py-2">Inicio</div>

      <div>
        <div class="tw-py-2" @click="opcion_visible = 1"><span>Ventas</span><v-icon color="white">mdi-chevron-down</v-icon></div>

        <div v-if="opcion_visible == 1" class="tw-flex tw-flex-col align-end">
          <div class="tw-flex tw-flex-col align-end">
            <div class="tw-py-2">Nueva venta</div>
            <div class="tw-py-2">Listado de ventas</div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      opcion_visible: 0,
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style></style>
