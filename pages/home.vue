<template>
    <div class="grid grid-cols-12 w-full p-24 gap-x-32">
        <!-- BIENVENIDO -->
        <div class="col-span-8 bg-white p-10 shadow-md rounded-lg" v-if="usuario">
            <span class="block font-semibold">Bienvenido/a</span>
            {{ usuario.first_name }} {{ usuario.last_name }}
        </div>
        <!-- BIENVENIDO -->

        <!-- ACCESOS DIRECTOS -->
        <div class="col-span-12 mt-14">
            <p class="text-2xl">Accesos directos</p>
        </div>

        <div class="col-span-4">
            <card-direct-access label="Listado de productos" text="Revisa el listado de productos" icon="fa-solid fa-list" />
        </div>

        <div class="col-span-4">
            <card-direct-access label="Orden de compra" text="Revisa las ordenes de compra realizadas" icon="fa-regular fa-file" />
        </div>

        <div class="col-span-4 col-start-1 mt-12">
            <card-direct-access label="Cotizaciones de venta" text="Revisa las cotizaciones de ventas realizadas" icon="fa-regular fa-file" />
        </div>

        <div class="col-span-4 mt-12">
            <card-direct-access label="Orden de venta" text="Revisa las ordenes de venta realizadas" icon="fa-regular fa-file" />
        </div>
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
        }
    }
}

</script>

<style>

</style>