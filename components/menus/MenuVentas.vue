<template>
  <div
    class="cursor-pointer"
  >
    <font-awesome-icon v-if="opciones == false" @click="opciones = true" icon="fa-solid fa-file-invoice-dollar" size="2xl" />
    <font-awesome-icon v-if="opciones != false" @click="opciones = false" icon="fa-solid fa-xmark" size="2xl" />
    <div
      v-if="opciones"
      class="bg-yellow-200 w-60 h-54 absolute left-16 top-12 z-10 rounded-lg shadow-lg"
    >
      <p class="font-bold bg-yellow-400 py-2 px-4 text-lg mb-0">Ventas</p>
      <div class="flex flex-col px-4 justify-center space-y-2 py-2">
        <nuxt-link to="home"><span>Ver notas de pedido</span></nuxt-link>
        <nuxt-link to="home"><span>Ver cotizaciones de clientes</span></nuxt-link>
        <nuxt-link to="productos"><span @click="opciones = false">Productos</span></nuxt-link>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      opciones: false,
    };
  },
};
</script>

<style></style>
