export default {
    setInfoDespachoCotizacion(state, info_despacho){
        state.info_despacho_cotizacion = info_despacho;
        state.cotizacion_en_proceso = true;
        this.$cookies.set("infoDespachoCotizacion", state.info_despacho_cotizacion)
    },
    borrarInfoDespachoCotizacion(state){
        state.info_despacho_cotizacion = null;
        this.$cookies.remove("infoDespachoCotizacion");
        state.cotizacion_en_proceso = false;
        this.$router.push("/productos");
    },
}