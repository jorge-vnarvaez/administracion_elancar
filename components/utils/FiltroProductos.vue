<template>
  <div class="tw-mb-8 tw-flex tw-flex-col">
    <!-- FILTROS -->
    <div class="tw-flex tw-flex-col lg:tw-flex-row lg:tw-space-x-4">
      <!--ORDENAR POR -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="black"
            :outlined="!active_parents.includes('order_by_precio')"
            depressed
            rounded
            dark
            v-bind="attrs"
            v-on="on"
            class="tw-mb-4"
          >
            <span class="tw-normal-case">Ordenar</span>
            <v-icon v-if="on">mdi-chevron-down</v-icon>
            <v-icon v-if="!on">mdi-chevron-up</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in ordenar_items"
            :key="'ordenar_por_' + index"
            @click="addFilter(item)"
          >
            <v-list-item-title class="tw-cursor-pointer">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!--ORDENAR POR -->

      <!-- RANGO DE PRECIOS -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="black"
            :outlined="!active_parents.includes('range_precio')"
            depressed
            rounded
            dark
            v-bind="attrs"
            v-on="on"
            class="tw-mb-4"
          >
            <span class="tw-normal-case">Rango de precios</span>
            <v-icon v-if="on">mdi-chevron-down</v-icon>
            <v-icon v-if="!on">mdi-chevron-up</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in rango_items"
            :key="'rango_por_' + index"
            @click="addFilter(item)"
          >
            <v-list-item-title class="tw-cursor-pointer">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- RANGO DE PRECIOS -->

      <!-- TIPO MATERIAL -->
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="black"
            :outlined="!active_parents.includes('filter_by_material')"
            depressed
            rounded
            dark
            v-bind="attrs"
            v-on="on"
            class="tw-mb-4"
          >
            <span class="tw-normal-case">Material</span>
            <v-icon v-if="on">mdi-chevron-down</v-icon>
            <v-icon v-if="!on">mdi-chevron-up</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in materiales"
            :key="'por_material_' + index"
            @click="addFilter(item)"
          >
            <v-list-item-title class="tw-cursor-pointer">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <!-- TIPO MATERIAL -->
    </div>
    <!-- FILTROS -->

    <!-- ACTIVE FILTERS -->
    <div class="tw-mt-4" v-if="active_filters.length > 0">
      <div class="tw-flex align-center tw-space-x-2">
        <span class="tw-font-bold"> Filtros activos: </span>
        <div class="tw-space-x-2">
          <v-chip
            v-for="filter in active_filters"
            :key="filter.title"
            close
            class="lg:tw-mb-0 tw-mb-2"
            @click:close="removeFilter(filter)"
          >
            {{ filter.title }}
          </v-chip>
        </div>
      </div>
    </div>
    <!-- ACTIVE FILTERS -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      active_parents: [],
      active_filters: [],
      ordenar_items: [
        {
          title: "Precio: más bajo primero",
          query: "asc",
          parent: "order_by_precio",
        },
        {
          title: "Precio: más alto primero",
          query: "desc",
          parent: "order_by_precio",
        },
      ],
      rango_items: [
        {
          title: "CLP 0 - CLP 19.990",
          query: [0, 19990],
          parent: "range_precio",
        },
        {
          title: "CLP 20.000 y CLP 49.990",
          query: [20000, 49990],
          parent: "range_precio",
        },
      ],
      materiales: [
        {
          title: "Acero",
          query: "acero",
          parent: "filter_by_material",
        },
        {
          title: "Aluminio",
          query: "aluminio",
          parent: "filter_by_material",
        },
        {
          title: "Cobre",
          query: "cobre",
          parent: "filter_by_material",
        },
        {
          title: "Latón",
          query: "laton",
          parent: "filter_by_material",
        },
        {
          title: "Plástico",
          query: "plastico",
          parent: "filter_by_material",
        },
        {
          title: "Otro",
          query: "otro",
          parent: "filter_by_material",
        },
      ],
    };
  },
  watch: {
    active_filters(val) {
      this.$store.dispatch("productos/applyFilters", val);
    },
  },
  methods: {
    addFilter(filter) {
      const indexParent = this.active_parents.indexOf(filter.parent);

      // Si no hay un filtro del tipo que se quiere agregar se agrega
      if (indexParent === -1) {
        this.active_parents.push(filter.parent);
        this.active_filters.push(filter);
        this.$cookies.set(filter.parent, filter);
      }

      // Si hay un filtro del tipo que se quiere agregar se reemplaza
      if (indexParent !== -1) {
        this.active_parents.splice(indexParent, 1, filter.parent);
        this.active_filters.splice(indexParent, 1, filter);
        this.$cookies.set(filter.parent, filter);
      }
    },
    removeFilter(filter) {
      const indexParent = this.active_parents.indexOf(filter.parent);
      this.active_parents.splice(indexParent, 1);
      this.active_filters.splice(indexParent, 1);

      // check if filter was removed from active filters
      const indexFilter = this.active_filters.indexOf(filter);

      if (indexFilter === -1) {
        // this.$cookies.remove(filter.parent);
        this.$store.dispatch("productos/loadProductos");
        if (query) {
          this.$store.dispatch(
            "productos/applyFilters",
            this.$cookies.get("query_buscador")
          );
        }
      }

      // check if query buscador is a cookie
      const query = this.$cookies.get("query_buscador") || false;
    },
  },
};
</script>

<style></style>
