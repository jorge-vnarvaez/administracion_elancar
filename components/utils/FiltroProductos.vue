<template>
  <div class="tw-mb-8 tw-flex tw-flex-col">
    <!-- FILTROS -->
    <div class="tw-flex tw-space-x-4">
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
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="black"
            :outlined="!active_parents.includes('filter_by_material')"
            depressed
            rounded
            dark
            v-bind="attrs"
            v-on="on"
          >
            <span class="tw-normal-case">Material</span>
            <v-icon v-if="on">mdi-chevron-down</v-icon>
            <v-icon v-if="!on">mdi-chevron-up</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in materiales_items"
            :key="'por_material_' + index"
            @click="addFilter(item)"
          >
            <v-list-item-title class="tw-cursor-pointer">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
            @click:close="removeFilter(filter)"
          >
            {{ filter.title }}
          </v-chip>
        </div>
      </div>

      <v-divider class="tw-mt-8"></v-divider>
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
        // { title: "Entre $200 y $300", query: "200-300" },
        // { title: "Entre $300 y $400", query: "300-400" },
        // { title: "Entre $400 y $500", query: "400-500" },
        // { title: "Más de $500", query: "500" },
      ],
    };
  },
  methods: {
    addFilter(item) {
      const is_active_parent = this.active_parents.includes(item.parent);

      if (is_active_parent) {
        const indexFilter = this.active_filters.indexOf(item);
        const indexParent = this.active_parents.indexOf(item);

        this.active_filters.splice(indexFilter, 1);
        this.active_parents.splice(indexParent, 1);

        this.active_filters.push(item);
        this.active_parents.push(item.parent);
      } else {
        this.active_filters.push(item);
        this.active_parents.push(item.parent);
      }

      // dispatch an action to store by each filter
      this.$store.dispatch("productos/applyFilters", this.active_filters);
    },
    removeFilter(item) {
      // find index of item in active_filters
      const indexFilter = this.active_filters.indexOf(item);

      const indexParent = this.active_parents.indexOf(item);

      this.active_filters.splice(indexFilter, 1);
      this.active_parents.splice(indexParent, 1);

      this.$store.dispatch("productos/applyFilters", this.active_filters);
    },
  },
  computed: {
    materiales_items() {
      return this.$store.getters["productos/getMateriales"];
    },
  },
};
</script>

<style></style>
