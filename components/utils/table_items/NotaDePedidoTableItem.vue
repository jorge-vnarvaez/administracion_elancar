<template>
  <div>
    <!-- DESKTOP VIEW -->
    <v-row :class="[index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100', 'tw-py-4 tw-px-4']">
      <!-- CODIGO -->
      <v-col cols="6" lg="1">
        <span v-if="$vuetify.breakpoint.mobile" class="tw-font-bold">Código</span>
        {{ nota_de_pedido.id }}
      </v-col>
      <!-- CODIGO -->

      <!-- FECHA -->
      <v-col cols="6" lg="4">
        <span v-if="$vuetify.breakpoint.mobile" class="tw-font-bold">Fecha</span>
        {{ formatearFecha(nota_de_pedido.fecha_emision) }}
      </v-col>
      <!-- FECHA -->

      <!-- HORA -->
      <v-col cols="6" lg="2">
        <span v-if="$vuetify.breakpoint.mobile" class="tw-font-bold">Hora</span>
        {{ nota_de_pedido.hora_emision }}
      </v-col>
      <!-- HORA -->

      <!-- ARCHIVOS -->
      <v-col cols="6" lg="4" class="tw-flex tw-space-x-4">
        <IconoVer
          tipoDocumento="Nota de pedido"
          path="/notas_pedido"
          :idDocumento="nota_de_pedido.id"
        />
        <PdfMaker
          tipoDocumento="Nota de pedido"
          item="notas_de_pedido"
          :idDocumento="nota_de_pedido.id"
          :labels="labels"
        />
      </v-col>
      <!-- ARCHIVOS -->
    </v-row>
    <!-- DESKTOP VIEW -->
  </div>
</template>

<script>
import moment from "moment";
import PdfMaker from "@/components/pdf_maker/PdfMaker.vue";
import IconoVer from "@/components/iconos/IconoVer.vue";

export default {
  components: { PdfMaker, IconoVer },
  props: ["nota_de_pedido", "index"],
  data() {
    return {
      labels: ["Productos", "Cant", "Precio/Uni", "Total"],
    };
  },
  methods: {
    formatearFecha(fecha) {
      return moment(fecha).format("LL");
    },
    // formatearHora(hora){
    //     return moment(hora).format("A")
    // }
  },
};
</script>

<style></style>
