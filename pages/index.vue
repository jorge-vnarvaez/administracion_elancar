<template>
  <div class="grid grid-cols-12 w-full h-screen">
    <div class="col-span-6">
      <v-img src="/ferreteria-hero.jpeg" height="100%"></v-img>
    </div>

    <div class="col-span-6 flex flex-col justify-center items-center">
      <div v-if="error.value" class="bg-red-500 px-6 py-2 mb-6">
        <v-icon color="white" class="mr-1">mdi-information</v-icon>
        <span class="text-white">{{ error.errorMsg }}</span>
      </div>

      <v-form
        v-model="validado"
        lazy-validation
        ref="formulario"
        @submit="login"
      >
        <div>
          <span class="block font-bold text-md uppercase mb-3"
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
          <span class="block font-bold text-md uppercase mb-3">Contraseña</span>
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
            class="bg-neutral-900 w-full px-8 text-white py-4 font-bold text-sm uppercase"
          >
            <span class="text-white">Iniciar sesión</span>
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
