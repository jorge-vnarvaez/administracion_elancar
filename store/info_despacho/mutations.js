export default {
    setInfoDespachoCotizacion(state, info_despacho){
        state.info_despacho_cotizacion = info_despacho;
        state.cotizacion_en_proceso = true;
        this.$cookies.set("infoDespachoCotizacion", state.info_despacho_cotizacion)
    },
    borrarInfoDespachoCotizacion(state){
        state.info_despacho_cotizacion = null;
        state.cotizacion_en_proceso = !state.cotizacion_en_proceso;
        this.$cookies.remove("infoDespachoCotizacion");
        this.$router.push("/productos");
    },
    no_cotizacionEnProceso(state){
        state.cotizacion_en_proceso = false;
    }
}