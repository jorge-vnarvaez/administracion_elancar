<template>
  <div class="grid grid-cols-12" v-if="user">
    <div class="col-span-3 bg-yellow-400 px-8 py-8 h-screen">
      <span class="block font-bold text-2xl">Bienvenid@</span>
      <span class="block"
        >{{ user.primer_nombre }} {{ user.segundo_nombre }}
        {{ user.apellido_paterno }} {{ user.apellido_materno }}</span
      >
      <button @click="desconectar">Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    desconectar() {
      this.$store.dispatch("session/desconectar");
    },
  },
  async mounted() {
    if (this.$cookies.get("userId")) {
      this.user = await fetch(
        `${this.$config.apiUrl}/api/users/${this.$cookies.get(
          "userId"
        )}?populate=*`
      ).then((res) => res.json());
    }
  },
};
</script>
