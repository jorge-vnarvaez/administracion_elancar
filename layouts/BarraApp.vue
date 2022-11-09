<template>
  <div class="tw-relative tw-left-0">
    <div
      class="tw-bg-yellow-400 tw-h-screen tw-fixed tw-w-[60px] tw-flex tw-flex-col tw-justify-between tw-px-2 tw-py-8"
    >
      <div class="tw-flex tw-flex-col tw-space-y-4">
        <!-- HOME -->
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="tw-bg-yellow-500 tw-rounded-lg tw-shadow-md tw-[40px] tw-h-[40px] tw-flex align-center tw-p-2"
            >
              <nuxt-link to="/home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-home"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000000"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="5 12 3 12 12 3 21 12 19 12" />
                  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                </svg>
              </nuxt-link>
            </div>
          </template>
          <span>Inicio</span>
        </v-tooltip>

        <!-- HOME -->

        <!-- MENU VENTAS -->
        <menu-ventas />
        <!-- MENU VENTAS -->

        <!-- MENU COMPRAS -->
        <menu-compras />
        <!-- MENU COMPRAS -->

        <!-- CARRO COMPRAS -->
        <nuxt-link to="/carro_de_compras">
          <div
            @mouseover="opciones = true"
            class="tw-relative tw-bg-yellow-500 tw-rounded-lg tw-shadow-md tw-[40px] tw-h-[40px] tw-flex align-center tw-p-2 tw-cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-shopping-cart"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="6" cy="19" r="2" />
              <circle cx="17" cy="19" r="2" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg>

            <div
              class="tw-bg-neutral-900 tw-w-6 tw-h-6 tw-rounded-full tw-absolute tw-flex align-center tw-justify-center tw-top-6 tw-left-6"
            >
              <span class="tw-text-white tw-text-sm">{{
                productos_in_cart
              }}</span>
            </div>
          </div>
        </nuxt-link>
        <!-- CARRO COMPRAS -->

        <!-- CARRO SOLICITUDES -->
        <nuxt-link v-if="productos_solicitados > 0" to="/carro_de_solicitudes">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <div
               v-bind="attrs"
                v-on="on"
                class="tw-relative tw-bg-yellow-500 tw-rounded-lg tw-shadow-md tw-[40px] tw-h-[40px] tw-flex align-center tw-p-2 tw-cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-file-upload"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000000"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path
                    d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
                  />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <polyline points="9 14 12 11 15 14" />
                </svg>

                <div
                  class="tw-bg-neutral-900 tw-w-6 tw-h-6 tw-rounded-full tw-absolute tw-flex align-center tw-justify-center tw-top-6 tw-left-6"
                >
                  <span class="tw-text-white tw-text-sm">{{
                    productos_solicitados
                  }}</span>
                </div>
              </div>
            </template>
            <span>Solicitud de cotización en proceso</span>
          </v-tooltip>
        </nuxt-link>
        <!-- CARRO SOLICITUDES -->

        <!-- BOTON COTIZACION EN PROCESO -->
        <nuxt-link v-if="estado_cotizacion" to="/cotizaciones/crear">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <div
                v-bind="attrs"
                v-on="on"
                class="tw-cursor-pointer tw-bg-yellow-500 tw-rounded-lg tw-shadow-md tw-[40px] tw-h-[40px] tw-flex align-center tw-p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-file-text"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000000"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path
                    d="M18 17v-13a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v16a2 2 0 0 0 2 2h8"
                  />
                  <rect x="8" y="9" width="6" height="6" rx="2" />
                </svg>
              </div>
            </template>
            <span>Cotización en proceso</span>
          </v-tooltip>
        </nuxt-link>
        <!-- BOTON COTIZACION EN PROCESO -->

        <!--BOTON PEDIDO EN PROCESO -->
        <nuxt-link v-if="estado_pedido" to="/notas_pedido/crear">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <div
                v-bind="attrs"
                v-on="on"
                class="tw-cursor-pointer tw-bg-yellow-500 tw-rounded-lg tw-shadow-md tw-[40px] tw-h-[40px] tw-flex align-center tw-p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-file-text"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000000"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                  <path
                    d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
                  />
                  <line x1="9" y1="9" x2="10" y2="9" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                  <line x1="9" y1="17" x2="15" y2="17" />
                </svg>
              </div>
            </template>
            <span>Nota de pedido en proceso</span>
          </v-tooltip>
        </nuxt-link>
        <!--BOTON PEDIDO EN PROCESO -->
      </div>

      <!-- CERRAR SESION -->
      <div>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <div
              @click="cerrarSesion"
              v-bind="attrs"
              v-on="on"
              class="tw-cursor-pointer tw-bg-yellow-500 tw-rounded-lg tw-shadow-md tw-[40px] tw-h-[40px] tw-flex align-center tw-p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-logout"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#000000"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 12h14l-3 -3m0 6l3 -3" />
                <path
                  d="M4 12v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"
                />
              </svg>
            </div>
          </template>
          <span>Cerrar sesión</span>
        </v-tooltip>
      </div>
      <!-- CERRAR SESION -->
    </div>
  </div>
</template>

<script>
import MenuVentas from "@/components/menus/MenuVentas.vue";
import MenuCompras from "@/components/menus/MenuCompras.vue";
import MenuGestion from "@/components/menus/MenuGestion.vue";

export default {
  components: {
    MenuVentas,
    MenuCompras,
    MenuGestion,
  },
  props: {
    cotizacion_en_proceso: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cerrarSesion() {
      this.$store.dispatch("session/desconectar");
    },
  },
  computed: {
    estado_cotizacion() {
      return this.$store.getters["info_despacho/getEstadoCotizacion"];
    },
    estado_pedido() {
      return this.$store.getters["info_despacho/getEstadoPedido"];
    },
    productos_in_cart() {
      return this.$store.getters["carro_compras/getCarroComprasLength"];
    },
    productos_solicitados() {
      return this.$store.getters["carro_solicitudes/getCarroSolicitudesLength"];
    },
  },
};
</script>

<style scoped></style>
