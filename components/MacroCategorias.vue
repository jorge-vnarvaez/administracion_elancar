<template>
  <div
    class="mt-8 grid grid-cols-12 grid-rows-2 gap-x-4 gap-y-4 h-96"
    v-if="macro_categorias"
  >
    <div
      v-for="macro_categoria in macro_categorias"
      :key="macro_categoria.id"
      :class="`${macro_categoria.id == 1 ? 'row-span-2' : 'row-span-1'}` + ' col-span-4 rounded-md cursor-pointer'"
    >
      <v-img
        v-if="macro_categoria.attributes.imagen.data"
        width="300"
        height="100%"
        :src="
          $config.apiUrl + macro_categoria.attributes.imagen.data.attributes.url
        "
        class="flex align-center items-center justify-center w-full rounded-md"
        gradient="to top right, rgba(38, 42, 42, .33), rgba(25,32,72,.7)"
      >
        <span class="block w-full font-bold text-2xl text-center text-white">{{
          macro_categoria.attributes.nombre
        }}</span>
      </v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "MacroCategorias",
  data() {
    return {
      macro_categorias: [],
    };
  },
  async fetch() {
    const res = await fetch(
      `${this.$config.apiUrl}/api/macro-categorias?populate=*`
    ).then((res) => res.json());

    this.macro_categorias = res.data;
  },
};
</script>

<style>

</style>
