<template>
    <div class="tw-p-24">
      <div class="w-8/12">
        <span class="font-bold text-4xl">Emitir solicitud de cotización</span>
        <div class="grid grid-cols-12 mt-12 gap-x-8">
          <!-- [PROVEEDORES] -->
          <div class="col-span-6" v-if="proveedores">
            <span class="text-lg font-bold uppercase">Proveedores *</span>
            <v-select
              v-model="proveedor"
              :items="proveedores"
              :item-text="(proveedor) => proveedor.nombre_comercial"
              :item-value="(proveedor) => proveedor"
              placeholder="Seleccione un proveedor"
              flat
              solo
              outlined
              class="mt-4 w-80"
            ></v-select>
          </div>
          <!-- [PROVEEDORES] -->
  
          <!-- [SUCURSAL PROVEEDORES] -->
          <div class="col-span-6">
            <span class="text-lg font-bold uppercase">Sucursal Proveedor *</span>
            <v-select
              v-model="sucursalProveedor"
              :items="sucursales_proveedor"
              :item-text="
                (sucursalProveedor) =>
                  sucursalProveedor.calle +
                  ' #' +
                  sucursalProveedor.nro +
                  ' , ' +
                  sucursalProveedor.comuna
              "
              :item-value="(sucursalProveedor) => sucursalProveedor.id"
              placeholder="Seleccione una sucursal"
              no-data-text="No ha seleccionado un proveedor"
              flat
              solo
              outlined
              class="mt-4 w-80"
            ></v-select>
          </div>
          <!-- [SUCURSAL PROVEEDORES] -->
  
          <!-- [RECEPTORES] -->
          <!-- <div class="col-span-6">
            <span class="text-lg font-bold uppercase">Receptores *</span>
            <v-select
              v-model="receptor"
              :items="receptores_proveedor"
              :item-text="
                (receptor) =>
                  receptor.attributes.primer_nombre +
                  ' ' +
                  receptor.attributes.apellido_paterno
              "
              :item-value="(receptor) => receptor.id"
              placeholder="Seleccione un receptor"
              no-data-text="No ha seleccionado una sucursal"
              flat
              solo
              outlined
              hide-details
              class="mt-4 w-80"
            ></v-select>
            <v-checkbox
              v-model="aQuienCorresponda"
              label="O a quien corresponda"
              class="mt-2"
            ></v-checkbox>
          </div> -->
          <!-- [RECEPTORES] -->
  
          <!-- [SUCURSAL DESTINO] -->
          <Sucursales />
          <!-- [SUCURSAL DESTINO] -->
  
          <!-- [FORMAS DE PAGO] -->
          <FormasDePago />
          <!-- [FORMAS DE PAGO] -->
  
          <!-- [CONDICIONES DE VENTA] -->
          <CondicionesDeVenta />
          <!-- [CONDICIONES DE VENTA] -->
  
          <div v-if="proveedor" class="col-span-12">
            <span class="text-2xl font-bold uppercase">Productos</span>
            <p class="mt-3">
              Este es un listado de productos que están registrados con el
              proveedor
              <span class="font-bold w-4/12">{{
                proveedor.nombre_comercial
              }}</span>
              seleccione de dicho listado los productos y la cantidad que desea
              cotizar y se irán agregando al carro de cotizaciones
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Sucursales from "@/components/elancar/Sucursales.vue";
  import FormasDePago from "@/components/elancar/FormasDePago.vue";
  import CondicionesDeVenta from "@/components/elancar/CondicionesDeVenta.vue";
  export default {
    middleware: ["auth"],
    components: { Sucursales, FormasDePago, CondicionesDeVenta },
    data() {
      return {
        proveedores: [],
        proveedor: null,
        sucursales_proveedor: [],
        sucursalProveedor: null,
        receptores_proveedor: [],
        receptor: null,
        productos_proveedor: [],
        aQuienCorresponda: null,
      };
    },
    watch: {
      proveedor: function(val) {
        if (val != null) {
          this.getSucursalesProveedor();
        }
      },
    },
    methods: {
      async getSucursalesProveedor() {
        const qs = require("qs");
  
        const query = qs.stringify({
          filter: {
            "id_proveedor": {
              "_eq": this.proveedor.id
            }
          }
        });
  
        this.sucursales_proveedor = await this.$axios
          .$get(`${this.$config.apiUrl}/items/sucursales_proveedor?${query}`)
          .then((res) => res.data);
      },
    },
    async asyncData(context) {
      const proveedores = await context.$axios
        .$get(`${context.$config.apiUrl}/items/proveedores`)
        .then((res) => res.data);
  
      return { proveedores };
    },
  };
  </script>
  
  <style></style>