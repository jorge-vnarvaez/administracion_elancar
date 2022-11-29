<template>
  <div class="tw-mt-1 tw-flex tw-flex-col tw-justify-between tw-text-xs">
    <span class="tw-block tw-mb-2 tw-font-bold tw-text-xl">Detalle</span>
    <!--  DESKTOP VIEW -->
    <div v-if="$vuetify.breakpoint.mobile ? false : true">
      <!-- TABLE HEADERS -->
      <div class="tw-grid tw-grid-cols-12 tw-gap-x-4">
        <div
          v-for="(item, index) in labels"
          :key="index"
          :class="col_span_table(index)"
        >
          <span class="tw-block tw-font-bold">{{ item }}</span>
        </div>
      </div>
      <!-- TABLE HEADERS -->

      <!-- V-DIVIDER -->
      <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-2"></div>
      <!-- V-DIVIDER -->

      <!-- TABLE BODY -->
      <div
        v-for="(item, index) in productos"
        :key="index"
        class="tw-my-1 tw-grid tw-grid-cols-12 tw-gap-x-4"
      >
        <!-- NOMBRE PRODUCTO -->
        <span
          :class="
            col_span_table(0) +
            ' tw-flex align-center'
          "
          >{{ con_detalle ? item.productos_id.nombre : item.nombre }}</span
        >
        <!-- NOMBRE PRODUCTO -->

        <!-- CANTIDAD -->
        <span
          v-if="visualizando"
          :class="col_span_table(1) + ' tw-font-bold tw-flex align-center'"
          >{{ item.cantidad }}</span
        >

        <div v-if="visualizando == false" :class="col_span_table(1)">
          <CantidadProductos :item="item" :cart_type="cart_type" />
        </div>
        <!-- CANTIDAD -->

        <!-- PRECIO UNITARIO -->
        <span :class="col_span_table(2) + ' tw-flex align-center'">{{
          cotizacion_proveedor
            ? "$.-"
            : $formatearPrecio(
                orden_de_compra
                  ? item.precio_compra
                  : con_detalle
                  ? item.productos_id.precio
                  : item.precio
              )
        }}</span>
        <!-- PRECIO UNITARIO -->

        <!-- PRECIO TOTAL -->
        <span :class="col_span_table(3) + ' tw-flex align-center '">{{
          cotizacion_proveedor
            ? "$.-"
            : $formatearPrecio(
                item.cantidad *
                  (orden_de_compra
                    ? item.precio_compra
                    : con_detalle
                    ? item.productos_id.precio
                    : item.precio)
              )
        }}</span>
        <!-- PRECIO TOTAL -->

        <!-- TOTAL KG -->
        <span
          v-if="!cotizacion_proveedor && false"
          :class="col_span_table(4) + ' tw-font-bold tw-flex align-center'"
          >{{
            item.cantidad * (con_detalle ? item.productos_id.kg : item.kg)
          }}</span
        >
        <!-- TOTAL KG -->
      </div>
      <!-- TABLE BODY -->
    </div>
    <!-- DESKTOP VIEW -->

    <!-- MOBILE VIEW -->
    <div v-if="$vuetify.breakpoint.mobile ? true : false">
      <!-- V-DIVIDER -->
      <div class="tw-w-full tw-h-[1px] tw-bg-gray-400 tw-my-2"></div>
      <!-- V-DIVIDER -->

      <!-- TABLE HEADERS -->
      <div
        v-for="(item, index) in productos"
        :key="index"
        class="tw-my-2 tw-gap-x-4 tw-mb-6 tw-grid tw-grid-cols-12"
      >
        <!-- NOMBRE PRODUCTO -->
        <div class="tw-col-span-6 tw-mb-1">
          <span class="tw-flex align-center tw-truncate tw-font-bold"
            >Productos
          </span>
        </div>

        <div class="tw-col-span-6">
          <span class="tw-flex align-center tw-truncate lg:tw-text-clip"
            >{{ con_detalle ? item.productos_id.nombre : item.nombre }}
          </span>
        </div>

        <!-- NOMBRE PRODUCTO -->

        <!-- PRECIO UNITARIO -->
        <div class="tw-col-span-6 tw-mb-1">
          <span class="tw-flex align-center tw-truncate tw-font-bold"
            >Precio uni
          </span>
        </div>

        <div class="tw-col-span-6">
          <span :class="col_span_table(2) + ' tw-flex align-center'">{{
            cotizacion_proveedor
              ? "$.-"
              : $formatearPrecio(
                  orden_de_compra
                    ? item.precio_compra
                    : con_detalle
                    ? item.productos_id.precio
                    : item.precio
                )
          }}</span>
        </div>
        <!-- PRECIO UNITARIO -->

        <!-- PRECIO TOTAL -->
        <div class="tw-col-span-6 tw-mb-1">
          <span class="tw-flex align-center tw-truncate tw-font-bold"
            >Precio total
          </span>
        </div>

        <div class="tw-col-span-6">
          <span :class="col_span_table(3) + ' tw-flex align-center '">{{
            cotizacion_proveedor
              ? "$.-"
              : $formatearPrecio(
                  item.cantidad *
                    (orden_de_compra
                      ? item.precio_compra
                      : con_detalle
                      ? item.productos_id.precio
                      : item.precio)
                )
          }}</span>
        </div>
        <!-- PRECIO TOTAL -->

        <!-- CANTIDAD -->
        <div class="tw-col-span-6">
          <span class="tw-flex tw-font-bold">Cant </span>
        </div>

        <div class="tw-col-span-6">
          <span
            v-if="visualizando"
            class="tw-font-bold tw-flex align-center"
            >{{ item.cantidad }}</span
          >

          <div v-if="visualizando == false">
            <CantidadProductos
              class="tw-text-black"
              :item="item"
              :cart_type="cart_type"
            />
          </div>
        </div>
        <!-- CANTIDAD -->

        <!-- TOTAL KG -->
        <span
          v-if="!cotizacion_proveedor && false"
          :class="col_span_table(4) + ' tw-font-bold tw-flex align-center'"
          >{{
            item.cantidad * (con_detalle ? item.productos_id.kg : item.kg)
          }}</span
        >
        <!-- TOTAL KG -->
      </div>
      <!-- TABLE HEADERS -->
    </div>
    <!-- MOBILE VIEW -->
    <!-- MEMBRETE INFERIOR -->
    <div
      class="tw-flex tw-flex-col-reverse lg:tw-flex-row lg:tw-justify-between align-center tw-mt-2"
    >
      <div v-if="cotizacion_cliente"><MembreteInferiorPdf /></div>
      <!-- PLANTILLA PRECIO-->
      <div class="tw-flex tw-justify-end tw-w-full">
        <PlantillaPrecio
          :total_kg="total_kg"
          :sub_total="sub_total"
          :transporte="0"
          :total="total"
          :cotizacion_proveedor="cotizacion_proveedor"
        />
      </div>
      <!-- PLANTILLA PRECIO-->
    </div>
    <!-- MEMBRETE INFERIOR -->
  </div>
