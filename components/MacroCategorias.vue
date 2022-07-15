<template>
  <div class="mt-8 grid grid-cols-12 gap-x-8 gap-y-8">
    <div
      v-for="macro_categoria in macro_categorias"
      :key="macro_categoria.id"
      class="col-span-3"
    >
    <span class="font-bold text-2xl">{{ macro_categoria.attributes.nombre }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MacroCategorias',
  data() {
    return {
      macro_categorias: [],
    };
  },
  async fetch() {
    const res = await fetch(`${this.$config.apiUrl}/api/macro-categorias`).then(
      (res) => res.json()
    );

    this.macro_categorias = res.data;
  },
};
</script>
