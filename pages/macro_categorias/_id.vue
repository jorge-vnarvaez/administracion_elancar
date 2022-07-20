<template>
  <div v-if="macro_categoria" class="container">
    <div v-for="categoria in macro_categoria.attributes.categorias.data" :key="categoria.id" class="flex flex-col">
      <div class="bg-neutral-900 p-6">
        <span class="text-white text-2xl">{{ categoria.attributes.nombre }}</span>
      </div>

      <div v-for="sub_categoria in categoria.attributes.sub_categorias.data" :key="sub_categoria.id">
        <nuxt-link :to="`/sub_categorias/${sub_categoria.id}`" class="flex flex-col space-y-2">
          {{ sub_categoria.attributes.nombre }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    // require qs module to parse the data
    const qs = require("qs");

    // create a variable named query to store the query string,
    // populate the categorias field, and sort by name
    const query = qs.stringify({
      populate: ["categorias", "categorias.sub_categorias"],
      sort: "nombre",
    });

    const macro_categoria = await context.$axios.$get(
      `${context.$config.apiUrl}/api/macro-categorias/${context.route.params.id}?${query}`
    ).then(res => res.data);

    return {
      macro_categoria,
    };
  },
};
</script>

<style>
</style>