</template>

<script>
import MembreteInferiorPdf from "@/components/reusable/visualizacion_documentos/MembreteInferiorPdf.vue";
import PlantillaPrecio from "@/components/reusable/visualizacion_documentos/PlantillaPrecio.vue";
import CantidadProductos from "@/components/utils/CantidadProductos.vue";

export default {
  components: {
    MembreteInferiorPdf,
    PlantillaPrecio,
    CantidadProductos,
  },
  props: {
    labels: {
      type: Array,
      default: () => [],
      desc: "Describe el nombre de las columnas para la tabla por ejemplo [Productos, Cantidad, Kg, Precio, Etc]",
    },
    productos: {
      type: [Array, String],
      default: () => [],
      desc: "Describe los productos que se van a mostrar en la tabla",
    },
    cotizacion_proveedor: {
      type: Boolean,
      default: false,
      desc: "Define si la cotización va dirigida a proveedor lo que retira los precios de la tabla",
    },
    cotizacion_cliente: {
      type: Boolean,
      default: false,
      desc: "Define si la cotización va dirigida a cliente lo que permite agregar el precio de transporte y el membrete inferior",
    },
    orden_de_compra: {
      type: Boolean,
      default: false,
      desc: "Define si el documento donde se inyecta la tabla es una orden de compra",
    },
    nota_de_pedido: {
      type: Boolean,
      default: false,
      desc: "Define si el documento donde se inyecta la tabla es una nota de pedido",
    },
    visualizando: {
      type: Boolean,
      default: false,
      desc: "Define si el documento donde se inyecta la tabla es una visualizacion del documento",
    },
    cart_type: {
      type: String,
      default: "compras",
      desc: "Define el tipo de carrito que se va a mostrar en la tabla",
    },
    con_detalle: {
      type: Boolean,
      default: false,
      desc: "Define si la tabla va a mostrar el detalle de los productos (esta propiedad aplica a visualizacion de documentos) no es indispensable utilizarla en la creacion de los documentos",
    },
    pdf: {
      type: Boolean,
      default: false,
      desc: "Define si el documento esta en formato PDF",
    },
    convirtiendo: {
      type: Boolean,
      default: false,
      desc: "Define si el documento se va a convertir a orden de compra",
    },
  },
  methods: {
    col_span_table(index) {
      switch (index) {
        case 0:
          return "lg:tw-col-span-6 tw-col-span-4";
        case 1:
          return "lg:tw-col-span-2 tw-col-span-2";
        case 2:
          return "lg:tw-col-span-2 tw-col-span-3";
        case 3:
          return "lg:tw-col-span-2 tw-col-span-2";
        case 4:
          return "tw-col-span-1";
        default:
          return "tw-col-span-2";
      }
    },
    colors(index) {
      switch (index) {
        case 0:
          return "tw-bg-red-100";
        case 1:
          return "tw-bg-green-200";
        case 2:
          return "tw-bg-blue-500";
        case 3:
          return "tw-bg-yellow-200";
        case 4:
          return "tw-bg-orange-100";
        case 5:
          return "tw-bg-gray-200";
      }
    },
  },
  computed: {
    sub_total() {
      let total = 0;
      if (this.con_detalle) {
        if (this.orden_de_compra) {
          this.productos.forEach((item) => {
            total += item.cantidad * item.precio_compra;
          });
        } else {
          this.productos.forEach((item) => {
            total += item.cantidad * item.productos_id.precio;
          });
        }
      } else if (!this.con_detalle) {
        this.productos.forEach((item) => {
          total += item.cantidad * item.precio;
        });
      }

      return this.cotizacion_proveedor ? 0 : total;
    },
    total_kg() {
      return this.$total_kg(
        this.con_detalle
          ? this.productos.map((item) => item.cantidad * item.productos_id.kg)
          : this.productos.map((item) => item.cantidad * item.kg)
      ).toFixed(2);
    },
    transporte() {
      return 0;
    },
    total() {
      return this.sub_total + this.transporte + this.sub_total * 0.19;
    },
  },
};
</script>

<style></style>
