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
        class="tw-grid tw-grid-cols-12 tw-gap-x-20 place-items-center"
      >
        <div class="tw-col-span-12 tw-grid tw-grid-cols-12 tw-gap-x-20">
          <v-text-field
            v-model="info_despacho.datos_cliente.rut"
            :rules="rutRules"
            label="Rut"
            required
            class="tw-col-span-3"
          >
          </v-text-field>
          <v-text-field
            v-model="info_despacho.datos_cliente.nombre_completo"
            :rules="nombreRules"
            label="Nombre"
            required
            class="tw-col-span-3"
          >
          </v-text-field>
        </div>

        <v-text-field
          v-model="info_despacho.datos_cliente.fono"
          :rules="telefonoRules"
          label="Telefono"
          required
          class="tw-col-span-3 tw-o"
        ></v-text-field>
        <v-text-field
          v-model="info_despacho.datos_cliente.email"
          :rules="emailRules"
          label="Email"
          required
          class="tw-col-span-3"
        >
        </v-text-field>
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
        <div class="tw-flex tw-justify-between tw-w-[740px]">
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
      <div class="tw-grid tw-grid-cols-12 tw-gap-x-20">
        <v-text-field
          v-model="info_despacho.datos_envio.calle"
          label="Calle"
          required
          class="tw-col-span-3"
        >
        </v-text-field>
        <v-text-field
          v-model="info_despacho.datos_envio.numero"
          label="Numero"
          required
          class="tw-col-span-3"
        >
        </v-text-field>
      </div>
    </div>
    <!--PASO 3-->

    <!--BUTTON CONTINUE-->

    <div class="tw-flex tw-justify-end tw-mt-12">
      <v-btn
        color="black"
        class="tw-text-white tw-font-bold tw-w-40"
        @click="continuar"
        >Continuar</v-btn
      >
    </div>

    <!--BUTTON CONTINUE-->
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
      info_despacho: {
        datos_cliente: {
          rut: "",
          nombre_completo: "",
          fono: "",
          email: "",
        },
        datos_envio: {
          calle: "",
          numero: "",
        },
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
  methods: {
    continuar() {
      this.$store.dispatch(
        "info_despacho/setInfoDespachoCotizacion",
        this.info_despacho
      );
      this.$router.push("/cotizaciones/crear");
    },
  },
};
</script>

<style></style>
