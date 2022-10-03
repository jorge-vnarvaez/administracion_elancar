<template>
  <div>
    <span class="tw-block tw-font-bold">Datos de envío</span>
    <div v-if="datos_envio != null">
      <div v-if="datos_envio != null">
        <div class="tw-flex tw-flex-col">
          <!--CALLE -->
          <span>
            {{ datos_envio.calle }}
          </span>
          <!--CALLE -->

          <!--NRO CALLE  -->
          <span>
            {{ datos_envio.numero }}
          </span>
          <!--NRO CALLE  -->
        </div>
      </div>
    </div>

    <div v-else>
        <div>
          <span class="tw-block">{{ cliente.direcciones[0].calle }} #{{ cliente.direcciones[0].numero }}</span>
          <span>Recibe: {{ cliente.primer_nombre }} {{ cliente.apellido_paterno }} {{ cliente.apellido_materno }}</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    datos_envio: {
      type: Object,
      default: () => {},
    },
    cliente: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
