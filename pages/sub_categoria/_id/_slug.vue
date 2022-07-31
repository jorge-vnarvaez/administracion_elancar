<template>
  <div class="h-full py-14">
    <div class="container grid grid-cols-12 grid-rows-12 gap-x-8 gap-y-6">
      <!--[FILTROS LATERALES]-->
      <div class="col-span-3 row-span-2 bg-white p-6">
        <span class="block capitalize font-bold text-2xl">
          {{ slug }}
        </span>

        <span class="block">{{ productosLength }} productos encontrados</span>

        <!--[FILTRO POR PRECIO, MARCA, NOMBRE]-->
        <div class="mt-6">
          <span class="block text-lg">Ordenar por</span>
          <div>
            <v-checkbox
              @change="orderProductos('precio_actual', true)"
              v-model="filtro"
              value="precio_actual_asc"
              label="Menor precio"
              hide-details
            ></v-checkbox>
            <v-checkbox
              @change="orderProductos('precio_actual', false)"
              v-model="filtro"
              value="precio_actual_desc"
              label="Mayor precio"
              hide-details
              class="mt-2"
            ></v-checkbox>
            <v-checkbox
              @change="orderProductos('marca', true)"
              v-model="filtro"
              value="marca_asc"
              label="Marca (A-Z)"
              hide-details
              class="mt-2"
            ></v-checkbox>
            <v-checkbox
              @change="orderProductos('nombre', true)"
              v-model="filtro"
              value="nombre_asc"
              label="Nombre (A-Z)"
              hide-details
              class="mt-2"
            ></v-checkbox>
          </div>
        </div>
        <!--[FILTRO POR PRECIO, MARCA, NOMBRE]-->

        <!--[FILTRO POR TIPO PRODUCTO]-->
        <div class="mt-6">
          <span class="block text-lg">Tipo producto</span>
          <div>
            <v-checkbox label="Menor precio" hide-details></v-checkbox>
            <v-checkbox
              label="Mayor precio"
              hide-details
              class="mt-2"
            ></v-checkbox>
            <v-checkbox
              label="Marca (A-Z)"
              hide-details
              class="mt-2"
            ></v-checkbox>
            <v-checkbox
              label="Nombre (A-Z)"
              hide-details
              class="mt-2"
            ></v-checkbox>
          </div>
        </div>
        <!--[FILTRO POR TIPO PRODUCTO]-->

        <!--[FILTRO POR MARCA]-->
        <div class="mt-6">
          <span class="block text-lg">Marca</span>
          <div>
            <v-checkbox
              v-for="marca in marcas"
              :key="marca"
              @change="filterProductos(marca)"
              v-model="filtro_marca"
              :value="marca"
              :label="marca"
              hide-details
              class="mt-2"
            ></v-checkbox>
          </div>
        </div>
        <!--[FILTRO POR MARCA]-->
      </div>

      <!--[FILTROS LATERALES]-->

      <!--[GRILLA PRODUCTOS]-->
      <div
        v-for="producto in productos"
        :key="producto.id"
        class="flex flex-col justify-center bg-white col-span-2 row-span-1 p-8 shadow-sm"
      >
        <div class="flex justify-center">
          <div>
            <v-img
              v-if="producto.imagen_referencia"
              :src="$config.apiUrl + '/assets/' + producto.imagen_referencia"
              width="100"
              height="219"
              contain
            ></v-img>
          </div>
        </div>

        <div>
          <span v-if="producto.marca" class="block font-semibold">{{
            producto.marca.nombre
          }}</span>
          <span class="block font-medium text-sm">
            {{ producto.nombre }}
          </span>
          <span class="block mt-4 font-bold text-xl"
            >$ {{ producto.precio_actual }} c/u</span
          >

          <button
            class="uppercase mt-6 bg-neutral-900 w-full text-white font-medium px-3 py-2"
          >
            Agregar al carro
          </button>
        </div>
      </div>
      <!--[GRILLA PRODUCTOS]-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filtro: [],
      filtro_marca: [],
      marcas: [],
    };
  },
  watch: {
    filtro_marca: function (val) {
      this.filterProductos();
    },
  },
  mounted() {
    this.getMarcas();
  },
  methods: {
    // get all marcas from productos and put them in marcas array
    getMarcas() {
      this.marcas = [];
      this.productos.forEach((producto) => {
        if (this.marcas.indexOf(producto.marca.nombre) === -1) {
          this.marcas.push(producto.marca.nombre);
        }
      });
    },
    // order productos by precio_actual, marca, nombre
    // receive a parameter to order by (precio_actual, marca, nombre) and a boolean to order asc or desc
    orderProductos(orderBy, orderAsc) {
      if (orderBy === "precio_actual") {
        this.productos.sort((a, b) => {
          if (orderAsc) {
            return a.precio_actual - b.precio_actual;
          } else {
            return b.precio_actual - a.precio_actual;
          }
        });
      } else if (orderBy === "marca") {
        this.productos.sort((a, b) => {
          if (orderAsc) {
            return a.marca.nombre.localeCompare(b.marca.nombre);
          } else {
            return b.marca.nombre.localeCompare(a.marca.nombre);
          }
        });
      } else if (orderBy === "nombre") {
        this.productos.sort((a, b) => {
          if (orderAsc) {
            return a.nombre.localeCompare(b.nombre);
          } else {
            return b.nombre.localeCompare(a.nombre);
          }
        });
      }

      if (this.filtro_marca.length > 0) {
        this.filterProductos();
      } else if (this.filtro.length == 0 && this.filtro_marca.length == 0) {
        this.$nuxt.refresh();
      }
    },
    filterProductos() {
      if (this.filtro_marca.length > 0) {
        // filter by all marcas selected 
        this.productos = this.productos.filter((producto) => {
          return this.filtro_marca.indexOf(producto.marca.nombre) !== -1;
        });
      }

      if (this.filtro_marca.length == 0) {
        this.$nuxt.refresh();
      }
    },
  },
  async asyncData(context) {
    // require qs module to parse the data
    const qs = require("qs");

    // create a variable named query to store the query string,
    // populate the categorias field, and sort by name
    const query = qs.stringify({
      filter: {
        sub_categoria: {
          _eq: context.params.id,
        },
      },
      fields: ["*,marca.nombre"],
    });

    const productos = await context.$axios
      .$get(`${context.$config.apiUrl}/items/productos?${query}`)
      .then((res) => res.data);

    return {
      productos,
    };
  },

  computed: {
    // get the slug from the route, replace the dash for a space and capitalize the first letter of each word
    slug() {
      return this.$route.params.slug.replace(/-/g, " ");
    },
    // return the length of the productos array
    productosLength() {
      return this.productos.length;
    },
    // get all marcas from the productos array without duplicates
    // marcas() {
    //   return [
    //     ...new Set(this.productos.map((producto) => producto.marca.nombre)),
    //   ];
    // },
  },
};
</script>

<style></style>
