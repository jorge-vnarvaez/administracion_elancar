export default {
    setInfoDespacho(state, info_despacho){
        state.info_despacho = info_despacho;
        this.$cookies.set("infoDespacho", state.info_despacho)
    }
}