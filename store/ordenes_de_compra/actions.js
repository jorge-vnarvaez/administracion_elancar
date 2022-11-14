export default {
    setDetalle({ commit }, detalle) {
        commit('setDetalle', detalle)
    },
    updateProductPrice({ commit }, { id, precio_compra }) {
        commit('updateProductPrice', { id, precio_compra })
    },
}