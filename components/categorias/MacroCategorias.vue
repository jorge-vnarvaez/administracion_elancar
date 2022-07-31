<template>
  <div
    class="mt-8 grid grid-cols-12 grid-rows-2 gap-x-4 gap-y-4 h-96"
    v-if="macro_categorias"
  >
    <nuxt-link
      v-for="macro_categoria in macro_categorias"
      :key="macro_categoria.id"
      :to="`/macro_categorias/${macro_categoria.id}`"
      :class="
        `${macro_categoria.id == 1 ? 'row-span-2' : 'row-span-1'}` +
        ' col-span-4 rounded-md cursor-pointer'
      "
    >

      <span class="block w-full font-bold text-2xl text-center">{{
        macro_categoria.nombre
      }}</span>
    </nuxt-link>
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
      `${this.$config.apiUrl}/items/macro_categorias`
    ).then((res) => res.json());

    this.macro_categorias = res.data;
  },
};
</script>

<style></style>
