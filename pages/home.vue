<template>
    <div class="flex flex-col justify-center align-center">
        <span class="block text-5xl font-bold">¿Qué tipo de producto busca el cliente?</span>
        <span class="block text-xl mt-4">Seleccione un elemento</span>
        <macro-categorias />
    </div>
</template>

<script>

import MacroCategorias from '../components/MacroCategorias.vue';

export default {
    middleware: "auth",
    components: { MacroCategorias },
    methods: {
        desconectar() {
            this.$store.dispatch('session/desconectar');
        }
    }
}

</script>