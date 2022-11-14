<template>
  <div>
    <!-- DESKTOP VIEW -->
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
        {{ nota_de_pedido.id }}
      </div>
      <!-- CODIGO -->

      <!-- FECHA -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 lg:tw-col-span-4 tw-py-4'
        "
      >
        {{ formatearFecha(nota_de_pedido.fecha_emision) }}
      </div>
      <!-- FECHA -->

      <!-- HORA -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 lg:tw-col-span-2 tw-py-4'
        "
      >
        {{ nota_de_pedido.hora_emision }}
      </div>
      <!-- HORA -->

      <!-- ARCHIVOS -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 tw-flex lg:tw-col-span-4 tw-py-4 tw-space-x-2'
        "
      >
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
      </div>
      <!-- ARCHIVOS -->
    </div>
    <!-- DESKTOP VIEW -->

    <!--MOBILE VIEW -->
    <div v-if="$vuetify.breakpoint.mobile ? true : false">
      <div class="tw-bg-white tw-my-4 tw-px-4 tw-py-2 tw-text-sm">
        <div class="tw-flex tw-justify-between">
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-bold">Nota de pedido</span>
            <span>#{{ nota_de_pedido.id }}</span>
          </div>
          <span class="tw-block tw-w-[120px] tw-text-right">{{
            formatearFecha(nota_de_pedido.fecha_emision)
          }}</span>
        </div>

        <v-divider class="tw-mt-2"></v-divider>

        <div class="tw-mt-4" v-if="nota_de_pedido.cliente">
          <div
            class="tw-bg-neutral-100 tw-col-span-6 lg:tw-col-span-2 tw-py-2 tw-px-4 tw-flex tw-justify-between"
          >
            <span class="tw-font-light">Cliente: </span
            ><span class="tw-font-bold"
              >{{ nota_de_pedido.cliente.primer_nombre }}
              {{ nota_de_pedido.cliente.apellido_paterno }}</span
            >
          </div>
        </div>

        <div class="tw-mt-4 tw-flex tw-justify-between">
          <span class="tw-block tw-font-bold tw-w-[40px]">
            Visualizar
          </span>
          <IconoVer
            tipoDocumento="Nota de pedido"
            path="/notas_pedido"
            :idDocumento="nota_de_pedido.id"
          />
        </div>
      </div>
    </div>
    <!--END MOBILE VIEW -->
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
      labels: ["Productos", "Cant", "Precio Uni", "Precio total", "Kg"],
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
