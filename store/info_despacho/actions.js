export default{
    setInfoDespachoCotizacion({commit}, info_despacho){
        commit('setInfoDespachoCotizacion', info_despacho);
    },
    borrarInfoDespachoCotizacion({commit}){
        commit('borrarInfoDespachoCotizacion');
    }
}