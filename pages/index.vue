<template>
  <div class="grid grid-cols-12 w-full h-screen">
    <div class="col-span-6">
      <v-img src="/ferreteria-home.jpg" height="100%"></v-img>
    </div>

    <div class="col-span-6 flex flex-col justify-center items-center">

      <div v-if="error.value" class="bg-red-400 p-4 mb-4">
      <v-icon>mdi-information</v-icon>
        <span>{{ error.errorMsg }}</span>
      </div>

      <v-form
        v-model="validado"
        lazy-validation
        ref="formulario"
        @submit="login"
      >
        <div>
          <span class="block font-bold text-md uppercase mb-3"
            >Nombre usuario</span
          >
          <v-text-field
            v-model="nombreUsuario"
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
  layout: 'login',
  data() {
    return {
      validado: false,
      nombreUsuario: null,
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
          username: this.nombreUsuario,
          password: this.password,
        }

        const params = this.$route.query.redirect || '/home';

        this.$store.dispatch("session/login", {
          credenciales: credenciales,
          params: params,
        });
      } catch(e) {

      }
    },
  },
  computed: {
    error() {
      return this.$store.getters['session/getError'];
    }
  }
};
</script>
