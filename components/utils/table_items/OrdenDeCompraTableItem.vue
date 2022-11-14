<template>
  <div>
    <div
      v-if="$vuetify.breakpoint.mobile ? false : true"
      class="tw-grid tw-grid-cols-12"
    >
      <!-- CODIGO -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 lg:tw-col-span-2 tw-py-4 tw-px-4 '
        "
      >
        {{ orden_de_compra.id }}
      </div>
      <!-- CODIGO -->

      <!-- FECHA -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 lg:tw-col-span-6 tw-py-4 tw-px-4'
        "
      >
        {{ formatearFecha(orden_de_compra.fecha_emision) }}
        <!-- {{ formatearHora(orden_de_compra.hora_emision)}} -->
      </div>
      <!-- FECHA -->

      <!-- ARCHIVOS -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 tw-flex lg:tw-col-span-4 tw-py-4 tw-space-x-2'
        "
      >
        <IconoVer
          tipoDocumento="orden_de_compra"
          path="ordenes"
          :idDocumento="orden_de_compra.id"
        />
        <PdfMaker
          tipoDocumento="Orden de compra"
          item="ordenes_de_compra"
          :idDocumento="orden_de_compra.id"
          :labels="labels"
        />
      </div>
      <!-- ARCHIVOS -->
    </div>

    <!--MOBILE VIEW -->
    <div v-if="$vuetify.breakpoint.mobile ? true : false">
      <div class="tw-bg-white tw-my-4 tw-px-4 tw-py-2 tw-text-sm">
        <div class="tw-flex tw-justify-between">
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-bold">Orden de compra</span>
            <span>#{{ orden_de_compra.id }}</span>
          </div>
          <span class="tw-block tw-w-[120px] tw-text-right">{{
            formatearFecha(orden_de_compra.fecha_emision)
          }}</span>
        </div>

        <v-divider class="tw-mt-2"></v-divider>

        <div class="tw-mt-4" v-if="orden_de_compra.proveedor">
          <div
            class="tw-bg-neutral-100 tw-col-span-6 lg:tw-col-span-2 tw-py-2 tw-px-4 tw-flex tw-justify-between"
          >
            <span class="tw-font-light">Proveedor: </span
            ><span class="tw-font-bold"
              >{{ orden_de_compra.proveedor.nombre }}</span
            >
          </div>
        </div>

        <div class="tw-mt-4 tw-flex tw-justify-between">
          <span class="tw-block tw-font-bold tw-w-[40px]"> Visualizar </span>
          <IconoVer
            tipoDocumento="Nota de pedido"
            path="/notas_pedido"
            :idDocumento="orden_de_compra.id"
          />
        </div>
      </div>
    </div>
    <!--END MOBILE VIEW -->
  </div>
</template>

<script>
import moment from "moment";
import IconoVer from "@/components/iconos/IconoVer.vue";
import PdfMaker from "@/components/pdf_maker/PdfMaker.vue";

export default {
  components: { PdfMaker, IconoVer },
  props: ["orden_de_compra", "index"],
  data() {
    return {
      labels: ["Productos", "Cantidad", "Precio unitario", "Precio total"],
    };
  },
  methods: {
    formatearFecha(fecha) {
      return moment(fecha).format("LL");
    },
  },
};
</script>

<style></style>
