<template>
  <div class="col-span-6">
    <span class="text-lg font-bold uppercase">Sucursal Destino *</span>
    <v-select
      v-model="sucursalDestino"
      :items="sucursales_destino"
      :item-text="(sucursal) => sucursal.nombre"
      :item-value="(sucursal) => sucursal.id"
      placeholder="Seleccione una de sus sucursales"
      flat
      solo
      outlined
      class="mt-4 w-80"
    ></v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sucursales_destino: [],
      sucursalDestino: null,
    };
  },
  async fetch() {
    const res = await fetch(`${this.$config.apiUrl}/items/sucursales`).then(
      (res) => res.json()
    );

    this.sucursales_destino = res.data;
  },
};
</script>

<style></style>
