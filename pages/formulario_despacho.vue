<template>
  <div class="tw-p-24 tw-px-48">
    <span class="tw-font-bold tw-text-2xl lg:tw-text-4xl tw-px-8"
      >Emitiendo {{ documento_a_emitir }}</span
    >

    <!--PASO 1-->
    <div class="tw-bg-white tw-p-8 tw-mt-8">
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
        class="tw-grid tw-grid-cols-12 tw-gap-x-20 place-items-center"
      >
        <div
          class="tw-col-span-12 tw-grid tw-grid-cols-12 tw-gap-x-20 tw-relative"
        >
          <!--RUT-->
          <v-text-field
            v-model="info_despacho.datos_cliente.rut"
            label="Rut"
            required
            ref="rut"
            :rules="[reglas.requerido, reglas.rut_valido, reglas.rut_mask]"
            class="tw-col-span-3"
          >
          </v-text-field>
          <!--RUT-->

          <!-- COINCIDENCIAS RUT -->
          <div
            v-if="clientes_has_rut.length > 0 && !cliente_has_seleccionado"
            class="tw-absolute tw-inset-y-20 tw-col-span-3 tw-z-50"
          >
            <div class="tw-bg-neutral-100 tw-px-4 tw-py-3 tw-shadow-md tw-w-[200px]">
              <span class="tw-text-sm tw-font-bold tw-block">Clientes encontrados: </span>
              <div
                v-for="(cliente, index) in clientes_has_rut"
                :key="index"
                class="tw-py-1 tw-cursor-pointer"
                @click="seleccionarCliente(cliente)"
              >
                <span class="tw-font-thin">
                    {{ formatRut(cliente.rut) }}
                </span>
              </div>
            </div>
          </div>
          <!-- COINCIDENCIAS RUT -->

          <!-- NOMBRE -->
          <v-text-field
            v-model="info_despacho.datos_cliente.nombre_completo"
            :rules="[reglas.requerido]"
            label="Nombre, Apellido Paterno y Materno"
            required
            class="tw-col-span-3"
          >
          </v-text-field>
          <!-- NOMBRE -->
        </div>

        <!--TELEFONO-->
        <v-text-field
          v-model="info_despacho.datos_cliente.fono"
          :rules="[reglas.requerido, reglas.telefono]"
          label="Telefono"
          required
          class="tw-col-span-3 tw-o"
        ></v-text-field>
        <!--TELEFONO-->

        <!-- EMAIL -->
        <v-text-field
          v-model="info_despacho.datos_cliente.email"
          :rules="[reglas.requerido, reglas.email]"
          label="Email"
          required
          class="tw-col-span-3"
        >
        </v-text-field>
        <!-- EMAIL -->
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
        <div
          class="tw-flex tw-flex-col md:tw-flex-col lg:tw-flex-row lg:tw-justify-between tw-w-[740px]"
        >
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
          v-model="info_despacho.datos_envio.sector"
          label="Sector"
          required
          class="tw-col-span-3"
        >
        </v-text-field>
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
        :disabled="!validado"
        @click="continuar"
        >Continuar</v-btn
      >
    </div>
    <!--BUTTON CONTINUE-->
  </div>
</template>

