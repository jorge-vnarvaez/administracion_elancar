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
        {{ cotizacion_cliente.id }}
      </div>
      <!-- CODIGO -->

      <!-- FECHA -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 lg:tw-col-span-4 tw-py-4'
        "
      >
        {{ formatearFecha(cotizacion_cliente.fecha_emision) }}
      </div>
      <!-- FECHA -->

      <!-- HORA -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 lg:tw-col-span-2 tw-py-4'
        "
      >
        {{ cotizacion_cliente.hora_emision }}
      </div>
      <!-- HORA -->

      <!-- CONVERTIDA -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 lg:tw-col-span-2 tw-py-4'
        "
      >
        <v-icon v-if="cotizacion_cliente.convertida" color="green darken-1">mdi-check-bold</v-icon>
        <v-icon v-if="!cotizacion_cliente.convertida" color="red darken-1">mdi-close-thick</v-icon>
      </div>
      <!-- CONVERTIDA -->

      <!-- ARCHIVOS -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 tw-flex lg:tw-col-span-2 tw-py-4 tw-space-x-2'
        "
      >
        <IconoVer
          tipoDocumento="Cotizacion"
          path="/cotizaciones"
          :idDocumento="cotizacion_cliente.id"
        />
        <PdfMaker
          tipoDocumento="Cotizacion"
          :idDocumento="cotizacion_cliente.id"
          item="cotizaciones_clientes"
          :labels="labels"
        />
      </div>
      <!-- ARCHIVOS -->
    </div>
    <!--DESKTOP VIEW -->

    <!--MOBILE VIEW -->
    <div v-if="$vuetify.breakpoint.mobile ? true : false">
      <div class="tw-bg-white tw-my-4 tw-px-4 tw-py-2 tw-text-sm">
        <div class="tw-flex tw-justify-between">
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-bold">Cotización</span>
            <span>#{{ cotizacion_cliente.id }}</span>
          </div>
          <span class="tw-block tw-w-[120px] tw-text-right">{{
            formatearFecha(cotizacion_cliente.fecha_emision)
          }}</span>
        </div>

        <v-divider class="tw-mt-2"></v-divider>

        <div class="tw-mt-4" v-if="cotizacion_cliente.cliente">
          <div
            class="tw-bg-neutral-100 tw-col-span-6 lg:tw-col-span-2 tw-py-2 tw-px-4 tw-flex tw-justify-between"
          >
            <span class="tw-font-light">Cliente: </span
            ><span class="tw-font-bold"
              >{{ cotizacion_cliente.cliente.primer_nombre }}
              {{ cotizacion_cliente.cliente.apellido_paterno }}</span
            >
          </div>
        </div>

        <div class="tw-mt-4 tw-flex tw-justify-between">
          <span class="tw-block tw-font-bold tw-w-[40px]"> Visualizar </span>
          <IconoVer
            tipoDocumento="Cotización"
            path="/cotizaciones"
            :idDocumento="cotizacion_cliente.id"
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
  components: { IconoVer, PdfMaker },
  props: ["cotizacion_cliente", "index"],
  data() {
    return {
      labels: ["Productos", "Cant", "Precio/Uni", "Total"],
    };
  },
  methods: {
    formatearFecha(fecha) {
      return moment(fecha).format("LL");
    },
    formatearHora(hora) {
      return moment(hora).format("HH:mm:ss");
    },
  },
};
</script>

<style></style>
