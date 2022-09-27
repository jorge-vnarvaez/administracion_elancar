<template>
  <div class="tw-p-24 tw-px-64">
    <!--PASO 1-->
    <div class="tw-bg-white tw-p-8">
      <div class="tw-mb-8">
        <span class="tw-block tw-font-bold">Paso 1</span>
        <span class="tw-block tw-text-sky-900"
          >Solicite los datos personales al comprador para identificar quién
          retira en tienda o recibe el pedido.</span
        >
      </div>

      <!-- FORM CLIENTE-->
      <v-form
        ref="form"
        v-model="validado"
        lazy-validation
        class="tw-grid tw-grid-cols-12 tw-gap-x-20"
      >
        <div class="tw-col-span-2 tw-place-self-center">
          <!-- ICONO-->
          <IconoUsuario />
          <!-- ICONO-->
        </div>
        <v-text-field
          v-model="datos_cliente.rut"
          :rules="rutRules"
          label="Rut"
          required
          class="tw-col-span-4"
        ></v-text-field>
        <v-text-field
          v-model="datos_cliente.nombre"
          :rules="nombreRules"
          label="Nombre"
          required
          class="tw-col-span-4"
        ></v-text-field>
        <v-text-field
          v-model="datos_cliente.telefono"
          :rules="telefonoRules"
          label="Telefono"
          required
          class="tw-col-span-4 tw-col-start-3"
        ></v-text-field>
        <v-text-field
          v-model="datos_cliente.email"
          :rules="emailRules"
          label="Email"
          required
          class="tw-col-span-4"
        ></v-text-field>
      </v-form>

      <!-- FORM CLIENTE-->
    </div>
    <!--PASO 1-->

    <!--PASO 2-->
    <div class="tw-bg-white tw-p-8 tw-mt-12">
      <div class="tw-mb-8">
        <span class="tw-block tw-font-bold">Paso 2</span>
        <span class="tw-block tw-text-sky-900"
          >Seleccione el tipo de despacho (Retiro en tienda o despacho a
          domicilio).</span
        >
      </div>

      <v-radio-group v-model="opciones_despacho" mandatory>
        <div class="tw-flex tw-justify-between tw-w-[700px]">
          <OpcionDespacho
            tipo="retiro_en_tienda"
            titulo="Retiro en Tienda"
            descripcion="*No aplica coste de transporte"
          />
          <OpcionDespacho
            tipo="despacho_domicilio"
            titulo="Despacho a Domicilio"
            descripcion="*Coste de transporte sujeto a evaluación"
          />
        </div>
      </v-radio-group>
    </div>
    <!--PASO 2-->

    <!--PASO 3-->
    <div
      v-if="opciones_despacho == 'despacho_domicilio'"
      class="tw-bg-white tw-p-8 tw-mt-12"
    >
      <div class="tw-mb-8">
        <span class="tw-block tw-font-bold">Paso 3</span>
        <span class="tw-block tw-text-sky-900"
          >Solicite los datos de despacho al comprador para identificar la
          dirección de despacho.</span
        >
      </div>
      <div></div>
    </div>
    <!--PASO 3-->
  </div>
</template>

<script>
import IconoUsuario from "@/components/iconos/IconoUsuario.vue";
import OpcionDespacho from "@/components/reusable/OpcionDespacho.vue";
export default {
  components: {
    IconoUsuario,
    OpcionDespacho,
  },
  data() {
    return {
      datos_cliente: {
        rut: "",
        nombre: "",
        telefono: "",
        email: "",
        calle: "",
        numero: "",
      },
      rutRules: [
        (v) => !!v || "Rut es requerido",
        (v) =>
          /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/.test(v) || "Rut no es valido",
      ],
      nombreRules: [(v) => !!v || "Nombre es requerido"],
      telefonoRules: [
        (v) => !!v || "Telefono es requerido",
        (v) => /^\d{9}$/.test(v) || "Telefono no es valido",
      ],
      emailRules: [
        (v) => !!v || "Email es requerido",
        (v) => /.+@.+\..+/.test(v) || "Email no es valido",
      ],
      validado: false,
      opciones_despacho: null,
    };
  },
};
</script>

<style></style>
