<template>
  <div class="col-span-8 bg-white py-4 px-8">
    <span v-if="item.producto.marca" class="block font-light">{{
      item.producto.marca.nombre
    }}</span>
    <span class="block text-xl font-bold">{{ item.producto.nombre }}</span>
    <span class="block text-sm">Código: {{ item.producto.id }}</span>
    <div class="flex mt-4">
      <div class="flex space-x-4">
        <div>
          <v-img
            :src="$config.apiUrl + '/assets/' + item.producto.imagen_referencia"
            width="250"
            height="250"
            contain
          ></v-img>
        </div>
        <div class="bg-red-50">Cantidad</div>
      </div>

      <div class="flex flex-col justify-between align-end">
        <div>
          <span class="font-bold text-xl mr-4">Total</span
          ><span class="text-xl"
            >$ {{ item.producto.precio_actual * item.cantidad }}</span
          >
        </div>
        <div @click="eliminarItem(item)" class="cursor-pointer">
          <v-icon>mdi-trash-can-outline</v-icon>
          <span>Eliminar</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    eliminarItem(item) {
        this.$store.dispatch("carro_compras/removeProductFromCart", item);
    },
  },
};
</script>

<style></style>
