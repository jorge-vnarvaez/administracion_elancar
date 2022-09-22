<template>
  <div class="tw-grid tw-grid-cols-12 tw-w-full tw-h-screen">
    <div class="tw-col-span-6">
      <v-img src="/ferreteria-hero.jpeg" height="100%"></v-img>
    </div>

    <div class="tw-col-span-6 tw-flex tw-flex-col justify-center tw-items-center">
      <!-- <div v-if="error.value" class="bg-red-500 px-6 py-2 mb-6">
        <v-icon color="white" class="mr-1">mdi-information</v-icon>
        <span class="text-white">{{ error.errorMsg }}</span>
      </div> -->

      <v-form
        v-model="validado"
        lazy-validation
        ref="formulario"
        @submit="login"
      >
        <div>
          <span class="tw-block tw-font-bold tw-text-lg tw-uppercase mb-3"
            >Email</span
          >
          <v-text-field
            v-model="email"
            :rules="reglaNotNull"
            solo
            flat
            outlined
          ></v-text-field>
        </div>

        <div class="mt-4">
          <span class="tw-block tw-font-bold tw-text-lg tw-uppercase mb-3">Contraseña</span>
          <v-text-field
            v-model="password"
            type="password"
            :rules="reglaNotNull"
            solo
            flat
            outlined
          ></v-text-field>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="tw-bg-neutral-900 tw-w-full tw-px-8 tw-text-white tw-py-4 tw-font-bold tw-text-sm tw-uppercase"
          >
            <span>Iniciar sesión</span>
          </button>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  layout: "login",
  data() {
    return {
      validado: false,
      email: null,
      password: null,
      reglaNotNull: [(v) => !!v || "Este campo es obligatorio"],
    };
  },
  methods: {
    login(e) {
      e.preventDefault();

      try {
        this.$refs.formulario.validate();

        const credenciales = {
          email: this.email,
          password: this.password,
        };

        const params = this.$route.query.redirect || "/home";

        this.$store.dispatch("session/login", {
          credenciales: credenciales,
          params: params,
        });
      } catch (e) {}
    },
  },
  computed: {
    error() {
      return this.$store.getters["session/getError"];
    },
  },
};
</script>

<style>

</style>
