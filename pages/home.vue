<template>
    <div class="grid grid-cols-12 w-full tw-p-24 gap-x-32 h-full">
        <!-- BIENVENIDO -->
        <!-- <div class="col-span-8 bg-white p-10 shadow-md rounded-lg h-32 flex justify-between" v-if="usuario">
            <div>
                <span class="block font-semibold">Bienvenido/a</span>
                <span>{{ usuario.first_name }} {{ usuario.last_name }}</span>
            </div>
            <div>
                <span class="block">{{ fecha_actual }}</span>
                <span class="flex justify-end">{{ hora_actual }}</span>
            </div>
        </div> -->
        <!-- BIENVENIDO -->

        <!-- ACCESOS DIRECTOS -->
        <!-- <div class="col-span-12 mt-14">
            <p class="text-3xl">Accesos directos</p>
        </div>

        <div class="col-span-4">
            <card-direct-access label="Listado de productos" text="Revisa el listado de productos" icon="lista" route_name="productos" />
        </div>

        <div class="col-span-4">
            <card-direct-access label="Orden de compra" text="Revisa las ordenes de compra realizadas" icon="file-search" route_name="ordenes-ver-ordenes_de_compra" />
        </div>

        <div class="col-span-4 col-start-1 mt-8">
            <card-direct-access label="Cotizaciones de venta" text="Revisa las cotizaciones de ventas realizadas" icon="file-search" route_name="cotizaciones" />
        </div>

        <div class="col-span-4 mt-12">
            <card-direct-access label="Notas de pedido" text="Revisa las notas de pedido realizadas" icon="file" route_name="notas_pedido" />
        </div> -->
        <!-- ACCESOS DIRECTOS -->
    </div>
</template>

<script>

import MacroCategorias from '../components/categorias/MacroCategorias.vue';
import CardDirectAccess from '../components/reusable/CardDirectAccess.vue';

export default {
    middleware: ["auth"],
    components: { MacroCategorias, CardDirectAccess },
    mounted() {
        this.getCurrentUsuario();
    },
    methods: {
        getCurrentUsuario() {
            this.$store.dispatch('session/current');
        },
        desconectar() {
            this.$store.dispatch('session/desconectar');
        }
    },
    computed: {
        usuario() {
            return this.$store.getters['session/getUser'];
        },
        fecha_actual() {
            return this.$store.getters['ui/getFechaActual'];
        },
        hora_actual() {
            return this.$store.getters['ui/getHoraActual'];
        }
    }
}

</script>

<style>

</style>