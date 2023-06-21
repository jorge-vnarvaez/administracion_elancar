<template>
  <div class="tw-py-12 lg:tw-p-24 tw-px-8 lg:tw-px-48">
    <div class="tw-flex tw-flex-row tw-justify-between">
      <span class="tw-font-bold tw-text-2xl lg:tw-text-4xl tw-mb-4"
        >Precio materiales</span
      >
    </div>

    <div v-if="!loading_productos">
      <div class="tw-flex tw-flex-col tw-mb-12">
        <!-- FILTRO MATERIAL -->
        <FiltroMaterial />
        <!-- FILTRO MATERIAL -->

        <!-- NOMBRE MATERIAL -->
        <div>
          <span
            v-if="!material_seleccionado"
            class="tw-block tw-mt-4 tw-text-xl tw-font-bold"
            >Material no seleccionado</span
          >
          <span
            v-if="material_seleccionado"
            class="tw-block tw-mt-4 tw-text-2xl tw-font-bold"
            >{{ material_seleccionado.nombre }}</span
          >
        </div>
        <!-- NOMBRE MATERIAL -->

        <!-- CAJA 2 -->

        <div class="tw-flex tw-flex-col">
          <!-- CONTENIDO 1 TITULO, TEXT FIELD, BUTTON -->
          <div class="tw-flex tw-flex-col tw-mt-1">
            <!-- TITULO -->
            <span class="tw-block">Ingrese nuevo valor por kilo</span>
            <!-- TITULO -->

            <!-- TEXT FIELD PARA CAMBIAR PRECIO -->
            <div class="tw-flex tw-mt-2">
              <v-text-field
                class="tw-mr-2"
                placeholder="Precio por kilo"
                dense
                :disabled="!material_seleccionado"
                hide-details
                v-model="precio"
                type="number"
                @keypress="soloNumeros"
              ></v-text-field>
            </div>
            <!-- TEXT FIELD PARA CAMBIAR PRECIO -->

            <!-- BOTON PARA CAMBIAR PRECIO -->
            <v-btn
              @click="dialog_guardar = true"
              :disabled="!material_seleccionado || precio == '0'"
              class="tw-rounded-lg tw-w-[200px] tw-h-[30px] tw-mt-8 tw-bg-black tw-text-white tw-px-4"
              validate-on-blur
              small
              >Recalcular
              <v-dialog v-model="dialog_guardar" max-width="290">
                <v-card
                  class="tw-py-4 tw-px-2 tw-flex tw-flex-col tw-align-center"
                >
                  <v-card-text
                    class="tw-text-center tw-text-2xl"
                    v-if="material_seleccionado"
                  >
                    ¿Está seguro/a que desea cambiar el precio del
                    {{ material_seleccionado.nombre }}?
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      depressed
                      color="black"
                      class="tw-text-white"
                      @click="recalcularPrecio(), (dialog_guardar = false)"
                    >
                      Si, cambiar
                    </v-btn>

                    <v-btn
                      depressed
                      color="yellow darken-1"
                      class="tw-text-neutral-900"
                      @click="dialog_guardar = false"
                    >
                      No, volver
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
            <!-- BOTON PARA CAMBIAR PRECIO -->
          </div>
          <!-- CONTENIDO 1 TITULO, TEXT FIELD, BUTTON -->

          <!-- CONTENIDO 2 TITULO Y MATERIAL SELECCIONADO-->
          <div class="tw-mt-4 tw-py-8 lg:tw-py-0" v-if="material_seleccionado">
            <span class="tw-block tw-font-bold">ÚLTIMO PRECIO</span>

            <span v-if="material_seleccionado"
              >{{ material_seleccionado.ultimo_precio }} pesos x kg</span
            >
          </div>
          <!-- CONTENIDO 2 TEXTFIELD, BOTON, ULTIMO PRECIO-->
        </div>
        <!-- CAJA 2 -->
      </div>
      <span
        v-if="material_seleccionado"
        class="tw-block tw-text-3xl tw-mb-8 tw-font-bold"
        >Listado de productos que contienen
        <span class="tw-font-thin"
          >"{{ material_seleccionado.nombre }}"</span
        ></span
      >
      <!-- START DESKTOP VIEW -->
      <div v-if="$vuetify.breakpoint.mobile ? false : true">
        <div v-if="productos.length > 0">
          <!--[TABLE HEADERS]-->
          <div class="tw-grid tw-grid-cols-12 tw-mb-4 tw-px-4">
            <div class="tw-col-span-7">
              <span class="tw-font-bold">Producto</span>
            </div>

            <div class="tw-col-span-2">
              <span class="tw-font-bold">Kg</span>
            </div>

            <div class="tw-col-span-2">
              <span class="tw-font-bold">Precio neto</span>
            </div>
          </div>
          <!--[TABLE HEADERS]-->

          <!--[TABLE CONTENT]-->
          <div
            v-for="(producto, index) in productos.slice(
              itemsPerPage * page - itemsPerPage,
              itemsPerPage * page
            )"
            :key="producto.id"
          >
            <material-producto-table-item
              class="tw-flex align-center"
              :producto="producto"
              :index="index"
              :key="producto.id"
            />
          </div>
          <!--[TABLE CONTENT]-->
        </div>
      </div>

      <div v-if="loading_productos">
        <ProductosListSkeleton />
      </div>
    </div>
    <!-- END DESKTOP VIEW -->

    <!-- START MOBILE VIEW -->
    <div v-if="$vuetify.breakpoint.mobile ? true : false">
      <div v-if="!loading_productos">
        <div v-if="productos.length > 0">
          <!--[TABLE CONTENT]-->
          <div
            v-for="(producto, index) in productos.slice(
              itemsPerPage * page - itemsPerPage,
              itemsPerPage * page
            )"
            :key="producto.id"
          >
            <material-producto-table-item
              class="tw-flex align-center"
              :producto="producto"
              :index="index"
              :key="producto.id"
            />
          </div>
          <!--[TABLE CONTENT]-->
        </div>
      </div>

      <div v-if="loading_productos">
        <ProductosListSkeleton />
      </div>
    </div>
    <!-- END MOBILE VIEW -->

    <!-- NO HAY PRODUCTOS -->
    <div
      v-if="productos.length == 0 && !loading_productos"
      class="tw-py-12 tw-text-2xl tw-font-bold"
    >
      <EmptyTable />
    </div>
    <!-- NO HAY PRODUCTOS -->

    <!--[PAGINATION]-->
    <div class="tw-my-8">
      <v-pagination
        v-model="page"
        color="black"
        :length="Math.ceil(productos.length / itemsPerPage)"
        total-visible="7"
      ></v-pagination>
    </div>
    <!--[PAGINATION]-->
  </div>
