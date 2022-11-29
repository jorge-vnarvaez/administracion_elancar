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
        {{ solicitud_de_cotizacion.id }}
      </div>
      <!-- CODIGO -->

      <!-- FECHA -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 lg:tw-col-span-4 tw-py-4 tw-px-4'
        "
      >
        {{ formatearFecha(solicitud_de_cotizacion.fecha_emision) }}
        <!-- {{ formatearHora(solicitud_de_cotizacion.hora_emision)}} -->
      </div>
      <!-- FECHA -->

      <!-- HORA -->
      <div
        :class="
          `${index % 2 == 0 ? 'tw-bg-white' : 'tw-bg-neutral-100'}` +
          ' tw-col-span-6 lg:tw-col-span-2 tw-py-4'
        "
      >
        {{ solicitud_de_cotizacion.hora_emision }}
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
          tipoDocumento="Solicitud de cotización"
          path="/solicitudes"
          :idDocumento="solicitud_de_cotizacion.id"
        />
        <PdfMaker
          tipoDocumento="Solicitud de cotización"
          item="cotizaciones_proveedor"
          :idDocumento="solicitud_de_cotizacion.id"
          :labels="labels"
        />
        <!-- <IconoDescarga /> -->
      </div>
      <!-- ARCHIVOS -->
    </div>
    <!--DESKTOP VIEW -->

    <!--MOBILE VIEW -->
    <div v-if="$vuetify.breakpoint.mobile ? true : false">
      <div class="tw-bg-white tw-my-4 tw-px-4 tw-py-2 tw-text-sm">
        <div class="tw-flex tw-justify-between">
          <div class="tw-flex tw-flex-col">
            <span class="tw-font-bold">Solicitud de cotización</span>
            <span>#{{ solicitud_de_cotizacion.id }}</span>
          </div>
          <span class="tw-block tw-w-[120px] tw-text-right">{{
            formatearFecha(solicitud_de_cotizacion.fecha_emision)
          }}</span>
        </div>

        <v-divider class="tw-mt-2"></v-divider>

        <div class="tw-mt-4" v-if="solicitud_de_cotizacion.proveedor">
          <div
            class="tw-bg-neutral-100 tw-col-span-6 lg:tw-col-span-2 tw-py-2 tw-px-4 tw-flex tw-justify-between"
          >
            <span class="tw-font-light">Proveedor: </span
            ><span class="tw-font-bold">{{
              solicitud_de_cotizacion.proveedor.nombre
            }}</span>
          </div>
        </div>

        <div class="tw-mt-4 tw-flex tw-justify-between">
          <span class="tw-block tw-font-bold tw-w-[40px]"> Visualizar </span>
          <IconoVer
            tipoDocumento="Solicitud de cotización"
            path="/solicitudes"
            :idDocumento="solicitud_de_cotizacion.id"
          />
        </div>
      </div>
    </div>
    <!--END MOBILE VIEW -->
  </div>
</template>

<script>
// import IconoDescarga from "@/components/iconos/IconoDescarga.vue";
import moment from "moment";
import PdfMaker from "@/components/pdf_maker/PdfMaker.vue";
import IconoVer from "@/components/iconos/IconoVer.vue";

export default {
  components: { IconoVer, PdfMaker },
  props: ["solicitud_de_cotizacion", "index"],
  data() {
    return {
      labels: ["Productos", "Cant", "Precio/Uni", "Total"],
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
