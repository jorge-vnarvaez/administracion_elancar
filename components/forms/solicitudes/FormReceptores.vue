<template>
  <div>
   {{ receptores }}
  </div>
</template>

<script>
import ReceptorTableItem from "@/components/utils/table_items/ReceptorTableItem.vue";

export default {
  props: {
    receptores: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Number,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
  },
  components: {
    ReceptorTableItem,
  },
  data() {
    return {
      radioGroup: 1,
    };
  },
  methods: {
    receptorSeleccionado(receptor) {
      this.$store.dispatch("proveedores/setReceptorCurrentProveedor", receptor);
    },
  },
};
</script>

<style></style>
