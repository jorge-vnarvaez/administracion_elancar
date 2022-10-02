<template>
  <div class="tw-flex tw-space-x-4">
    <div v-if="btnRealizarPedido" class="tw-cursor-pointer tw-bg-neutral-900 tw-flex align-center tw-px-4 tw-py-1 tw-space-x-2">
        <IconoPedido />
        <span class="tw-text-white tw-font-bold tw-uppercase">Hacer pedido</span>
    </div>

    <div v-if="btnImprimir" class="tw-cursor-pointer tw-bg-neutral-900 tw-flex align-center tw-px-4 tw-py-1 tw-space-x-2">
        <IconoImpresora />
    </div>

    <div v-if="btnBorrar" @click="eliminar" class="tw-cursor-pointer tw-bg-neutral-900 tw-flex align-center tw-px-4 tw-py-1 tw-space-x-2">
        <IconoBorrar />
    </div>
  </div>
</template>

<script>

import IconoPedido from '@/components/iconos/blancos/IconoPedido.vue'
import IconoImpresora from '@/components/iconos/blancos/IconoImpresora.vue'
import IconoBorrar from '@/components/iconos/blancos/IconoBorrar.vue'

export default {
    components: {
        IconoPedido,
        IconoImpresora,
        IconoBorrar
    },
    props: {
        tipoDocumento: {
            type: String,
            default: '',
            desc: 'Define el tipo de documento al cual pertenece el boton'
        },
        btnRealizarPedido: {
            type: Boolean,
            default: false,
            desc: "Define si se muestra o no el boton de realizar pedido"
        },
        btnImprimir: {
            type: Boolean,
            default: false,
            desc: "Define si se muestra o no el boton de imprimir"
        },
        btnBorrar: {
            type: Boolean,
            default: false,
            desc: "Define si se muestra o no el boton de borrar"
        },
    },
    methods: {
        eliminar() {
            this.$store.dispatch('info_despacho/borrarInfoDespachoCotizacion');
            this.$store.dispatch('carro_compras/borrarCarro');
        }
    }
}
</script>

<style>

</style>