</template>

<script>
import FiltroMaterial from "@/components/utils/FiltroMaterial.vue";
import MaterialProductoTableItem from "@/components/utils/table_items/MaterialProductoTableItem.vue";
import ProductosListSkeleton from "@/components/utils/ProductosListSkeleton.vue";
import EmptyTable from "@/components/utils/EmptyTable.vue";

export default {
  middleware: "auth",
  components: {
    FiltroMaterial,
    MaterialProductoTableItem,
    ProductosListSkeleton,
    EmptyTable,
  },
  data() {
    return {
      cantidad: 0,
      page: 1,
      itemsPerPage: 3,
      precio: null,
      dialog_guardar: false,
    };
  },
  async mounted() {
    await this.$store.dispatch("productos/loadProductos");
  },
  computed: {
    productos() {
      return this.$store.getters["productos/getProductos"];
    },
    loading_productos() {
      return this.$store.getters["productos/getLoadingProductos"];
    },
    material_seleccionado() {
      return this.$store.getters["productos/getMaterialSeleccionado"];
    },
  },
  methods: {
    recalcularPrecio() {
      this.$store.dispatch("productos/recalcularPrecio", {
        productos: this.productos,
        material: this.material_seleccionado,
        precio: this.precio,
      });
    },
    soloNumeros(e) {
      var key = window.event ? e.which : e.keyCode;
      if (key < 48 || key > 57) {
        e.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
.behind {
  position: relative;
  top: 120px;
  z-index: -1;
}
</style>
