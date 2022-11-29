<template>
  <div class="tw-flex lg:tw-flex-row tw-flex-col align-center tw-space-x-4">
    <!-- RETIRO EN TIENDA-->
    <div v-if="tipo == 'retiro_en_tienda'"><IconoRetiroTienda /></div>
    <!-- RETIRO EN TIENDA-->

    <!-- DESPACHO A DOMICILIO-->
    <div v-if="tipo != 'retiro_en_tienda'"><IconoDespachoDomicilio /></div>
    <!-- DESPACHO A DOMICILIO-->

    <!--RADIO BUTTONS-->
    <div>
      <v-radio :value="tipo">
        <template v-slot:label>
          <div>
            <strong class="tw-text-neutral-900">{{ titulo }}</strong>
          </div>
        </template>
      </v-radio>
        <span class="tw-block tw-text-sky-900 tw-w-40 tw-ml-8">{{ descripcion }}</span>
    </div>
    <!--RADIO BUTTONS-->
  </div>
</template>

<script>
import IconoRetiroTienda from "@/components/iconos/IconoRetiroTienda.vue";
import IconoDespachoDomicilio from "@/components/iconos/IconoDespachoDomicilio.vue";
export default {
  components: {
    IconoRetiroTienda,
    IconoDespachoDomicilio,
  },
  props: {
    tipo: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
