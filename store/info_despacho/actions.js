export default{
    setInfoDespachoCotizacion({commit}, info_despacho){
        commit('setInfoDespachoCotizacion', info_despacho);
    },
    borrarInfoDespachoCotizacion({commit}){
        commit('borrarInfoDespachoCotizacion');
    },
    setInfoDespachoNotaPedido({commit}, info_despacho){
        commit('setInfoDespachoNotaPedido', info_despacho);
    },
}