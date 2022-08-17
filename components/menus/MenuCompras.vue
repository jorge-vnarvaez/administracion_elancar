<template>
  <div
    class="cursor-pointer"
  >
    <font-awesome-icon v-if="opciones == false" @click="opciones = true" icon="fa-solid fa-store" size="2xl" />
    <font-awesome-icon v-if="opciones != false" @click="opciones = false" icon="fa-solid fa-xmark" size="2xl" />
    <div
      v-if="opciones"
      class="bg-yellow-200 w-60 h-54 absolute left-16 z-10 rounded-lg shadow-lg"
    >
      <p class="font-bold bg-yellow-400 py-2 px-4 text-lg">Compras</p>
      <div class="flex flex-col px-4 space-y-2">
        <nuxt-link to="home"><span>Ver notas de pedido</span></nuxt-link>
        <nuxt-link to="home"><span>Ver notas de pedido</span></nuxt-link>
        <nuxt-link to="home"><span>Ver notas de pedido</span></nuxt-link>
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
