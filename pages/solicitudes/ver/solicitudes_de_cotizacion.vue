<template>
  <div class="tw-p-24">
    <!--LOGO, TITULO Y BUSCADOR -->
    <div class="tw-flex align-center tw-space-x-4">
      <!--LOGO-->
      <div class="tw-w-[74px] tw-h-[100px]">
        <v-img src="/logo_elancar.png" width="74" height="100" contain></v-img>
      </div>
      <!--LOGO-->

      <!--TITULO-->
      <div class="tw-flex tw-flex-col">
        <span class="tw-text-4xl">Historial</span>
        <span class="tw-text-2xl tw-text-gray-800"
          >Solicitudes de cotización</span
        >
      </div>
      <!--TITULO-->
    </div>
    <!--LOGO, TITULO Y BUSCADOR -->

    <!--AGREGAR SOLICITUD-->
    <div
      @click="openModal"
      class="tw-cursor-pointer tw-w-max tw-bg-neutral-900 tw-px-6 tw-py-3 tw-rounded-lg tw-mt-12 tw-flex align-center tw-space-x-2"
    >
      <v-icon color="white">mdi-plus</v-icon>
      <span class="tw-uppercase tw-text-white tw-font-bold"
        >Nueva solicitud</span
      >
    </div>
    <!--AGREGAR SOLICITUD-->

    <!--MODEL-->
    <CardNewSolicitud v-if="modal" />
    <!--MODEL-->
  </div>
</template>

<script>
import CardNewSolicitud from "@/components/reusable/CardNewSolicitud.vue";
export default {
  components: {
    CardNewSolicitud,
  },
  data() {
    return {
      modal: true,
    }
  },
  methods: {
    openModal() {
      this.modal = true;
    },
  }
};
</script>

<style></style>
