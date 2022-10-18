export default {
    setInfoDespachoNotaPedido(state, info_despacho) {
        state.info_despacho_nota_pedido = info_despacho || false;
        if (state.info_despacho_nota_pedido) {
            state.pedido_en_proceso = state.pedido_en_proceso || true;
            this.$cookies.set("infoDespachoNotaPedido", state.info_despacho_nota_pedido)
        }
    },
    borrarInfoDespachoNotaPedido(state) {
        state.info_despacho_nota_pedido = null;
        this.$cookies.remove("infoDespachoNotaPedido");
        state.pedido_en_proceso = null;
        this.$router.push("/productos");
    },
    setInfoDespachoCotizacion(state, info_despacho) {
        state.info_despacho_cotizacion = info_despacho || false;
        if (state.info_despacho_cotizacion) {
            state.cotizacion_en_proceso = state.cotizacion_en_proceso || true;
            this.$cookies.set("infoDespachoCotizacion", state.info_despacho_cotizacion)
        }
    },
    borrarInfoDespachoCotizacion(state) {
        state.info_despacho_cotizacion = null;
        this.$cookies.remove("infoDespachoCotizacion");
        state.cotizacion_en_proceso = null;
        this.$router.push("/productos");
    },
}