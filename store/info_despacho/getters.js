export default {
    getInfoDespachoCotizacion(state) {
        return state.info_despacho_cotizacion;
    },
    getEstadoCotizacion(state) {
        return state.cotizacion_en_proceso;
    },
    getInfoDespachoNotaPedido(state) {
        return state.info_despacho_nota_pedido;
    },
    getEstadoPedido(state) {
        return state.pedido_en_proceso;
    },
}