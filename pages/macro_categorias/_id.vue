<template>
  <div>
    <div v-if="categorias.length > 0" class="container">
      <div
        v-for="categoria in categorias"
        :key="categoria.id"
        class="flex flex-col"
      >
        <div class="bg-neutral-900 p-6">
          <span class="text-white text-2xl">{{
            categoria.nombre
          }}</span>
        </div>

        <div
          v-for="sub_categoria in categoria.sub_categorias"
          :key="sub_categoria.id"
        >
          <nuxt-link
            :to="`/sub_categoria/${sub_categoria.id}/${sub_categoria.slug}`"
            class="flex flex-col space-y-2"
          >
            {{ sub_categoria.nombre }}</nuxt-link
          >
        </div>
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
      filter: {
        macro_categoria: {
          _eq: context.params.id,
        },
      },
      fields: [
        '*,sub_categorias.*'
      ]
    });

    const categorias = await context.$axios
      .$get(`${context.$config.apiUrl}/items/categorias?${query}`)
      .then((res) => res.data);

    return {
      categorias,
    };
  },
};
</script>

<style></style>
