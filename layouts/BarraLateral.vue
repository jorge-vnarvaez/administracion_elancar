<template>
  <div v-if="user" class="grid grid-cols-12 z-10">
    <div
      class="col-span-3 bg-yellow-400 px-8 py-8 h-[80vh] flex flex-col justify-between h-full"
    >
      <div>
        <div>
          <span class="block font-bold text-2xl">Bienvenid@</span>
          <span class="block"
            >{{ user.primer_nombre }} {{ user.segundo_nombre }}
            {{ user.apellido_paterno }} {{ user.apellido_materno }}</span
          >
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
              <nuxt-link :to="{ name: 'cotizaciones-clientes' }"
                ><span class="text-neutral-900">Productos</span></nuxt-link
              >
            </div>
          </div>
          <!--[VENTAS]-->

          <!--[COMPRAS]-->
          <div class="mt-8">
            <span class="block mb-2 font-bold text-xl">Compras</span>
            <div class="flex flex-col space-y-2">
              <nuxt-link :to="{ name: 'cotizaciones-clientes' }"
                ><span class="text-neutral-900"
                  >Emitir solicitud de cotización</span
                ></nuxt-link
              >
              <nuxt-link :to="{ name: 'cotizaciones-clientes' }"
                ><span class="text-neutral-900"
                  >Ver solicitudes de cotización</span
                ></nuxt-link
              >
              <nuxt-link :to="{ name: 'cotizaciones-clientes' }"
                ><span class="text-neutral-900"
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

<style></style>