<script>
import qs from "qs";
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
          id: "",
          rut: "",
          nombre_completo: "",
          fono: "",
          email: "",
        },
        datos_envio: {
          calle: "",
          numero: "",
          sector: "",
        },
      },
      reglas: {
        requerido: (value) => !!value || "Requerido",
        telefono: (v) => /^\d{8}$/.test(v) || "Telefono no es valido",
        email: (v) => /.+@.+\..+/.test(v) || "Email no es valido",
        rut_valido: (v) => {
          return (!!v && !this.validateRut(v)) || "Rut invalido";
        },
        //

        rut_mask: (v) => {
          const rutPattern = new RegExp(
            "^[0-9]{1,2}.[0-9]{3}.[0-9]{3}(-|)[0-9kK]{1}$"
          );
          return (!!v && rutPattern.test(v)) || "Rut invalido";
        },
      },
      validado: false,
      opciones_despacho: 'retiro_en_tienda',
      documento_a_emitir: null,
      clientes_has_rut: [],
      cliente_has_seleccionado: false,
    };
  },
  watch: {
    "info_despacho.datos_cliente.rut": async function (val) {
      this.info_despacho.datos_cliente.rut = this.cleanRut(
        this.info_despacho.datos_cliente.rut
      );
      let len = this.info_despacho.datos_cliente.rut.length - 1;
      if (len > 3) {
        let dv = this.info_despacho.datos_cliente.rut[len];
        let beforeDv = this.info_despacho.datos_cliente.rut
          .substring(0, len)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        this.info_despacho.datos_cliente.rut = beforeDv + "-" + dv;
      }

      await this.getClientesHasRut(this.info_despacho.datos_cliente.rut);
    },
  },
  methods: {
    seleccionarCliente(cliente) {
      this.cliente_has_seleccionado = !this.cliente_has_seleccionado;
      this.info_despacho.datos_cliente.id = cliente.id;
      this.info_despacho.datos_cliente.rut = cliente.rut;
      this.info_despacho.datos_cliente.nombre_completo =
        cliente.primer_nombre +
        " " +
        cliente.apellido_paterno +
        " " +
        cliente.apellido_materno;
      this.info_despacho.datos_cliente.fono = cliente.fono;
      this.info_despacho.datos_cliente.email = cliente.email;

      this.clientes_has_rut = [];
    },
    async getClientesHasRut(rut) {
      const query = qs.stringify({
        filter: {
          rut: {
            _contains: this.cleanRut(rut),
          },
        },
        limit: 3,
      });

      this.clientes_has_rut = await this.$axios
        .$get(`${this.$config.apiUrl}/items/clientes?${rut != "" ? query : ""}`)
        .then((res) => res.data);

      if (rut == "") {
        this.info_despacho.datos_cliente.id = "";
        this.info_despacho.datos_cliente.rut = "";
        this.info_despacho.datos_cliente.nombre_completo = "";
        this.info_despacho.datos_cliente.fono = "";
        this.info_despacho.datos_cliente.email = "";
        this.clientes_has_rut = [];
        this.cliente_has_seleccionado = false;
      }
    },
    cleanRut(value) {
      return value.replace(/\.|-/g, "");
    },
    formatRut(value) {
      let rut = value.replace(/\.|-/g, "");
      let len = rut.length - 1;
      if (len > 3) {
        let dv = rut[len];
        let beforeDv = rut
          .substring(0, len)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        rut = beforeDv + "-" + dv;
      }
      return rut;
    },
    async continuar() {
      this.$store.dispatch(
        "info_despacho/setInfoDespachoCotizacion",
        this.info_despacho
      );
      this.$store.dispatch(
        "info_despacho/setInfoDespachoNotaPedido",
        this.info_despacho
      );

      if (this.cliente_has_seleccionado == false) {
        await this.$axios.post(`${this.$config.apiUrl}/items/clientes`, {
          rut: this.cleanRut(this.info_despacho.datos_cliente.rut),
          primer_nombre:
            this.info_despacho.datos_cliente.nombre_completo.split(" ")[0],
          apellido_paterno:
            this.info_despacho.datos_cliente.nombre_completo.split(" ")[1],
          apellido_materno:
            this.info_despacho.datos_cliente.nombre_completo.split(" ")[2],
          fono: this.info_despacho.datos_cliente.fono,
          email: this.info_despacho.datos_cliente.email,
          direcciones: this.opciones_despacho == 'despacho_domicilio' ? [{
            calle: this.info_despacho.datos_envio.calle,
            numero: this.info_despacho.datos_envio.numero,
            comuna: 'Calama',
            sector: this.info_despacho.datos_envio.sector,
          }] : [],
        })
      }

      if (this.documento_a_emitir == "cotizacion") {
        this.$router.push("/cotizaciones/crear");
      }
      if (this.documento_a_emitir == "nota de pedido") {
        this.$router.push("/notas_pedido/crear");
      }
    },
    validateRut() {
      let error = false;

      let rut = this.cleanRut(this.info_despacho.datos_cliente.rut);
      let digito_verificador = this.info_despacho.datos_cliente.rut.substr(-1);

      rut = rut.substr(0, rut.length - 1);

      let serie = 0;
      let producto = 0;

      do {
        producto += (rut % 10) * ((serie % 6) + 2);
        serie++;
      } while ((rut = Math.floor(rut / 10)));

      let resto = producto % 11;
      let resultado = 11 - resto;

      if (resultado == 11) {
        resultado = 0;
      } else if (resultado == 10) {
        resultado = "K";
      }

      if (digito_verificador != resultado) {
        error = true;
      } else {
        error = false;
      }

      return error;
    },
  },
  mounted() {
    this.documento_a_emitir = this.$route.params.documento_a_emitir;
  },
};
</script>

<style></style>
