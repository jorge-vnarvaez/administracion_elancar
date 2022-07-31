<template>
  <div v-if="user" class="grid grid-cols-12 z-10">
    <div
      class="col-span-3 bg-yellow-400 px-8 py-8 flex flex-col justify-between h-screen w-full"
    >
      <div>
        <div>
          <span class="block font-bold text-2xl">Bienvenid@</span>
          <span class="block">{{ user.first_name }} {{ user.last_name }}</span>
        </div>

        <div class="flex space-x-8">
          <div class="flex align-center mt-4 justify-end">
            <v-icon class="mr-1">mdi-logout</v-icon>
            <button @click="desconectar">
              <span class="font-bold">Cerrar sesión</span>
            </button>
          </div>
        </div>

        <div class="mt-10">
          <nuxt-link :to="{ name: 'home' }" class="text-decoration-none"
            ><span class="text-neutral-900" @click="toggleBarra()">Inicio</span></nuxt-link
          >
        </div>

        <div class="mt-10">
          <!--[VENTAS]-->
          <div>
            <span class="block mb-2 font-bold text-xl">Ventas</span>
            <div class="flex flex-col space-y-2">
              <nuxt-link
                :to="{ name: 'cotizaciones-clientes' }"
                class="text-decoration-none"
                ><span class="text-neutral-900"
                  >Ver cotizaciones de clientes</span
                ></nuxt-link
              >
              <nuxt-link :to="{ name: 'cotizaciones-clientes' }"
                ><span class="text-neutral-900"
                  >Ver notas de pedido</span
                ></nuxt-link
              >
              <nuxt-link :to="{ name: 'productos' }"
                ><span class="text-neutral-900" @click="toggleBarra()"
                  >Productos</span
                ></nuxt-link
              >
            </div>
          </div>
          <!--[VENTAS]-->

          <!--[COMPRAS]-->
          <div class="mt-8">
            <span class="block mb-2 font-bold text-xl">Compras</span>
            <div class="flex flex-col space-y-2">
              <nuxt-link :to="{ name: 'solicitudes-solicitud_de_cotizacion' }"
                ><span class="text-neutral-900" @click="toggleBarra()"
                  >Emitir solicitud de cotización</span
                ></nuxt-link
              >
              <nuxt-link :to="{ name: 'cotizaciones-clientes' }"
                ><span class="text-neutral-900"
                  >Ver solicitudes de cotización</span
                ></nuxt-link
              >
              <nuxt-link :to="'/ordenes/emitir/orden_de_compra'"
                ><span class="text-neutral-900" @click="toggleBarra()"
                  >Emitir orden de compra</span
                ></nuxt-link
              >
              <nuxt-link :to="{ name: 'cotizaciones-clientes' }"
                ><span class="text-neutral-900"
                  >Ver ordenes de compra</span
                ></nuxt-link
              >
            </div>
          </div>
          <!--[COMPRAS]-->

          <!--[GESTION]-->
          <div class="mt-8">
            <span class="block mb-2 font-bold text-xl">Gestión</span>
            <div class="flex flex-col space-y-2">
              <nuxt-link :to="{ name: 'cotizaciones-clientes' }"
                ><span class="text-neutral-900">Proveedores</span></nuxt-link
              >
              <nuxt-link :to="{ name: 'cotizaciones-clientes' }"
                ><span class="text-neutral-900"
                  >Precio materiales</span
                ></nuxt-link
              >
            </div>
          </div>
          <!--[GESTION]-->
        </div>
      </div>
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
    toggleBarra() {
      this.$store.dispatch("ui/toggleBarra");
    },
    desconectar() {
      this.$store.dispatch("session/desconectar");
    },
  },
  async mounted() {
    if (this.$cookies.get("access_token")) {
      this.user = await this.$axios
        .$get(`${this.$config.apiUrl}/users/me`, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("access_token")}`,
          },
        })
        .then((res) => res.data);
    }
  },
  computed: {
    barra() {
      return this.$store.getters["ui/getStatusBarra"];
    },
  },
};
</script>

<style></style>
